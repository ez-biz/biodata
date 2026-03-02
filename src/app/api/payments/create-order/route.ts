import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getRazorpay, PLANS, PlanId } from "@/lib/razorpay";
import { prisma } from "@/lib/db/prisma";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const planId = body.planId as PlanId;
  const biodataId = body.biodataId as string | undefined;
  const promoCode = body.promoCode as string | undefined;

  if (!planId || !PLANS[planId]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLANS[planId];
  let finalAmount: number = plan.amount;
  let appliedPromoCode: string | null = null;

  // Server-side promo code re-validation
  if (promoCode) {
    const promo = await prisma.promoCode.findUnique({
      where: { code: promoCode.toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json(
        { error: "Invalid promo code" },
        { status: 400 }
      );
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return NextResponse.json(
        { error: "Promo code expired" },
        { status: 400 }
      );
    }

    if (promo.maxUses !== null && promo.currentUses >= promo.maxUses) {
      return NextResponse.json(
        { error: "Promo code usage limit reached" },
        { status: 400 }
      );
    }

    if (
      promo.applicablePlans.length > 0 &&
      !promo.applicablePlans.includes(planId)
    ) {
      return NextResponse.json(
        { error: "Promo code not applicable to this plan" },
        { status: 400 }
      );
    }

    // Calculate discount — percent takes priority if both exist
    if (promo.discountPercent) {
      finalAmount = Math.round(plan.amount * (1 - promo.discountPercent / 100));
    } else if (promo.discountAmount) {
      // discountAmount is stored in paise
      finalAmount = plan.amount - promo.discountAmount;
    }

    // Razorpay minimum is 100 paise (₹1)
    finalAmount = Math.max(finalAmount, 100);

    appliedPromoCode = promo.code;
  }

  try {
    const order = await getRazorpay().orders.create({
      amount: finalAmount,
      currency: plan.currency,
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        userId: userId,
        planId,
        biodataId: biodataId || "",
        promoCode: appliedPromoCode || "",
      },
    });

    // Create a pending payment record
    await prisma.payment.create({
      data: {
        userId: userId,
        biodataId: biodataId || null,
        amount: finalAmount,
        originalAmount: appliedPromoCode ? plan.amount : null,
        currency: plan.currency,
        provider: "RAZORPAY",
        providerPaymentId: order.id,
        status: "PENDING",
        plan: planId,
        promoCode: appliedPromoCode,
      },
    });

    // Increment promo code usage after successful order creation
    if (appliedPromoCode) {
      await prisma.promoCode.update({
        where: { code: appliedPromoCode },
        data: { currentUses: { increment: 1 } },
      });
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}

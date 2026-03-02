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

  if (!planId || !PLANS[planId]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const plan = PLANS[planId];

  try {
    const order = await getRazorpay().orders.create({
      amount: plan.amount,
      currency: plan.currency,
      receipt: `order_${userId}_${Date.now()}`,
      notes: {
        userId: userId,
        planId,
        biodataId: biodataId || "",
      },
    });

    // Create a pending payment record
    await prisma.payment.create({
      data: {
        userId: userId,
        biodataId: biodataId || null,
        amount: plan.amount,
        currency: plan.currency,
        provider: "RAZORPAY",
        providerPaymentId: order.id,
        status: "PENDING",
        plan: planId,
      },
    });

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

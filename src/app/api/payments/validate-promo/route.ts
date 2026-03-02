import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { PLANS, PlanId } from "@/lib/razorpay";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 5 * 60 * 1000, max: 10 });

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await req.json();
    const { code, plan } = body as { code?: string; plan?: string };

    if (!code || !plan) {
      return NextResponse.json(
        { valid: false, error: "Code and plan are required" },
        { status: 400 }
      );
    }

    if (!PLANS[plan as PlanId]) {
      return NextResponse.json(
        { valid: false, error: "Invalid plan" },
        { status: 400 }
      );
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!promo || !promo.isActive) {
      return NextResponse.json({ valid: false, error: "Invalid code" });
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      return NextResponse.json({ valid: false, error: "Code expired" });
    }

    if (promo.maxUses !== null && promo.currentUses >= promo.maxUses) {
      return NextResponse.json({
        valid: false,
        error: "Code usage limit reached",
      });
    }

    if (
      promo.applicablePlans.length > 0 &&
      !promo.applicablePlans.includes(plan)
    ) {
      return NextResponse.json({
        valid: false,
        error: "Not applicable to this plan",
      });
    }

    return NextResponse.json({
      valid: true,
      discountPercent: promo.discountPercent,
      discountAmount: promo.discountAmount,
      code: promo.code,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}

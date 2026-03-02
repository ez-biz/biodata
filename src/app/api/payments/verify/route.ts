import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email/resend";
import { paymentReceiptEmail } from "@/lib/email/templates";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Update payment record
  const payment = await prisma.payment.findFirst({
    where: {
      providerPaymentId: razorpay_order_id,
      userId: userId,
    },
  });

  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  // Update payment status and user tier
  await prisma.$transaction([
    prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCESS",
        providerPaymentId: razorpay_payment_id,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        tier: payment.plan as "PREMIUM" | "UNLIMITED" | "FAMILY",
        tierExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      },
    }),
    // If linked to a biodata, mark it as paid
    ...(payment.biodataId
      ? [
          prisma.biodata.update({
            where: { id: payment.biodataId },
            data: { isPaid: true },
          }),
        ]
      : []),
  ]);

  // Send payment receipt email (fire and forget)
  prisma.user
    .findUnique({ where: { id: userId }, select: { name: true, email: true } })
    .then((user) => {
      if (user?.email) {
        const amountInRupees = payment.amount / 100;
        sendEmail(
          user.email,
          `Payment Receipt — ${payment.plan} Plan`,
          paymentReceiptEmail(user.name || "User", payment.plan, amountInRupees)
        ).catch((err) =>
          console.error("[Payment] Receipt email failed:", err)
        );
      }
    })
    .catch((err) => console.error("[Payment] User lookup for email failed:", err));

  return NextResponse.json({ success: true, plan: payment.plan });
}

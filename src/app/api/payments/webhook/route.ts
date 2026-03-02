import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const eventType = event.event;

  if (eventType === "payment.captured") {
    const paymentEntity = event.payload.payment.entity;
    const orderId = paymentEntity.order_id;

    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: orderId },
    });

    if (payment && payment.status !== "SUCCESS") {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCESS",
            providerPaymentId: paymentEntity.id,
          },
        }),
        prisma.user.update({
          where: { id: payment.userId },
          data: {
            tier: payment.plan as "PREMIUM" | "UNLIMITED" | "FAMILY",
            tierExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        }),
        ...(payment.biodataId
          ? [
              prisma.biodata.update({
                where: { id: payment.biodataId },
                data: { isPaid: true },
              }),
            ]
          : []),
      ]);
    }
  }

  if (eventType === "payment.failed") {
    const paymentEntity = event.payload.payment.entity;
    const orderId = paymentEntity.order_id;

    await prisma.payment.updateMany({
      where: { providerPaymentId: orderId, status: "PENDING" },
      data: { status: "FAILED" },
    });
  }

  if (eventType === "refund.created") {
    const refundEntity = event.payload.refund.entity;
    const paymentId = refundEntity.payment_id;

    await prisma.payment.updateMany({
      where: { providerPaymentId: paymentId },
      data: { status: "REFUNDED" },
    });
  }

  return NextResponse.json({ received: true });
}

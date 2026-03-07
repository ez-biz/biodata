import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import { deleteObject } from "@/lib/storage/s3";
import { Prisma } from "@prisma/client";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 20 });

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { biodataId, s3Key, url, type, cropData } = body;

  // Verify biodata ownership
  const biodata = await prisma.biodata.findFirst({
    where: { id: biodataId, userId },
  });
  if (!biodata) {
    return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
  }

  const photo = await prisma.photo.create({
    data: {
      biodataId,
      url,
      s3Key,
      type: type === "profile" ? "PROFILE" : type === "kundli" ? "KUNDLI" : "ADDITIONAL",
      cropData: cropData ? (cropData as unknown as Prisma.InputJsonValue) : undefined,
    },
  });

  return NextResponse.json(photo);
}

export async function DELETE(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const photoId = searchParams.get("id");
  if (!photoId) {
    return NextResponse.json({ error: "Missing photo ID" }, { status: 400 });
  }

  const photo = await prisma.photo.findFirst({
    where: { id: photoId },
    include: { biodata: { select: { userId: true } } },
  });

  if (!photo || photo.biodata.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await deleteObject(photo.s3Key);
  } catch {
    // S3 delete may fail if key doesn't exist, continue anyway
  }

  await prisma.photo.delete({ where: { id: photoId } });
  return NextResponse.json({ success: true });
}

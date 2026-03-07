import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import crypto from "crypto";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 10 });

function generateSlug(): string {
  return crypto.randomBytes(4).toString("hex");
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const biodata = await prisma.biodata.findFirst({
    where: { id: params.id, userId },
  });

  if (!biodata) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const password = body.password as string | undefined;
  const expiresInDays = body.expiresInDays as number | undefined;

  const slug = biodata.shareSlug || generateSlug();

  const updateData: Record<string, unknown> = {
    shareSlug: slug,
    status: "PUBLISHED",
  };

  if (password) {
    const bcrypt = await import("bcryptjs");
    updateData.sharePassword = await bcrypt.default.hash(password, 10);
  } else {
    updateData.sharePassword = null;
  }

  if (expiresInDays) {
    updateData.shareExpiresAt = new Date(
      Date.now() + expiresInDays * 24 * 60 * 60 * 1000
    );
  } else {
    updateData.shareExpiresAt = null;
  }

  const updated = await prisma.biodata.update({
    where: { id: params.id },
    data: updateData,
  });

  const shareUrl = `${process.env.NEXTAUTH_URL}/share/${slug}`;

  return NextResponse.json({
    shareUrl,
    slug: updated.shareSlug,
    hasPassword: !!updated.sharePassword,
    expiresAt: updated.shareExpiresAt,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.biodata.update({
    where: { id: params.id },
    data: {
      shareSlug: null,
      sharePassword: null,
      shareExpiresAt: null,
    },
  });

  return NextResponse.json({ success: true });
}

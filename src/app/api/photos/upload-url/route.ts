import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { getUploadUrl, generatePhotoKey } from "@/lib/storage/s3";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { biodataId, type, contentType, index } = body as {
    biodataId: string;
    type: "profile" | "additional" | "kundli";
    contentType: string;
    index?: number;
  };

  if (!biodataId || !type || !contentType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(contentType)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  try {
    const key = generatePhotoKey(userId, biodataId, type, index || 0);
    const uploadUrl = await getUploadUrl(key, contentType);

    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error("Upload URL generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}

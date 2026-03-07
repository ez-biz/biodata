import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import { uploadPhoto, generatePhotoPath } from "@/lib/storage/supabase-storage";
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

  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const biodataId = formData.get("biodataId") as string | null;
    const type = formData.get("type") as "profile" | "additional" | "kundli" | null;
    const index = parseInt(formData.get("index") as string || "0", 10);

    if (!file || !biodataId || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Verify biodata ownership
    const biodata = await prisma.biodata.findFirst({
      where: { id: biodataId, userId },
    });
    if (!biodata) {
      return NextResponse.json({ error: "Biodata not found" }, { status: 404 });
    }

    const path = generatePhotoPath(userId, biodataId, type, index);
    const publicUrl = await uploadPhoto(path, file, file.type);

    return NextResponse.json({ url: publicUrl, storagePath: path });
  } catch (error) {
    console.error("Photo upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

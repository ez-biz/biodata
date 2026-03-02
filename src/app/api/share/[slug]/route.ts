import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { BiodataFormData } from "@/lib/types/biodata";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const biodata = await prisma.biodata.findUnique({
    where: { shareSlug: params.slug },
  });

  if (!biodata) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Check expiration
  if (biodata.shareExpiresAt && biodata.shareExpiresAt < new Date()) {
    return NextResponse.json({ expired: true }, { status: 403 });
  }

  // Check password
  if (biodata.sharePassword) {
    const body = await req.json().catch(() => ({}));
    const password = body.password as string | undefined;

    if (!password) {
      return NextResponse.json({ needsPassword: true }, { status: 401 });
    }

    const bcrypt = await import("bcryptjs");
    const valid = await bcrypt.default.compare(password, biodata.sharePassword);
    if (!valid) {
      return NextResponse.json({ wrongPassword: true }, { status: 401 });
    }
  }

  // Track view
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip");
  const userAgent = req.headers.get("user-agent") || "";
  const device = /mobile/i.test(userAgent) ? "Mobile" : "Desktop";

  await prisma.sharedLinkView.create({
    data: {
      biodataId: biodata.id,
      viewerIp: ip,
      viewerDevice: device,
    },
  });

  return NextResponse.json({
    data: biodata.data as unknown as BiodataFormData,
    templateId: biodata.templateId,
    colorScheme: biodata.colorScheme,
  });
}

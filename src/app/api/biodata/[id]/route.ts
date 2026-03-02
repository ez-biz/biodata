import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";

// GET /api/biodata/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const biodata = await prisma.biodata.findFirst({
    where: { id: params.id, userId },
    include: { photos: true },
  });

  if (!biodata) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(biodata);
}

// PUT /api/biodata/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const existing = await prisma.biodata.findFirst({
    where: { id: params.id, userId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    const biodata = await prisma.biodata.update({
      where: { id: params.id },
      data: {
        templateId: body.templateId ?? existing.templateId,
        colorScheme: body.colorScheme ?? existing.colorScheme,
        data: body.data ?? existing.data,
        language: body.language ?? existing.language,
        status: body.status ?? existing.status,
      },
    });

    return NextResponse.json(biodata);
  } catch {
    return NextResponse.json(
      { error: "Failed to update biodata" },
      { status: 500 }
    );
  }
}

// DELETE /api/biodata/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const existing = await prisma.biodata.findFirst({
    where: { id: params.id, userId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.biodata.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}

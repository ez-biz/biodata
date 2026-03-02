import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const biodataCreateSchema = z.object({
  templateId: z.string(),
  colorScheme: z.string().default("default"),
  data: z.record(z.string(), z.unknown()),
  language: z.string().default("en"),
});

// GET /api/biodata — list user's biodatas
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const biodatas = await prisma.biodata.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      photos: { where: { type: "PROFILE" }, take: 1 },
    },
  });

  return NextResponse.json(biodatas);
}

// POST /api/biodata — create new biodata
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  try {
    const body = await req.json();
    const { templateId, colorScheme, data, language } =
      biodataCreateSchema.parse(body);

    const biodata = await prisma.biodata.create({
      data: {
        userId,
        templateId,
        colorScheme,
        data: data as unknown as Prisma.InputJsonValue,
        language,
      },
    });

    return NextResponse.json(biodata);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create biodata" },
      { status: 500 }
    );
  }
}

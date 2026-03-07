import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const limiter = rateLimit({ windowMs: 60 * 1000, max: 20 });

export async function GET(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const biodatas = await prisma.biodata.findMany({
    where: { userId },
    select: { id: true },
  });

  const biodataIds = biodatas.map((b) => b.id);

  const totalViews = biodataIds.length > 0
    ? await prisma.sharedLinkView.count({
        where: { biodataId: { in: biodataIds } },
      })
    : 0;

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentViews = biodataIds.length > 0
    ? await prisma.sharedLinkView.count({
        where: {
          biodataId: { in: biodataIds },
          viewedAt: { gte: sevenDaysAgo },
        },
      })
    : 0;

  return NextResponse.json({
    totalBiodatas: biodatas.length,
    totalViews,
    recentViews,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  // Total views
  const totalViews = await prisma.sharedLinkView.count({
    where: { biodataId: params.id },
  });

  // Views in last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentViews = await prisma.sharedLinkView.count({
    where: {
      biodataId: params.id,
      viewedAt: { gte: sevenDaysAgo },
    },
  });

  // Device breakdown
  const views = await prisma.sharedLinkView.findMany({
    where: { biodataId: params.id },
    select: { viewerDevice: true, viewedAt: true },
    orderBy: { viewedAt: "desc" },
    take: 100,
  });

  const deviceCounts: Record<string, number> = {};
  views.forEach((v) => {
    const d = v.viewerDevice || "Unknown";
    deviceCounts[d] = (deviceCounts[d] || 0) + 1;
  });

  // Daily views for last 7 days
  const dailyViews: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const count = await prisma.sharedLinkView.count({
      where: {
        biodataId: params.id,
        viewedAt: { gte: dayStart, lt: dayEnd },
      },
    });

    dailyViews.push({
      date: dayStart.toISOString().split("T")[0],
      count,
    });
  }

  return NextResponse.json({
    totalViews,
    recentViews,
    deviceCounts,
    dailyViews,
    shareUrl: biodata.shareSlug
      ? `${process.env.NEXTAUTH_URL}/share/${biodata.shareSlug}`
      : null,
  });
}

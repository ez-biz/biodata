import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !(session?.user as { isAdmin?: boolean } | undefined)?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const [totalUsers, totalBiodatas, activeSubscriptions, revenueResult] =
      await Promise.all([
        prisma.user.count(),
        prisma.biodata.count(),
        prisma.user.count({
          where: {
            tier: { not: "FREE" },
            tierExpiresAt: { gt: new Date() },
          },
        }),
        prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "SUCCESS" },
        }),
      ]);

    return NextResponse.json({
      totalUsers,
      totalRevenue: revenueResult._sum.amount || 0,
      totalBiodatas,
      activeSubscriptions,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

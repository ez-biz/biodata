import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const authHandler = NextAuth(authOptions);

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

export { authHandler as GET };

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, loginLimiter);
  if (rateLimitResponse) return rateLimitResponse;

  return authHandler(req as unknown as Request, {} as never) as ReturnType<typeof authHandler>;
}

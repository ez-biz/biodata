import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, applyRateLimit } from "@/lib/middleware/rate-limit";

const TONE_PROMPTS: Record<string, string> = {
  professional:
    "Write in a confident, professional tone suitable for families evaluating marriage proposals. Focus on achievements and career.",
  traditional:
    "Write in a warm, respectful, and traditional Indian tone. Emphasize family values, upbringing, and cultural roots.",
  modern:
    "Write in a contemporary, friendly tone. Balance personal achievements with personality and lifestyle interests.",
};

const limiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });

export async function POST(req: NextRequest) {
  const rateLimitResponse = applyRateLimit(req, limiter);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { formData, tone = "traditional", length = "medium", language = "en" } = body;

  if (!formData) {
    return NextResponse.json({ error: "Missing form data" }, { status: 400 });
  }

  const pd = formData.personalDetails || {};
  const ec = formData.educationCareer || {};
  const fd = formData.familyDetails || {};
  const ls = formData.lifestyle || {};

  const wordCount =
    length === "short" ? "50-75" : length === "long" ? "200-250" : "100-150";

  const langInstruction =
    language === "hi"
      ? "Write the entire response in Hindi (Devanagari script). Do not use English."
      : "Write in English.";

  const prompt = `You are writing an "About Me" section for an Indian marriage biodata. This text will be read by prospective families evaluating a marriage match.

${TONE_PROMPTS[tone] || TONE_PROMPTS.traditional}
${langInstruction}

Write ${wordCount} words. Be genuine, warm, and avoid clichés. Do not use emojis. Do not include the person's name or start with "I am [name]". Start with a compelling opening.

Here are the details about the person:
- Name: ${pd.fullName || "Not provided"}
- Age/DOB: ${pd.dateOfBirth || "Not provided"}
- Gender: ${pd.gender || "Not provided"}
- Religion: ${pd.religion || "Not provided"}
- Caste: ${pd.caste || "Not provided"}
- Location: ${[pd.currentCity, pd.currentState].filter(Boolean).join(", ") || "Not provided"}
- Education: ${ec.highestEducation || "Not provided"} ${ec.educationDetails ? `(${ec.educationDetails})` : ""}
- Occupation: ${ec.occupation || "Not provided"} ${ec.jobTitle ? `as ${ec.jobTitle}` : ""} ${ec.companyName ? `at ${ec.companyName}` : ""}
- Income: ${ec.annualIncome || "Not provided"}
- Family Type: ${fd.familyType || "Not provided"}
- Family Values: ${fd.familyValues || "Not provided"}
- Diet: ${ls.diet || "Not provided"}
- Hobbies: ${ls.hobbies?.join(", ") || "Not provided"}

Write ONLY the About Me text. No headers, no labels, no quotation marks.`;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ text: text.trim() });
  } catch (error) {
    console.error("AI generation failed:", error);
    return NextResponse.json(
      { error: "AI generation failed. Please try again." },
      { status: 500 }
    );
  }
}

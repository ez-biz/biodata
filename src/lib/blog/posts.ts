export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "tips" | "templates" | "astrology" | "guides";
  author: string;
  date: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-perfect-marriage-biodata",
    title: "How to Write the Perfect Marriage Biodata",
    excerpt:
      "Learn the essential elements that make a marriage biodata stand out. From personal details to family information, we cover everything you need to create an impressive biodata.",
    content: `Creating the perfect marriage biodata is an art that balances tradition with personal expression. Your biodata is often the very first impression a prospective family gets of you, so it needs to be comprehensive yet concise, formal yet warm. In this guide, we walk you through every section and share insider tips that have helped thousands of families find the right match.

**Start with the basics done right.** Your biodata should open with your full name, date of birth, height, and complexion. Include your religion, caste, sub-caste, and gotra — these are non-negotiable for most Indian families. Make sure you mention your nakshatra, rashi, and manglik status if applicable. A common mistake is burying this information deep in the biodata; keep it front and center so families can quickly assess compatibility.

**Education and career matter — but so does presentation.** List your highest qualification first, followed by the institution name and year of completion. For your career, mention your current designation, company name, and city of work. If you earn well, you may choose to mention an approximate salary range, but this is entirely optional. Avoid boastful language; let the facts speak for themselves. Phrases like "well-settled" or "reputed MNC" add context without sounding arrogant.

**Family details build trust.** Dedicate a section to your father's name and occupation, mother's name and occupation, and details about siblings (married or unmarried, their professions). Mention your family type — joint or nuclear — and your native place. This section reassures the other family that yours is a stable, respectable household. Finally, end with a brief "About Me" paragraph that captures your personality, hobbies, and what you are looking for in a life partner. Keep it genuine and positive — authenticity always wins.`,
    category: "tips",
    author: "BiodataCraft Team",
    date: "2024-11-15",
    readTime: "6 min read",
  },
  {
    slug: "top-10-biodata-templates-2024",
    title: "Top 10 Biodata Templates for 2024",
    excerpt:
      "Discover the most popular and elegant biodata templates that Indian families are choosing in 2024. From traditional to modern designs, find your perfect match.",
    content: `The right template can transform a simple biodata into an elegant presentation that families love to share. In 2024, we are seeing a fascinating blend of traditional aesthetics and modern minimalism. Here are the top 10 templates that have become favourites among our users this year.

**Traditional templates remain king.** The "Traditional Classic" template with its deep maroon borders, paisley motifs, and gold accents continues to be the most downloaded template on BiodataCraft. It works beautifully for families who value cultural roots. Close behind is the "Elegant Royal" template that uses ornate mandala patterns and a rich burgundy-and-cream colour palette. These designs feel timeless and are perfect for printing on premium paper to hand-deliver during rishta meetings.

**Modern minimalist designs are surging.** The "Modern Minimal" template has seen a 300% increase in usage this year. With clean lines, generous white space, and a subtle geometric accent, it appeals to young professionals who want their biodata to feel fresh without abandoning tradition. Similarly, the "Contemporary Pastel" and "Soft Blush" templates use muted pinks, sage greens, and light golds — ideal for brides who want something feminine yet sophisticated.

**Specialty templates for every need.** Regional templates are a growing trend. Our "South Indian Classic" template includes space for star details, dosham status, and gotram in a layout familiar to Tamil, Telugu, and Kannada families. The "Punjabi Vibrant" template uses bright colours and bold typography that reflect North Indian exuberance. For NRI families, the "Global Desi" template uses a bilingual layout — English and Hindi side by side — making it easy to share across borders. Whatever your style, the key is choosing a template that represents your family's values while making the biodata easy to read and visually appealing.`,
    category: "templates",
    author: "BiodataCraft Team",
    date: "2024-10-28",
    readTime: "7 min read",
  },
  {
    slug: "understanding-kundli-matching-for-marriage",
    title: "Understanding Kundli Matching for Marriage",
    excerpt:
      "A comprehensive guide to kundli matching (horoscope matching) in Indian marriages. Learn about gun milan, doshas, and what the stars say about compatibility.",
    content: `Kundli matching, also known as horoscope matching or gun milan, has been an integral part of Indian marriages for centuries. While modern couples may debate its relevance, understanding the process helps you navigate conversations with families who consider it essential. Here is a clear, no-nonsense guide to how it works and what it means.

**The basics of Ashtakoot Milan.** The most widely used system is Ashtakoot Milan, which compares eight aspects (kootas) of two horoscopes. Each koota carries a certain number of points, totalling 36. A score of 18 or above is generally considered acceptable, while 24 and above is considered very good. The eight kootas are: Varna (spiritual compatibility), Vashya (dominance and mutual attraction), Tara (health and well-being), Yoni (sexual compatibility), Graha Maitri (mental compatibility), Gana (temperament), Bhakoot (love and family welfare), and Nadi (health and progeny). Each evaluates a different dimension of the relationship.

**Manglik dosha and other considerations.** One of the most discussed aspects is Manglik dosha — when Mars is placed in the 1st, 4th, 7th, 8th, or 12th house of the horoscope. Tradition holds that a Manglik person should ideally marry another Manglik for a harmonious life. However, many astrologers point out that the dosha weakens after the age of 28, and certain planetary combinations can cancel it altogether. Other doshas like Nadi dosha (which carries zero points in Ashtakoot and is considered serious) also have well-known exceptions and remedies.

**Balancing tradition with practicality.** It is worth noting that kundli matching is one factor among many. Emotional compatibility, shared values, financial stability, and mutual respect are equally — if not more — important. Many successful marriages have lower gun scores, and many high-scoring matches face challenges. If your family places importance on kundli matching, include your accurate birth details (date, time, and place) in your biodata. BiodataCraft templates have dedicated fields for rashi, nakshatra, and manglik status, making it easy for interested families to proceed with the matching process.`,
    category: "astrology",
    author: "BiodataCraft Team",
    date: "2024-10-10",
    readTime: "8 min read",
  },
  {
    slug: "marriage-biodata-format-hindi-complete-guide",
    title: "Marriage Biodata Format in Hindi - Complete Guide",
    excerpt:
      "Step-by-step guide to creating a marriage biodata in Hindi. Includes proper Hindi terminology, formatting tips, and common phrases used in Hindi biodatas.",
    content: `For a large number of Indian families, especially in Hindi-speaking states like UP, MP, Rajasthan, Bihar, and Jharkhand, a biodata written in Hindi feels more personal and culturally appropriate. Whether you are creating a biodata for yourself or helping a family member, this guide covers the correct format, terminology, and etiquette for a Hindi marriage biodata.

**Structure of a Hindi biodata.** A Hindi biodata typically begins with "|| श्री गणेशाय नमः ||" or "|| ॐ ||" at the top, followed by "बायोडाटा" or "परिचय पत्र" as the heading. The sections follow a standard order: व्यक्तिगत जानकारी (Personal Information), शैक्षिक योग्यता (Education), व्यावसायिक जानकारी (Career Details), पारिवारिक जानकारी (Family Details), कुंडली विवरण (Horoscope Details), and अपेक्षा (Partner Preferences). Each section should be clearly labelled with bold headings.

**Essential Hindi terminology.** Here are the key terms you will need: पूरा नाम (Full Name), जन्म तिथि (Date of Birth), जन्म समय (Birth Time), जन्म स्थान (Birth Place), ऊँचाई (Height), वर्ण (Complexion), धर्म (Religion), जाति (Caste), उपजाति (Sub-caste), गोत्र (Gotra), राशि (Rashi), नक्षत्र (Nakshatra), मांगलिक (Manglik Status), शिक्षा (Education), व्यवसाय (Occupation), वार्षिक आय (Annual Income), पिता का नाम (Father's Name), माता का नाम (Mother's Name), भाई-बहन (Siblings).

**Formatting tips for a polished look.** Use a clean Devanagari font like Noto Sans Devanagari or Mangal. Avoid mixing Hindi and English unnecessarily — if you write the biodata in Hindi, keep it consistently in Hindi. However, it is acceptable to write your company name, degree abbreviations (B.Tech, MBA), and city names in English. Keep sentences short and factual. For the "About Me" section (स्वयं के बारे में), write 3-4 lines describing your personality, interests, and values. BiodataCraft offers beautiful Hindi biodata templates with proper Devanagari typography that you can fill out and download as a print-ready PDF in minutes.`,
    category: "guides",
    author: "BiodataCraft Team",
    date: "2024-09-22",
    readTime: "7 min read",
  },
  {
    slug: "what-to-include-about-me-section",
    title: "What to Include in Your About Me Section",
    excerpt:
      "The About Me section can make or break your biodata. Learn how to write a compelling, genuine self-description that resonates with prospective families.",
    content: `The "About Me" section is the one place in your biodata where your personality truly shines through. While the rest of the document is structured data — name, education, family details — this paragraph is your chance to connect on a human level. Getting it right can be the difference between a family reaching out or moving on to the next biodata.

**Keep it genuine and specific.** Avoid generic statements like "I am a simple, down-to-earth person" — nearly every biodata says this, and it tells the reader nothing meaningful. Instead, be specific. Mention your actual hobbies: "I enjoy weekend treks in the Sahyadris" is far more memorable than "I like travelling." Talk about your values: "Family dinners are sacred in our household — we gather every Sunday without fail" paints a vivid picture. If you are religious, mention it naturally: "I start my mornings with a short prayer" shows your spiritual side without being preachy.

**Strike the right tone.** Your About Me should feel warm and approachable, not like a job application. Write in the first person ("I believe...", "I enjoy...") rather than third person ("He is a caring person"). Keep it between 80 and 150 words — long enough to convey your personality, short enough to hold attention. Avoid negative statements or demands ("I do not want..." or "The girl must be..."). Focus on what you bring to a partnership rather than listing requirements.

**What prospective families actually look for.** Based on feedback from thousands of users, families pay close attention to three things in the About Me section: your values (family-oriented, respectful, ambitious), your lifestyle (vegetarian, fitness-conscious, social), and your vision for married life (supportive partner, shared decision-making). A sentence or two about your career passion also helps. For example: "I am a software engineer who genuinely loves solving complex problems, and I am equally passionate about cooking elaborate weekend meals for friends and family." This tells the reader you are accomplished, grounded, and sociable — all in one line.`,
    category: "tips",
    author: "BiodataCraft Team",
    date: "2024-09-05",
    readTime: "5 min read",
  },
  {
    slug: "modern-vs-traditional-biodata-which-to-choose",
    title: "Modern vs Traditional Biodata - Which to Choose?",
    excerpt:
      "Confused between a modern and traditional biodata design? We break down the pros, cons, and best use cases for each style to help you decide.",
    content: `One of the most common dilemmas our users face is choosing between a modern and a traditional biodata design. Both have their strengths, and the right choice depends on your family's preferences, the communities you are sharing with, and your personal style. Let us break it down so you can make a confident decision.

**The case for traditional biodatas.** Traditional designs use rich colours like maroon, burgundy, and gold, often with paisley borders, mandala motifs, or floral frames. They convey respect for heritage and immediately feel familiar to older family members — who are often the primary decision-makers in the rishta process. If your family is conservative, if you are sharing the biodata with matrimonial pandits, or if the biodata will be printed and hand-delivered, a traditional template is almost always the safer and more appreciated choice.

**The case for modern biodatas.** Modern templates use clean layouts, plenty of white space, subtle colour accents, and contemporary typography. They work exceptionally well when shared digitally — via WhatsApp, email, or matrimonial websites — because they look sharp on screens. Young professionals, especially those in metros or abroad, often prefer modern designs because they feel the layout reflects their personality better. Modern templates also tend to be more photo-friendly, with larger image areas and creative photo placements.

**Our recommendation: know your audience.** The golden rule is to match your biodata style to your audience. If the biodata will primarily be seen by parents and relatives who value tradition, go traditional. If you are sharing it on apps or with a younger crowd, go modern. Many of our users actually create two versions — one traditional for family elders and one modern for digital sharing. BiodataCraft makes this effortless: fill in your details once, then switch between templates with a single click. Your data stays the same; only the design changes. This way, you never have to choose — you get the best of both worlds.`,
    category: "guides",
    author: "BiodataCraft Team",
    date: "2024-08-18",
    readTime: "6 min read",
  },
];

export const BLOG_CATEGORIES = [
  { value: "all", label: "All Posts" },
  { value: "tips", label: "Tips" },
  { value: "templates", label: "Templates" },
  { value: "astrology", label: "Astrology" },
  { value: "guides", label: "Guides" },
] as const;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  return BLOG_POSTS.filter(
    (post) => post.slug !== currentSlug && post.category === current.category
  )
    .concat(
      BLOG_POSTS.filter(
        (post) => post.slug !== currentSlug && post.category !== current.category
      )
    )
    .slice(0, limit);
}

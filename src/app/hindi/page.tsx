import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, FileText, Download, CheckCircle2, Star } from "lucide-react";
import { JsonLd, webApplicationJsonLd, faqPageJsonLd } from "@/components/seo/json-ld";

export function generateMetadata(): Metadata {
  return {
    title: "शादी का बायोडाटा बनाएं - BiodataCraft | मुफ्त बायोडाटा मेकर",
    description:
      "शादी के लिए सुंदर बायोडाटा मिनटों में बनाएं। 20+ शानदार टेम्पलेट, प्रिंट-रेडी PDF, WhatsApp शेयरिंग। 50,000+ भारतीय परिवारों का भरोसा।",
    keywords: [
      "शादी का बायोडाटा",
      "बायोडाटा फॉर मैरिज",
      "शादी बायोडाटा फॉर्मेट",
      "हिंदी बायोडाटा",
      "विवाह बायोडाटा",
      "बायोडाटा मेकर",
      "बायोडाटा टेम्पलेट",
      "shaadi ka biodata",
      "biodata for marriage in hindi",
      "marriage biodata format hindi",
      "शादी के लिए बायोडाटा कैसे बनाएं",
    ],
    alternates: {
      canonical: "/hindi",
      languages: {
        "hi-IN": "/hindi",
        "gu-IN": "/gujarati",
        "en-IN": "/",
      },
    },
    openGraph: {
      title: "शादी का बायोडाटा बनाएं - BiodataCraft",
      description:
        "भारत का सबसे लोकप्रिय बायोडाटा मेकर। सुंदर टेम्पलेट चुनें, जानकारी भरें, PDF डाउनलोड करें।",
      locale: "hi_IN",
      type: "website",
    },
  };
}

const STEPS = [
  {
    icon: Palette,
    title: "टेम्पलेट चुनें",
    description: "20+ सुंदर डिज़ाइन में से अपनी पसंद का टेम्पलेट चुनें। पारंपरिक, आधुनिक और शाही डिज़ाइन उपलब्ध हैं।",
  },
  {
    icon: FileText,
    title: "जानकारी भरें",
    description: "अपनी व्यक्तिगत जानकारी, परिवार की जानकारी, शिक्षा और करियर की जानकारी आसानी से भरें।",
  },
  {
    icon: Download,
    title: "PDF डाउनलोड करें",
    description: "प्रिंट-रेडी PDF तुरंत डाउनलोड करें। WhatsApp पर भी शेयर कर सकते हैं।",
  },
];

const TEMPLATES_PREVIEW = [
  {
    name: "पारंपरिक क्लासिक",
    nameEn: "Traditional Classic",
    gradient: "from-maroon-800 to-maroon-950",
    accent: "bg-gold-400/30",
    tag: "मुफ्त",
    description: "मराठी और हिंदी परिवारों के लिए पारंपरिक डिज़ाइन",
  },
  {
    name: "एलीगेंट रॉयल",
    nameEn: "Elegant Royal",
    gradient: "from-purple-900 to-indigo-950",
    accent: "bg-amber-300/30",
    tag: "मुफ्त",
    description: "शाही और भव्य डिज़ाइन",
  },
  {
    name: "राजस्थानी रॉयल",
    nameEn: "Rajasthani Royal",
    gradient: "from-orange-700 to-orange-950",
    accent: "bg-yellow-300/30",
    tag: "प्रीमियम",
    description: "राजस्थानी परंपराओं से प्रेरित डिज़ाइन",
  },
];

const TESTIMONIALS = [
  {
    name: "प्रिया शर्मा",
    location: "जयपुर, राजस्थान",
    text: "बहुत ही आसान और सुंदर बायोडाटा बना। मेरी शादी तय होने में इस बायोडाटा का बहुत योगदान रहा। सभी रिश्तेदारों ने तारीफ की।",
    rating: 5,
  },
  {
    name: "अमित पटेल",
    location: "लखनऊ, उत्तर प्रदेश",
    text: "मेरी बहन के लिए बायोडाटा बनाया। PDF क्वालिटी बहुत अच्छी थी और WhatsApp पर शेयर करना बहुत आसान था। धन्यवाद BiodataCraft!",
    rating: 5,
  },
  {
    name: "सुनीता गुप्ता",
    location: "भोपाल, मध्य प्रदेश",
    text: "पहले Word में बायोडाटा बनाती थी, लेकिन यहां इतने सुंदर टेम्पलेट मिले कि अब सबको यही recommend करती हूं।",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "क्या बायोडाटा बनाना मुफ्त है?",
    answer:
      "हां! BiodataCraft पर 3 सुंदर टेम्पलेट बिल्कुल मुफ्त हैं। आप बिना कोई अकाउंट बनाए भी बायोडाटा बना सकते हैं। प्रीमियम टेम्पलेट के लिए बहुत कम कीमत में अपग्रेड कर सकते हैं।",
  },
  {
    question: "क्या मैं हिंदी में बायोडाटा बना सकता/सकती हूं?",
    answer:
      "बिल्कुल! BiodataCraft हिंदी सहित 10+ भारतीय भाषाओं को सपोर्ट करता है। आप अपनी जानकारी हिंदी में भर सकते हैं और बायोडाटा हिंदी में ही बनेगा।",
  },
  {
    question: "शादी के बायोडाटा में क्या-क्या जानकारी होनी चाहिए?",
    answer:
      "एक अच्छे शादी के बायोडाटा में व्यक्तिगत जानकारी (नाम, जन्मतिथि, ऊंचाई), शिक्षा, नौकरी/व्यवसाय, परिवार की जानकारी (पिता-माता का नाम, भाई-बहन), गोत्र/राशि, और जीवनसाथी की अपेक्षा शामिल होनी चाहिए।",
  },
  {
    question: "बायोडाटा PDF कैसे डाउनलोड करें?",
    answer:
      "बायोडाटा बनाने के बाद, 'PDF डाउनलोड करें' बटन पर क्लिक करें। आपका बायोडाटा हाई-क्वालिटी PDF में तुरंत डाउनलोड हो जाएगा जो प्रिंट और WhatsApp दोनों के लिए तैयार होगा।",
  },
  {
    question: "क्या मेरी जानकारी सुरक्षित है?",
    answer:
      "बिल्कुल! आपकी सारी जानकारी पूरी तरह सुरक्षित है। हम किसी के साथ आपकी जानकारी शेयर नहीं करते। आप चाहें तो बिना अकाउंट बनाए भी बायोडाटा बना सकते हैं — जानकारी सिर्फ आपके ब्राउज़र में रहती है।",
  },
  {
    question: "बायोडाटा WhatsApp पर कैसे भेजें?",
    answer:
      "PDF डाउनलोड करने के बाद, आप इसे WhatsApp पर किसी भी कॉन्टैक्ट या ग्रुप में शेयर कर सकते हैं। जल्द ही हम सीधे WhatsApp शेयरिंग का फीचर भी ला रहे हैं।",
  },
];

export default function HindiLandingPage() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-devanagari)]">
      <JsonLd data={webApplicationJsonLd({ inLanguage: "hi" })} />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-paisley">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50/30 to-maroon-50/20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.04]">
          <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
            <circle cx="400" cy="100" r="200" stroke="currentColor" strokeWidth="1" className="text-gold-600" />
            <circle cx="400" cy="100" r="160" stroke="currentColor" strokeWidth="0.5" className="text-gold-600" />
            <circle cx="400" cy="100" r="120" stroke="currentColor" strokeWidth="0.5" className="text-maroon-600" />
          </svg>
        </div>

        <div className="container relative px-4 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
          <div className="animate-fade-up text-center mb-6">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700">
              भारत का सबसे लोकप्रिय बायोडाटा मेकर
            </span>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-up delay-1 font-display text-4xl font-bold tracking-tight text-maroon-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
              शादी का बायोडाटा,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">मिनटों में बनाएं</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gold-200/60 -rotate-1 rounded-sm" />
              </span>
            </h1>

            <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg text-foreground/60 md:text-xl leading-relaxed">
              सुंदर शादी का बायोडाटा बनाएं जो परिवारों को पसंद आए।
              14 शानदार टेम्पलेट में से चुनें, अपनी जानकारी भरें, और
              प्रिंट-रेडी PDF डाउनलोड करें — बिल्कुल मुफ्त।
            </p>

            <div className="animate-fade-up delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/create">
                <Button
                  size="lg"
                  className="gap-2.5 text-base px-8 py-6 bg-maroon-800 hover:bg-maroon-700 text-gold-100 rounded-full shadow-lg shadow-maroon-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-maroon-900/30 hover:-translate-y-0.5"
                >
                  अभी बायोडाटा बनाएं — मुफ्त
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-base px-8 py-6 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 hover:border-maroon-300 transition-all duration-300"
                >
                  <Palette className="h-4 w-4" />
                  टेम्पलेट देखें
                </Button>
              </Link>
            </div>

            <p className="animate-fade-up delay-4 mt-5 text-sm text-muted-foreground">
              कोई साइन-अप जरूरी नहीं। 3 मुफ्त टेम्पलेट शामिल हैं।
            </p>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-5 mx-auto mt-20 max-w-3xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "50,000+", label: "परिवारों ने भरोसा किया" },
                { value: "14", label: "सुंदर टेम्पलेट" },
                { value: "10+", label: "भारतीय भाषाएं" },
                { value: "4.8", label: "औसत रेटिंग", suffix: "★" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="font-display text-2xl font-bold text-maroon-800 md:text-3xl transition-colors group-hover:text-maroon-600">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-gold-500 ml-0.5">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-white" id="kaise-banaye">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              आसान प्रक्रिया
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              बायोडाटा कैसे बनाएं?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-lg">
              सिर्फ 3 आसान चरणों में अपना शादी का बायोडाटा तैयार करें
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative text-center p-8 rounded-2xl bg-gradient-to-b from-maroon-50/50 to-white border border-maroon-100/50 hover:shadow-lg hover:shadow-maroon-100/30 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-maroon-800 text-gold-200 flex items-center justify-center text-sm font-bold font-display">
                  {index + 1}
                </div>
                <div className="mt-4 mb-4 mx-auto h-12 w-12 rounded-xl bg-maroon-100/50 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-maroon-700" />
                </div>
                <h3 className="font-display text-xl font-bold text-maroon-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gold-50/30 to-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              लोकप्रिय टेम्पलेट
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              सुंदर बायोडाटा टेम्पलेट
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-lg">
              हर धर्म और संस्कृति के अनुसार बनाए गए खास डिज़ाइन
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEMPLATES_PREVIEW.map((template) => (
                <div
                  key={template.nameEn}
                  className="group rounded-2xl bg-white border border-maroon-100/50 overflow-hidden hover:shadow-xl hover:shadow-maroon-100/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`relative aspect-[210/297] bg-gradient-to-br ${template.gradient}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-start p-6">
                      <div className={`w-12 h-0.5 rounded-full ${template.accent} mb-3`} />
                      <div className="h-1.5 w-20 rounded bg-white/30 mb-1" />
                      <div className="h-1 w-14 rounded bg-white/15 mb-4" />
                      <div className="h-14 w-14 rounded-full border border-white/20 bg-white/10 mb-4" />
                      <div className="w-full space-y-1.5 px-2">
                        {[...Array(7)].map((_, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <div className="h-1 rounded bg-white/25 flex-shrink-0" style={{ width: "30%" }} />
                            <div className="h-1 rounded bg-white/12 flex-1" style={{ maxWidth: `${55 + (i * 7) % 30}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-gold-500/90 px-2.5 py-0.5 text-[10px] font-bold text-white tracking-wider">
                        {template.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-maroon-900">{template.name}</h3>
                    <p className="text-sm text-foreground/50 mt-1">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-full border-maroon-200 text-maroon-800 hover:bg-maroon-50 hover:border-maroon-300 px-8"
              >
                सभी टेम्पलेट देखें
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why BiodataCraft */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              हमें क्यों चुनें
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              BiodataCraft क्यों सबसे अच्छा है?
            </h2>
          </div>

          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            {[
              {
                title: "बिल्कुल मुफ्त शुरुआत",
                description: "3 सुंदर टेम्पलेट मुफ्त में उपलब्ध। कोई छिपी फीस नहीं, कोई अकाउंट बनाने की जरूरत नहीं।",
              },
              {
                title: "हिंदी में पूरा सपोर्ट",
                description: "हिंदी में जानकारी भरें, हिंदी में बायोडाटा बनाएं। देवनागरी लिपि में सुंदर रेंडरिंग।",
              },
              {
                title: "प्रिंट-रेडी PDF",
                description: "हाई-क्वालिटी PDF डाउनलोड करें जो प्रिंट और डिजिटल शेयरिंग दोनों के लिए एकदम सही है।",
              },
              {
                title: "WhatsApp पर शेयर करें",
                description: "बायोडाटा PDF WhatsApp, ईमेल या किसी भी मेसेंजर पर आसानी से शेयर करें।",
              },
              {
                title: "सभी धर्मों के लिए",
                description: "हिंदू, मुस्लिम, सिख, ईसाई, जैन — हर धर्म और समुदाय के लिए विशेष टेम्पलेट।",
              },
              {
                title: "100% डेटा सुरक्षित",
                description: "आपकी जानकारी सिर्फ आपके ब्राउज़र में रहती है। हम कभी आपकी जानकारी किसी से शेयर नहीं करते।",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-maroon-50/30 to-white border border-maroon-100/30 hover:border-maroon-200/50 transition-colors duration-300"
              >
                <CheckCircle2 className="h-6 w-6 text-maroon-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-maroon-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-maroon-50/30 to-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              ग्राहकों की राय
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              हमारे ग्राहक क्या कहते हैं
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-white border border-maroon-100/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-display font-bold text-maroon-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white" id="sawal-jawab">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              अक्सर पूछे जाने वाले सवाल
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              सवाल-जवाब
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-maroon-100/50 bg-white overflow-hidden hover:border-maroon-200/50 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-display font-semibold text-maroon-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-maroon-400 group-open:rotate-45 transition-transform duration-200 text-xl">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-foreground/60 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950">
        <div className="container px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4">
            अभी अपना बायोडाटा बनाएं
          </h2>
          <p className="mx-auto max-w-xl text-white/70 text-lg mb-10">
            हज़ारों परिवार BiodataCraft पर भरोसा करते हैं। आज ही अपना सुंदर शादी का बायोडाटा बनाएं — बिल्कुल मुफ्त!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create">
              <Button
                size="lg"
                className="gap-2.5 text-base px-8 py-6 bg-gold-500 hover:bg-gold-400 text-maroon-950 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 font-bold"
              >
                मुफ्त बायोडाटा बनाएं
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 text-base px-8 py-6 rounded-full border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              >
                <Palette className="h-4 w-4" />
                टेम्पलेट देखें
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, FileText, Download, CheckCircle2, Star } from "lucide-react";
import { JsonLd, webApplicationJsonLd, faqPageJsonLd } from "@/components/seo/json-ld";

export function generateMetadata(): Metadata {
  return {
    title: "લગ્ન બાયોડેટા બનાવો - BiodataCraft | મફત બાયોડેટા મેકર",
    description:
      "લગ્ન માટે સુંદર બાયોડેટા મિનિટોમાં બનાવો। 20+ શાનદાર ટેમ્પલેટ, પ્રિન્ટ-રેડી PDF, WhatsApp શેરિંગ। 50,000+ ભારતીય પરિવારોનો ભરોસો.",
    keywords: [
      "લગ્ન બાયોડેટા",
      "ગુજરાતી બાયોડેટા",
      "લગ્ન બાયોડેટા ફોર્મેટ",
      "બાયોડેટા મેકર",
      "બાયોડેટા ટેમ્પલેટ",
      "gujarati biodata",
      "lagna biodata",
      "marriage biodata gujarati",
      "gujarati biodata format",
      "gujarati marriage biodata maker",
      "લગ્ન માટે બાયોડેટા કેવી રીતે બનાવવો",
    ],
    alternates: {
      canonical: "/gujarati",
      languages: {
        "gu-IN": "/gujarati",
        "hi-IN": "/hindi",
        "en-IN": "/",
      },
    },
    openGraph: {
      title: "લગ્ન બાયોડેટા બનાવો - BiodataCraft",
      description:
        "ભારતનું સૌથી લોકપ્રિય બાયોડેટા મેકર। સુંદર ટેમ્પલેટ પસંદ કરો, માહિતી ભરો, PDF ડાઉનલોડ કરો.",
      locale: "gu_IN",
      type: "website",
    },
  };
}

const STEPS = [
  {
    icon: Palette,
    title: "ટેમ્પલેટ પસંદ કરો",
    description: "20+ સુંદર ડિઝાઈનમાંથી તમારી પસંદનું ટેમ્પલેટ પસંદ કરો. પરંપરાગત, આધુનિક અને શાહી ડિઝાઈન ઉપલબ્ધ છે.",
  },
  {
    icon: FileText,
    title: "માહિતી ભરો",
    description: "તમારી વ્યક્તિગત માહિતી, કુટુંબની માહિતી, શિક્ષણ અને કારકિર્દીની માહિતી સરળતાથી ભરો.",
  },
  {
    icon: Download,
    title: "PDF ડાઉનલોડ કરો",
    description: "પ્રિન્ટ-રેડી PDF તરત ડાઉનલોડ કરો. WhatsApp પર પણ શેર કરી શકો છો.",
  },
];

const TEMPLATES_PREVIEW = [
  {
    name: "ગુજરાતી પત્રિકા",
    nameEn: "Gujarati Patrika",
    gradient: "from-red-700 to-red-950",
    accent: "bg-yellow-400/30",
    tag: "પ્રીમિયમ",
    description: "બાંધણી ડિઝાઈનથી પ્રેરિત પરંપરાગત ગુજરાતી પત્રિકા",
  },
  {
    name: "પરંપરાગત ક્લાસિક",
    nameEn: "Traditional Classic",
    gradient: "from-maroon-800 to-maroon-950",
    accent: "bg-gold-400/30",
    tag: "મફત",
    description: "હિંદુ અને જૈન પરિવારો માટે ક્લાસિક ડિઝાઈન",
  },
  {
    name: "એલિગન્ટ રોયલ",
    nameEn: "Elegant Royal",
    gradient: "from-purple-900 to-indigo-950",
    accent: "bg-amber-300/30",
    tag: "મફત",
    description: "શાહી અને ભવ્ય ડિઝાઈન",
  },
];

const TESTIMONIALS = [
  {
    name: "દિવ્યા પટેલ",
    location: "અમદાવાદ, ગુજરાત",
    text: "ખૂબ જ સરસ બાયોડેટા બન્યું! ગુજરાતી પત્રિકા ટેમ્પલેટ ખરેખર અમારી સંસ્કૃતિને ન્યાય આપે છે. પરિવારમાં બધાને ખૂબ ગમ્યું.",
    rating: 5,
  },
  {
    name: "રાજેશ શાહ",
    location: "સુરત, ગુજરાત",
    text: "મારી દીકરી માટે બાયોડેટા બનાવ્યું. PDF ક્વોલિટી ઘણી સારી હતી. WhatsApp પર મોકલવું ખૂબ સરળ હતું. BiodataCraft નો આભાર!",
    rating: 5,
  },
  {
    name: "મીના જોષી",
    location: "રાજકોટ, ગુજરાત",
    text: "પહેલાં Word માં બાયોડેટા બનાવતી હતી, પણ અહીં એટલા સુંદર ટેમ્પલેટ મળ્યા કે હવે બધાને આ જ recommend કરું છું.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "શું બાયોડેટા બનાવવું મફત છે?",
    answer:
      "હા! BiodataCraft પર 3 સુંદર ટેમ્પલેટ સંપૂર્ણપણે મફત છે. તમે કોઈ એકાઉન્ટ બનાવ્યા વિના પણ બાયોડેટા બનાવી શકો છો. પ્રીમિયમ ટેમ્પલેટ માટે ખૂબ ઓછી કિંમતે અપગ્રેડ કરી શકો છો.",
  },
  {
    question: "શું હું ગુજરાતીમાં બાયોડેટા બનાવી શકું?",
    answer:
      "બિલકુલ! BiodataCraft ગુજરાતી સહિત 10+ ભારતીય ભાષાઓને સપોર્ટ કરે છે. તમે તમારી માહિતી ગુજરાતીમાં ભરી શકો છો અને બાયોડેટા ગુજરાતીમાં જ બનશે.",
  },
  {
    question: "લગ્ન બાયોડેટામાં શું-શું માહિતી હોવી જોઈએ?",
    answer:
      "એક સારા લગ્ન બાયોડેટામાં વ્યક્તિગત માહિતી (નામ, જન્મ તારીખ, ઊંચાઈ), શિક્ષણ, નોકરી/વ્યવસાય, કુટુંબની માહિતી (પિતા-માતાનું નામ, ભાઈ-બહેન), ગોત્ર/રાશી, અને જીવનસાથીની અપેક્ષા શામેલ હોવી જોઈએ.",
  },
  {
    question: "બાયોડેટા PDF કેવી રીતે ડાઉનલોડ કરવું?",
    answer:
      "બાયોડેટા બનાવ્યા પછી, 'PDF ડાઉનલોડ કરો' બટન પર ક્લિક કરો. તમારું બાયોડેટા હાઈ-ક્વોલિટી PDF માં તરત ડાઉનલોડ થઈ જશે જે પ્રિન્ટ અને WhatsApp બંને માટે તૈયાર હશે.",
  },
  {
    question: "શું ગુજરાતી પત્રિકા ટેમ્પલેટ ઉપલબ્ધ છે?",
    answer:
      "હા! અમારું ગુજરાતી પત્રિકા ટેમ્પલેટ ખાસ ગુજરાતી પરિવારો માટે બનાવવામાં આવ્યું છે. તેમાં બાંધણી-પ્રેરિત ડિઝાઈન, લાલ અને સોનેરી રંગો, અને પરંપરાગત ગુજરાતી સ્ટાઈલ છે.",
  },
  {
    question: "શું મારી માહિતી સુરક્ષિત છે?",
    answer:
      "બિલકુલ! તમારી બધી માહિતી સંપૂર્ણપણે સુરક્ષિત છે. અમે કોઈની સાથે તમારી માહિતી શેર કરતા નથી. તમે ઈચ્છો તો એકાઉન્ટ બનાવ્યા વિના પણ બાયોડેટા બનાવી શકો — માહિતી ફક્ત તમારા બ્રાઉઝરમાં રહે છે.",
  },
  {
    question: "બાયોડેટા WhatsApp પર કેવી રીતે મોકલવું?",
    answer:
      "PDF ડાઉનલોડ કર્યા પછી, તમે તેને WhatsApp પર કોઈપણ કોન્ટેક્ટ કે ગ્રૂપમાં શેર કરી શકો છો. ટૂંક સમયમાં અમે સીધી WhatsApp શેરિંગનું ફીચર પણ લાવી રહ્યા છીએ.",
  },
];

export default function GujaratiLandingPage() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-gujarati)]">
      <JsonLd data={webApplicationJsonLd({ inLanguage: "gu" })} />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-paisley">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50/30 to-red-50/20" />
        {/* Bandhani-inspired dots pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            {[...Array(8)].map((_, row) =>
              [...Array(8)].map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={25 + col * 50}
                  cy={25 + row * 50}
                  r="4"
                  fill="currentColor"
                  className="text-red-600"
                />
              ))
            )}
          </svg>
        </div>

        <div className="container relative px-4 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
          <div className="animate-fade-up text-center mb-6">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700">
              ભારતનું સૌથી લોકપ્રિય બાયોડેટા મેકર
            </span>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-up delay-1 font-display text-4xl font-bold tracking-tight text-maroon-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
              લગ્ન બાયોડેટા,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">મિનિટોમાં બનાવો</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gold-200/60 -rotate-1 rounded-sm" />
              </span>
            </h1>

            <p className="animate-fade-up delay-2 mx-auto mt-6 max-w-2xl text-lg text-foreground/60 md:text-xl leading-relaxed">
              સુંદર લગ્ન બાયોડેટા બનાવો જે પરિવારોને ગમે.
              14 શાનદાર ટેમ્પલેટમાંથી પસંદ કરો, તમારી માહિતી ભરો, અને
              પ્રિન્ટ-રેડી PDF ડાઉનલોડ કરો — સંપૂર્ણ મફત.
            </p>

            <div className="animate-fade-up delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/create">
                <Button
                  size="lg"
                  className="gap-2.5 text-base px-8 py-6 bg-red-700 hover:bg-red-600 text-gold-100 rounded-full shadow-lg shadow-red-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-0.5"
                >
                  અત્યારે બાયોડેટા બનાવો — મફત
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-base px-8 py-6 rounded-full border-red-200 text-red-800 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                >
                  <Palette className="h-4 w-4" />
                  ટેમ્પલેટ જુઓ
                </Button>
              </Link>
            </div>

            <p className="animate-fade-up delay-4 mt-5 text-sm text-muted-foreground">
              કોઈ સાઈન-અપ જરૂરી નથી. 3 મફત ટેમ્પલેટ સામેલ છે.
            </p>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-5 mx-auto mt-20 max-w-3xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: "50,000+", label: "પરિવારોનો ભરોસો" },
                { value: "14", label: "સુંદર ટેમ્પલેટ" },
                { value: "10+", label: "ભારતીય ભાષાઓ" },
                { value: "4.8", label: "સરેરાશ રેટિંગ", suffix: "★" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="font-display text-2xl font-bold text-red-800 md:text-3xl transition-colors group-hover:text-red-600">
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
      <section className="py-20 md:py-28 bg-white" id="kevi-rite-banavo">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              સરળ પ્રક્રિયા
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              બાયોડેટા કેવી રીતે બનાવવું?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-lg">
              ફક્ત 3 સરળ પગલાંમાં તમારું લગ્ન બાયોડેટા તૈયાર કરો
            </p>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div
                key={step.title}
                className="relative text-center p-8 rounded-2xl bg-gradient-to-b from-red-50/50 to-white border border-red-100/50 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-red-700 text-gold-200 flex items-center justify-center text-sm font-bold font-display">
                  {index + 1}
                </div>
                <div className="mt-4 mb-4 mx-auto h-12 w-12 rounded-xl bg-red-100/50 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-red-700" />
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
              લોકપ્રિય ટેમ્પલેટ
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              સુંદર બાયોડેટા ટેમ્પલેટ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/60 text-lg">
              દરેક ધર્મ અને સંસ્કૃતિ અનુસાર બનાવેલા ખાસ ડિઝાઈન
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEMPLATES_PREVIEW.map((template) => (
                <div
                  key={template.nameEn}
                  className="group rounded-2xl bg-white border border-red-100/50 overflow-hidden hover:shadow-xl hover:shadow-red-100/30 transition-all duration-300 hover:-translate-y-1"
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
                className="gap-2 rounded-full border-red-200 text-red-800 hover:bg-red-50 hover:border-red-300 px-8"
              >
                બધા ટેમ્પલેટ જુઓ
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
              અમને કેમ પસંદ કરો
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              BiodataCraft કેમ સૌથી સારું છે?
            </h2>
          </div>

          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
            {[
              {
                title: "સંપૂર્ણ મફત શરૂઆત",
                description: "3 સુંદર ટેમ્પલેટ મફતમાં ઉપલબ્ધ. કોઈ છુપી ફી નથી, કોઈ એકાઉન્ટ બનાવવાની જરૂર નથી.",
              },
              {
                title: "ગુજરાતીમાં પૂરો સપોર્ટ",
                description: "ગુજરાતીમાં માહિતી ભરો, ગુજરાતીમાં બાયોડેટા બનાવો. ગુજરાતી લિપિમાં સુંદર રેન્ડરિંગ.",
              },
              {
                title: "પ્રિન્ટ-રેડી PDF",
                description: "હાઈ-ક્વોલિટી PDF ડાઉનલોડ કરો જે પ્રિન્ટ અને ડિજિટલ શેરિંગ બંને માટે એકદમ યોગ્ય છે.",
              },
              {
                title: "WhatsApp પર શેર કરો",
                description: "બાયોડેટા PDF WhatsApp, ઈમેલ કે કોઈપણ મેસેન્જર પર સરળતાથી શેર કરો.",
              },
              {
                title: "બધા ધર્મો માટે",
                description: "હિંદુ, મુસ્લિમ, શીખ, ક્રિસ્ટિયન, જૈન — દરેક ધર્મ અને સમુદાય માટે ખાસ ટેમ્પલેટ.",
              },
              {
                title: "100% ડેટા સુરક્ષિત",
                description: "તમારી માહિતી ફક્ત તમારા બ્રાઉઝરમાં રહે છે. અમે ક્યારેય તમારી માહિતી કોઈની સાથે શેર કરતા નથી.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-red-50/30 to-white border border-red-100/30 hover:border-red-200/50 transition-colors duration-300"
              >
                <CheckCircle2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-red-50/30 to-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              ગ્રાહકોના અભિપ્રાય
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              અમારા ગ્રાહકો શું કહે છે
            </h2>
          </div>

          <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-white border border-red-100/50 shadow-sm hover:shadow-md transition-shadow duration-300"
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
      <section className="py-20 md:py-28 bg-white" id="prashno">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="ornament-divider inline-flex text-xs font-medium tracking-[0.15em] uppercase text-gold-700 mb-4">
              વારંવાર પૂછાતા પ્રશ્નો
            </span>
            <h2 className="font-display text-3xl font-bold text-maroon-900 md:text-4xl lg:text-5xl">
              પ્રશ્નો અને જવાબો
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-red-100/50 bg-white overflow-hidden hover:border-red-200/50 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-display font-semibold text-maroon-900 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex-shrink-0 text-red-400 group-open:rotate-45 transition-transform duration-200 text-xl">
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-red-900 via-red-800 to-red-950">
        <div className="container px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl mb-4">
            અત્યારે તમારું બાયોડેટા બનાવો
          </h2>
          <p className="mx-auto max-w-xl text-white/70 text-lg mb-10">
            હજારો પરિવારો BiodataCraft પર ભરોસો કરે છે. આજે જ તમારું સુંદર લગ્ન બાયોડેટા બનાવો — સંપૂર્ણ મફત!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/create">
              <Button
                size="lg"
                className="gap-2.5 text-base px-8 py-6 bg-gold-500 hover:bg-gold-400 text-red-950 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 font-bold"
              >
                મફત બાયોડેટા બનાવો
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
                ટેમ્પલેટ જુઓ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

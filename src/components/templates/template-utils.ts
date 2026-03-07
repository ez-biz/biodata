import { BiodataFormData, ColorScheme, CustomColorOverrides, FontFamilyOption, FontSizeOption } from "@/lib/types/biodata";
import { HEIGHT_OPTIONS } from "@/lib/constants/indian-data";
import { getFontOption, getFontSizeScale } from "@/lib/constants/font-options";
import { getTemplateById } from "@/lib/templates/template-config";

import type { Locale } from "@/lib/i18n";

const EN_LABELS: Record<string, string> = {
  name: "Name",
  dateOfBirth: "Date of Birth",
  height: "Height",
  weight: "Weight",
  bloodGroup: "Blood Group",
  complexion: "Complexion",
  bodyType: "Body Type",
  religion: "Religion",
  caste: "Caste",
  subCaste: "Sub-caste",
  gotra: "Gotra",
  manglik: "Manglik",
  motherTongue: "Mother Tongue",
  location: "Location",
  nationality: "Nationality",
  citizenship: "Citizenship",
  education: "Education",
  details: "Details",
  qualifications: "Qualifications",
  occupation: "Occupation",
  jobTitle: "Job Title",
  company: "Company",
  workLocation: "Work Location",
  annualIncome: "Annual Income",
  father: "Father",
  mother: "Mother",
  brothers: "Brothers",
  sisters: "Sisters",
  familyType: "Family Type",
  familyStatus: "Family Status",
  familyValues: "Family Values",
  familyIncome: "Family Income",
  nativePlace: "Native Place",
  contact: "Contact",
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
  address: "Address",
  rashi: "Rashi",
  nakshatra: "Nakshatra",
  charan: "Charan",
  gan: "Gan",
  nadi: "Nadi",
  yrs: "yrs",
  married: "married",
  personalDetails: "Personal Details",
  educationCareer: "Education & Career",
  familyDetails: "Family Details",
  contactTitle: "Contact",
  horoscope: "Horoscope",
  about: "About",
  interests: "Interests",
  partnerPreferences: "Partner Preferences",
  aboutLifestyle: "About & Lifestyle",
};

const LABELS: Record<Locale, Record<string, string>> = {
  en: EN_LABELS,
  hi: {
    name: "नाम",
    dateOfBirth: "जन्म तिथि",
    height: "ऊंचाई",
    weight: "वजन",
    bloodGroup: "रक्त समूह",
    complexion: "रंग",
    bodyType: "शारीरिक बनावट",
    religion: "धर्म",
    caste: "जाति",
    subCaste: "उपजाति",
    gotra: "गोत्र",
    manglik: "मांगलिक",
    motherTongue: "मातृभाषा",
    location: "स्थान",
    nationality: "राष्ट्रीयता",
    citizenship: "नागरिकता",
    education: "शिक्षा",
    details: "विवरण",
    qualifications: "अतिरिक्त योग्यता",
    occupation: "व्यवसाय",
    jobTitle: "पद",
    company: "कंपनी",
    workLocation: "कार्यस्थल",
    annualIncome: "वार्षिक आय",
    father: "पिता",
    mother: "माता",
    brothers: "भाई",
    sisters: "बहन",
    familyType: "परिवार का प्रकार",
    familyStatus: "पारिवारिक स्थिति",
    familyValues: "पारिवारिक मूल्य",
    familyIncome: "पारिवारिक आय",
    nativePlace: "मूल निवास",
    contact: "संपर्क",
    phone: "फोन",
    email: "ईमेल",
    whatsapp: "व्हाट्सएप",
    address: "पता",
    rashi: "राशि",
    nakshatra: "नक्षत्र",
    charan: "चरण",
    gan: "गण",
    nadi: "नाड़ी",
    yrs: "वर्ष",
    married: "विवाहित",
    personalDetails: "व्यक्तिगत विवरण",
    educationCareer: "शिक्षा एवं करियर",
    familyDetails: "पारिवारिक विवरण",
    contactTitle: "संपर्क",
    horoscope: "कुंडली",
    about: "परिचय",
    interests: "रुचियां",
    partnerPreferences: "वर/वधू की पसंद",
    aboutLifestyle: "परिचय एवं जीवनशैली",
  },
  mr: {
    name: "नाव",
    dateOfBirth: "जन्मतारीख",
    height: "उंची",
    weight: "वजन",
    bloodGroup: "रक्तगट",
    complexion: "वर्ण",
    bodyType: "शारीरिक बांधा",
    religion: "धर्म",
    caste: "जात",
    subCaste: "उपजात",
    gotra: "गोत्र",
    manglik: "मांगलिक",
    motherTongue: "मातृभाषा",
    location: "स्थान",
    nationality: "राष्ट्रीयत्व",
    citizenship: "नागरिकत्व",
    education: "शिक्षण",
    details: "तपशील",
    qualifications: "अतिरिक्त पात्रता",
    occupation: "व्यवसाय",
    jobTitle: "पदनाम",
    company: "कंपनी",
    workLocation: "कार्यस्थळ",
    annualIncome: "वार्षिक उत्पन्न",
    father: "वडील",
    mother: "आई",
    brothers: "भाऊ",
    sisters: "बहीण",
    familyType: "कुटुंबाचा प्रकार",
    familyStatus: "कौटुंबिक स्थिती",
    familyValues: "कौटुंबिक मूल्ये",
    familyIncome: "कौटुंबिक उत्पन्न",
    nativePlace: "मूळ गाव",
    contact: "संपर्क",
    phone: "फोन",
    email: "ईमेल",
    whatsapp: "व्हॉट्सअॅप",
    address: "पत्ता",
    rashi: "राशी",
    nakshatra: "नक्षत्र",
    charan: "चरण",
    gan: "गण",
    nadi: "नाडी",
    yrs: "वर्षे",
    married: "विवाहित",
    personalDetails: "वैयक्तिक माहिती",
    educationCareer: "शिक्षण आणि करिअर",
    familyDetails: "कौटुंबिक माहिती",
    contactTitle: "संपर्क",
    horoscope: "कुंडली",
    about: "परिचय",
    interests: "आवडी",
    partnerPreferences: "वर/वधूची पसंती",
    aboutLifestyle: "परिचय आणि जीवनशैली",
  },
  gu: {
    name: "નામ",
    dateOfBirth: "જન્મ તારીખ",
    height: "ઊંચાઈ",
    weight: "વજન",
    bloodGroup: "બ્લડ ગ્રુપ",
    complexion: "રંગ",
    bodyType: "શારીરિક બાંધો",
    religion: "ધર્મ",
    caste: "જાતિ",
    subCaste: "પેટા જાતિ",
    gotra: "ગોત્ર",
    manglik: "માંગલિક",
    motherTongue: "માતૃભાષા",
    location: "સ્થાન",
    nationality: "રાષ્ટ્રીયતા",
    citizenship: "નાગરિકતા",
    education: "શિક્ષણ",
    details: "વિગતો",
    qualifications: "વધારાની લાયકાત",
    occupation: "વ્યવસાય",
    jobTitle: "હોદ્દો",
    company: "કંપની",
    workLocation: "કાર્યસ્થળ",
    annualIncome: "વાર્ષિક આવક",
    father: "પિતા",
    mother: "માતા",
    brothers: "ભાઈ",
    sisters: "બહેન",
    familyType: "કુટુંબનો પ્રકાર",
    familyStatus: "કૌટુંબિક સ્થિતિ",
    familyValues: "કૌટુંબિક મૂલ્યો",
    familyIncome: "કૌટુંબિક આવક",
    nativePlace: "વતન",
    contact: "સંપર્ક",
    phone: "ફોન",
    email: "ઈમેલ",
    whatsapp: "વૉટ્સએપ",
    address: "સરનામું",
    rashi: "રાશિ",
    nakshatra: "નક્ષત્ર",
    charan: "ચરણ",
    gan: "ગણ",
    nadi: "નાડી",
    yrs: "વર્ષ",
    married: "પરણિત",
    personalDetails: "વ્યક્તિગત માહિતી",
    educationCareer: "શિક્ષણ અને કારકિર્દી",
    familyDetails: "કૌટુંબિક માહિતી",
    contactTitle: "સંપર્ક",
    horoscope: "કુંડળી",
    about: "પરિચય",
    interests: "રુચિઓ",
    partnerPreferences: "જીવનસાથીની પસંદગી",
    aboutLifestyle: "પરિચય અને જીવનશૈલી",
  },
  ta: {
    name: "பெயர்",
    dateOfBirth: "பிறந்த தேதி",
    height: "உயரம்",
    weight: "எடை",
    bloodGroup: "இரத்த வகை",
    complexion: "நிறம்",
    bodyType: "உடல் வாகு",
    religion: "மதம்",
    caste: "சாதி",
    subCaste: "உட்பிரிவு",
    gotra: "கோத்திரம்",
    manglik: "செவ்வாய் தோஷம்",
    motherTongue: "தாய்மொழி",
    location: "இடம்",
    nationality: "தேசியம்",
    citizenship: "குடியுரிமை",
    education: "கல்வி",
    details: "விவரங்கள்",
    qualifications: "கூடுதல் தகுதிகள்",
    occupation: "தொழில்",
    jobTitle: "பதவி",
    company: "நிறுவனம்",
    workLocation: "பணியிடம்",
    annualIncome: "ஆண்டு வருமானம்",
    father: "தந்தை",
    mother: "தாய்",
    brothers: "சகோதரர்கள்",
    sisters: "சகோதரிகள்",
    familyType: "குடும்ப வகை",
    familyStatus: "குடும்ப நிலை",
    familyValues: "குடும்ப மதிப்புகள்",
    familyIncome: "குடும்ப வருமானம்",
    nativePlace: "சொந்த ஊர்",
    contact: "தொடர்பு",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    whatsapp: "வாட்ஸ்அப்",
    address: "முகவரி",
    rashi: "ராசி",
    nakshatra: "நட்சத்திரம்",
    charan: "பாதம்",
    gan: "கணம்",
    nadi: "நாடி",
    yrs: "வயது",
    married: "திருமணமானவர்",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    educationCareer: "கல்வி & தொழில்",
    familyDetails: "குடும்ப விவரங்கள்",
    contactTitle: "தொடர்பு",
    horoscope: "ஜாதகம்",
    about: "பற்றி",
    interests: "ஆர்வங்கள்",
    partnerPreferences: "வாழ்க்கைத்துணை விருப்பம்",
    aboutLifestyle: "பற்றி & வாழ்க்கைமுறை",
  },
  te: {
    name: "పేరు",
    dateOfBirth: "పుట్టిన తేదీ",
    height: "ఎత్తు",
    weight: "బరువు",
    bloodGroup: "రక్త వర్గం",
    complexion: "రంగు",
    bodyType: "శరీర నిర్మాణం",
    religion: "మతం",
    caste: "కులం",
    subCaste: "ఉపకులం",
    gotra: "గోత్రం",
    manglik: "మాంగ్లిక్",
    motherTongue: "మాతృభాష",
    location: "ప్రదేశం",
    nationality: "జాతీయత",
    citizenship: "పౌరసత్వం",
    education: "విద్య",
    details: "వివరాలు",
    qualifications: "అదనపు అర్హతలు",
    occupation: "వృత్తి",
    jobTitle: "హోదా",
    company: "కంపెనీ",
    workLocation: "పని ప్రదేశం",
    annualIncome: "వార్షిక ఆదాయం",
    father: "తండ్రి",
    mother: "తల్లి",
    brothers: "సోదరులు",
    sisters: "సోదరీమణులు",
    familyType: "కుటుంబ రకం",
    familyStatus: "కుటుంబ స్థితి",
    familyValues: "కుటుంబ విలువలు",
    familyIncome: "కుటుంబ ఆదాయం",
    nativePlace: "స్వస్థలం",
    contact: "సంప్రదింపు",
    phone: "ఫోన్",
    email: "ఈమెయిల్",
    whatsapp: "వాట్సాప్",
    address: "చిరునామా",
    rashi: "రాశి",
    nakshatra: "నక్షత్రం",
    charan: "చరణం",
    gan: "గణం",
    nadi: "నాడి",
    yrs: "సంవత్సరాలు",
    married: "వివాహితులు",
    personalDetails: "వ్యక్తిగత వివరాలు",
    educationCareer: "విద్య & వృత్తి",
    familyDetails: "కుటుంబ వివరాలు",
    contactTitle: "సంప్రదింపు",
    horoscope: "జాతకం",
    about: "పరిచయం",
    interests: "ఆసక్తులు",
    partnerPreferences: "జీవిత భాగస్వామి ప్రాధాన్యతలు",
    aboutLifestyle: "పరిచయం & జీవనశైలి",
  },
  bn: {
    name: "নাম",
    dateOfBirth: "জন্ম তারিখ",
    height: "উচ্চতা",
    weight: "ওজন",
    bloodGroup: "রক্তের গ্রুপ",
    complexion: "গাত্রবর্ণ",
    bodyType: "শারীরিক গঠন",
    religion: "ধর্ম",
    caste: "জাতি",
    subCaste: "উপজাতি",
    gotra: "গোত্র",
    manglik: "মাঙ্গলিক",
    motherTongue: "মাতৃভাষা",
    location: "অবস্থান",
    nationality: "জাতীয়তা",
    citizenship: "নাগরিকত্ব",
    education: "শিক্ষা",
    details: "বিবরণ",
    qualifications: "অতিরিক্ত যোগ্যতা",
    occupation: "পেশা",
    jobTitle: "পদবি",
    company: "কোম্পানি",
    workLocation: "কর্মস্থল",
    annualIncome: "বার্ষিক আয়",
    father: "পিতা",
    mother: "মাতা",
    brothers: "ভাই",
    sisters: "বোন",
    familyType: "পরিবারের ধরন",
    familyStatus: "পারিবারিক অবস্থা",
    familyValues: "পারিবারিক মূল্যবোধ",
    familyIncome: "পারিবারিক আয়",
    nativePlace: "নিজ গ্রাম",
    contact: "যোগাযোগ",
    phone: "ফোন",
    email: "ইমেইল",
    whatsapp: "হোয়াটসঅ্যাপ",
    address: "ঠিকানা",
    rashi: "রাশি",
    nakshatra: "নক্ষত্র",
    charan: "চরণ",
    gan: "গণ",
    nadi: "নাড়ি",
    yrs: "বছর",
    married: "বিবাহিত",
    personalDetails: "ব্যক্তিগত তথ্য",
    educationCareer: "শিক্ষা ও পেশা",
    familyDetails: "পারিবারিক তথ্য",
    contactTitle: "যোগাযোগ",
    horoscope: "জন্মকুণ্ডলী",
    about: "পরিচয়",
    interests: "আগ্রহ",
    partnerPreferences: "জীবনসঙ্গীর পছন্দ",
    aboutLifestyle: "পরিচয় ও জীবনধারা",
  },
};

export function getLabel(key: string, locale: Locale = "en"): string {
  return LABELS[locale]?.[key] || LABELS.en[key] || key;
}

export function getAge(dob: string): number | null {
  if (!dob) return null;
  const age = Math.floor(
    (Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );
  return age > 0 && age < 120 ? age : null;
}

export function formatHeight(value: string): string {
  const opt = HEIGHT_OPTIONS.find((h) => h.value === value);
  return opt?.label || value;
}

const LOCALE_CODES: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  gu: "gu-IN",
  ta: "ta-IN",
  te: "te-IN",
  bn: "bn-IN",
};

export function formatDate(dateStr: string, locale: Locale = "en"): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString(
      LOCALE_CODES[locale] || "en-IN",
      { day: "numeric", month: "long", year: "numeric" }
    );
  } catch {
    return dateStr;
  }
}

export interface FieldRow {
  label: string;
  value: string | undefined | null;
}

export function getPersonalFields(data: BiodataFormData, locale: Locale = "en"): FieldRow[] {
  const pd = data.personalDetails;
  const age = getAge(pd.dateOfBirth);
  const l = (k: string) => getLabel(k, locale);
  const rows: FieldRow[] = [
    { label: l("name"), value: pd.fullName },
    {
      label: l("dateOfBirth"),
      value: pd.dateOfBirth
        ? `${formatDate(pd.dateOfBirth, locale)}${age ? ` (${age} ${l("yrs")})` : ""}`
        : undefined,
    },
    { label: l("height"), value: pd.height ? formatHeight(pd.height) : undefined },
    { label: l("weight"), value: pd.weight ? `${pd.weight} kg` : undefined },
    { label: l("bloodGroup"), value: pd.bloodGroup },
    { label: l("complexion"), value: pd.complexion },
    { label: l("bodyType"), value: pd.bodyType },
    { label: l("religion"), value: pd.religion },
    { label: l("caste"), value: pd.caste },
    { label: l("subCaste"), value: pd.subCaste },
    { label: l("gotra"), value: pd.gotra },
    { label: l("manglik"), value: pd.manglikStatus },
    { label: l("motherTongue"), value: pd.motherTongue },
    { label: l("location"), value: [pd.currentCity, pd.currentState].filter(Boolean).join(", ") },
    { label: l("nationality"), value: pd.nationality },
    { label: l("citizenship"), value: pd.citizenshipStatus },
  ];
  return rows.filter((r) => r.value);
}

export function getEducationFields(data: BiodataFormData, locale: Locale = "en"): FieldRow[] {
  const ec = data.educationCareer;
  const l = (k: string) => getLabel(k, locale);
  const rows: FieldRow[] = [
    { label: l("education"), value: ec.highestEducation },
    { label: l("details"), value: ec.educationDetails },
    { label: l("qualifications"), value: ec.additionalQualifications },
    { label: l("occupation"), value: ec.occupation },
    { label: l("jobTitle"), value: ec.jobTitle },
    { label: l("company"), value: ec.companyName },
    { label: l("workLocation"), value: ec.workLocation },
    { label: l("annualIncome"), value: ec.annualIncome },
  ];
  return rows.filter((r) => r.value);
}

export function getFamilyFields(data: BiodataFormData, locale: Locale = "en"): FieldRow[] {
  const fd = data.familyDetails;
  const l = (k: string) => getLabel(k, locale);

  const brothersStr =
    fd.brothers !== undefined
      ? `${fd.brothers}${fd.brothersMarried ? ` (${fd.brothersMarried} ${l("married")})` : ""}`
      : undefined;
  const sistersStr =
    fd.sisters !== undefined
      ? `${fd.sisters}${fd.sistersMarried ? ` (${fd.sistersMarried} ${l("married")})` : ""}`
      : undefined;

  const rows: FieldRow[] = [
    { label: l("father"), value: fd.fatherName ? `${fd.fatherName} (${fd.fatherOccupation})` : undefined },
    {
      label: l("mother"),
      value: fd.motherName
        ? `${fd.motherName}${fd.motherOccupation ? ` (${fd.motherOccupation})` : ""}`
        : undefined,
    },
    { label: l("brothers"), value: brothersStr },
    { label: l("sisters"), value: sistersStr },
    { label: l("familyType"), value: fd.familyType },
    { label: l("familyStatus"), value: fd.familyStatus },
    { label: l("familyValues"), value: fd.familyValues },
    { label: l("familyIncome"), value: fd.familyIncome },
    { label: l("nativePlace"), value: fd.nativePlace },
  ];
  return rows.filter((r) => r.value);
}

export function getContactFields(data: BiodataFormData, locale: Locale = "en"): FieldRow[] {
  const cd = data.contactDetails;
  const l = (k: string) => getLabel(k, locale);
  const rows: FieldRow[] = [];

  if (cd.contactPersonName) {
    rows.push({
      label: l("contact"),
      value: `${cd.contactPersonName}${cd.contactRelation ? ` (${cd.contactRelation})` : ""}`,
    });
  }
  if (cd.showPhone && cd.phone) rows.push({ label: l("phone"), value: `+91 ${cd.phone}` });
  if (cd.showEmail && cd.email) rows.push({ label: l("email"), value: cd.email });
  if (cd.showWhatsapp && cd.whatsapp) rows.push({ label: l("whatsapp"), value: cd.whatsapp });
  if (cd.showAddress && cd.address) rows.push({ label: l("address"), value: cd.address });

  return rows;
}

export function getHoroscopeFields(data: BiodataFormData, locale: Locale = "en"): FieldRow[] {
  const h = data.horoscope;
  const l = (k: string) => getLabel(k, locale);
  const rows: FieldRow[] = [
    { label: l("rashi"), value: h.rashi },
    { label: l("nakshatra"), value: h.nakshatra },
    { label: l("charan"), value: h.charan },
    { label: l("gan"), value: h.gan },
    { label: l("nadi"), value: h.nadi },
  ];
  return rows.filter((r) => r.value);
}

export function resolveTemplateColors(
  templateId: string,
  colorSchemeId: string,
  customColors?: CustomColorOverrides | null
): ColorScheme {
  const template = getTemplateById(templateId)!;
  const preset =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];
  if (!customColors) return preset;
  return { ...preset, ...customColors };
}

export function resolveTemplateFontFamily(
  customFont: FontFamilyOption | null | undefined,
  defaultCss: string
): string {
  if (!customFont) return defaultCss;
  const opt = getFontOption(customFont);
  return opt ? opt.cssValue : defaultCss;
}

export function resolveTemplateFontSize(
  customFontSize: FontSizeOption | null | undefined
): number {
  return getFontSizeScale(customFontSize);
}

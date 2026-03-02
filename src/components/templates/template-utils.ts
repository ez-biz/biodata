import { BiodataFormData } from "@/lib/types/biodata";
import { HEIGHT_OPTIONS } from "@/lib/constants/indian-data";

export type Locale = "en" | "hi";

const LABELS: Record<Locale, Record<string, string>> = {
  en: {
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
  },
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

export function formatDate(dateStr: string, locale: Locale = "en"): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString(
      locale === "hi" ? "hi-IN" : "en-IN",
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

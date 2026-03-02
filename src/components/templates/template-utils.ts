import { BiodataFormData } from "@/lib/types/biodata";
import { HEIGHT_OPTIONS } from "@/lib/constants/indian-data";

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

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export interface FieldRow {
  label: string;
  value: string | undefined | null;
}

export function getPersonalFields(data: BiodataFormData): FieldRow[] {
  const pd = data.personalDetails;
  const age = getAge(pd.dateOfBirth);
  const rows: FieldRow[] = [
    { label: "Name", value: pd.fullName },
    {
      label: "Date of Birth",
      value: pd.dateOfBirth
        ? `${formatDate(pd.dateOfBirth)}${age ? ` (${age} yrs)` : ""}`
        : undefined,
    },
    { label: "Height", value: pd.height ? formatHeight(pd.height) : undefined },
    { label: "Weight", value: pd.weight ? `${pd.weight} kg` : undefined },
    { label: "Blood Group", value: pd.bloodGroup },
    { label: "Complexion", value: pd.complexion },
    { label: "Body Type", value: pd.bodyType },
    { label: "Religion", value: pd.religion },
    { label: "Caste", value: pd.caste },
    { label: "Sub-caste", value: pd.subCaste },
    { label: "Gotra", value: pd.gotra },
    { label: "Manglik", value: pd.manglikStatus },
    { label: "Mother Tongue", value: pd.motherTongue },
    { label: "Location", value: [pd.currentCity, pd.currentState].filter(Boolean).join(", ") },
    { label: "Nationality", value: pd.nationality },
    { label: "Citizenship", value: pd.citizenshipStatus },
  ];
  return rows.filter((r) => r.value);
}

export function getEducationFields(data: BiodataFormData): FieldRow[] {
  const ec = data.educationCareer;
  const rows: FieldRow[] = [
    { label: "Education", value: ec.highestEducation },
    { label: "Details", value: ec.educationDetails },
    { label: "Qualifications", value: ec.additionalQualifications },
    { label: "Occupation", value: ec.occupation },
    { label: "Job Title", value: ec.jobTitle },
    { label: "Company", value: ec.companyName },
    { label: "Work Location", value: ec.workLocation },
    { label: "Annual Income", value: ec.annualIncome },
  ];
  return rows.filter((r) => r.value);
}

export function getFamilyFields(data: BiodataFormData): FieldRow[] {
  const fd = data.familyDetails;

  const brothersStr =
    fd.brothers !== undefined
      ? `${fd.brothers}${fd.brothersMarried ? ` (${fd.brothersMarried} married)` : ""}`
      : undefined;
  const sistersStr =
    fd.sisters !== undefined
      ? `${fd.sisters}${fd.sistersMarried ? ` (${fd.sistersMarried} married)` : ""}`
      : undefined;

  const rows: FieldRow[] = [
    { label: "Father", value: fd.fatherName ? `${fd.fatherName} (${fd.fatherOccupation})` : undefined },
    {
      label: "Mother",
      value: fd.motherName
        ? `${fd.motherName}${fd.motherOccupation ? ` (${fd.motherOccupation})` : ""}`
        : undefined,
    },
    { label: "Brothers", value: brothersStr },
    { label: "Sisters", value: sistersStr },
    { label: "Family Type", value: fd.familyType },
    { label: "Family Status", value: fd.familyStatus },
    { label: "Family Values", value: fd.familyValues },
    { label: "Family Income", value: fd.familyIncome },
    { label: "Native Place", value: fd.nativePlace },
  ];
  return rows.filter((r) => r.value);
}

export function getContactFields(data: BiodataFormData): FieldRow[] {
  const cd = data.contactDetails;
  const rows: FieldRow[] = [];

  if (cd.contactPersonName) {
    rows.push({
      label: "Contact",
      value: `${cd.contactPersonName}${cd.contactRelation ? ` (${cd.contactRelation})` : ""}`,
    });
  }
  if (cd.showPhone && cd.phone) rows.push({ label: "Phone", value: `+91 ${cd.phone}` });
  if (cd.showEmail && cd.email) rows.push({ label: "Email", value: cd.email });
  if (cd.showWhatsapp && cd.whatsapp) rows.push({ label: "WhatsApp", value: cd.whatsapp });
  if (cd.showAddress && cd.address) rows.push({ label: "Address", value: cd.address });

  return rows;
}

export function getHoroscopeFields(data: BiodataFormData): FieldRow[] {
  const h = data.horoscope;
  const rows: FieldRow[] = [
    { label: "Rashi", value: h.rashi },
    { label: "Nakshatra", value: h.nakshatra },
    { label: "Charan", value: h.charan },
    { label: "Gan", value: h.gan },
    { label: "Nadi", value: h.nadi },
  ];
  return rows.filter((r) => r.value);
}

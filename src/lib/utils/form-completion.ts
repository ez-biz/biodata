import { BiodataFormData, FORM_STEPS } from "@/lib/types/biodata";

/**
 * Field definition with required/optional weighting.
 * Required fields are weighted 2x compared to optional fields.
 */
interface FieldDef {
  key: string;
  required: boolean;
}

const REQUIRED_WEIGHT = 2;
const OPTIONAL_WEIGHT = 1;

/** Fields per step, marking which are required (based on Zod schemas). */
const STEP_FIELDS: Record<string, FieldDef[]> = {
  personalDetails: [
    { key: "fullName", required: true },
    { key: "dateOfBirth", required: true },
    { key: "timeOfBirth", required: false },
    { key: "placeOfBirth", required: false },
    { key: "height", required: true },
    { key: "weight", required: false },
    { key: "bloodGroup", required: false },
    { key: "complexion", required: false },
    { key: "bodyType", required: false },
    { key: "religion", required: true },
    { key: "caste", required: false },
    { key: "subCaste", required: false },
    { key: "motherTongue", required: true },
    { key: "currentCity", required: true },
    { key: "currentState", required: true },
    { key: "citizenshipStatus", required: false },
  ],
  educationCareer: [
    { key: "highestEducation", required: true },
    { key: "educationDetails", required: false },
    { key: "additionalQualifications", required: false },
    { key: "occupation", required: true },
    { key: "jobTitle", required: false },
    { key: "companyName", required: false },
    { key: "workLocation", required: false },
    { key: "annualIncome", required: false },
  ],
  familyDetails: [
    { key: "fatherName", required: true },
    { key: "fatherOccupation", required: true },
    { key: "motherName", required: true },
    { key: "motherOccupation", required: false },
    { key: "brothers", required: false },
    { key: "brothersMarried", required: false },
    { key: "sisters", required: false },
    { key: "sistersMarried", required: false },
    { key: "familyType", required: false },
    { key: "familyStatus", required: false },
    { key: "familyValues", required: false },
    { key: "familyIncome", required: false },
    { key: "nativePlace", required: false },
  ],
  lifestyle: [
    { key: "diet", required: false },
    { key: "smoking", required: false },
    { key: "drinking", required: false },
    { key: "hobbies", required: false },
    { key: "aboutMe", required: false },
  ],
  partnerPreferences: [
    { key: "preferredAgeMin", required: false },
    { key: "preferredAgeMax", required: false },
    { key: "preferredHeightMin", required: false },
    { key: "preferredHeightMax", required: false },
    { key: "preferredEducation", required: false },
    { key: "preferredOccupation", required: false },
    { key: "preferredLocation", required: false },
    { key: "preferredCaste", required: false },
    { key: "preferredDiet", required: false },
    { key: "preferredManglik", required: false },
    { key: "additionalExpectations", required: false },
  ],
  contactDetails: [
    { key: "contactPersonName", required: false },
    { key: "contactRelation", required: false },
    { key: "phone", required: true },
    { key: "email", required: false },
    { key: "address", required: false },
    { key: "whatsapp", required: false },
  ],
  horoscope: [
    { key: "rashi", required: false },
    { key: "nakshatra", required: false },
    { key: "charan", required: false },
    { key: "gan", required: false },
    { key: "nadi", required: false },
  ],
};

/** Human-readable labels for fields. */
const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  dateOfBirth: "Date of Birth",
  timeOfBirth: "Time of Birth",
  placeOfBirth: "Place of Birth",
  height: "Height",
  weight: "Weight",
  bloodGroup: "Blood Group",
  complexion: "Complexion",
  bodyType: "Body Type",
  religion: "Religion",
  caste: "Caste",
  subCaste: "Sub-caste",
  motherTongue: "Mother Tongue",
  currentCity: "Current City",
  currentState: "Current State",
  citizenshipStatus: "Citizenship Status",
  highestEducation: "Highest Education",
  educationDetails: "Education Details",
  additionalQualifications: "Additional Qualifications",
  occupation: "Occupation",
  jobTitle: "Job Title",
  companyName: "Company Name",
  workLocation: "Work Location",
  annualIncome: "Annual Income",
  fatherName: "Father's Name",
  fatherOccupation: "Father's Occupation",
  motherName: "Mother's Name",
  motherOccupation: "Mother's Occupation",
  brothers: "Brothers",
  brothersMarried: "Brothers Married",
  sisters: "Sisters",
  sistersMarried: "Sisters Married",
  familyType: "Family Type",
  familyStatus: "Family Status",
  familyValues: "Family Values",
  familyIncome: "Family Income",
  nativePlace: "Native Place",
  diet: "Diet",
  smoking: "Smoking",
  drinking: "Drinking",
  hobbies: "Hobbies",
  aboutMe: "About Me",
  preferredAgeMin: "Preferred Age (Min)",
  preferredAgeMax: "Preferred Age (Max)",
  preferredHeightMin: "Preferred Height (Min)",
  preferredHeightMax: "Preferred Height (Max)",
  preferredEducation: "Preferred Education",
  preferredOccupation: "Preferred Occupation",
  preferredLocation: "Preferred Location",
  preferredCaste: "Preferred Caste",
  preferredDiet: "Preferred Diet",
  preferredManglik: "Preferred Manglik",
  additionalExpectations: "Additional Expectations",
  contactPersonName: "Contact Person Name",
  contactRelation: "Contact Relation",
  phone: "Phone",
  email: "Email",
  address: "Address",
  whatsapp: "WhatsApp",
  rashi: "Rashi",
  nakshatra: "Nakshatra",
  charan: "Charan",
  gan: "Gan",
  nadi: "Nadi",
};

function isFieldFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return true;
  if (typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

export interface StepCompletion {
  stepIndex: number;
  stepTitle: string;
  sectionKey: string;
  filledCount: number;
  totalCount: number;
  percentage: number;
  filledWeighted: number;
  totalWeighted: number;
  missingRequired: { key: string; label: string }[];
  missingOptional: { key: string; label: string }[];
}

export interface FormCompletion {
  overall: number;
  totalFields: number;
  filledFields: number;
  totalRequired: number;
  filledRequired: number;
  steps: StepCompletion[];
  allMissingRequired: { stepTitle: string; key: string; label: string }[];
}

export function calculateFormCompletion(
  formData: BiodataFormData
): FormCompletion {
  const steps: StepCompletion[] = [];
  let totalWeightedAll = 0;
  let filledWeightedAll = 0;
  let totalFieldsAll = 0;
  let filledFieldsAll = 0;
  let totalRequiredAll = 0;
  let filledRequiredAll = 0;
  const allMissingRequired: FormCompletion["allMissingRequired"] = [];

  FORM_STEPS.forEach((step, index) => {
    const sectionKey = step.key;
    const fields = STEP_FIELDS[sectionKey] || [];
    const sectionData =
      formData[sectionKey as keyof BiodataFormData] as Record<string, unknown>;

    let filledCount = 0;
    let filledWeighted = 0;
    let totalWeighted = 0;
    const missingRequired: { key: string; label: string }[] = [];
    const missingOptional: { key: string; label: string }[] = [];

    fields.forEach((field) => {
      const weight = field.required ? REQUIRED_WEIGHT : OPTIONAL_WEIGHT;
      totalWeighted += weight;

      const value = sectionData?.[field.key];
      if (isFieldFilled(value)) {
        filledCount++;
        filledWeighted += weight;
        if (field.required) filledRequiredAll++;
      } else {
        const label = FIELD_LABELS[field.key] || field.key;
        if (field.required) {
          missingRequired.push({ key: field.key, label });
          allMissingRequired.push({ stepTitle: step.title, key: field.key, label });
        } else {
          missingOptional.push({ key: field.key, label });
        }
      }
      if (field.required) totalRequiredAll++;
    });

    totalWeightedAll += totalWeighted;
    filledWeightedAll += filledWeighted;
    totalFieldsAll += fields.length;
    filledFieldsAll += filledCount;

    steps.push({
      stepIndex: index,
      stepTitle: step.title,
      sectionKey,
      filledCount,
      totalCount: fields.length,
      percentage:
        totalWeighted > 0
          ? Math.round((filledWeighted / totalWeighted) * 100)
          : 100,
      filledWeighted,
      totalWeighted,
      missingRequired,
      missingOptional,
    });
  });

  const overall =
    totalWeightedAll > 0
      ? Math.round((filledWeightedAll / totalWeightedAll) * 100)
      : 0;

  return {
    overall,
    totalFields: totalFieldsAll,
    filledFields: filledFieldsAll,
    totalRequired: totalRequiredAll,
    filledRequired: filledRequiredAll,
    steps,
    allMissingRequired,
  };
}

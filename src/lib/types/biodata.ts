export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  height: string;
  weight?: string;
  bloodGroup?: string;
  complexion?: string;
  bodyType?: string;
  physicalDisability?: string;
  physicalDisabilityDesc?: string;
  manglikStatus?: string;
  gotra?: string;
  religion: string;
  caste?: string;
  subCaste?: string;
  motherTongue: string;
  languagesKnown?: string[];
  nationality?: string;
  currentCity: string;
  currentState: string;
  citizenshipStatus?: string;
}

export interface EducationCareer {
  highestEducation: string;
  educationDetails?: string;
  additionalQualifications?: string;
  occupation: string;
  jobTitle?: string;
  companyName?: string;
  workLocation?: string;
  annualIncome?: string;
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation?: string;
  brothers?: number;
  brothersMarried?: number;
  sisters?: number;
  sistersMarried?: number;
  familyType?: string;
  familyStatus?: string;
  familyValues?: string;
  familyIncome?: string;
  nativePlace?: string;
  propertyAssets?: string;
}

export interface Lifestyle {
  diet?: string;
  smoking?: string;
  drinking?: string;
  hobbies?: string[];
  aboutMe?: string;
}

export interface PartnerPreferences {
  preferredAgeMin?: number;
  preferredAgeMax?: number;
  preferredHeightMin?: string;
  preferredHeightMax?: string;
  preferredEducation?: string;
  preferredOccupation?: string;
  preferredLocation?: string;
  preferredCaste?: string;
  preferredDiet?: string;
  preferredManglik?: string;
  additionalExpectations?: string;
}

export interface ContactDetails {
  contactPersonName?: string;
  contactRelation?: string;
  phone: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  showPhone?: boolean;
  showEmail?: boolean;
  showAddress?: boolean;
  showWhatsapp?: boolean;
}

export interface HoroscopeDetails {
  rashi?: string;
  nakshatra?: string;
  charan?: string;
  gan?: string;
  nadi?: string;
}

export interface BiodataFormData {
  personalDetails: PersonalDetails;
  educationCareer: EducationCareer;
  familyDetails: FamilyDetails;
  lifestyle: Lifestyle;
  partnerPreferences: PartnerPreferences;
  contactDetails: ContactDetails;
  horoscope: HoroscopeDetails;
}

export interface TemplateConfig {
  id: string;
  name: string;
  slug: string;
  category: string;
  tier: "free" | "premium";
  religions: string[];
  pages: number;
  photoSlots: number;
  colorSchemes: ColorScheme[];
  thumbnailUrl: string;
  /** Popularity score used for A/B sorting (higher = more popular) */
  popularity?: number;
  /** Whether this template was recently added */
  isNew?: boolean;
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const FORM_STEPS = [
  { id: 1, title: "Personal Details", key: "personalDetails" },
  { id: 2, title: "Education & Career", key: "educationCareer" },
  { id: 3, title: "Family Details", key: "familyDetails" },
  { id: 4, title: "Lifestyle", key: "lifestyle" },
  { id: 5, title: "Partner Preferences", key: "partnerPreferences" },
  { id: 6, title: "Photos & Contact", key: "contactDetails" },
  { id: 7, title: "Horoscope", key: "horoscope" },
] as const;

export const DEFAULT_BIODATA: BiodataFormData = {
  personalDetails: {
    fullName: "",
    dateOfBirth: "",
    height: "",
    religion: "",
    motherTongue: "",
    currentCity: "",
    currentState: "",
    nationality: "Indian",
  },
  educationCareer: {
    highestEducation: "",
    occupation: "",
  },
  familyDetails: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
  },
  lifestyle: {},
  partnerPreferences: {},
  contactDetails: {
    phone: "",
    showPhone: true,
    showEmail: true,
    showAddress: false,
    showWhatsapp: true,
  },
  horoscope: {},
};

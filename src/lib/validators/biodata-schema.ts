import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  timeOfBirth: z.string().optional(),
  placeOfBirth: z.string().optional(),
  height: z.string().min(1, "Height is required"),
  weight: z.string().optional(),
  bloodGroup: z.string().optional(),
  complexion: z.string().optional(),
  bodyType: z.string().optional(),
  physicalDisability: z.string().optional(),
  physicalDisabilityDesc: z.string().optional(),
  manglikStatus: z.string().optional(),
  gotra: z.string().optional(),
  religion: z.string().min(1, "Religion is required"),
  caste: z.string().optional(),
  subCaste: z.string().optional(),
  motherTongue: z.string().min(1, "Mother tongue is required"),
  languagesKnown: z.array(z.string()).optional(),
  nationality: z.string().optional(),
  currentCity: z.string().min(1, "Current city is required"),
  currentState: z.string().min(1, "Current state is required"),
  citizenshipStatus: z.string().optional(),
});

export const educationCareerSchema = z.object({
  highestEducation: z.string().min(1, "Education is required"),
  educationDetails: z.string().optional(),
  additionalQualifications: z.string().optional(),
  occupation: z.string().min(1, "Occupation is required"),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  workLocation: z.string().optional(),
  annualIncome: z.string().optional(),
});

export const familyDetailsSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().optional(),
  brothers: z.number().min(0).max(10).optional(),
  brothersMarried: z.number().min(0).max(10).optional(),
  sisters: z.number().min(0).max(10).optional(),
  sistersMarried: z.number().min(0).max(10).optional(),
  familyType: z.string().optional(),
  familyStatus: z.string().optional(),
  familyValues: z.string().optional(),
  familyIncome: z.string().optional(),
  nativePlace: z.string().optional(),
  propertyAssets: z.string().optional(),
});

export const lifestyleSchema = z.object({
  diet: z.string().optional(),
  smoking: z.string().optional(),
  drinking: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  aboutMe: z.string().max(500, "About me must be under 500 characters").optional(),
});

export const partnerPreferencesSchema = z.object({
  preferredAgeMin: z.number().min(18).max(70).optional(),
  preferredAgeMax: z.number().min(18).max(70).optional(),
  preferredHeightMin: z.string().optional(),
  preferredHeightMax: z.string().optional(),
  preferredEducation: z.string().optional(),
  preferredOccupation: z.string().optional(),
  preferredLocation: z.string().optional(),
  preferredCaste: z.string().optional(),
  preferredDiet: z.string().optional(),
  preferredManglik: z.string().optional(),
  additionalExpectations: z.string().max(500).optional(),
});

export const contactDetailsSchema = z.object({
  contactPersonName: z.string().optional(),
  contactRelation: z.string().optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d+\-\s()]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().optional(),
  whatsapp: z.string().optional(),
  showPhone: z.boolean().optional(),
  showEmail: z.boolean().optional(),
  showAddress: z.boolean().optional(),
  showWhatsapp: z.boolean().optional(),
});

export const horoscopeSchema = z.object({
  rashi: z.string().optional(),
  nakshatra: z.string().optional(),
  charan: z.string().optional(),
  gan: z.string().optional(),
  nadi: z.string().optional(),
});

export const STEP_SCHEMAS = [
  personalDetailsSchema,
  educationCareerSchema,
  familyDetailsSchema,
  lifestyleSchema,
  partnerPreferencesSchema,
  contactDetailsSchema,
  horoscopeSchema,
] as const;

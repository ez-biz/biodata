export const RELIGIONS = [
  "Hindu",
  "Muslim",
  "Sikh",
  "Christian",
  "Jain",
  "Buddhist",
  "Parsi",
  "Other",
] as const;

export const CASTES_BY_RELIGION: Record<string, string[]> = {
  Hindu: [
    "Brahmin", "Rajput", "Maratha", "Yadav", "Jat", "Gupta", "Agarwal",
    "Baniya", "Kayastha", "Khatri", "Patel", "Reddy", "Nair", "Iyer",
    "Iyengar", "Sharma", "Verma", "Kurmi", "Koeri", "Vaishnav",
    "Lingayat", "Vokkliga", "Ezhava", "Nadar", "Thevar", "Gounder",
    "Mudaliar", "Chettiar", "Pillai", "Other",
  ],
  Muslim: [
    "Syed", "Sheikh", "Pathan", "Mughal", "Ansari", "Qureshi",
    "Khan", "Malik", "Mirza", "Other",
  ],
  Sikh: [
    "Jat Sikh", "Khatri", "Arora", "Ramgarhia", "Saini",
    "Ahluwalia", "Rajput Sikh", "Ramdasia", "Mazhabis", "Other",
  ],
  Christian: [
    "Catholic", "Protestant", "Syrian Christian", "CSI", "CNI",
    "Pentecostal", "Anglo-Indian", "Other",
  ],
  Jain: ["Digambar", "Shwetambar", "Other"],
  Buddhist: ["Mahar", "Nav-Buddhist", "Other"],
  Parsi: ["Irani", "Shahenshahi", "Other"],
};

export const MOTHER_TONGUES = [
  "Hindi", "English", "Marathi", "Gujarati", "Tamil", "Telugu",
  "Kannada", "Malayalam", "Bengali", "Punjabi", "Urdu", "Odia",
  "Assamese", "Maithili", "Sindhi", "Konkani", "Dogri", "Kashmiri",
  "Manipuri", "Bodo", "Santali", "Nepali", "Rajasthani", "Bhojpuri",
  "Tulu", "Kodava", "Other",
] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
] as const;

export const HEIGHT_OPTIONS = (() => {
  const opts: { label: string; value: string }[] = [];
  for (let ft = 4; ft <= 7; ft++) {
    for (let inch = 0; inch < 12; inch++) {
      if (ft === 7 && inch > 0) break;
      opts.push({ label: `${ft}'${inch}"`, value: `${ft}.${inch}` });
    }
  }
  return opts;
})();

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

export const COMPLEXION_OPTIONS = ["Fair", "Wheatish", "Dusky", "Dark"] as const;

export const BODY_TYPES = ["Slim", "Average", "Athletic", "Heavy"] as const;

export const MANGLIK_OPTIONS = ["Yes", "No", "Anshik (Partial)"] as const;

export const EDUCATION_LEVELS = [
  "10th", "12th", "Diploma", "Graduate", "Post-Graduate", "PhD",
  "CA", "CS", "MBBS", "MD/MS", "BDS", "LLB", "LLM",
  "B.Tech/B.E.", "M.Tech/M.E.", "MBA", "MCA", "BCA",
  "B.Sc", "M.Sc", "B.Com", "M.Com", "B.A.", "M.A.",
  "B.Ed", "M.Ed", "Other Professional Degree",
] as const;

export const OCCUPATION_TYPES = [
  "Private Job", "Government Job", "Business", "Self-Employed",
  "Professional", "Defence", "Civil Services", "Doctor",
  "Engineer", "Teacher/Professor", "Lawyer", "CA/CS",
  "Student", "Not Working", "Other",
] as const;

export const INCOME_RANGES = [
  "Not Disclosed",
  "Below 2 Lakh",
  "2-5 Lakh",
  "5-10 Lakh",
  "10-15 Lakh",
  "15-25 Lakh",
  "25-50 Lakh",
  "50 Lakh - 1 Crore",
  "Above 1 Crore",
] as const;

export const FAMILY_TYPES = ["Joint", "Nuclear"] as const;
export const FAMILY_STATUS = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"] as const;
export const FAMILY_VALUES = ["Orthodox", "Moderate", "Liberal"] as const;

export const DIET_OPTIONS = ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan", "Jain"] as const;
export const YES_NO_OPTIONS = ["No", "Occasionally", "Yes"] as const;
export const DRINKING_OPTIONS = ["No", "Occasionally", "Yes", "Socially"] as const;

export const HOBBIES = [
  "Reading", "Cooking", "Traveling", "Music", "Sports", "Yoga",
  "Dancing", "Painting", "Photography", "Gaming", "Gardening",
  "Writing", "Singing", "Movies", "Fitness", "Meditation",
  "Crafts", "Volunteering", "Swimming", "Cycling",
] as const;

export const CONTACT_RELATIONS = [
  "Father", "Mother", "Self", "Brother", "Sister", "Uncle", "Aunt",
] as const;

export const RASHIS = [
  "Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)",
  "Kark (Cancer)", "Singh (Leo)", "Kanya (Virgo)",
  "Tula (Libra)", "Vrischik (Scorpio)", "Dhanu (Sagittarius)",
  "Makar (Capricorn)", "Kumbh (Aquarius)", "Meen (Pisces)",
] as const;

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
  "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
  "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
  "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
  "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
  "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

export const GANS = ["Dev", "Manushya", "Rakshas"] as const;
export const NADIS = ["Aadi", "Madhya", "Antya"] as const;

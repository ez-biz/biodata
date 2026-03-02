"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById } from "@/lib/templates/template-config";
import {
  getPersonalFields,
  getEducationFields,
  getFamilyFields,
  getContactFields,
  getHoroscopeFields,
  FieldRow,
} from "./template-utils";
import { PageBreak } from "@/components/editor/page-break";

interface Props {
  colorSchemeId: string;
}

function Section({
  title,
  fields,
  colors,
}: {
  title: string;
  fields: FieldRow[];
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <div
        className="text-xs font-bold tracking-wide uppercase mb-1 pb-0.5 border-b"
        style={{ color: colors.primary, borderColor: colors.secondary }}
      >
        {title}
      </div>
      <div className="space-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[10px] leading-tight">
            <span
              className="w-24 flex-shrink-0 font-semibold"
              style={{ color: colors.primary }}
            >
              {f.label}
            </span>
            <span className="mr-1">:</span>
            <span style={{ color: colors.text }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TraditionalClassicTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("traditional-classic")!;
  const colors =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData);
  const educationFields = getEducationFields(formData);
  const familyFields = getFamilyFields(formData);
  const contactFields = getContactFields(formData);
  const horoscopeFields = getHoroscopeFields(formData);

  const showAbout = formData.lifestyle.aboutMe;
  const showHobbies = formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0;

  // Determine if there's enough content to warrant a second page.
  // When horoscope, about/lifestyle, AND contact sections all have data,
  // use a page break after family details to avoid overflow.
  const hasHoroscope = horoscopeFields.length > 0;
  const hasContact = contactFields.length > 0;
  const hasAboutSection = showAbout || showHobbies;
  const shouldPageBreak = hasHoroscope && hasContact && hasAboutSection;

  return (
    <div
      className="w-full p-5 flex flex-col"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Decorative top border */}
      <div
        className="h-1.5 rounded-full mb-3"
        style={{
          background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Header */}
      <div className="text-center mb-3">
        <div
          className="text-lg font-bold tracking-wider"
          style={{ color: colors.primary }}
        >
          {pd.religion === "Hindu" && "॥ श्री गणेशाय नमः ॥"}
          {pd.religion === "Sikh" && "ੴ ਸਤਿ ਨਾਮੁ"}
          {pd.religion === "Jain" && "॥ णमोकार मंत्र ॥"}
          {!["Hindu", "Sikh", "Jain"].includes(pd.religion) &&
            "✦ BIODATA ✦"}
        </div>
        <h1
          className="text-base font-bold mt-1"
          style={{ color: colors.primary }}
        >
          BIODATA
        </h1>
      </div>

      {/* Photo + Name */}
      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-16 h-20 rounded-md border-2 flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ borderColor: colors.secondary, backgroundColor: colors.primary + "10" }}
        >
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-8 h-8 opacity-30"
              style={{ color: colors.primary }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div>
          <h2
            className="text-sm font-bold"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p className="text-[10px] text-gray-600">
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 space-y-1">
        <Section title="Personal Details" fields={personalFields} colors={colors} />
        <Section title="Education & Career" fields={educationFields} colors={colors} />
        <Section title="Family Details" fields={familyFields} colors={colors} />

        {/* Conditional page break when content is heavy */}
        {shouldPageBreak && <PageBreak label="Page 2" />}

        {(showAbout || showHobbies) && (
          <div className="mb-3">
            <div
              className="text-xs font-bold tracking-wide uppercase mb-1 pb-0.5 border-b"
              style={{ color: colors.primary, borderColor: colors.secondary }}
            >
              About & Lifestyle
            </div>
            {showAbout && (
              <p className="text-[10px] leading-tight mb-1">
                {formData.lifestyle.aboutMe}
              </p>
            )}
            {showHobbies && (
              <p className="text-[10px] leading-tight">
                <span className="font-semibold" style={{ color: colors.primary }}>
                  Hobbies:{" "}
                </span>
                {formData.lifestyle.hobbies!.join(", ")}
              </p>
            )}
          </div>
        )}

        <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
        <Section title="Contact Details" fields={contactFields} colors={colors} />
      </div>

      {/* Decorative bottom border */}
      <div
        className="h-1.5 rounded-full mt-3"
        style={{
          background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.secondary})`,
        }}
      />
    </div>
  );
}

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

/**
 * Two-column grid layout — fields arranged in a 2-col grid.
 * Each cell has the label as a small muted header and the value below it.
 * This uses the full page width instead of wasting the right half.
 */
function SectionGrid({
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
    <div className="mb-5">
      <div
        className="text-[13px] font-bold tracking-wide uppercase mb-2 pb-1.5 border-b-2"
        style={{ color: colors.primary, borderColor: colors.secondary }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: colors.primary, opacity: 0.7 }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug"
              style={{ color: colors.text }}
            >
              {f.value}
            </div>
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

  const hasHoroscope = horoscopeFields.length > 0;
  const hasContact = contactFields.length > 0;
  const hasAboutSection = showAbout || showHobbies;
  const shouldPageBreak = hasHoroscope && hasContact && hasAboutSection;

  return (
    <div
      className="w-full p-8 flex flex-col"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Decorative top border */}
      <div
        className="h-2 rounded-full mb-5"
        style={{
          background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Header */}
      <div className="text-center mb-4">
        <div
          className="text-xl font-bold tracking-wider"
          style={{ color: colors.primary }}
        >
          {pd.religion === "Hindu" && "॥ श्री गणेशाय नमः ॥"}
          {pd.religion === "Sikh" && "ੴ ਸਤਿ ਨਾਮੁ"}
          {pd.religion === "Jain" && "॥ णमोकार मंत्र ॥"}
          {!["Hindu", "Sikh", "Jain"].includes(pd.religion) &&
            "✦ BIODATA ✦"}
        </div>
        <h1
          className="text-lg font-bold mt-1"
          style={{ color: colors.primary }}
        >
          BIODATA
        </h1>
      </div>

      {/* Photo + Name + Quick Info */}
      <div className="flex items-start gap-6 mb-6">
        <div
          className="w-24 h-28 rounded-md border-2 flex-shrink-0 flex items-center justify-center overflow-hidden"
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
        <div className="flex-1">
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p className="text-sm text-gray-600 mb-2">
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
          {/* Quick summary line */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: colors.text + "99" }}>
            {pd.religion && <span>{pd.religion}</span>}
            {pd.caste && <span>• {pd.caste}</span>}
            {formData.educationCareer.occupation && <span>• {formData.educationCareer.occupation}</span>}
          </div>
        </div>
      </div>

      {/* Sections — two-column grid layout */}
      <div className="flex-1">
        <SectionGrid title="Personal Details" fields={personalFields} colors={colors} />
        <SectionGrid title="Education & Career" fields={educationFields} colors={colors} />
        <SectionGrid title="Family Details" fields={familyFields} colors={colors} />

        {shouldPageBreak && <PageBreak label="Page 2" />}

        {(showAbout || showHobbies) && (
          <div className="mb-5">
            <div
              className="text-[13px] font-bold tracking-wide uppercase mb-2 pb-1.5 border-b-2"
              style={{ color: colors.primary, borderColor: colors.secondary }}
            >
              About & Lifestyle
            </div>
            {showAbout && (
              <p className="text-[13px] leading-relaxed mb-2">
                {formData.lifestyle.aboutMe}
              </p>
            )}
            {showHobbies && (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.lifestyle.hobbies!.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-3 py-1 rounded-full border"
                    style={{
                      borderColor: colors.secondary,
                      color: colors.primary,
                      backgroundColor: colors.secondary + "20",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <SectionGrid title="Horoscope" fields={horoscopeFields} colors={colors} />
        <SectionGrid title="Contact Details" fields={contactFields} colors={colors} />
      </div>

      {/* Decorative bottom border */}
      <div
        className="h-2 rounded-full mt-4"
        style={{
          background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.secondary})`,
        }}
      />
    </div>
  );
}

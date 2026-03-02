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
  colors: { primary: string; accent: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-2.5">
      <div
        className="text-[8px] font-semibold tracking-[0.15em] uppercase mb-1"
        style={{ color: colors.accent }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-tight">
            <span
              className="flex-shrink-0 font-medium mr-1"
              style={{ color: colors.primary }}
            >
              {f.label}:
            </span>
            <span style={{ color: colors.text }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MinimalistCardTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("minimalist-card")!;
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
  const showHobbies =
    formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0;

  return (
    <div
      className="w-full h-full p-6 flex flex-col"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Helvetica Neue', 'Arial', 'Helvetica', sans-serif",
      }}
    >
      {/* Large name at top */}
      <div className="mb-1">
        <h1
          className="text-lg font-light tracking-wide"
          style={{ color: colors.primary }}
        >
          {pd.fullName || "Your Name"}
        </h1>
        {pd.currentCity && (
          <p className="text-[9px] font-light mt-0.5" style={{ color: colors.accent }}>
            {pd.currentCity}
            {pd.currentState ? `, ${pd.currentState}` : ""}
          </p>
        )}
      </div>

      {/* Thin hairline separator */}
      <div
        className="h-px mb-3"
        style={{ backgroundColor: colors.accent }}
      />

      {/* Photo row - small, aligned right */}
      {profilePhotoUrl && (
        <div className="flex justify-end mb-3">
          <div
            className="w-14 h-18 overflow-hidden"
            style={{ aspectRatio: "4/5" }}
          >
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(10%)" }}
            />
          </div>
        </div>
      )}

      {/* Sections - two-column grid */}
      <div className="flex-1 space-y-1">
        <Section title="Personal" fields={personalFields} colors={colors} />

        {/* Hairline */}
        <div className="h-px" style={{ backgroundColor: colors.accent + "40" }} />

        <Section title="Education & Career" fields={educationFields} colors={colors} />

        <div className="h-px" style={{ backgroundColor: colors.accent + "40" }} />

        <Section title="Family" fields={familyFields} colors={colors} />

        {(showAbout || showHobbies) && (
          <>
            <div className="h-px" style={{ backgroundColor: colors.accent + "40" }} />
            <div className="mb-2.5">
              <div
                className="text-[8px] font-semibold tracking-[0.15em] uppercase mb-1"
                style={{ color: colors.accent }}
              >
                About
              </div>
              {showAbout && (
                <p className="text-[9px] leading-tight mb-1" style={{ color: colors.text }}>
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <p className="text-[9px] leading-tight">
                  <span className="font-medium" style={{ color: colors.primary }}>
                    Interests:{" "}
                  </span>
                  {formData.lifestyle.hobbies!.join(", ")}
                </p>
              )}
            </div>
          </>
        )}

        {horoscopeFields.length > 0 && (
          <>
            <div className="h-px" style={{ backgroundColor: colors.accent + "40" }} />
            <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          </>
        )}

        <div className="h-px" style={{ backgroundColor: colors.accent + "40" }} />

        <Section title="Contact" fields={contactFields} colors={colors} />
      </div>

      {/* Bottom hairline */}
      <div
        className="h-px mt-3"
        style={{ backgroundColor: colors.accent }}
      />
    </div>
  );
}

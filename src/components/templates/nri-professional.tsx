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
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <h3
        className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1 pb-0.5 border-b"
        style={{ color: colors.primary, borderColor: colors.primary + "20" }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="text-[9px] leading-snug">
            <span
              className="text-[7px] uppercase tracking-wider font-medium"
              style={{ color: colors.text + "88" }}
            >
              {f.label}
            </span>
            <div className="font-medium" style={{ color: colors.text }}>
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NriProfessionalTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("nri-professional")!;
  const colors =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData);
  const educationFields = getEducationFields(formData);
  const familyFields = getFamilyFields(formData);
  const contactFields = getContactFields(formData);
  const horoscopeFields = getHoroscopeFields(formData);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Header section */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4">
        <div
          className="w-16 h-20 flex-shrink-0 rounded overflow-hidden flex items-center justify-center"
          style={{
            backgroundColor: colors.primary + "10",
            border: `1px solid ${colors.primary}30`,
          }}
        >
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-8 h-8 opacity-20"
              style={{ color: colors.primary }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h1
            className="text-lg font-bold leading-tight"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-[9px] mt-0.5"
              style={{ color: colors.text + "88" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
          {formData.educationCareer.occupation && (
            <p
              className="text-[9px] font-medium mt-1"
              style={{ color: colors.secondary }}
            >
              {formData.educationCareer.occupation}
              {formData.educationCareer.companyName
                ? ` at ${formData.educationCareer.companyName}`
                : ""}
            </p>
          )}
        </div>
      </div>

      {/* Thin separator */}
      <div
        className="mx-5 h-px"
        style={{ backgroundColor: colors.primary + "15" }}
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 overflow-hidden">
        {formData.lifestyle.aboutMe && (
          <p
            className="text-[9px] leading-relaxed mb-3 pb-2 border-b"
            style={{
              color: colors.text + "BB",
              borderColor: colors.primary + "10",
            }}
          >
            {formData.lifestyle.aboutMe}
          </p>
        )}

        <Section title="Personal" fields={personalFields} colors={colors} />
        <Section
          title="Education & Career"
          fields={educationFields}
          colors={colors}
        />
        <Section title="Family" fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies &&
          formData.lifestyle.hobbies.length > 0 && (
            <div className="mb-3">
              <h3
                className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1"
                style={{ color: colors.primary }}
              >
                Interests
              </h3>
              <div className="flex flex-wrap gap-1">
                {formData.lifestyle.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="text-[8px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: colors.primary + "10",
                      color: colors.primary,
                    }}
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          )}

        <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
        <Section title="Contact" fields={contactFields} colors={colors} />
      </div>

      {/* Bottom accent bar */}
      <div
        className="h-0.5 flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />
    </div>
  );
}

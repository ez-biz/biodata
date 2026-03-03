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
import { MinimalDivider, ElegantFrame } from "./ornaments";

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
      <div className="flex items-center gap-2 mb-1.5">
        <h3
          className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
          style={{ color: colors.primary, fontFamily: "var(--font-body)" }}
        >
          {title}
        </h3>
        <div className="flex-1">
          <MinimalDivider color={colors.primary} width={300} className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] uppercase tracking-wider font-medium leading-tight"
              style={{ color: colors.text + "70", fontFamily: "var(--font-body)" }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] font-medium leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-body)" }}
            >
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
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />

      {/* Header section with subtle dot-grid pattern */}
      <div
        className="px-6 pt-4 pb-3 flex items-center gap-5 relative"
        style={{
          backgroundImage: `radial-gradient(${colors.primary}12 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      >
        {/* Photo with ElegantFrame */}
        <ElegantFrame color={colors.primary} className="flex-shrink-0">
          <div
            className="w-[68px] h-[84px] flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: colors.primary + "08",
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
                className="w-8 h-8 opacity-15"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        </ElegantFrame>

        <div className="flex-1 min-w-0">
          <h1
            className="text-xl font-bold leading-tight tracking-tight"
            style={{ color: colors.primary, fontFamily: "var(--font-body)" }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-[11px] mt-0.5 tracking-wide"
              style={{ color: colors.text + "80", fontFamily: "var(--font-body)" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
          {formData.educationCareer.occupation && (
            <p
              className="text-[12px] font-medium mt-1"
              style={{ color: colors.secondary, fontFamily: "var(--font-body)" }}
            >
              {formData.educationCareer.occupation}
              {formData.educationCareer.companyName
                ? ` at ${formData.educationCareer.companyName}`
                : ""}
            </p>
          )}
        </div>
      </div>

      {/* Thin gradient separator */}
      <div
        className="mx-6 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.primary}30, transparent)`,
        }}
      />

      {/* Content */}
      <div className="flex-1 px-6 py-3 overflow-hidden">
        {formData.lifestyle.aboutMe && (
          <p
            className="text-[13px] leading-relaxed mb-3 pb-2"
            style={{
              color: colors.text + "BB",
              fontFamily: "var(--font-body)",
              borderBottom: `1px solid ${colors.primary}10`,
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
              <div className="flex items-center gap-2 mb-1.5">
                <h3
                  className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
                  style={{ color: colors.primary, fontFamily: "var(--font-body)" }}
                >
                  Interests
                </h3>
                <div className="flex-1">
                  <MinimalDivider color={colors.primary} width={300} className="w-full" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {formData.lifestyle.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="text-[11px] px-2.5 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: colors.primary + "0C",
                      color: colors.primary,
                      border: `1px solid ${colors.primary}18`,
                      fontFamily: "var(--font-body)",
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

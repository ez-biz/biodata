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
import { MinimalDivider } from "./ornaments";

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
    <div className="mb-3">
      <div
        className="text-[10px] tracking-[0.18em] uppercase mb-1.5 font-medium"
        style={{ color: colors.accent, fontFamily: "var(--font-body)" }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col">
            <span
              className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
              style={{ color: colors.primary, opacity: 0.6, fontFamily: "var(--font-body)" }}
            >
              {f.label}
            </span>
            <span
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-body)" }}
            >
              {f.value}
            </span>
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
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header: name + location */}
      <div className="mb-2 flex items-end justify-between">
        <div>
          <h1
            className="text-xl font-light tracking-wide"
            style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-[11px] tracking-wider uppercase font-light mt-0.5"
              style={{ color: colors.accent }}
            >
              {pd.currentCity}
              {pd.currentState ? ` / ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Photo — small, right-aligned */}
        {profilePhotoUrl && (
          <div
            className="w-14 flex-shrink-0 overflow-hidden"
            style={{
              aspectRatio: "4/5",
              borderLeft: `2px solid ${colors.accent}30`,
              paddingLeft: "8px",
            }}
          >
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(10%)" }}
            />
          </div>
        )}
      </div>

      {/* Top accent line */}
      <div
        className="h-[2px] mb-1"
        style={{ backgroundColor: colors.primary, opacity: 0.15 }}
      />
      <div
        className="h-px mb-4"
        style={{ backgroundColor: colors.accent, opacity: 0.4 }}
      />

      {/* Content sections */}
      <div className="flex-1 space-y-0">
        <Section title="Personal" fields={personalFields} colors={colors} />

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title="Education & Career" fields={educationFields} colors={colors} />

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title="Family" fields={familyFields} colors={colors} />

        {(showAbout || showHobbies) && (
          <>
            <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />
            <div className="mb-3">
              <div
                className="text-[10px] tracking-[0.18em] uppercase mb-1.5 font-medium"
                style={{ color: colors.accent, fontFamily: "var(--font-body)" }}
              >
                About
              </div>
              {showAbout && (
                <p
                  className="text-[13px] leading-relaxed mb-1"
                  style={{ color: colors.text, fontFamily: "var(--font-body)" }}
                >
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <div className="flex flex-col mt-1">
                  <span
                    className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
                    style={{ color: colors.primary, opacity: 0.6 }}
                  >
                    Interests
                  </span>
                  <span className="text-[13px] leading-snug">
                    {formData.lifestyle.hobbies!.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {horoscopeFields.length > 0 && (
          <>
            <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />
            <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          </>
        )}

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title="Contact" fields={contactFields} colors={colors} />
      </div>

      {/* Bottom accent lines */}
      <div
        className="h-px mt-4"
        style={{ backgroundColor: colors.accent, opacity: 0.4 }}
      />
      <div
        className="h-[2px] mt-1"
        style={{ backgroundColor: colors.primary, opacity: 0.15 }}
      />
    </div>
  );
}

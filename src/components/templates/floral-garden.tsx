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
import { FloralCorner, FlourishDivider, OrnateCircleFrame } from "./ornaments";

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
  colors: { primary: string; secondary: string; text: string; accent: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <div
        className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5 text-center"
        style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col">
            <span
              className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
              style={{ color: colors.accent, fontFamily: "var(--font-serif)" }}
            >
              {f.label}
            </span>
            <span
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-serif)" }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FloralGardenTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("floral-garden")!;
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
      className="w-full h-full flex flex-col relative"
      style={{
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary}20 50%, ${colors.background} 100%)`,
        color: colors.text,
        fontFamily: "var(--font-serif)",
      }}
    >
      {/* Floral corner ornaments — all 4 corners with CSS mirroring */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <FloralCorner color={colors.accent} opacity={0.5} size={120} />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none" style={{ transform: "scaleX(-1)" }}>
        <FloralCorner color={colors.accent} opacity={0.5} size={120} />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ transform: "scaleY(-1)" }}>
        <FloralCorner color={colors.accent} opacity={0.5} size={120} />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: "scale(-1, -1)" }}>
        <FloralCorner color={colors.accent} opacity={0.5} size={120} />
      </div>

      <div className="p-7 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <FlourishDivider color={colors.accent} width={280} className="mx-auto mb-1" />
          <div
            className="text-[10px] tracking-[0.2em] uppercase font-medium"
            style={{ color: colors.accent, fontFamily: "var(--font-serif)" }}
          >
            Marriage Biodata
          </div>
        </div>

        {/* Photo in ornate circle frame */}
        <div className="flex flex-col items-center mb-3">
          <OrnateCircleFrame
            color={colors.primary}
            secondaryColor={colors.accent}
          >
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ width: "68px", height: "68px" }}
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary + "30" }}
                >
                  <svg
                    className="w-7 h-7 opacity-30"
                    style={{ color: colors.primary }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          </OrnateCircleFrame>

          <h2
            className="text-base font-bold mt-2.5 text-center tracking-wide"
            style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p
              className="text-[11px] tracking-wider mt-0.5"
              style={{ color: colors.text, fontFamily: "var(--font-serif)" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-0">
          <Section title="Personal Details" fields={personalFields} colors={colors} />

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title="Education & Career" fields={educationFields} colors={colors} />

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title="Family Details" fields={familyFields} colors={colors} />

          {(showAbout || showHobbies) && (
            <>
              <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />
              <div className="mb-3">
                <div
                  className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5 text-center"
                  style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
                >
                  About & Lifestyle
                </div>
                {showAbout && (
                  <p
                    className="text-[13px] leading-relaxed mb-1 italic text-center"
                    style={{ color: colors.text, fontFamily: "var(--font-serif)" }}
                  >
                    &ldquo;{formData.lifestyle.aboutMe}&rdquo;
                  </p>
                )}
                {showHobbies && (
                  <div className="flex flex-col items-center mt-1">
                    <span
                      className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
                      style={{ color: colors.accent }}
                    >
                      Hobbies
                    </span>
                    <span
                      className="text-[13px] leading-snug text-center"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {formData.lifestyle.hobbies!.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {horoscopeFields.length > 0 && (
            <>
              <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />
              <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
            </>
          )}

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title="Contact Details" fields={contactFields} colors={colors} />
        </div>

        {/* Bottom flourish */}
        <div className="mt-2">
          <FlourishDivider color={colors.accent} width={240} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}

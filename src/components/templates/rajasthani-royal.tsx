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
  colors: { primary: string; secondary: string; text: string; accent: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-2.5">
      {/* Ornate double-line divider with diamond center */}
      <div className="flex items-center gap-1.5 mb-1">
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: colors.secondary }}
        />
        <div
          className="flex-1 h-px -mt-1"
          style={{ backgroundColor: colors.secondary }}
        />
        <span
          className="text-[8px] font-bold tracking-wider uppercase px-1"
          style={{ color: colors.primary }}
        >
          {title}
        </span>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: colors.secondary }}
        />
        <div
          className="flex-1 h-px -mt-1"
          style={{ backgroundColor: colors.secondary }}
        />
      </div>
      {/* Double line with diamond */}
      <div className="flex items-center mb-1.5">
        <div className="flex-1 flex flex-col gap-px">
          <div className="h-px" style={{ backgroundColor: colors.accent }} />
          <div className="h-px" style={{ backgroundColor: colors.accent }} />
        </div>
        <span
          className="mx-1 text-[6px]"
          style={{ color: colors.secondary }}
        >
          &#x25C6;
        </span>
        <div className="flex-1 flex flex-col gap-px">
          <div className="h-px" style={{ backgroundColor: colors.accent }} />
          <div className="h-px" style={{ backgroundColor: colors.accent }} />
        </div>
      </div>
      <div className="space-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-tight">
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

export function RajasthaniRoyalTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("rajasthani-royal")!;
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
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Block-print inspired geometric border - outer */}
      <div
        className="absolute inset-2 border-2 pointer-events-none"
        style={{ borderColor: colors.primary }}
      />
      {/* Inner border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "11px",
          border: `1.5px solid ${colors.secondary}`,
        }}
      />
      {/* Corner diamonds */}
      {[
        { top: "5px", left: "5px" },
        { top: "5px", right: "5px" },
        { bottom: "5px", left: "5px" },
        { bottom: "5px", right: "5px" },
      ].map((style, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none text-[12px] leading-none"
          style={{ ...style, color: colors.secondary }}
        >
          &#x25C6;
        </div>
      ))}

      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <div
            className="text-base font-bold tracking-wider"
            style={{ color: colors.primary }}
          >
            &#x0965; &#x0936;&#x094D;&#x0930;&#x0940;
            &#x0917;&#x0923;&#x0947;&#x0936;&#x093E;&#x092F;
            &#x0928;&#x092E;&#x0903; &#x0965;
          </div>
          <div
            className="text-[10px] font-semibold tracking-wide mt-0.5"
            style={{ color: colors.secondary }}
          >
            &#x2726; &#x0936;&#x0941;&#x092D;
            &#x0935;&#x093F;&#x0935;&#x093E;&#x0939; &#x2726;
          </div>
        </div>

        {/* Photo centered, name below */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-16 h-20 flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              border: `2px solid ${colors.primary}`,
              backgroundColor: colors.primary + "10",
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
                className="w-8 h-8 opacity-30"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <h2
            className="text-sm font-bold mt-1.5 tracking-wide text-center"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p className="text-[9px]" style={{ color: colors.text }}>
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-1">
          <Section title="Personal Details" fields={personalFields} colors={colors} />
          <Section title="Education & Career" fields={educationFields} colors={colors} />
          <Section title="Family Details" fields={familyFields} colors={colors} />

          {(showAbout || showHobbies) && (
            <div className="mb-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex-1 flex flex-col gap-px">
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                </div>
                <span className="text-[8px] font-bold tracking-wider uppercase px-1" style={{ color: colors.primary }}>
                  About & Lifestyle
                </span>
                <div className="flex-1 flex flex-col gap-px">
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                </div>
              </div>
              <div className="flex items-center mb-1.5">
                <div className="flex-1 flex flex-col gap-px">
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                </div>
                <span className="mx-1 text-[6px]" style={{ color: colors.secondary }}>&#x25C6;</span>
                <div className="flex-1 flex flex-col gap-px">
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                  <div className="h-px" style={{ backgroundColor: colors.accent }} />
                </div>
              </div>
              {showAbout && (
                <p className="text-[9px] leading-tight mb-1">
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <p className="text-[9px] leading-tight">
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

        {/* Bottom ornament */}
        <div className="flex items-center mt-2">
          <div className="flex-1 flex flex-col gap-px">
            <div className="h-px" style={{ backgroundColor: colors.secondary }} />
            <div className="h-px" style={{ backgroundColor: colors.secondary }} />
          </div>
          <span className="mx-2 text-[8px]" style={{ color: colors.secondary }}>
            &#x25C6; &#x25C6; &#x25C6;
          </span>
          <div className="flex-1 flex flex-col gap-px">
            <div className="h-px" style={{ backgroundColor: colors.secondary }} />
            <div className="h-px" style={{ backgroundColor: colors.secondary }} />
          </div>
        </div>
      </div>
    </div>
  );
}

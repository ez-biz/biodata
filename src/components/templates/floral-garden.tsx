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
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[8px]" style={{ color: colors.accent }}>
          &#x273F;
        </span>
        <div
          className="text-[10px] font-semibold tracking-wide"
          style={{ color: colors.primary }}
        >
          {title}
        </div>
        <div className="flex-1 h-px" style={{ backgroundColor: colors.accent + "60" }} />
      </div>
      <div className="space-y-0.5 pl-4">
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
        background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary}30 50%, ${colors.background} 100%)`,
        color: colors.text,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Corner floral decorations */}
      <div
        className="absolute top-3 left-3 text-lg leading-none pointer-events-none"
        style={{ color: colors.accent }}
      >
        &#x273F; &#x2740;
      </div>
      <div
        className="absolute top-3 right-3 text-lg leading-none pointer-events-none"
        style={{ color: colors.accent }}
      >
        &#x2740; &#x273F;
      </div>
      <div
        className="absolute bottom-3 left-3 text-lg leading-none pointer-events-none"
        style={{ color: colors.accent }}
      >
        &#x273E; &#x2740;
      </div>
      <div
        className="absolute bottom-3 right-3 text-lg leading-none pointer-events-none"
        style={{ color: colors.accent }}
      >
        &#x2740; &#x273E;
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          <div
            className="text-[10px] tracking-widest uppercase"
            style={{ color: colors.accent }}
          >
            &#x273F; Marriage Biodata &#x273F;
          </div>
        </div>

        {/* Photo in decorative circle */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-18 h-18 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              width: "64px",
              height: "64px",
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 0 0 3px ${colors.accent}40, 0 0 0 6px ${colors.primary}20`,
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
                className="w-7 h-7 opacity-30"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <h2
            className="text-sm font-bold mt-1.5 text-center"
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px]" style={{ color: colors.accent }}>
                  &#x273F;
                </span>
                <div
                  className="text-[10px] font-semibold tracking-wide"
                  style={{ color: colors.primary }}
                >
                  About & Lifestyle
                </div>
                <div className="flex-1 h-px" style={{ backgroundColor: colors.accent + "60" }} />
              </div>
              <div className="pl-4">
                {showAbout && (
                  <p
                    className="text-[9px] leading-tight mb-1 italic"
                    style={{ color: colors.text }}
                  >
                    &ldquo;{formData.lifestyle.aboutMe}&rdquo;
                  </p>
                )}
                {showHobbies && (
                  <p className="text-[9px] leading-tight">
                    <span
                      className="font-semibold"
                      style={{ color: colors.primary }}
                    >
                      Hobbies:{" "}
                    </span>
                    {formData.lifestyle.hobbies!.join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}

          <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          <Section title="Contact Details" fields={contactFields} colors={colors} />
        </div>

        {/* Bottom floral divider */}
        <div
          className="text-center text-[10px] mt-2 tracking-widest"
          style={{ color: colors.accent }}
        >
          &#x273E; &#x25CF; &#x273F; &#x25CF; &#x273E;
        </div>
      </div>
    </div>
  );
}

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
      <div
        className="text-[10px] font-semibold tracking-wide uppercase mb-1 pb-0.5 border-b"
        style={{ color: colors.primary, borderColor: colors.secondary }}
      >
        {title}
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

export function ChristianGraceTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("christian-grace")!;
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
      {/* Simple cross motif in corners */}
      {[
        "top-3 left-4",
        "top-3 right-4",
        "bottom-3 left-4",
        "bottom-3 right-4",
      ].map((pos, idx) => (
        <div
          key={idx}
          className={`absolute ${pos} pointer-events-none`}
          style={{ color: colors.accent }}
        >
          <div className="flex flex-col items-center text-[10px] leading-none">
            <div style={{ width: "1px", height: "6px", backgroundColor: colors.accent }} />
            <div className="flex items-center">
              <div style={{ width: "6px", height: "1px", backgroundColor: colors.accent }} />
              <div style={{ width: "1px", height: "1px" }} />
              <div style={{ width: "6px", height: "1px", backgroundColor: colors.accent }} />
            </div>
            <div style={{ width: "1px", height: "6px", backgroundColor: colors.accent }} />
          </div>
        </div>
      ))}

      {/* Elegant border */}
      <div
        className="absolute inset-3 border pointer-events-none"
        style={{ borderColor: colors.secondary }}
      />

      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-3">
          <div
            className="text-base font-semibold tracking-wider"
            style={{ color: colors.primary }}
          >
            &#x271D; In God&apos;s Grace &#x271D;
          </div>
          <div
            className="text-[10px] tracking-widest uppercase mt-0.5 font-light"
            style={{ color: colors.accent }}
          >
            Marriage Biodata
          </div>
        </div>

        {/* Photo top-center with name below */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-16 h-20 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              border: `1.5px solid ${colors.primary}`,
              backgroundColor: colors.secondary + "40",
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
              <div
                className="text-[10px] font-semibold tracking-wide uppercase mb-1 pb-0.5 border-b"
                style={{ color: colors.primary, borderColor: colors.secondary }}
              >
                About & Lifestyle
              </div>
              {showAbout && (
                <p className="text-[9px] leading-tight mb-1">
                  {formData.lifestyle.aboutMe}
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
          )}

          {horoscopeFields.length > 0 && (
            <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          )}
          <Section title="Contact Details" fields={contactFields} colors={colors} />
        </div>

        {/* Bottom motif */}
        <div className="text-center mt-2">
          <div
            className="text-[9px] italic font-light"
            style={{ color: colors.accent }}
          >
            &ldquo;What God has joined together, let no one separate.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="mb-2.5">
      <div
        className="text-[10px] font-bold tracking-wide uppercase mb-1 pb-0.5 flex items-center gap-2"
        style={{ color: colors.primary }}
      >
        <span className="flex gap-0.5" style={{ color: colors.secondary }}>
          {"*".split("").map((_, i) => (
            <span key={i} className="text-[6px]">&#x25CF;</span>
          ))}
          <span className="text-[6px]">&#x25CF;</span>
          <span className="text-[6px]">&#x25CF;</span>
        </span>
        {title}
        <span className="flex gap-0.5" style={{ color: colors.secondary }}>
          <span className="text-[6px]">&#x25CF;</span>
          <span className="text-[6px]">&#x25CF;</span>
          <span className="text-[6px]">&#x25CF;</span>
        </span>
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

export function SouthIndianClassicTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("south-indian-classic")!;
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
      className="w-full h-full p-5 flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Kolam-inspired dotted corner ornaments */}
      {[
        "top-2 left-2",
        "top-2 right-2",
        "bottom-2 left-2",
        "bottom-2 right-2",
      ].map((pos, idx) => (
        <div
          key={idx}
          className={`absolute ${pos} text-[10px] leading-none`}
          style={{ color: colors.secondary }}
        >
          <div className="flex flex-col items-center gap-px">
            <div className="flex gap-px">
              <span>&#x25CF;</span>
              <span>&#x25CF;</span>
              <span>&#x25CF;</span>
            </div>
            <div className="flex gap-px">
              <span>&#x25CF;</span>
              <span style={{ color: colors.primary }}>&#x25C6;</span>
              <span>&#x25CF;</span>
            </div>
            <div className="flex gap-px">
              <span>&#x25CF;</span>
              <span>&#x25CF;</span>
              <span>&#x25CF;</span>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative top border */}
      <div
        className="h-1 mb-2"
        style={{
          background: `repeating-linear-gradient(90deg, ${colors.primary} 0px, ${colors.primary} 4px, transparent 4px, transparent 8px)`,
        }}
      />

      {/* Header */}
      <div className="text-center mb-3">
        <div
          className="text-base font-bold tracking-wider"
          style={{ color: colors.primary }}
        >
          &#x0965; &#x0B93;&#x0BAE;&#x0BCD; &#x0965;
        </div>
        <div
          className="text-[10px] font-semibold tracking-wide mt-0.5"
          style={{ color: colors.secondary }}
        >
          &#x2726; &#x0BA4;&#x0BBF;&#x0BB0;&#x0BC1;&#x0BAE;&#x0BA3;
          &#x0BAA;&#x0BAF;&#x0BCB;&#x0B9F;&#x0BC7;&#x0B9F;&#x0BCD;&#x0B9F;&#x0BBE;
          &#x2726;
        </div>
      </div>

      {/* Photo on left + Name on right */}
      <div className="flex items-center gap-4 mb-3">
        <div
          className="w-16 h-20 rounded border-2 flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            borderColor: colors.primary,
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
        <div>
          <h2
            className="text-sm font-bold"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p className="text-[9px] mt-0.5" style={{ color: colors.text }}>
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

        {(showAbout || showHobbies) && (
          <div className="mb-2.5">
            <div
              className="text-[10px] font-bold tracking-wide uppercase mb-1 pb-0.5 flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <span className="flex gap-0.5" style={{ color: colors.secondary }}>
                <span className="text-[6px]">&#x25CF;</span>
                <span className="text-[6px]">&#x25CF;</span>
                <span className="text-[6px]">&#x25CF;</span>
              </span>
              About & Lifestyle
              <span className="flex gap-0.5" style={{ color: colors.secondary }}>
                <span className="text-[6px]">&#x25CF;</span>
                <span className="text-[6px]">&#x25CF;</span>
                <span className="text-[6px]">&#x25CF;</span>
              </span>
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

      {/* Decorative bottom border */}
      <div
        className="h-1 mt-2"
        style={{
          background: `repeating-linear-gradient(90deg, ${colors.primary} 0px, ${colors.primary} 4px, transparent 4px, transparent 8px)`,
        }}
      />
    </div>
  );
}

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
      <h3
        className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1 pb-0.5 border-b"
        style={{ color: colors.secondary, borderColor: colors.secondary + "30" }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="text-[9px] leading-snug">
            <span className="text-gray-400 text-[7px] uppercase tracking-wider">
              {f.label}
            </span>
            <div style={{ color: colors.text }}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhotoForwardTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("photo-forward")!;
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
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Large hero photo area — top 40% */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: "38%", backgroundColor: colors.primary }}
      >
        {profilePhotoUrl ? (
          <img
            src={profilePhotoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        {/* Name overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            background: `linear-gradient(transparent, ${colors.primary}E0)`,
          }}
        >
          <h1 className="text-lg font-bold text-white leading-tight">
            {pd.fullName || "Your Name"}
          </h1>
          <p className="text-[10px] text-white/70">
            {[pd.currentCity, pd.currentState].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="h-1 flex-shrink-0"
        style={{ backgroundColor: colors.secondary }}
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 overflow-hidden">
        {/* About */}
        {formData.lifestyle.aboutMe && (
          <p
            className="text-[9px] italic leading-relaxed mb-2.5 pb-2 border-b"
            style={{
              color: colors.text + "AA",
              borderColor: colors.secondary + "20",
            }}
          >
            &ldquo;{formData.lifestyle.aboutMe}&rdquo;
          </p>
        )}

        <Section title="Personal" fields={personalFields} colors={colors} />
        <Section title="Education & Career" fields={educationFields} colors={colors} />
        <Section title="Family" fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
          <div className="mb-2.5">
            <h3
              className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1"
              style={{ color: colors.secondary }}
            >
              Interests
            </h3>
            <p className="text-[9px]" style={{ color: colors.text }}>
              {formData.lifestyle.hobbies.join(" · ")}
            </p>
          </div>
        )}

        <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
        <Section title="Contact" fields={contactFields} colors={colors} />
      </div>
    </div>
  );
}

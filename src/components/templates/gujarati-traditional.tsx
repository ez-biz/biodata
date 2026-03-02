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
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ color: colors.secondary }}>✦</span>
        <span
          className="text-[9px] font-bold uppercase tracking-[0.15em]"
          style={{ color: colors.primary }}
        >
          {title}
        </span>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: colors.secondary + "40" }}
        />
      </div>
      <div className="space-y-0.5 pl-4">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-snug">
            <span
              className="w-20 flex-shrink-0 font-semibold"
              style={{ color: colors.primary + "CC" }}
            >
              {f.label}
            </span>
            <span className="mr-1.5" style={{ color: colors.secondary }}>:</span>
            <span style={{ color: colors.text }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GujaratiTraditionalTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("gujarati-traditional")!;
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
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Bandhani-inspired dotted border */}
      <div
        className="absolute inset-1.5 border-2 rounded-sm pointer-events-none"
        style={{
          borderColor: colors.primary + "30",
          borderStyle: "dashed",
        }}
      />

      {/* Inner decorative border */}
      <div
        className="absolute inset-3 border rounded-sm pointer-events-none"
        style={{ borderColor: colors.secondary + "40" }}
      />

      <div className="relative px-5 py-4 flex flex-col h-full">
        {/* Header — Shree Ganeshay Namah */}
        <div className="text-center mb-2">
          <div
            className="text-sm font-bold"
            style={{ color: colors.primary }}
          >
            ॥ श्री गणेशाय नमः ॥
          </div>
          <div
            className="text-[8px] tracking-[0.3em] uppercase mt-0.5"
            style={{ color: colors.secondary }}
          >
            ✦ शुभ विवाह बायोडाटा ✦
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.primary + "30" }} />
          <div className="flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rotate-45"
                style={{ backgroundColor: colors.secondary }}
              />
            ))}
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.primary + "30" }} />
        </div>

        {/* Photo + Name row */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-16 h-20 flex-shrink-0 rounded border-2 overflow-hidden flex items-center justify-center"
            style={{
              borderColor: colors.secondary,
              backgroundColor: colors.primary + "08",
            }}
          >
            {profilePhotoUrl ? (
              <img src={profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-8 h-8 opacity-20" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <div>
            <h1
              className="text-sm font-bold"
              style={{ color: colors.primary }}
            >
              {pd.fullName || "Your Name"}
            </h1>
            {pd.currentCity && (
              <p className="text-[9px] text-gray-500">
                {pd.currentCity}{pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1">
          <Section title="Personal Details" fields={personalFields} colors={colors} />
          <Section title="Education & Career" fields={educationFields} colors={colors} />
          <Section title="Family Details" fields={familyFields} colors={colors} />

          {formData.lifestyle.aboutMe && (
            <div className="mb-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ color: colors.secondary }}>✦</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: colors.primary }}>About</span>
                <div className="flex-1 h-px" style={{ backgroundColor: colors.secondary + "40" }} />
              </div>
              <p className="text-[9px] leading-relaxed pl-4" style={{ color: colors.text }}>
                {formData.lifestyle.aboutMe}
              </p>
            </div>
          )}

          <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          <Section title="Contact" fields={contactFields} colors={colors} />
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.primary + "30" }} />
          <div className="flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.secondary }} />
            ))}
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.primary + "30" }} />
        </div>
      </div>
    </div>
  );
}

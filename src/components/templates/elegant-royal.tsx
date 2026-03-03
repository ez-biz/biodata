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

/**
 * Elegant two-column grid — centered section title flanked by decorative lines,
 * fields in a 2-col grid with label as a refined small-caps header above value.
 */
function Section({
  title,
  fields,
  colors,
}: {
  title: string;
  fields: FieldRow[];
  colors: { primary: string; secondary: string; text: string; background: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: colors.secondary }}
        />
        <h3
          className="text-[11px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
          style={{ color: colors.secondary }}
        >
          {title}
        </h3>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: colors.secondary }}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: colors.secondary }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug"
              style={{ color: colors.text }}
            >
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ElegantRoyalTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("elegant-royal")!;
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
      className="w-full flex flex-col relative"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Palatino', serif",
      }}
    >
      {/* Decorative corner borders */}
      <div
        className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2"
        style={{ borderColor: colors.secondary }}
      />
      <div
        className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2"
        style={{ borderColor: colors.secondary }}
      />
      <div
        className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2"
        style={{ borderColor: colors.secondary }}
      />
      <div
        className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2"
        style={{ borderColor: colors.secondary }}
      />

      <div className="flex-1 px-8 py-7 flex flex-col">
        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="text-xs tracking-[0.3em] uppercase mb-1.5"
            style={{ color: colors.secondary }}
          >
            ✦ Marriage Biodata ✦
          </div>
          <h1
            className="text-xl font-bold"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-sm mt-1"
              style={{ color: colors.text + "99" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Photo */}
        <div className="flex justify-center mb-5">
          <div
            className="w-24 h-28 rounded-md border-2 overflow-hidden flex items-center justify-center"
            style={{
              borderColor: colors.secondary,
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
                className="w-10 h-10 opacity-20"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        </div>

        {/* About */}
        {formData.lifestyle.aboutMe && (
          <div
            className="text-center mb-4 px-6"
          >
            <p
              className="text-[13px] italic leading-relaxed"
              style={{ color: colors.text + "BB" }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          </div>
        )}

        {/* Sections */}
        <div className="flex-1 space-y-1">
          <Section title="Personal" fields={personalFields} colors={colors} />
          <Section title="Education & Career" fields={educationFields} colors={colors} />
          <Section title="Family" fields={familyFields} colors={colors} />

          {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: colors.secondary }}
                />
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: colors.secondary }}
                >
                  Interests
                </h3>
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: colors.secondary }}
                />
              </div>
              <p className="text-[13px] text-center" style={{ color: colors.text }}>
                {formData.lifestyle.hobbies.join(" • ")}
              </p>
            </div>
          )}

          <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          <Section title="Contact" fields={contactFields} colors={colors} />
        </div>
      </div>
    </div>
  );
}

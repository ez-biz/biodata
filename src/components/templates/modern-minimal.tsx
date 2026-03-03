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
 * Clean two-column table layout — label right-aligned on left,
 * value left-aligned on right, with a subtle dot separator.
 * Fills the full width evenly.
 */
function SectionTable({
  title,
  fields,
  colors,
}: {
  title: string;
  fields: FieldRow[];
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;

  // Split fields into two columns for side-by-side layout
  const mid = Math.ceil(fields.length / 2);
  const leftCol = fields.slice(0, mid);
  const rightCol = fields.slice(mid);

  const renderField = (f: FieldRow) => (
    <div key={f.label} className="flex items-baseline gap-3 py-1">
      <span
        className="text-[11px] uppercase tracking-wider font-medium text-right flex-shrink-0"
        style={{ color: colors.primary + "99", width: "90px" }}
      >
        {f.label}
      </span>
      <span
        className="text-[13px] leading-snug flex-1"
        style={{ color: colors.text }}
      >
        {f.value}
      </span>
    </div>
  );

  return (
    <div className="mb-5">
      <h3
        className="text-xs font-semibold uppercase tracking-[0.15em] mb-2.5"
        style={{ color: colors.primary }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-6">
        <div className="space-y-0.5 border-l-2 pl-3" style={{ borderColor: colors.secondary }}>
          {leftCol.map(renderField)}
        </div>
        {rightCol.length > 0 && (
          <div className="space-y-0.5 border-l-2 pl-3" style={{ borderColor: colors.secondary }}>
            {rightCol.map(renderField)}
          </div>
        )}
      </div>
    </div>
  );
}

export function ModernMinimalTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("modern-minimal")!;
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
      className="w-full flex flex-col"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header bar */}
      <div
        className="px-8 py-6 flex items-center gap-6"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          className="w-20 h-20 rounded-full border-2 border-white/30 flex-shrink-0 overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-7 h-7 text-white/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">
            {pd.fullName || "Your Name"}
          </h1>
          <p className="text-sm text-white/70 mt-0.5">
            {[pd.currentCity, pd.currentState].filter(Boolean).join(", ")}
          </p>
          {/* Compact info bar */}
          <div className="flex flex-wrap gap-3 mt-2">
            {pd.religion && (
              <span className="text-[10px] text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                {pd.religion}
              </span>
            )}
            {formData.educationCareer.highestEducation && (
              <span className="text-[10px] text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                {formData.educationCareer.highestEducation}
              </span>
            )}
            {formData.educationCareer.occupation && (
              <span className="text-[10px] text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full">
                {formData.educationCareer.occupation}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6">
        {/* About */}
        {formData.lifestyle.aboutMe && (
          <div className="mb-5 py-3 px-4 rounded-lg" style={{ backgroundColor: colors.secondary + "30" }}>
            <p
              className="text-[13px] leading-relaxed italic"
              style={{ color: colors.text + "CC" }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          </div>
        )}

        <SectionTable title="Personal" fields={personalFields} colors={colors} />

        <div className="h-px my-3" style={{ backgroundColor: colors.secondary }} />

        <SectionTable title="Education & Career" fields={educationFields} colors={colors} />

        <div className="h-px my-3" style={{ backgroundColor: colors.secondary }} />

        <SectionTable title="Family" fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
          <>
            <div className="h-px my-3" style={{ backgroundColor: colors.secondary }} />
            <div className="mb-5">
              <h3
                className="text-xs font-semibold uppercase tracking-[0.15em] mb-2.5"
                style={{ color: colors.primary }}
              >
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.lifestyle.hobbies.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.primary,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {horoscopeFields.length > 0 && (
          <>
            <div className="h-px my-3" style={{ backgroundColor: colors.secondary }} />
            <SectionTable title="Horoscope" fields={horoscopeFields} colors={colors} />
          </>
        )}

        {contactFields.length > 0 && (
          <>
            <div className="h-px my-3" style={{ backgroundColor: colors.secondary }} />
            <SectionTable title="Contact" fields={contactFields} colors={colors} />
          </>
        )}
      </div>

      {/* Footer accent */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        }}
      />
    </div>
  );
}

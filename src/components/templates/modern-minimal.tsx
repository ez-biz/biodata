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
    <div className="mb-3">
      <h3
        className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
        style={{ color: colors.primary }}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="text-[10px] leading-snug">
            <span className="text-gray-400 block text-[8px]">{f.label}</span>
            <span style={{ color: colors.text }}>{f.value}</span>
          </div>
        ))}
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
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header bar */}
      <div
        className="px-6 py-4 flex items-center gap-4"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          className="w-14 h-14 rounded-full border-2 border-white/30 flex-shrink-0 overflow-hidden flex items-center justify-center"
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
        <div>
          <h1 className="text-base font-bold text-white">
            {pd.fullName || "Your Name"}
          </h1>
          <p className="text-[10px] text-white/70">
            {[pd.currentCity, pd.currentState].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 space-y-1">
        {/* About */}
        {formData.lifestyle.aboutMe && (
          <div className="mb-3">
            <p
              className="text-[10px] leading-relaxed italic"
              style={{ color: colors.text + "CC" }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          </div>
        )}

        <Section title="Personal" fields={personalFields} colors={colors} />

        <div
          className="h-px my-2"
          style={{ backgroundColor: colors.secondary }}
        />

        <Section title="Education & Career" fields={educationFields} colors={colors} />

        <div
          className="h-px my-2"
          style={{ backgroundColor: colors.secondary }}
        />

        <Section title="Family" fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
          <>
            <div
              className="h-px my-2"
              style={{ backgroundColor: colors.secondary }}
            />
            <div className="mb-3">
              <h3
                className="text-[10px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: colors.primary }}
              >
                Interests
              </h3>
              <div className="flex flex-wrap gap-1">
                {formData.lifestyle.hobbies.map((h) => (
                  <span
                    key={h}
                    className="text-[8px] px-2 py-0.5 rounded-full"
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
            <div
              className="h-px my-2"
              style={{ backgroundColor: colors.secondary }}
            />
            <Section title="Horoscope" fields={horoscopeFields} colors={colors} />
          </>
        )}

        {contactFields.length > 0 && (
          <>
            <div
              className="h-px my-2"
              style={{ backgroundColor: colors.secondary }}
            />
            <Section title="Contact" fields={contactFields} colors={colors} />
          </>
        )}
      </div>

      {/* Footer accent */}
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        }}
      />
    </div>
  );
}

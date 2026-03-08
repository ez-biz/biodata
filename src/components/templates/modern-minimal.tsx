"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { useI18n } from "@/lib/i18n";
import {
  getPersonalFields,
  getEducationFields,
  getFamilyFields,
  getContactFields,
  getHoroscopeFields,
  getLabel,
  FieldRow,
  resolveTemplateColors,
  resolveTemplateFontFamily,
  resolveTemplateFontSize,
} from "./template-utils";
import { CustomColorOverrides, FontFamilyOption, FontSizeOption } from "@/lib/types/biodata";
import { MinimalDivider } from "./ornaments";

interface Props {
  colorSchemeId: string;
  customColors?: CustomColorOverrides | null;
  customFontFamily?: FontFamilyOption | null;
  customFontSize?: FontSizeOption | null;
}

/**
 * Two-column table layout with left border accent.
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

  const mid = Math.ceil(fields.length / 2);
  const leftCol = fields.slice(0, mid);
  const rightCol = fields.slice(mid);

  const renderField = (f: FieldRow) => (
    <div key={f.label} className="flex items-baseline gap-3 py-1">
      <span
        className="text-[10px] uppercase tracking-wider font-medium text-right flex-shrink-0"
        style={{ color: colors.primary + "80", width: "85px" }}
      >
        {f.label}
      </span>
      <span
        className="text-[13px] leading-snug flex-1 font-medium"
        style={{ color: colors.text }}
      >
        {f.value}
      </span>
    </div>
  );

  return (
    <div className="mb-5">
      <h3
        className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2.5"
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

export function ModernMinimalTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("modern-minimal", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-body), 'Helvetica Neue', sans-serif");
  const fontSizeZoom = resolveTemplateFontSize(customFontSize);

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData, locale);
  const educationFields = getEducationFields(formData, locale);
  const familyFields = getFamilyFields(formData, locale);
  const contactFields = getContactFields(formData, locale);
  const horoscopeFields = getHoroscopeFields(formData, locale);

  return (
    <div
      className="w-full flex flex-col"
      style={{
        minHeight: `${1123}px`,
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Header bar with subtle pattern overlay */}
      <div
        className="px-8 py-6 flex items-center gap-6 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Subtle geometric pattern in header */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex items-center gap-6 w-full">
          {/* Photo with ring frame */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full border border-white/20" />
            <div
              className="w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
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
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-white tracking-wide">
              {pd.fullName || "Your Name"}
            </h1>
            <p className="text-sm text-white/60 mt-0.5">
              {[pd.currentCity, pd.currentState].filter(Boolean).join(", ")}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {pd.religion && (
                <span className="text-[10px] text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {pd.religion}
                </span>
              )}
              {formData.educationCareer.highestEducation && (
                <span className="text-[10px] text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {formData.educationCareer.highestEducation}
                </span>
              )}
              {formData.educationCareer.occupation && (
                <span className="text-[10px] text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                  {formData.educationCareer.occupation}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-8 py-6">
        {/* About */}
        {formData.lifestyle.aboutMe && (
          <div className="mb-5 py-3 px-4 rounded-lg" style={{ backgroundColor: colors.secondary + "20" }}>
            <p
              className="text-[13px] leading-relaxed italic"
              style={{ color: colors.text + "CC" }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          </div>
        )}

        <SectionTable title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />

        <MinimalDivider color={colors.secondary} className="my-3" />

        <SectionTable title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />

        <MinimalDivider color={colors.secondary} className="my-3" />

        <SectionTable title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
          <>
            <MinimalDivider color={colors.secondary} className="my-3" />
            <div className="mb-5">
              <h3
                className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2.5"
                style={{ color: colors.primary }}
              >
                {getLabel("interests", locale)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {formData.lifestyle.hobbies.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-3 py-1 rounded-full font-medium"
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
            <MinimalDivider color={colors.secondary} className="my-3" />
            <SectionTable title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
          </>
        )}

        {contactFields.length > 0 && (
          <>
            <MinimalDivider color={colors.secondary} className="my-3" />
            <SectionTable title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
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

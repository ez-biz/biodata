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
import { FloralCorner, FlourishDivider } from "./ornaments";

interface Props {
  colorSchemeId: string;
  customColors?: CustomColorOverrides | null;
  customFontFamily?: FontFamilyOption | null;
  customFontSize?: FontSizeOption | null;
}

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
          style={{ color: colors.secondary, fontFamily: "var(--font-display), Georgia, serif" }}
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
              className="text-[9px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: colors.secondary }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug font-medium"
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

export function ElegantRoyalTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("elegant-royal", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-serif), Georgia, 'Palatino', serif");
  const fontSizeZoom = resolveTemplateFontSize(customFontSize);

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData, locale);
  const educationFields = getEducationFields(formData, locale);
  const familyFields = getFamilyFields(formData, locale);
  const contactFields = getContactFields(formData, locale);
  const horoscopeFields = getHoroscopeFields(formData, locale);

  return (
    <div
      className="w-full flex flex-col relative"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Floral corner ornaments */}
      <div className="absolute top-2 left-2">
        <FloralCorner color={colors.secondary} opacity={0.5} size={120} />
      </div>
      <div className="absolute top-2 right-2" style={{ transform: "scaleX(-1)" }}>
        <FloralCorner color={colors.secondary} opacity={0.5} size={120} />
      </div>
      <div className="absolute bottom-2 left-2" style={{ transform: "scaleY(-1)" }}>
        <FloralCorner color={colors.secondary} opacity={0.5} size={120} />
      </div>
      <div className="absolute bottom-2 right-2" style={{ transform: "scale(-1, -1)" }}>
        <FloralCorner color={colors.secondary} opacity={0.5} size={120} />
      </div>

      {/* Decorative border lines */}
      <div
        className="absolute inset-[10px] border"
        style={{ borderColor: `${colors.secondary}30` }}
      />
      <div
        className="absolute inset-[14px] border"
        style={{ borderColor: `${colors.primary}15` }}
      />

      <div className="flex-1 px-8 py-7 flex flex-col relative z-10">
        {/* Header */}
        <div className="text-center mb-5">
          <div
            className="text-[11px] tracking-[0.3em] uppercase mb-1.5"
            style={{ color: colors.secondary }}
          >
            ✦ Marriage Biodata ✦
          </div>
          <h1
            className="text-xl font-bold"
            style={{ color: colors.primary, fontFamily: "var(--font-display), Georgia, serif" }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-sm mt-1"
              style={{ color: colors.text + "88" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
          {/* Ornamental flourish under name */}
          <FlourishDivider color={colors.secondary} width={300} className="mx-auto mt-2" />
        </div>

        {/* Photo with decorative frame */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            {/* Outer decorative ring */}
            <div
              className="absolute -inset-2 rounded-md"
              style={{ border: `1px solid ${colors.secondary}40` }}
            />
            <div
              className="absolute -inset-1 rounded-md"
              style={{ border: `1.5px solid ${colors.primary}20` }}
            />
            <div
              className="w-24 h-28 rounded-md overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: colors.primary + "06" }}
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-10 h-10 opacity-15"
                  style={{ color: colors.primary }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        {formData.lifestyle.aboutMe && (
          <div className="text-center mb-4 px-6">
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
          <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />
          <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />
          <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

          {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: colors.secondary }}
                />
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: colors.secondary, fontFamily: "var(--font-display), Georgia, serif" }}
                >
                  {getLabel("interests", locale)}
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

          <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
          <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
        </div>

        {/* Bottom flourish */}
        <FlourishDivider color={colors.secondary} width={250} className="mx-auto mt-3" />
      </div>
    </div>
  );
}

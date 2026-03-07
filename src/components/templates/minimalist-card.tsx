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

function Section({
  title,
  fields,
  colors,
}: {
  title: string;
  fields: FieldRow[];
  colors: { primary: string; accent: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <div
        className="text-[10px] tracking-[0.18em] uppercase mb-1.5 font-medium"
        style={{ color: colors.accent, fontFamily: "var(--font-body)" }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col">
            <span
              className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
              style={{ color: colors.primary, opacity: 0.6, fontFamily: "var(--font-body)" }}
            >
              {f.label}
            </span>
            <span
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-body)" }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MinimalistCardTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("minimalist-card", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-body)");
  const fontSizeZoom = resolveTemplateFontSize(customFontSize);

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData, locale);
  const educationFields = getEducationFields(formData, locale);
  const familyFields = getFamilyFields(formData, locale);
  const contactFields = getContactFields(formData, locale);
  const horoscopeFields = getHoroscopeFields(formData, locale);

  const showAbout = formData.lifestyle.aboutMe;
  const showHobbies =
    formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0;

  return (
    <div
      className="w-full h-full p-6 flex flex-col"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Header: name + location */}
      <div className="mb-2 flex items-end justify-between">
        <div>
          <h1
            className="text-xl font-light tracking-wide"
            style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p
              className="text-[11px] tracking-wider uppercase font-light mt-0.5"
              style={{ color: colors.accent }}
            >
              {pd.currentCity}
              {pd.currentState ? ` / ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Photo — small, right-aligned */}
        {profilePhotoUrl && (
          <div
            className="w-14 flex-shrink-0 overflow-hidden"
            style={{
              aspectRatio: "4/5",
              borderLeft: `2px solid ${colors.accent}30`,
              paddingLeft: "8px",
            }}
          >
            <img
              src={profilePhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(10%)" }}
            />
          </div>
        )}
      </div>

      {/* Top accent line */}
      <div
        className="h-[2px] mb-1"
        style={{ backgroundColor: colors.primary, opacity: 0.15 }}
      />
      <div
        className="h-px mb-4"
        style={{ backgroundColor: colors.accent, opacity: 0.4 }}
      />

      {/* Content sections */}
      <div className="flex-1 space-y-0">
        <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

        {(showAbout || showHobbies) && (
          <>
            <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />
            <div className="mb-3">
              <div
                className="text-[10px] tracking-[0.18em] uppercase mb-1.5 font-medium"
                style={{ color: colors.accent, fontFamily: rootFont }}
              >
                {getLabel("about", locale)}
              </div>
              {showAbout && (
                <p
                  className="text-[13px] leading-relaxed mb-1"
                  style={{ color: colors.text, fontFamily: rootFont }}
                >
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <div className="flex flex-col mt-1">
                  <span
                    className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
                    style={{ color: colors.primary, opacity: 0.6 }}
                  >
                    {getLabel("interests", locale)}
                  </span>
                  <span className="text-[13px] leading-snug">
                    {formData.lifestyle.hobbies!.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {horoscopeFields.length > 0 && (
          <>
            <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />
            <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
          </>
        )}

        <MinimalDivider color={colors.accent} width={340} className="mx-auto my-1.5" />

        <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
      </div>

      {/* Bottom accent lines */}
      <div
        className="h-px mt-4"
        style={{ backgroundColor: colors.accent, opacity: 0.4 }}
      />
      <div
        className="h-[2px] mt-1"
        style={{ backgroundColor: colors.primary, opacity: 0.15 }}
      />
    </div>
  );
}

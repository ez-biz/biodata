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
import { OrnamentalFrame, FlourishDivider, getDeityIcon } from "./ornaments";

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
  colors: { primary: string; secondary: string; text: string; accent: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <div
        className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5"
        style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
      >
        {title}
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col">
            <span
              className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
              style={{ color: colors.accent, fontFamily: "var(--font-serif)" }}
            >
              {f.label}
            </span>
            <span
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-serif)" }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChristianGraceTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("christian-grace", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-serif)");
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
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        minHeight: `${1123}px`,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Ornamental border frame */}
      <OrnamentalFrame
        color={colors.primary}
        secondaryColor={colors.accent}
      />

      <div className="p-7 flex flex-col flex-1 relative z-10">
        {/* Header with deity icon */}
        <div className="flex flex-col items-center mb-3">
          {(() => {
            const deity = getDeityIcon(pd.deityImageId);
            if (deity) {
              return (
                <>
                  <deity.icon
                    color={colors.primary}
                    size={28}
                    className="mb-1"
                  />
                  {deity.mantra && (
                    <div
                      className="text-base font-semibold tracking-wider"
                      style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
                    >
                      {deity.mantra}
                    </div>
                  )}
                </>
              );
            }
            return null;
          })()}
          <div
            className="text-[10px] tracking-[0.2em] uppercase mt-0.5 font-light"
            style={{ color: colors.accent, fontFamily: rootFont }}
          >
            Marriage Biodata
          </div>
        </div>

        <FlourishDivider color={colors.accent} width={280} className="mx-auto mb-3" />

        {/* Photo top-center with name below */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-16 h-20 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              border: `1.5px solid ${colors.primary}`,
              boxShadow: `0 0 0 3px ${colors.accent}15, 0 2px 8px ${colors.primary}10`,
              backgroundColor: colors.secondary + "30",
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
            className="text-base font-bold mt-2 text-center tracking-wide"
            style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p
              className="text-[11px] tracking-wider mt-0.5"
              style={{ color: colors.text, fontFamily: rootFont }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-0">
          <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

          {(showAbout || showHobbies) && (
            <>
              <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />
              <div className="mb-3">
                <div
                  className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1.5"
                  style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
                >
                  {getLabel("aboutLifestyle", locale)}
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
                      style={{ color: colors.accent }}
                    >
                      Hobbies
                    </span>
                    <span
                      className="text-[13px] leading-snug"
                      style={{ fontFamily: rootFont }}
                    >
                      {formData.lifestyle.hobbies!.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {horoscopeFields.length > 0 && (
            <>
              <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />
              <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
            </>
          )}

          <FlourishDivider color={colors.accent} width={300} className="mx-auto my-1" />

          <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-2">
          <FlourishDivider color={colors.accent} width={200} className="mx-auto mb-1.5" />
          <div
            className="text-[10px] italic font-light"
            style={{ color: colors.accent, fontFamily: rootFont }}
          >
            &ldquo;What God has joined together, let no one separate.&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

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
import {
  WeddingCardBorder,
  DiamondDivider,
  MandalaBg,
  getDeityIcon,
} from "./ornaments";

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
    <div className="mb-2.5">
      <div className="mb-1.5">
        <h3
          className="text-[11px] font-bold tracking-wider uppercase text-center mb-0.5"
          style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <DiamondDivider color={colors.secondary} width={400} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] uppercase tracking-wider font-medium leading-tight"
              style={{ color: colors.primary + "90", fontFamily: "var(--font-display)" }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-body)" }}
            >
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RajasthaniRoyalTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("rajasthani-royal", colorSchemeId, customColors);
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
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Mandala background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <MandalaBg color={colors.primary} opacity={0.04} size={500} />
      </div>

      {/* Wedding card border */}
      <WeddingCardBorder color={colors.primary} secondaryColor={colors.secondary} />

      <div className="p-7 flex flex-col flex-1 relative z-10">
        {/* Header with deity icon */}
        <div className="text-center mb-2">
          {(() => {
            const deity = getDeityIcon(pd.deityImageId);
            if (deity) {
              return (
                <>
                  <div className="flex justify-center mb-1">
                    <deity.icon color={colors.primary} size={44} />
                  </div>
                  {deity.mantra && (
                    <div
                      className="text-base font-bold tracking-wider"
                      style={{ color: colors.primary, fontFamily: "var(--font-devanagari)" }}
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
            className="text-[10px] font-semibold tracking-widest mt-0.5"
            style={{ color: colors.secondary, fontFamily: "var(--font-devanagari)" }}
          >
            &#x2726; &#x0936;&#x0941;&#x092D;
            &#x0935;&#x093F;&#x0935;&#x093E;&#x0939; &#x2726;
          </div>
        </div>

        <DiamondDivider color={colors.primary} width={400} className="w-full mb-2" />

        {/* Photo centered, name below */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-[68px] h-[84px] flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              border: `2px solid ${colors.primary}`,
              backgroundColor: colors.primary + "08",
              boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.secondary}50`,
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
                className="w-8 h-8 opacity-25"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <h2
            className="text-sm font-bold mt-1.5 tracking-wide text-center"
            style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p
              className="text-[11px]"
              style={{ color: colors.text + "90", fontFamily: rootFont }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-1">
          <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />
          <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />
          <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

          {(showAbout || showHobbies) && (
            <div className="mb-2.5">
              <div className="mb-1.5">
                <h3
                  className="text-[11px] font-bold tracking-wider uppercase text-center mb-0.5"
                  style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
                >
                  {getLabel("aboutLifestyle", locale)}
                </h3>
                <DiamondDivider color={colors.secondary} width={400} className="w-full" />
              </div>
              {showAbout && (
                <p
                  className="text-[13px] leading-relaxed mb-1"
                  style={{ fontFamily: rootFont }}
                >
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: rootFont }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: colors.primary, fontFamily: "var(--font-display)" }}
                  >
                    Hobbies:{" "}
                  </span>
                  {formData.lifestyle.hobbies!.join(", ")}
                </p>
              )}
            </div>
          )}

          <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
          <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
        </div>

        {/* Bottom ornament */}
        <div className="mt-2">
          <DiamondDivider color={colors.primary} width={400} className="w-full" />
        </div>
      </div>
    </div>
  );
}

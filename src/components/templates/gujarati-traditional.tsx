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
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-4">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "50" }} />
        <h3
          className="text-[11px] font-bold uppercase tracking-[0.15em] flex-shrink-0"
          style={{
            color: colors.primary,
            fontFamily: "var(--font-devanagari), Georgia, serif",
          }}
        >
          {title}
        </h3>
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "50" }} />
      </div>
      {/* 2-column grid: label above value */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: colors.secondary }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug font-medium"
              style={{
                color: colors.text,
                fontFamily: "var(--font-serif), Georgia, serif",
              }}
            >
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GujaratiTraditionalTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("gujarati-traditional", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-serif), Georgia, serif");
  const fontSizeZoom = resolveTemplateFontSize(customFontSize);

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData, locale);
  const educationFields = getEducationFields(formData, locale);
  const familyFields = getFamilyFields(formData, locale);
  const contactFields = getContactFields(formData, locale);
  const horoscopeFields = getHoroscopeFields(formData, locale);

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
      {/* Wedding card ornamental border */}
      <WeddingCardBorder
        color={colors.primary}
        secondaryColor={colors.secondary}
      />

      <div className="relative px-6 py-5 flex flex-col h-full">
        {/* Deity icon header */}
        {(() => {
          const deity = getDeityIcon(pd.deityImageId);
          if (!deity) return null;
          return (
            <>
              <div className="text-center mb-1">
                <deity.icon
                  color={colors.primary}
                  size={40}
                  className="mx-auto opacity-80"
                />
              </div>
              <div className="text-center mb-1.5">
                {deity.mantra && (
                  <div
                    className="text-[14px] font-bold"
                    style={{
                      color: colors.primary,
                      fontFamily: "var(--font-devanagari), Georgia, serif",
                    }}
                  >
                    {deity.mantra}
                  </div>
                )}
                <div
                  className="text-[9px] tracking-[0.3em] uppercase mt-0.5"
                  style={{
                    color: colors.secondary,
                    fontFamily: "var(--font-devanagari), Georgia, serif",
                  }}
                >
                  शुभ विवाह बायोडाटा
                </div>
              </div>
            </>
          );
        })()}

        {/* Diamond divider after header */}
        <DiamondDivider
          color={colors.secondary}
          width={360}
          className="mx-auto mb-3"
        />

        {/* Photo + Name row */}
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-[72px] h-[90px] flex-shrink-0 rounded border-2 overflow-hidden flex items-center justify-center"
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
              className="text-[16px] font-bold leading-tight"
              style={{
                color: colors.primary,
                fontFamily: "var(--font-display), Georgia, serif",
              }}
            >
              {pd.fullName || "Your Name"}
            </h1>
            {pd.currentCity && (
              <p
                className="text-[11px] mt-0.5"
                style={{
                  color: colors.text + "88",
                  fontFamily: rootFont,
                }}
              >
                {pd.currentCity}{pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1">
          <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />

          <DiamondDivider color={colors.secondary + "60"} width={280} className="mx-auto mb-3" />

          <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />

          <DiamondDivider color={colors.secondary + "60"} width={280} className="mx-auto mb-3" />

          <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

          {formData.lifestyle.aboutMe && (
            <>
              <DiamondDivider color={colors.secondary + "60"} width={280} className="mx-auto mb-3" />
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "50" }} />
                  <h3
                    className="text-[11px] font-bold uppercase tracking-[0.15em] flex-shrink-0"
                    style={{
                      color: colors.primary,
                      fontFamily: "var(--font-devanagari), Georgia, serif",
                    }}
                  >
                    {getLabel("about", locale)}
                  </h3>
                  <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "50" }} />
                </div>
                <p
                  className="text-[13px] leading-relaxed italic text-center"
                  style={{
                    color: colors.text,
                    fontFamily: rootFont,
                  }}
                >
                  {formData.lifestyle.aboutMe}
                </p>
              </div>
            </>
          )}

          {horoscopeFields.length > 0 && (
            <>
              <DiamondDivider color={colors.secondary + "60"} width={280} className="mx-auto mb-3" />
              <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
            </>
          )}

          {contactFields.length > 0 && (
            <>
              <DiamondDivider color={colors.secondary + "60"} width={280} className="mx-auto mb-3" />
              <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
            </>
          )}
        </div>

        {/* Bottom ornament */}
        <DiamondDivider
          color={colors.secondary}
          width={360}
          className="mx-auto mt-2"
        />
      </div>
    </div>
  );
}

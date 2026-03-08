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
  OrnamentalFrame,
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
      {/* Section title with dots */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors.secondary }}
        />
        <h3
          className="text-[11px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
          style={{
            color: colors.primary,
            fontFamily: "var(--font-display), Georgia, serif",
          }}
        >
          {title}
        </h3>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: colors.primary + "25" }}
        />
      </div>
      {/* 2-column grid: label above value */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 pl-3">
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

export function SikhAnandTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("sikh-anand", colorSchemeId, customColors);
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
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        minHeight: `${1123}px`,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Ornamental frame border with corner flourishes */}
      <OrnamentalFrame
        color={colors.primary}
        secondaryColor={colors.secondary}
      />

      <div className="relative px-7 py-5 flex flex-col h-full">
        {/* Deity icon header */}
        {(() => {
          const deity = getDeityIcon(pd.deityImageId);
          if (deity) {
            return (
              <>
                <div className="text-center mb-1">
                  <deity.icon
                    color={colors.primary}
                    size={38}
                    className="mx-auto opacity-75"
                  />
                </div>
                <div className="text-center mb-1.5">
                  {deity.mantra && (
                    <div
                      className="text-[13px] font-bold"
                      style={{
                        color: colors.primary,
                        fontFamily: "var(--font-display), Georgia, serif",
                      }}
                    >
                      {deity.mantra}
                    </div>
                  )}
                  <div
                    className="text-[9px] tracking-[0.2em] uppercase mt-1"
                    style={{
                      color: colors.secondary,
                      fontFamily: "var(--font-display), Georgia, serif",
                    }}
                  >
                    Anand Karaj Biodata
                  </div>
                </div>
              </>
            );
          }
          return (
            <div className="text-center mb-1.5">
              <div
                className="text-[9px] tracking-[0.2em] uppercase"
                style={{
                  color: colors.secondary,
                  fontFamily: "var(--font-display), Georgia, serif",
                }}
              >
                Anand Karaj Biodata
              </div>
            </div>
          );
        })()}

        {/* Diamond divider */}
        <DiamondDivider
          color={colors.secondary}
          width={340}
          className="mx-auto mb-3"
        />

        {/* Photo + Name */}
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-[68px] h-[85px] flex-shrink-0 rounded border-2 overflow-hidden flex items-center justify-center"
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
                className="w-8 h-8 opacity-20"
                style={{ color: colors.primary }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
                style={{ color: colors.text + "88" }}
              >
                {pd.currentCity}
                {pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1">
          {formData.lifestyle.aboutMe && (
            <p
              className="text-[13px] italic leading-relaxed mb-3 pl-3 text-center"
              style={{
                color: colors.text + "AA",
                fontFamily: "var(--font-serif), Georgia, serif",
              }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          )}

          <Section
            title={getLabel("personalDetails", locale)}
            fields={personalFields}
            colors={colors}
          />

          <DiamondDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />

          <Section
            title={getLabel("educationCareer", locale)}
            fields={educationFields}
            colors={colors}
          />

          <DiamondDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />

          <Section
            title={getLabel("familyDetails", locale)}
            fields={familyFields}
            colors={colors}
          />

          {formData.lifestyle.hobbies &&
            formData.lifestyle.hobbies.length > 0 && (
              <>
                <DiamondDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />
                <div className="mb-4 pl-3">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
                    style={{
                      color: colors.primary,
                      fontFamily: "var(--font-display), Georgia, serif",
                    }}
                  >
                    {getLabel("interests", locale)}
                  </h3>
                  <p
                    className="text-[13px]"
                    style={{
                      color: colors.text,
                      fontFamily: "var(--font-serif), Georgia, serif",
                    }}
                  >
                    {formData.lifestyle.hobbies.join(", ")}
                  </p>
                </div>
              </>
            )}

          {horoscopeFields.length > 0 && (
            <>
              <DiamondDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />
              <Section
                title={getLabel("horoscope", locale)}
                fields={horoscopeFields}
                colors={colors}
              />
            </>
          )}

          {contactFields.length > 0 && (
            <>
              <DiamondDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />
              <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-2">
          <DiamondDivider
            color={colors.secondary}
            width={340}
            className="mx-auto mb-1"
          />
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{
              color: colors.secondary,
              fontFamily: "var(--font-display), Georgia, serif",
            }}
          >
            ਵਾਹਿਗੁਰੂ
          </span>
        </div>
      </div>
    </div>
  );
}

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
import { WeddingCardBorder, LotusDivider, getDeityIcon } from "./ornaments";

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
    <div className="mb-2.5">
      <div className="mb-1.5">
        <h3
          className="text-[11px] font-bold tracking-wider uppercase text-center mb-0.5"
          style={{ color: colors.primary, fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h3>
        <LotusDivider color={colors.secondary} width={400} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] uppercase tracking-wider font-medium leading-tight"
              style={{ color: colors.primary + "90", fontFamily: "var(--font-serif)" }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug"
              style={{ color: colors.text, fontFamily: "var(--font-serif)" }}
            >
              {f.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SouthIndianClassicTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("south-indian-classic", colorSchemeId, customColors);
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
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Wedding card border */}
      <WeddingCardBorder color={colors.primary} secondaryColor={colors.secondary} />

      {/* Enhanced kolam corner dots - larger and more visible */}
      {[
        { top: "18px", left: "18px" },
        { top: "18px", right: "18px", transform: "scaleX(-1)" },
        { bottom: "18px", left: "18px", transform: "scaleY(-1)" },
        { bottom: "18px", right: "18px", transform: "scale(-1)" },
      ].map((style, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none"
          style={style as React.CSSProperties}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            {/* Kolam pattern - interlocking dots with curves */}
            <circle cx="6" cy="6" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="18" cy="6" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="30" cy="6" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="6" cy="18" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="18" cy="18" r="3" fill={colors.primary} fillOpacity="0.5" />
            <circle cx="30" cy="18" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="6" cy="30" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="18" cy="30" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            <circle cx="30" cy="30" r="2.5" fill={colors.secondary} fillOpacity="0.4" />
            {/* Connecting curves */}
            <path d="M6 6 Q12 12 18 6" stroke={colors.primary} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
            <path d="M6 6 Q12 12 6 18" stroke={colors.primary} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
            <path d="M18 6 Q24 12 30 6" stroke={colors.primary} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
            <path d="M6 18 Q12 24 6 30" stroke={colors.primary} strokeWidth="0.6" strokeOpacity="0.3" fill="none" />
          </svg>
        </div>
      ))}

      <div className="p-7 pt-6 flex flex-col flex-1 relative z-10">
        {/* Header with deity icon */}
        <div className="text-center mb-2">
          {(() => {
            const deity = getDeityIcon(pd.deityImageId);
            if (deity) {
              return (
                <>
                  <div className="flex justify-center mb-1">
                    <deity.icon color={colors.primary} size={32} />
                  </div>
                  {deity.mantra && (
                    <div
                      className="text-[11px] font-semibold tracking-widest"
                      style={{ color: colors.secondary, fontFamily: rootFont }}
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
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: colors.secondary, fontFamily: rootFont }}
          >
            &#x2726; Thirumana Payandata &#x2726;
          </div>
        </div>

        <LotusDivider color={colors.primary} width={400} className="w-full mb-2" />

        {/* Photo on left + Name on right */}
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-[68px] h-[84px] rounded border-2 flex-shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              borderColor: colors.primary,
              backgroundColor: colors.primary + "08",
              boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 3px ${colors.secondary}40`,
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
          <div>
            <h2
              className="text-base font-bold tracking-wide"
              style={{ color: colors.primary, fontFamily: rootFont }}
            >
              {pd.fullName || "Your Name"}
            </h2>
            {pd.currentCity && (
              <p
                className="text-[11px] mt-0.5"
                style={{ color: colors.text + "90", fontFamily: rootFont }}
              >
                {pd.currentCity}
                {pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
          </div>
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
                  style={{ color: colors.primary, fontFamily: rootFont }}
                >
                  {getLabel("aboutLifestyle", locale)}
                </h3>
                <LotusDivider color={colors.secondary} width={400} className="w-full" />
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
                  <span className="font-semibold" style={{ color: colors.primary }}>
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
          <LotusDivider color={colors.primary} width={400} className="w-full" />
        </div>
      </div>
    </div>
  );
}

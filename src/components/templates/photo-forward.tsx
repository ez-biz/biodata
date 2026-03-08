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
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-3">
      <h3
        className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1.5 pb-0.5 border-b"
        style={{
          color: colors.secondary,
          borderColor: colors.secondary + "30",
          fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
        }}
      >
        {title}
      </h3>
      {/* 2-column grid: label above value */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-2">
        {fields.map((f) => (
          <div key={f.label}>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider mb-0.5"
              style={{
                color: colors.text + "88",
                fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
              }}
            >
              {f.label}
            </div>
            <div
              className="text-[13px] leading-snug font-medium"
              style={{
                color: colors.text,
                fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
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

export function PhotoForwardTemplate({ colorSchemeId, customColors, customFontFamily, customFontSize }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { locale } = useI18n();
  const colors = resolveTemplateColors("photo-forward", colorSchemeId, customColors);
  const rootFont = resolveTemplateFontFamily(customFontFamily, "var(--font-body), 'Helvetica Neue', Arial, sans-serif");
  const fontSizeZoom = resolveTemplateFontSize(customFontSize);

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData, locale);
  const educationFields = getEducationFields(formData, locale);
  const familyFields = getFamilyFields(formData, locale);
  const contactFields = getContactFields(formData, locale);
  const horoscopeFields = getHoroscopeFields(formData, locale);

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: colors.background,
        minHeight: `${1123}px`,
        color: colors.text,
        fontFamily: rootFont,
        zoom: fontSizeZoom,
      }}
    >
      {/* Large hero photo area — top 38% */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: "38%", backgroundColor: colors.primary }}
      >
        {profilePhotoUrl ? (
          <img
            src={profilePhotoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {/* Subtle dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* Name overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            background: `linear-gradient(transparent, ${colors.primary}E0)`,
          }}
        >
          <h1
            className="text-lg font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif" }}
          >
            {pd.fullName || "Your Name"}
          </h1>
          <p
            className="text-[11px] text-white/70"
            style={{ fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif" }}
          >
            {[pd.currentCity, pd.currentState].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>

      {/* Accent bar */}
      <div
        className="h-1 flex-shrink-0"
        style={{ backgroundColor: colors.secondary }}
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 overflow-hidden">
        {/* About */}
        {formData.lifestyle.aboutMe && (
          <p
            className="text-[13px] italic leading-relaxed mb-2.5 pb-2 border-b"
            style={{
              color: colors.text + "AA",
              borderColor: colors.secondary + "20",
              fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
            }}
          >
            &ldquo;{formData.lifestyle.aboutMe}&rdquo;
          </p>
        )}

        <Section title={getLabel("personalDetails", locale)} fields={personalFields} colors={colors} />

        <MinimalDivider color={colors.secondary + "70"} width={320} className="mx-auto mb-3" />

        <Section title={getLabel("educationCareer", locale)} fields={educationFields} colors={colors} />

        <MinimalDivider color={colors.secondary + "70"} width={320} className="mx-auto mb-3" />

        <Section title={getLabel("familyDetails", locale)} fields={familyFields} colors={colors} />

        {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
          <>
            <MinimalDivider color={colors.secondary + "70"} width={320} className="mx-auto mb-3" />
            <div className="mb-3">
              <h3
                className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1"
                style={{
                  color: colors.secondary,
                  fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
                }}
              >
                {getLabel("interests", locale)}
              </h3>
              <p
                className="text-[13px]"
                style={{
                  color: colors.text,
                  fontFamily: "var(--font-body), 'Helvetica Neue', sans-serif",
                }}
              >
                {formData.lifestyle.hobbies.join(" · ")}
              </p>
            </div>
          </>
        )}

        {horoscopeFields.length > 0 && (
          <>
            <MinimalDivider color={colors.secondary + "70"} width={320} className="mx-auto mb-3" />
            <Section title={getLabel("horoscope", locale)} fields={horoscopeFields} colors={colors} />
          </>
        )}

        {contactFields.length > 0 && (
          <>
            <MinimalDivider color={colors.secondary + "70"} width={320} className="mx-auto mb-3" />
            <Section title={getLabel("contactTitle", locale)} fields={contactFields} colors={colors} />
          </>
        )}
      </div>
    </div>
  );
}

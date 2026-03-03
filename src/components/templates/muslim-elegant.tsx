"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById } from "@/lib/templates/template-config";
import {
  getPersonalFields,
  getEducationFields,
  getFamilyFields,
  getContactFields,
  FieldRow,
} from "./template-utils";
import {
  IslamicBorder,
  CrescentStarIcon,
  FlourishDivider,
} from "./ornaments";

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
    <div className="mb-4">
      {/* Centered section title */}
      <div className="text-center mb-2">
        <h3
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{
            color: colors.primary,
            fontFamily: "var(--font-display), Georgia, serif",
          }}
        >
          {title}
        </h3>
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

export function MuslimElegantTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("muslim-elegant")!;
  const colors =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData);
  const educationFields = getEducationFields(formData);
  const familyFields = getFamilyFields(formData);
  const contactFields = getContactFields(formData);

  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "var(--font-serif), Georgia, 'Palatino', serif",
      }}
    >
      {/* Islamic geometric border */}
      <IslamicBorder
        color={colors.primary}
        secondaryColor={colors.secondary}
      />

      <div className="relative px-7 py-5 flex flex-col h-full">
        {/* Crescent Star icon */}
        <div className="text-center mb-1">
          <CrescentStarIcon
            color={colors.secondary}
            size={36}
            className="mx-auto opacity-70"
          />
        </div>

        {/* Bismillah header */}
        <div className="text-center mb-2">
          <div
            className="text-[18px] font-bold leading-tight"
            style={{ color: colors.primary }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <div
            className="text-[9px] tracking-[0.25em] uppercase mt-1"
            style={{
              color: colors.secondary,
              fontFamily: "var(--font-serif), Georgia, serif",
            }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
        </div>

        {/* Flourish divider */}
        <FlourishDivider
          color={colors.secondary}
          width={340}
          className="mx-auto mb-3"
        />

        {/* Name + Photo centered */}
        <div className="text-center mb-3">
          <div
            className="w-[68px] h-[85px] mx-auto rounded border-2 overflow-hidden flex items-center justify-center mb-2"
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
          <h1
            className="text-[16px] font-bold"
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
              {pd.currentCity}{pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1">
          {formData.lifestyle.aboutMe && (
            <p
              className="text-[13px] italic text-center leading-relaxed mb-3"
              style={{
                color: colors.text + "AA",
                fontFamily: "var(--font-serif), Georgia, serif",
              }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          )}

          <Section title="Personal Details" fields={personalFields} colors={colors} />

          <FlourishDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />

          <Section title="Education & Career" fields={educationFields} colors={colors} />

          <FlourishDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />

          <Section title="Family Details" fields={familyFields} colors={colors} />

          {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
            <>
              <FlourishDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />
              <div className="mb-4 text-center">
                <h3
                  className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5"
                  style={{
                    color: colors.primary,
                    fontFamily: "var(--font-display), Georgia, serif",
                  }}
                >
                  Interests
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

          {contactFields.length > 0 && (
            <>
              <FlourishDivider color={colors.secondary + "60"} width={260} className="mx-auto mb-3" />
              <Section title="Contact" fields={contactFields} colors={colors} />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-2">
          <FlourishDivider
            color={colors.secondary}
            width={340}
            className="mx-auto mb-1"
          />
          <span
            className="text-[9px] tracking-[0.2em] uppercase"
            style={{
              color: colors.secondary,
              fontFamily: "var(--font-serif), Georgia, serif",
            }}
          >
            MashaAllah
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { getTemplateById } from "@/lib/templates/template-config";
import {
  getPersonalFields,
  getEducationFields,
  getFamilyFields,
  getContactFields,
  getHoroscopeFields,
  FieldRow,
} from "./template-utils";
import { PageBreak } from "@/components/editor/page-break";
import { MandalaBg, WeddingCardBorder, LotusDivider, getDeityIcon } from "./ornaments";

interface Props {
  colorSchemeId: string;
}

function SectionGrid({
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
    <div className="mb-5">
      {/* Section title with ornamental underline */}
      <div className="flex items-center gap-3 mb-2.5">
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary }} />
        <div
          className="text-[12px] font-bold tracking-[0.15em] uppercase flex-shrink-0"
          style={{ color: colors.primary, fontFamily: "var(--font-display), Georgia, serif" }}
        >
          {title}
        </div>
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary }} />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
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

export function TraditionalClassicTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("traditional-classic")!;
  const colors =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData);
  const educationFields = getEducationFields(formData);
  const familyFields = getFamilyFields(formData);
  const contactFields = getContactFields(formData);
  const horoscopeFields = getHoroscopeFields(formData);

  const showAbout = formData.lifestyle.aboutMe;
  const showHobbies = formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0;

  const hasHoroscope = horoscopeFields.length > 0;
  const hasContact = contactFields.length > 0;
  const hasAboutSection = showAbout || showHobbies;
  const shouldPageBreak = hasHoroscope && hasContact && hasAboutSection;

  return (
    <div
      className="w-full flex flex-col relative"
      style={{
        minHeight: "100%",
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Wedding card triple-line border */}
      <WeddingCardBorder color={colors.primary} secondaryColor={colors.secondary} />

      {/* Subtle mandala background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <MandalaBg color={colors.secondary} opacity={0.04} size={500} />
      </div>

      <div className="relative z-10 p-8 flex flex-col flex-1">
        {/* Header with religious icon */}
        <div className="text-center mb-4">
          {(() => {
            const deity = getDeityIcon(pd.deityImageId);
            if (!deity) return null;
            return (
              <>
                <div className="flex justify-center mb-1">
                  <deity.icon color={colors.primary} size={45} className="opacity-70" />
                </div>
                {deity.mantra && (
                  <div
                    className="text-lg font-bold tracking-wider"
                    style={{ color: colors.primary, fontFamily: "var(--font-display), Georgia, serif" }}
                  >
                    {deity.mantra}
                  </div>
                )}
              </>
            );
          })()}

          {/* Ornamental divider under header */}
          <LotusDivider color={colors.secondary} width={350} className="mx-auto mt-1" />

          <h1
            className="text-sm font-bold uppercase tracking-[0.2em] mt-1.5"
            style={{ color: colors.primary, opacity: 0.7 }}
          >
            Biodata
          </h1>
        </div>

        {/* Photo + Name */}
        <div className="flex items-start gap-6 mb-6">
          {/* Photo with decorative border */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute -inset-1.5 rounded-md"
              style={{ border: `1px solid ${colors.secondary}60` }}
            />
            <div
              className="w-24 h-28 rounded-md border-2 flex items-center justify-center overflow-hidden"
              style={{ borderColor: colors.secondary, backgroundColor: colors.primary + "08" }}
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
          </div>
          <div className="flex-1">
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: colors.primary, fontFamily: "var(--font-display), Georgia, serif" }}
            >
              {pd.fullName || "Your Name"}
            </h2>
            {pd.currentCity && (
              <p className="text-[13px] mb-2" style={{ color: colors.text + "88" }}>
                {pd.currentCity}
                {pd.currentState ? `, ${pd.currentState}` : ""}
              </p>
            )}
            <div className="flex flex-wrap gap-2 text-[10px]">
              {pd.religion && (
                <span
                  className="px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.secondary + "25", color: colors.primary }}
                >
                  {pd.religion}
                </span>
              )}
              {pd.caste && (
                <span
                  className="px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.secondary + "25", color: colors.primary }}
                >
                  {pd.caste}
                </span>
              )}
              {formData.educationCareer.occupation && (
                <span
                  className="px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.secondary + "25", color: colors.primary }}
                >
                  {formData.educationCareer.occupation}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1">
          <SectionGrid title="Personal Details" fields={personalFields} colors={colors} />
          <SectionGrid title="Education & Career" fields={educationFields} colors={colors} />
          <SectionGrid title="Family Details" fields={familyFields} colors={colors} />

          {shouldPageBreak && <PageBreak label="Page 2" />}

          {(showAbout || showHobbies) && (
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="h-px flex-1" style={{ backgroundColor: colors.secondary }} />
                <div
                  className="text-[12px] font-bold tracking-[0.15em] uppercase flex-shrink-0"
                  style={{ color: colors.primary, fontFamily: "var(--font-display), Georgia, serif" }}
                >
                  About & Lifestyle
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: colors.secondary }} />
              </div>
              {showAbout && (
                <p className="text-[13px] leading-relaxed mb-2 italic" style={{ color: colors.text + "DD" }}>
                  &ldquo;{formData.lifestyle.aboutMe}&rdquo;
                </p>
              )}
              {showHobbies && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.lifestyle.hobbies!.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: colors.secondary + "20",
                        color: colors.primary,
                        border: `1px solid ${colors.secondary}40`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <SectionGrid title="Horoscope" fields={horoscopeFields} colors={colors} />
          <SectionGrid title="Contact Details" fields={contactFields} colors={colors} />
        </div>

        {/* Bottom ornamental divider */}
        <LotusDivider color={colors.secondary} width={400} className="mx-auto mt-2" />
      </div>
    </div>
  );
}

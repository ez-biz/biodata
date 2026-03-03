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
import { OrnamentalFrame, FlourishDivider, ElegantFrame, getDeityIcon } from "./ornaments";

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
  colors: { primary: string; secondary: string; text: string; accent: string };
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
        <FlourishDivider color={colors.accent} width={400} className="w-full" />
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

export function BengaliEleganceTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("bengali-elegance")!;
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
  const showHobbies =
    formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0;

  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "var(--font-serif)",
      }}
    >
      {/* Ornamental frame border with corner flourishes */}
      <OrnamentalFrame color={colors.primary} secondaryColor={colors.accent} />

      <div className="p-7 pt-5 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-2">
          {(() => {
            const deity = getDeityIcon(pd.deityImageId);
            if (deity) {
              return (
                <>
                  <div className="flex justify-center mb-1">
                    <deity.icon color={colors.primary} size={36} />
                  </div>
                  {deity.mantra && (
                    <div
                      className="text-base font-bold tracking-wider"
                      style={{ color: colors.primary, fontFamily: "var(--font-serif)" }}
                    >
                      {deity.mantra}
                    </div>
                  )}
                </>
              );
            }
            return (
              <div
                className="text-base font-bold tracking-wider"
                style={{ color: colors.primary, fontFamily: "var(--font-serif)" }}
              >
                &#x0965; &#x09B6;&#x09C1;&#x09AD;
                &#x09AC;&#x09BF;&#x09AC;&#x09BE;&#x09B9; &#x0965;
              </div>
            );
          })()}
          <div
            className="text-[10px] tracking-[0.2em] uppercase mt-0.5"
            style={{ color: colors.accent, fontFamily: "var(--font-serif)" }}
          >
            Marriage Biodata
          </div>
        </div>

        <FlourishDivider color={colors.primary} width={400} className="w-full mb-2" />

        {/* Centered photo with ElegantFrame */}
        <div className="flex flex-col items-center mb-3">
          <ElegantFrame color={colors.primary} className="mb-1.5">
            <div
              className="w-[68px] h-[84px] flex items-center justify-center overflow-hidden"
              style={{
                backgroundColor: colors.primary + "06",
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
          </ElegantFrame>
          <h2
            className="text-sm font-bold text-center tracking-wide"
            style={{ color: colors.primary, fontFamily: "var(--font-serif)" }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p
              className="text-[11px]"
              style={{ color: colors.text + "90", fontFamily: "var(--font-serif)" }}
            >
              {pd.currentCity}
              {pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-1">
          <Section
            title="Personal Details"
            fields={personalFields}
            colors={colors}
          />
          <Section
            title="Education & Career"
            fields={educationFields}
            colors={colors}
          />
          <Section
            title="Family Details"
            fields={familyFields}
            colors={colors}
          />

          {(showAbout || showHobbies) && (
            <div className="mb-2.5">
              <div className="mb-1.5">
                <h3
                  className="text-[11px] font-bold tracking-wider uppercase text-center mb-0.5"
                  style={{ color: colors.primary, fontFamily: "var(--font-serif)" }}
                >
                  About & Lifestyle
                </h3>
                <FlourishDivider color={colors.accent} width={400} className="w-full" />
              </div>
              {showAbout && (
                <p
                  className="text-[13px] leading-relaxed mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Hobbies:{" "}
                  </span>
                  {formData.lifestyle.hobbies!.join(", ")}
                </p>
              )}
            </div>
          )}

          <Section
            title="Horoscope"
            fields={horoscopeFields}
            colors={colors}
          />
          <Section
            title="Contact Details"
            fields={contactFields}
            colors={colors}
          />
        </div>

        {/* Bottom decorative motif */}
        <div className="mt-2">
          <FlourishDivider color={colors.primary} width={400} className="w-full" />
        </div>
      </div>
    </div>
  );
}

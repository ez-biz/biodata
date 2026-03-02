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
      <div className="mb-1">
        <div
          className="text-[10px] font-bold tracking-wide uppercase"
          style={{ color: colors.primary }}
        >
          {title}
        </div>
        {/* Wavy underline divider */}
        <svg width="100%" height="4" className="mt-0.5">
          <path
            d="M0,2 Q5,0 10,2 Q15,4 20,2 Q25,0 30,2 Q35,4 40,2 Q45,0 50,2 Q55,4 60,2 Q65,0 70,2 Q75,4 80,2 Q85,0 90,2 Q95,4 100,2 Q105,0 110,2 Q115,4 120,2 Q125,0 130,2 Q135,4 140,2 Q145,0 150,2 Q155,4 160,2 Q165,0 170,2 Q175,4 180,2 Q185,0 190,2 Q195,4 200,2"
            fill="none"
            stroke={colors.accent}
            strokeWidth="0.8"
          />
        </svg>
      </div>
      <div className="space-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-tight">
            <span
              className="w-24 flex-shrink-0 font-semibold"
              style={{ color: colors.primary }}
            >
              {f.label}
            </span>
            <span className="mr-1">:</span>
            <span style={{ color: colors.text }}>{f.value}</span>
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
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* Alpona-inspired border - outer frame */}
      <div
        className="absolute inset-2 border-2 rounded-sm pointer-events-none"
        style={{ borderColor: colors.primary }}
      />
      {/* Inner decorative border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "12px",
          border: `1px solid ${colors.accent}`,
          borderRadius: "2px",
        }}
      />
      {/* Corner alpona motifs */}
      {[
        "top-1 left-1",
        "top-1 right-1",
        "bottom-1 left-1",
        "bottom-1 right-1",
      ].map((pos, idx) => (
        <div
          key={idx}
          className={`absolute ${pos} text-[14px] leading-none pointer-events-none`}
          style={{
            color: colors.primary,
            transform: `rotate(${idx * 90}deg)`,
          }}
        >
          &#x2740;
        </div>
      ))}

      <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
        {/* Header */}
        <div className="text-center mb-3">
          <div
            className="text-base font-bold tracking-wider"
            style={{ color: colors.primary }}
          >
            &#x0965; &#x09B6;&#x09C1;&#x09AD;
            &#x09AC;&#x09BF;&#x09AC;&#x09BE;&#x09B9; &#x0965;
          </div>
          <div
            className="text-[9px] tracking-widest uppercase mt-0.5"
            style={{ color: colors.accent }}
          >
            Marriage Biodata
          </div>
        </div>

        {/* Centered photo with decorative frame */}
        <div className="flex flex-col items-center mb-3">
          <div
            className="w-16 h-20 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden relative"
            style={{
              border: `2px solid ${colors.primary}`,
              boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.accent}`,
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
            className="text-sm font-bold mt-1.5 text-center"
            style={{ color: colors.primary }}
          >
            {pd.fullName || "Your Name"}
          </h2>
          {pd.currentCity && (
            <p className="text-[9px]" style={{ color: colors.text }}>
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
              <div className="mb-1">
                <div
                  className="text-[10px] font-bold tracking-wide uppercase"
                  style={{ color: colors.primary }}
                >
                  About & Lifestyle
                </div>
                <svg width="100%" height="4" className="mt-0.5">
                  <path
                    d="M0,2 Q5,0 10,2 Q15,4 20,2 Q25,0 30,2 Q35,4 40,2 Q45,0 50,2 Q55,4 60,2 Q65,0 70,2 Q75,4 80,2 Q85,0 90,2 Q95,4 100,2 Q105,0 110,2 Q115,4 120,2 Q125,0 130,2 Q135,4 140,2 Q145,0 150,2 Q155,4 160,2 Q165,0 170,2 Q175,4 180,2 Q185,0 190,2 Q195,4 200,2"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="0.8"
                  />
                </svg>
              </div>
              {showAbout && (
                <p className="text-[9px] leading-tight mb-1">
                  {formData.lifestyle.aboutMe}
                </p>
              )}
              {showHobbies && (
                <p className="text-[9px] leading-tight">
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
        <div
          className="text-center text-[10px] mt-2"
          style={{ color: colors.accent }}
        >
          &#x2740; &#x2740; &#x2740;
        </div>
      </div>
    </div>
  );
}

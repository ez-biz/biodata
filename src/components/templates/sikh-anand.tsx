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
  colors: { primary: string; secondary: string; text: string };
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mb-2.5">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: colors.secondary }}
        />
        <h3
          className="text-[9px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
          style={{ color: colors.primary }}
        >
          {title}
        </h3>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: colors.primary + "25" }}
        />
      </div>
      <div className="space-y-0.5 pl-3.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-snug">
            <span
              className="w-20 flex-shrink-0 font-semibold"
              style={{ color: colors.primary + "CC" }}
            >
              {f.label}
            </span>
            <span className="mx-1" style={{ color: colors.secondary }}>
              |
            </span>
            <span style={{ color: colors.text }}>{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SikhAnandTemplate({ colorSchemeId }: Props) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const template = getTemplateById("sikh-anand")!;
  const colors =
    template.colorSchemes.find((c) => c.id === colorSchemeId) ||
    template.colorSchemes[0];

  const pd = formData.personalDetails;
  const personalFields = getPersonalFields(formData);
  const educationFields = getEducationFields(formData);
  const familyFields = getFamilyFields(formData);
  const contactFields = getContactFields(formData);
  const horoscopeFields = getHoroscopeFields(formData);

  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: "'Georgia', 'Palatino', serif",
      }}
    >
      {/* Outer border with Sikh-inspired pattern */}
      <div
        className="absolute inset-2 border-2 rounded pointer-events-none"
        style={{ borderColor: colors.secondary + "50" }}
      />
      <div
        className="absolute inset-3 border rounded pointer-events-none"
        style={{ borderColor: colors.primary + "20" }}
      />

      <div className="relative px-6 py-4 flex flex-col h-full">
        {/* Ik Onkar header */}
        <div className="text-center mb-2">
          <div
            className="text-xl font-bold leading-tight"
            style={{ color: colors.primary }}
          >
            ੴ
          </div>
          <div
            className="text-[7px] tracking-[0.3em] uppercase mt-0.5"
            style={{ color: colors.secondary }}
          >
            Ik Onkar — One God
          </div>
        </div>

        {/* Waheguru header */}
        <div className="text-center mb-2">
          <div
            className="text-sm font-bold"
            style={{ color: colors.primary }}
          >
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ ॥ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ ॥
          </div>
          <div
            className="text-[8px] tracking-[0.2em] uppercase mt-1"
            style={{ color: colors.secondary }}
          >
            ✦ Anand Karaj Biodata ✦
          </div>
        </div>

        {/* Khanda-inspired divider */}
        <div className="flex items-center gap-2 mb-2.5">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: colors.secondary + "50" }}
          />
          <div className="flex gap-1 items-center">
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            />
            <span className="text-xs" style={{ color: colors.secondary }}>
              ☬
            </span>
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: colors.secondary + "50" }}
          />
        </div>

        {/* Photo + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-16 h-20 flex-shrink-0 rounded border-2 overflow-hidden flex items-center justify-center"
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
              className="text-base font-bold"
              style={{ color: colors.primary }}
            >
              {pd.fullName || "Your Name"}
            </h1>
            {pd.currentCity && (
              <p
                className="text-[9px] mt-0.5"
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
              className="text-[9px] italic leading-relaxed mb-2.5 pl-3.5"
              style={{ color: colors.text + "AA" }}
            >
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          )}

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

          {formData.lifestyle.hobbies &&
            formData.lifestyle.hobbies.length > 0 && (
              <div className="mb-2.5 pl-3.5">
                <p className="text-[9px]" style={{ color: colors.text }}>
                  <span
                    className="font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Interests:{" "}
                  </span>
                  {formData.lifestyle.hobbies.join(", ")}
                </p>
              </div>
            )}

          <Section
            title="Horoscope"
            fields={horoscopeFields}
            colors={colors}
          />
          <Section title="Contact" fields={contactFields} colors={colors} />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: colors.secondary + "40" }}
          />
          <span
            className="text-[8px] tracking-wider uppercase"
            style={{ color: colors.secondary }}
          >
            ਵਾਹਿਗੁਰੂ
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: colors.secondary + "40" }}
          />
        </div>
      </div>
    </div>
  );
}

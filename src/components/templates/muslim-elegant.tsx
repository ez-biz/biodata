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
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "40" }} />
        <h3
          className="text-[9px] font-bold uppercase tracking-[0.2em] flex-shrink-0"
          style={{ color: colors.primary }}
        >
          {title}
        </h3>
        <div className="h-px flex-1" style={{ backgroundColor: colors.secondary + "40" }} />
      </div>
      <div className="space-y-0.5">
        {fields.map((f) => (
          <div key={f.label} className="flex text-[9px] leading-snug">
            <span className="w-22 flex-shrink-0 font-semibold" style={{ color: colors.primary + "BB" }}>
              {f.label}
            </span>
            <span className="mx-1" style={{ color: colors.secondary }}>—</span>
            <span style={{ color: colors.text }}>{f.value}</span>
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
        fontFamily: "'Georgia', 'Palatino', serif",
      }}
    >
      {/* Geometric Islamic border pattern */}
      <div
        className="absolute inset-2 border pointer-events-none"
        style={{ borderColor: colors.secondary + "50" }}
      />
      <div
        className="absolute inset-3 border pointer-events-none"
        style={{ borderColor: colors.primary + "20" }}
      />

      {/* Corner ornaments — geometric star pattern */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
        <div key={pos} className={`absolute ${pos} w-4 h-4 pointer-events-none`}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[10px]" style={{ color: colors.secondary }}>✸</span>
          </div>
        </div>
      ))}

      <div className="relative px-6 py-5 flex flex-col h-full">
        {/* Bismillah header */}
        <div className="text-center mb-3">
          <div
            className="text-lg font-bold leading-tight"
            style={{ color: colors.primary }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
          <div
            className="text-[8px] tracking-[0.3em] uppercase mt-1"
            style={{ color: colors.secondary }}
          >
            In the name of Allah, the Most Gracious, the Most Merciful
          </div>
        </div>

        {/* Crescent divider */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.secondary + "40" }} />
          <span className="text-sm" style={{ color: colors.secondary }}>☪</span>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.secondary + "40" }} />
        </div>

        {/* Name + Photo */}
        <div className="text-center mb-3">
          <div
            className="w-16 h-20 mx-auto rounded border-2 overflow-hidden flex items-center justify-center mb-2"
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
          <h1 className="text-base font-bold" style={{ color: colors.primary }}>
            {pd.fullName || "Your Name"}
          </h1>
          {pd.currentCity && (
            <p className="text-[9px] mt-0.5" style={{ color: colors.text + "88" }}>
              {pd.currentCity}{pd.currentState ? `, ${pd.currentState}` : ""}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="flex-1">
          {formData.lifestyle.aboutMe && (
            <p className="text-[9px] italic text-center leading-relaxed mb-3" style={{ color: colors.text + "AA" }}>
              &ldquo;{formData.lifestyle.aboutMe}&rdquo;
            </p>
          )}

          <Section title="Personal Details" fields={personalFields} colors={colors} />
          <Section title="Education & Career" fields={educationFields} colors={colors} />
          <Section title="Family Details" fields={familyFields} colors={colors} />

          {formData.lifestyle.hobbies && formData.lifestyle.hobbies.length > 0 && (
            <div className="mb-3 text-center">
              <p className="text-[9px]" style={{ color: colors.text }}>
                <span className="font-semibold" style={{ color: colors.primary }}>Interests: </span>
                {formData.lifestyle.hobbies.join(", ")}
              </p>
            </div>
          )}

          <Section title="Contact" fields={contactFields} colors={colors} />
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 h-px" style={{ backgroundColor: colors.secondary + "40" }} />
          <span className="text-[8px] tracking-wider uppercase" style={{ color: colors.secondary }}>
            MashaAllah
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: colors.secondary + "40" }} />
        </div>
      </div>
    </div>
  );
}

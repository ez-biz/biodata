"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "./form-field-wrapper";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { RASHIS, NAKSHATRAS, GANS, NADIS } from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StepHoroscope({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const h = formData.horoscope;
  const religion = formData.personalDetails.religion;
  const { t } = useI18n();

  const update = (field: string, value: string) => {
    updateSection("horoscope", { [field]: value });
  };

  if (religion && religion !== "Hindu" && religion !== "Jain") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">{t.horoscope.heading}</h2>
          <p className="text-sm text-muted-foreground">
            {t.horoscope.skipMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.horoscope.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.horoscope.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.horoscope.rashi}>
          <Select
            value={h.rashi || ""}
            onValueChange={(v) => update("rashi", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.horoscope.selectRashi} />
            </SelectTrigger>
            <SelectContent>
              {RASHIS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.horoscope.nakshatra}>
          <Select
            value={h.nakshatra || ""}
            onValueChange={(v) => update("nakshatra", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.horoscope.selectNakshatra} />
            </SelectTrigger>
            <SelectContent>
              {NAKSHATRAS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.horoscope.charanPada}>
          <Select
            value={h.charan || ""}
            onValueChange={(v) => update("charan", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.horoscope.selectCharan} />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.horoscope.gan}>
          <Select
            value={h.gan || ""}
            onValueChange={(v) => update("gan", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.horoscope.selectGan} />
            </SelectTrigger>
            <SelectContent>
              {GANS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.horoscope.nadi}>
          <Select
            value={h.nadi || ""}
            onValueChange={(v) => update("nadi", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.horoscope.selectNadi} />
            </SelectTrigger>
            <SelectContent>
              {NADIS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      </div>
    </div>
  );
}

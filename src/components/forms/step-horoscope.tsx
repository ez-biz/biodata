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

interface StepProps {
  errors: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StepHoroscope({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const h = formData.horoscope;
  const religion = formData.personalDetails.religion;

  const update = (field: string, value: string) => {
    updateSection("horoscope", { [field]: value });
  };

  if (religion && religion !== "Hindu" && religion !== "Jain") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Horoscope / Kundli</h2>
          <p className="text-sm text-muted-foreground">
            This section is typically used for Hindu and Jain biodatas.
            You can skip this step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Horoscope / Kundli</h2>
        <p className="text-sm text-muted-foreground">
          Optional astrological details for your biodata
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label="Rashi (Moon Sign)">
          <Select
            value={h.rashi || ""}
            onValueChange={(v) => update("rashi", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rashi" />
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

        <FormFieldWrapper label="Nakshatra (Star)">
          <Select
            value={h.nakshatra || ""}
            onValueChange={(v) => update("nakshatra", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nakshatra" />
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

        <FormFieldWrapper label="Charan / Pada">
          <Select
            value={h.charan || ""}
            onValueChange={(v) => update("charan", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select charan" />
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

        <FormFieldWrapper label="Gan">
          <Select
            value={h.gan || ""}
            onValueChange={(v) => update("gan", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gan" />
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

        <FormFieldWrapper label="Nadi">
          <Select
            value={h.nadi || ""}
            onValueChange={(v) => update("nadi", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select nadi" />
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

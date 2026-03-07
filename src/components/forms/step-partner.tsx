"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "./form-field-wrapper";
import { useBiodataStore } from "@/lib/store/biodata-store";
import {
  EDUCATION_LEVELS,
  OCCUPATION_TYPES,
  HEIGHT_OPTIONS,
  DIET_OPTIONS,
  MANGLIK_OPTIONS,
} from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepPartner({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const pp = formData.partnerPreferences;
  const { t } = useI18n();
  const showManglik =
    formData.personalDetails.religion === "Hindu" ||
    formData.personalDetails.religion === "Jain";

  const update = (field: string, value: string) => {
    updateSection("partnerPreferences", { [field]: value });
  };

  const updateNum = (field: string, value: string) => {
    const num = value === "" ? undefined : parseInt(value, 10);
    updateSection("partnerPreferences", { [field]: num } as Record<string, number | undefined>);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.partner.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.partner.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.partner.preferredAgeRange}>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={pp.preferredAgeMin || ""}
              onChange={(e) => updateNum("preferredAgeMin", e.target.value)}
              placeholder={t.partner.min}
              min={18}
              max={70}
            />
            <span className="text-muted-foreground">{t.partner.to}</span>
            <Input
              type="number"
              value={pp.preferredAgeMax || ""}
              onChange={(e) => updateNum("preferredAgeMax", e.target.value)}
              placeholder={t.partner.max}
              min={18}
              max={70}
            />
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredHeightRange}>
          <div className="flex gap-2 items-center">
            <Select
              value={pp.preferredHeightMin || ""}
              onValueChange={(v) => update("preferredHeightMin", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t.partner.min} />
              </SelectTrigger>
              <SelectContent>
                {HEIGHT_OPTIONS.map((h) => (
                  <SelectItem key={h.value} value={h.value}>
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">{t.partner.to}</span>
            <Select
              value={pp.preferredHeightMax || ""}
              onValueChange={(v) => update("preferredHeightMax", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t.partner.max} />
              </SelectTrigger>
              <SelectContent>
                {HEIGHT_OPTIONS.map((h) => (
                  <SelectItem key={h.value} value={h.value}>
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredEducation}>
          <Select
            value={pp.preferredEducation || ""}
            onValueChange={(v) => update("preferredEducation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.partner.any} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.partner.any}</SelectItem>
              {EDUCATION_LEVELS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e} {t.partner.andAbove}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredOccupation}>
          <Select
            value={pp.preferredOccupation || ""}
            onValueChange={(v) => update("preferredOccupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.partner.any} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.partner.any}</SelectItem>
              {OCCUPATION_TYPES.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredLocation}>
          <Input
            value={pp.preferredLocation || ""}
            onChange={(e) => update("preferredLocation", e.target.value)}
            placeholder={t.partner.locationPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredCaste}>
          <Input
            value={pp.preferredCaste || ""}
            onChange={(e) => update("preferredCaste", e.target.value)}
            placeholder={t.partner.castePlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.partner.preferredDiet}>
          <Select
            value={pp.preferredDiet || ""}
            onValueChange={(v) => update("preferredDiet", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.partner.any} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t.partner.any}</SelectItem>
              {DIET_OPTIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        {showManglik && (
          <FormFieldWrapper label={t.partner.preferredManglik}>
            <Select
              value={pp.preferredManglik || ""}
              onValueChange={(v) => update("preferredManglik", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.partner.any} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">{t.partner.any}</SelectItem>
                {MANGLIK_OPTIONS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldWrapper>
        )}

        <FormFieldWrapper
          label={t.partner.additionalExpectations}
          error={errors.additionalExpectations}
          className="sm:col-span-2"
        >
          <Textarea
            value={pp.additionalExpectations || ""}
            onChange={(e) => update("additionalExpectations", e.target.value)}
            placeholder={t.partner.expectationsPlaceholder}
            rows={3}
            maxLength={500}
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}

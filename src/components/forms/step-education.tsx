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
  INCOME_RANGES,
} from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepEducation({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const ec = formData.educationCareer;
  const { t } = useI18n();

  const update = (field: string, value: string) => {
    updateSection("educationCareer", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.education.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.education.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper
          label={t.education.highestEducation}
          required
          error={errors.highestEducation}
        >
          <Select
            value={ec.highestEducation}
            onValueChange={(v) => update("highestEducation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.education.selectEducation} />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVELS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.educationDetails} className="sm:col-span-2">
          <Textarea
            value={ec.educationDetails || ""}
            onChange={(e) => update("educationDetails", e.target.value)}
            placeholder={t.education.detailsPlaceholder}
            rows={2}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.additionalQualifications} className="sm:col-span-2">
          <Input
            value={ec.additionalQualifications || ""}
            onChange={(e) => update("additionalQualifications", e.target.value)}
            placeholder={t.education.qualificationsPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          label={t.education.occupation}
          required
          error={errors.occupation}
        >
          <Select
            value={ec.occupation}
            onValueChange={(v) => update("occupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.education.selectOccupation} />
            </SelectTrigger>
            <SelectContent>
              {OCCUPATION_TYPES.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.jobTitle}>
          <Input
            value={ec.jobTitle || ""}
            onChange={(e) => update("jobTitle", e.target.value)}
            placeholder={t.education.jobTitlePlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.companyName}>
          <Input
            value={ec.companyName || ""}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder={t.education.companyPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.workLocation}>
          <Input
            value={ec.workLocation || ""}
            onChange={(e) => update("workLocation", e.target.value)}
            placeholder={t.education.workLocationPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.education.annualIncome}>
          <Select
            value={ec.annualIncome || ""}
            onValueChange={(v) => update("annualIncome", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.education.selectRange} />
            </SelectTrigger>
            <SelectContent>
              {INCOME_RANGES.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      </div>
    </div>
  );
}

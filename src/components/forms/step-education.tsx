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

interface StepProps {
  errors: Record<string, string>;
}

export function StepEducation({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const ec = formData.educationCareer;

  const update = (field: string, value: string) => {
    updateSection("educationCareer", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Education & Career</h2>
        <p className="text-sm text-muted-foreground">
          Educational qualifications and professional details
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper
          label="Highest Education"
          required
          error={errors.highestEducation}
        >
          <Select
            value={ec.highestEducation}
            onValueChange={(v) => update("highestEducation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select education" />
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

        <FormFieldWrapper label="Education Details" className="sm:col-span-2">
          <Textarea
            value={ec.educationDetails || ""}
            onChange={(e) => update("educationDetails", e.target.value)}
            placeholder="College name, university, year of passing..."
            rows={2}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Additional Qualifications" className="sm:col-span-2">
          <Input
            value={ec.additionalQualifications || ""}
            onChange={(e) => update("additionalQualifications", e.target.value)}
            placeholder="e.g., CFA, PMP, AWS Certified..."
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          label="Occupation"
          required
          error={errors.occupation}
        >
          <Select
            value={ec.occupation}
            onValueChange={(v) => update("occupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select occupation" />
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

        <FormFieldWrapper label="Job Title">
          <Input
            value={ec.jobTitle || ""}
            onChange={(e) => update("jobTitle", e.target.value)}
            placeholder="e.g., Software Engineer, Manager..."
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Company Name">
          <Input
            value={ec.companyName || ""}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="e.g., TCS, Infosys, Own Business..."
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Work Location">
          <Input
            value={ec.workLocation || ""}
            onChange={(e) => update("workLocation", e.target.value)}
            placeholder="e.g., Mumbai, Bangalore..."
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Annual Income">
          <Select
            value={ec.annualIncome || ""}
            onValueChange={(v) => update("annualIncome", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select range" />
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

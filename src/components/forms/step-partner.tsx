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

interface StepProps {
  errors: Record<string, string>;
}

export function StepPartner({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const pp = formData.partnerPreferences;
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
        <h2 className="text-lg font-semibold">Partner Preferences</h2>
        <p className="text-sm text-muted-foreground">
          Optional — describe what you&apos;re looking for in a partner
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label="Preferred Age Range">
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={pp.preferredAgeMin || ""}
              onChange={(e) => updateNum("preferredAgeMin", e.target.value)}
              placeholder="Min"
              min={18}
              max={70}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              value={pp.preferredAgeMax || ""}
              onChange={(e) => updateNum("preferredAgeMax", e.target.value)}
              placeholder="Max"
              min={18}
              max={70}
            />
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label="Preferred Height Range">
          <div className="flex gap-2 items-center">
            <Select
              value={pp.preferredHeightMin || ""}
              onValueChange={(v) => update("preferredHeightMin", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {HEIGHT_OPTIONS.map((h) => (
                  <SelectItem key={h.value} value={h.value}>
                    {h.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">to</span>
            <Select
              value={pp.preferredHeightMax || ""}
              onValueChange={(v) => update("preferredHeightMax", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Max" />
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

        <FormFieldWrapper label="Preferred Education">
          <Select
            value={pp.preferredEducation || ""}
            onValueChange={(v) => update("preferredEducation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {EDUCATION_LEVELS.map((e) => (
                <SelectItem key={e} value={e}>
                  {e} & above
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Preferred Occupation">
          <Select
            value={pp.preferredOccupation || ""}
            onValueChange={(v) => update("preferredOccupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {OCCUPATION_TYPES.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Preferred Location">
          <Input
            value={pp.preferredLocation || ""}
            onChange={(e) => update("preferredLocation", e.target.value)}
            placeholder="e.g., Mumbai, Anywhere in India"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Preferred Caste / Community">
          <Input
            value={pp.preferredCaste || ""}
            onChange={(e) => update("preferredCaste", e.target.value)}
            placeholder="Open to all"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Preferred Diet">
          <Select
            value={pp.preferredDiet || ""}
            onValueChange={(v) => update("preferredDiet", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {DIET_OPTIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        {showManglik && (
          <FormFieldWrapper label="Preferred Manglik Status">
            <Select
              value={pp.preferredManglik || ""}
              onValueChange={(v) => update("preferredManglik", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
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
          label="Additional Expectations"
          error={errors.additionalExpectations}
          className="sm:col-span-2"
        >
          <Textarea
            value={pp.additionalExpectations || ""}
            onChange={(e) => update("additionalExpectations", e.target.value)}
            placeholder="Any other preferences..."
            rows={3}
            maxLength={500}
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}

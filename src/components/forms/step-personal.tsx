"use client";

import { Input } from "@/components/ui/input";
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
  RELIGIONS,
  CASTES_BY_RELIGION,
  MOTHER_TONGUES,
  INDIAN_STATES,
  HEIGHT_OPTIONS,
  BLOOD_GROUPS,
  COMPLEXION_OPTIONS,
  BODY_TYPES,
  MANGLIK_OPTIONS,
} from "@/lib/constants/indian-data";

interface StepProps {
  errors: Record<string, string>;
}

export function StepPersonal({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const pd = formData.personalDetails;

  const update = (field: string, value: string) => {
    updateSection("personalDetails", { [field]: value });
  };

  const age = pd.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(pd.dateOfBirth).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

  const showManglik = pd.religion === "Hindu" || pd.religion === "Jain";
  const castes = pd.religion ? CASTES_BY_RELIGION[pd.religion] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Personal Details</h2>
        <p className="text-sm text-muted-foreground">
          Basic information about the person
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label="Full Name" required error={errors.fullName} className="sm:col-span-2">
          <Input
            value={pd.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Enter full name"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Date of Birth" required error={errors.dateOfBirth}>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={pd.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
              className="flex-1"
            />
            {age !== null && age > 0 && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {age} yrs
              </span>
            )}
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label="Time of Birth">
          <Input
            type="time"
            value={pd.timeOfBirth || ""}
            onChange={(e) => update("timeOfBirth", e.target.value)}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Place of Birth">
          <Input
            value={pd.placeOfBirth || ""}
            onChange={(e) => update("placeOfBirth", e.target.value)}
            placeholder="City, State"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Height" required error={errors.height}>
          <Select value={pd.height} onValueChange={(v) => update("height", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent>
              {HEIGHT_OPTIONS.map((h) => (
                <SelectItem key={h.value} value={h.value}>
                  {h.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Weight (kg)">
          <Input
            value={pd.weight || ""}
            onChange={(e) => update("weight", e.target.value)}
            placeholder="e.g., 65"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Blood Group">
          <Select
            value={pd.bloodGroup || ""}
            onValueChange={(v) => update("bloodGroup", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Complexion">
          <Select
            value={pd.complexion || ""}
            onValueChange={(v) => update("complexion", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {COMPLEXION_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Body Type">
          <Select
            value={pd.bodyType || ""}
            onValueChange={(v) => update("bodyType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {BODY_TYPES.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Religion" required error={errors.religion}>
          <Select
            value={pd.religion}
            onValueChange={(v) => {
              update("religion", v);
              update("caste", "");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select religion" />
            </SelectTrigger>
            <SelectContent>
              {RELIGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        {castes.length > 0 && (
          <FormFieldWrapper label="Caste / Community">
            <Select
              value={pd.caste || ""}
              onValueChange={(v) => update("caste", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select caste" />
              </SelectTrigger>
              <SelectContent>
                {castes.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldWrapper>
        )}

        <FormFieldWrapper label="Sub-caste">
          <Input
            value={pd.subCaste || ""}
            onChange={(e) => update("subCaste", e.target.value)}
            placeholder="Optional"
          />
        </FormFieldWrapper>

        {showManglik && (
          <FormFieldWrapper label="Manglik Status">
            <Select
              value={pd.manglikStatus || ""}
              onValueChange={(v) => update("manglikStatus", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {MANGLIK_OPTIONS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldWrapper>
        )}

        <FormFieldWrapper label="Gotra">
          <Input
            value={pd.gotra || ""}
            onChange={(e) => update("gotra", e.target.value)}
            placeholder="Optional"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Mother Tongue" required error={errors.motherTongue}>
          <Select
            value={pd.motherTongue}
            onValueChange={(v) => update("motherTongue", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {MOTHER_TONGUES.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Current City" required error={errors.currentCity}>
          <Input
            value={pd.currentCity}
            onChange={(e) => update("currentCity", e.target.value)}
            placeholder="e.g., Mumbai"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Current State" required error={errors.currentState}>
          <Select
            value={pd.currentState}
            onValueChange={(v) => update("currentState", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label="Citizenship / Visa Status">
          <Input
            value={pd.citizenshipStatus || ""}
            onChange={(e) => update("citizenshipStatus", e.target.value)}
            placeholder="e.g., Indian Citizen, US Green Card"
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}

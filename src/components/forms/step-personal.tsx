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
import { getDeityOptionsForReligion, getDeityIcon } from "@/components/templates/ornaments";
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
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepPersonal({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const pd = formData.personalDetails;
  const { t } = useI18n();

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
        <h2 className="text-lg font-semibold">{t.personal.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.personal.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.personal.fullName} required error={errors.fullName} className="sm:col-span-2">
          <Input
            value={pd.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={t.personal.enterFullName}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.dateOfBirth} required error={errors.dateOfBirth}>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={pd.dateOfBirth}
              onChange={(e) => update("dateOfBirth", e.target.value)}
              className="flex-1"
            />
            {age !== null && age > 0 && (
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {age} {t.personal.yrs}
              </span>
            )}
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.timeOfBirth}>
          <Input
            type="time"
            value={pd.timeOfBirth || ""}
            onChange={(e) => update("timeOfBirth", e.target.value)}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.placeOfBirth}>
          <Input
            value={pd.placeOfBirth || ""}
            onChange={(e) => update("placeOfBirth", e.target.value)}
            placeholder={t.personal.placeOfBirthPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.height} required error={errors.height}>
          <Select value={pd.height} onValueChange={(v) => update("height", v)}>
            <SelectTrigger>
              <SelectValue placeholder={t.personal.selectHeight} />
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

        <FormFieldWrapper label={t.personal.weightKg}>
          <Input
            value={pd.weight || ""}
            onChange={(e) => update("weight", e.target.value)}
            placeholder={t.personal.weightPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.bloodGroup}>
          <Select
            value={pd.bloodGroup || ""}
            onValueChange={(v) => update("bloodGroup", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
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

        <FormFieldWrapper label={t.personal.complexion}>
          <Select
            value={pd.complexion || ""}
            onValueChange={(v) => update("complexion", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
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

        <FormFieldWrapper label={t.personal.bodyType}>
          <Select
            value={pd.bodyType || ""}
            onValueChange={(v) => update("bodyType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
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

        <FormFieldWrapper label={t.personal.religion} required error={errors.religion}>
          <Select
            value={pd.religion}
            onValueChange={(v) => {
              update("religion", v);
              update("caste", "");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.personal.selectReligion} />
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

        {/* Deity / Header Image Picker */}
        <div className="sm:col-span-2">
          <FormFieldWrapper label={t.personal.headerImage}>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-1">
              <button
                type="button"
                onClick={() => update("deityImageId", "none")}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-xs transition-colors ${
                  pd.deityImageId === "none"
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-muted-foreground/30"
                }`}
              >
                <span className="text-lg text-muted-foreground">&#x2205;</span>
                <span className="text-muted-foreground">{t.personal.none}</span>
              </button>
              {getDeityOptionsForReligion(pd.religion || undefined).map((deity) => {
                const info = getDeityIcon(deity.id);
                const isSelected = pd.deityImageId === deity.id;
                return (
                  <button
                    key={deity.id}
                    type="button"
                    onClick={() => update("deityImageId", deity.id)}
                    className={`flex flex-col items-center justify-center gap-1 rounded-lg border-2 p-2 text-xs transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/30"
                    }`}
                  >
                    {info && <info.icon size={28} />}
                    <span className={isSelected ? "text-primary font-medium" : "text-muted-foreground"}>
                      {deity.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.personal.headerImageHint}
            </p>
          </FormFieldWrapper>
        </div>

        {castes.length > 0 && (
          <FormFieldWrapper label={t.personal.casteCommunity}>
            <Select
              value={pd.caste || ""}
              onValueChange={(v) => update("caste", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.personal.selectCaste} />
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

        <FormFieldWrapper label={t.personal.subCaste}>
          <Input
            value={pd.subCaste || ""}
            onChange={(e) => update("subCaste", e.target.value)}
            placeholder={t.personal.optional}
          />
        </FormFieldWrapper>

        {showManglik && (
          <FormFieldWrapper label={t.personal.manglikStatus}>
            <Select
              value={pd.manglikStatus || ""}
              onValueChange={(v) => update("manglikStatus", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.common.select} />
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

        <FormFieldWrapper label={t.personal.gotra}>
          <Input
            value={pd.gotra || ""}
            onChange={(e) => update("gotra", e.target.value)}
            placeholder={t.personal.optional}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.motherTongue} required error={errors.motherTongue}>
          <Select
            value={pd.motherTongue}
            onValueChange={(v) => update("motherTongue", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
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

        <FormFieldWrapper label={t.personal.currentCity} required error={errors.currentCity}>
          <Input
            value={pd.currentCity}
            onChange={(e) => update("currentCity", e.target.value)}
            placeholder={t.personal.cityPlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.personal.currentState} required error={errors.currentState}>
          <Select
            value={pd.currentState}
            onValueChange={(v) => update("currentState", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.personal.selectState} />
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

        <FormFieldWrapper label={t.personal.citizenshipVisa}>
          <Input
            value={pd.citizenshipStatus || ""}
            onChange={(e) => update("citizenshipStatus", e.target.value)}
            placeholder={t.personal.citizenshipPlaceholder}
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}

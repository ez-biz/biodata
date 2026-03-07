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
  FAMILY_TYPES,
  FAMILY_STATUS,
  FAMILY_VALUES,
  INCOME_RANGES,
  OCCUPATION_TYPES,
} from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepFamily({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const fd = formData.familyDetails;
  const { t } = useI18n();

  const updateStr = (field: string, value: string) => {
    updateSection("familyDetails", { [field]: value });
  };

  const updateNum = (field: string, value: string) => {
    const num = value === "" ? undefined : parseInt(value, 10);
    updateSection("familyDetails", { [field]: num } as Record<string, number | undefined>);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.family.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.family.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.family.fatherName} required error={errors.fatherName}>
          <Input
            value={fd.fatherName}
            onChange={(e) => updateStr("fatherName", e.target.value)}
            placeholder={t.family.enterFatherName}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.fatherOccupation} required error={errors.fatherOccupation}>
          <Select
            value={fd.fatherOccupation}
            onValueChange={(v) => updateStr("fatherOccupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.family.selectOccupation} />
            </SelectTrigger>
            <SelectContent>
              {[...OCCUPATION_TYPES, "Retired"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.motherName} required error={errors.motherName}>
          <Input
            value={fd.motherName}
            onChange={(e) => updateStr("motherName", e.target.value)}
            placeholder={t.family.enterMotherName}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.motherOccupation}>
          <Select
            value={fd.motherOccupation || ""}
            onValueChange={(v) => updateStr("motherOccupation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.family.selectOccupation} />
            </SelectTrigger>
            <SelectContent>
              {[...OCCUPATION_TYPES, "Homemaker", "Retired"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.numberOfBrothers}>
          <div className="flex gap-3">
            <Select
              value={fd.brothers?.toString() || ""}
              onValueChange={(v) => updateNum("brothers", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t.family.total} />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(fd.brothers ?? 0) > 0 && (
              <Select
                value={fd.brothersMarried?.toString() || ""}
                onValueChange={(v) => updateNum("brothersMarried", v)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t.family.married} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: (fd.brothers ?? 0) + 1 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} {t.family.married}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.numberOfSisters}>
          <div className="flex gap-3">
            <Select
              value={fd.sisters?.toString() || ""}
              onValueChange={(v) => updateNum("sisters", v)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t.family.total} />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(fd.sisters ?? 0) > 0 && (
              <Select
                value={fd.sistersMarried?.toString() || ""}
                onValueChange={(v) => updateNum("sistersMarried", v)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={t.family.married} />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: (fd.sisters ?? 0) + 1 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} {t.family.married}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.familyType}>
          <Select
            value={fd.familyType || ""}
            onValueChange={(v) => updateStr("familyType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_TYPES.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.familyStatus}>
          <Select
            value={fd.familyStatus || ""}
            onValueChange={(v) => updateStr("familyStatus", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_STATUS.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.familyValues}>
          <Select
            value={fd.familyValues || ""}
            onValueChange={(v) => updateStr("familyValues", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_VALUES.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.familyIncomeAnnual}>
          <Select
            value={fd.familyIncome || ""}
            onValueChange={(v) => updateStr("familyIncome", v)}
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

        <FormFieldWrapper label={t.family.nativePlaceAncestral}>
          <Input
            value={fd.nativePlace || ""}
            onChange={(e) => updateStr("nativePlace", e.target.value)}
            placeholder={t.family.nativePlacePlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.family.propertyAssets} className="sm:col-span-2">
          <Textarea
            value={fd.propertyAssets || ""}
            onChange={(e) => updateStr("propertyAssets", e.target.value)}
            placeholder={t.family.propertyPlaceholder}
            rows={2}
          />
        </FormFieldWrapper>
      </div>
    </div>
  );
}

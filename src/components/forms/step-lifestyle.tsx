"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { FormFieldWrapper } from "./form-field-wrapper";
import { AiAboutMe } from "./ai-about-me";
import { useBiodataStore } from "@/lib/store/biodata-store";
import {
  DIET_OPTIONS,
  YES_NO_OPTIONS,
  DRINKING_OPTIONS,
  HOBBIES,
} from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepLifestyle({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const ls = formData.lifestyle;
  const { t } = useI18n();

  const update = (field: string, value: string) => {
    updateSection("lifestyle", { [field]: value });
  };

  const toggleHobby = (hobby: string) => {
    const current = ls.hobbies || [];
    const updated = current.includes(hobby)
      ? current.filter((h) => h !== hobby)
      : [...current, hobby];
    updateSection("lifestyle", { hobbies: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.lifestyle.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.lifestyle.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.lifestyle.diet}>
          <Select
            value={ls.diet || ""}
            onValueChange={(v) => update("diet", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.lifestyle.selectDiet} />
            </SelectTrigger>
            <SelectContent>
              {DIET_OPTIONS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.lifestyle.smoking}>
          <Select
            value={ls.smoking || ""}
            onValueChange={(v) => update("smoking", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
            </SelectTrigger>
            <SelectContent>
              {YES_NO_OPTIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.lifestyle.drinking}>
          <Select
            value={ls.drinking || ""}
            onValueChange={(v) => update("drinking", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.common.select} />
            </SelectTrigger>
            <SelectContent>
              {DRINKING_OPTIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>
      </div>

      <FormFieldWrapper label={t.lifestyle.hobbies}>
        <div className="flex flex-wrap gap-2">
          {HOBBIES.map((hobby) => {
            const selected = (ls.hobbies || []).includes(hobby);
            return (
              <Badge
                key={hobby}
                variant={selected ? "default" : "outline"}
                className="cursor-pointer select-none transition-colors"
                onClick={() => toggleHobby(hobby)}
              >
                {hobby}
                {selected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </FormFieldWrapper>

      <FormFieldWrapper label={t.lifestyle.aboutMe} error={errors.aboutMe}>
        <Textarea
          value={ls.aboutMe || ""}
          onChange={(e) => update("aboutMe", e.target.value)}
          placeholder={t.lifestyle.aboutMePlaceholder}
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">
          {(ls.aboutMe || "").length}/500
        </p>
      </FormFieldWrapper>

      <AiAboutMe />
    </div>
  );
}

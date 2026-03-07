"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormFieldWrapper } from "./form-field-wrapper";
import { PhotoUpload } from "./photo-upload";
import { useBiodataStore } from "@/lib/store/biodata-store";
import { CONTACT_RELATIONS } from "@/lib/constants/indian-data";
import { useI18n } from "@/lib/i18n";

interface StepProps {
  errors: Record<string, string>;
}

export function StepContact({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const cd = formData.contactDetails;
  const { t } = useI18n();

  const update = (field: string, value: string | boolean) => {
    updateSection("contactDetails", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{t.contact.heading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.contact.profilePhoto}</h3>
        <div className="grid grid-cols-3 gap-3">
          <PhotoUpload type="profile" className="aspect-[3/4]" />
          <div className="col-span-2 flex flex-col gap-3">
            <h3 className="text-sm font-medium">{t.contact.additionalPhotos}</h3>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[0, 1, 2, 3].map((i) => (
                <PhotoUpload key={i} type="additional" index={i} className="aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label={t.contact.contactPersonName}>
          <Input
            value={cd.contactPersonName || ""}
            onChange={(e) => update("contactPersonName", e.target.value)}
            placeholder={t.contact.contactNamePlaceholder}
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.contact.contactRelation}>
          <Select
            value={cd.contactRelation || ""}
            onValueChange={(v) => update("contactRelation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.contact.selectRelation} />
            </SelectTrigger>
            <SelectContent>
              {CONTACT_RELATIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.contact.phone} required error={errors.phone}>
          <div className="flex gap-2">
            <span className="flex items-center px-3 text-sm bg-muted rounded-md border">
              +91
            </span>
            <Input
              value={cd.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={t.contact.phonePlaceholder}
              maxLength={10}
              inputMode="numeric"
            />
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label={t.contact.email} error={errors.email}>
          <Input
            type="email"
            value={cd.email || ""}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t.contact.emailPlaceholder}
            inputMode="email"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.contact.whatsapp}>
          <Input
            value={cd.whatsapp || ""}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder={t.contact.whatsappPlaceholder}
            inputMode="numeric"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label={t.contact.address} className="sm:col-span-2">
          <Textarea
            value={cd.address || ""}
            onChange={(e) => update("address", e.target.value)}
            placeholder={t.contact.addressPlaceholder}
            rows={2}
          />
        </FormFieldWrapper>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.contact.privacyTitle}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "showPhone", label: t.contact.showPhone },
            { key: "showEmail", label: t.contact.showEmail },
            { key: "showWhatsapp", label: t.contact.showWhatsapp },
            { key: "showAddress", label: t.contact.showAddress },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={cd[key as keyof typeof cd] as boolean}
                onCheckedChange={(checked) => update(key, !!checked)}
              />
              <Label htmlFor={key} className="text-sm cursor-pointer">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

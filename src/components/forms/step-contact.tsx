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

interface StepProps {
  errors: Record<string, string>;
}

export function StepContact({ errors }: StepProps) {
  const { formData, updateSection } = useBiodataStore();
  const cd = formData.contactDetails;

  const update = (field: string, value: string | boolean) => {
    updateSection("contactDetails", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Photos & Contact</h2>
        <p className="text-sm text-muted-foreground">
          Upload your photos and add contact details.
        </p>
      </div>

      {/* Photo Upload Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Profile Photo</h3>
        <div className="grid grid-cols-3 gap-3">
          <PhotoUpload type="profile" className="aspect-[3/4]" />
          <div className="col-span-2 flex flex-col gap-3">
            <h3 className="text-sm font-medium">Additional Photos</h3>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[0, 1, 2, 3].map((i) => (
                <PhotoUpload key={i} type="additional" index={i} className="aspect-square" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormFieldWrapper label="Contact Person Name">
          <Input
            value={cd.contactPersonName || ""}
            onChange={(e) => update("contactPersonName", e.target.value)}
            placeholder="e.g., Mr. Sharma"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Contact Relation">
          <Select
            value={cd.contactRelation || ""}
            onValueChange={(v) => update("contactRelation", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relation" />
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

        <FormFieldWrapper label="Phone Number" required error={errors.phone}>
          <div className="flex gap-2">
            <span className="flex items-center px-3 text-sm bg-muted rounded-md border">
              +91
            </span>
            <Input
              value={cd.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="9876543210"
              maxLength={10}
            />
          </div>
        </FormFieldWrapper>

        <FormFieldWrapper label="Email" error={errors.email}>
          <Input
            type="email"
            value={cd.email || ""}
            onChange={(e) => update("email", e.target.value)}
            placeholder="email@example.com"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="WhatsApp Number">
          <Input
            value={cd.whatsapp || ""}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="Same as phone or different"
          />
        </FormFieldWrapper>

        <FormFieldWrapper label="Address" className="sm:col-span-2">
          <Textarea
            value={cd.address || ""}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Full address (optional)"
            rows={2}
          />
        </FormFieldWrapper>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Privacy — Show on biodata:</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { key: "showPhone", label: "Phone Number" },
            { key: "showEmail", label: "Email Address" },
            { key: "showWhatsapp", label: "WhatsApp Number" },
            { key: "showAddress", label: "Address" },
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

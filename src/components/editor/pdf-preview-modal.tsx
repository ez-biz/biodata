"use client";

import { useBiodataStore } from "@/lib/store/biodata-store";
import { User, MapPin, Phone, Mail } from "lucide-react";

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
}

export function PdfPreviewModal({
  isOpen,
  onClose,
  onConfirmDownload,
}: PdfPreviewModalProps) {
  const { formData, profilePhotoUrl } = useBiodataStore();
  const { personalDetails, contactDetails } = formData;

  if (!isOpen) return null;

  const formatDob = (dob: string) => {
    if (!dob) return "";
    try {
      return new Date(dob).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dob;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-800 to-maroon-900 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-gold-100">
            Preview Your Biodata
          </h2>
          <p className="text-maroon-200 text-sm mt-0.5">
            Verify your details before downloading
          </p>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Card 1: Name + Photo + Location */}
          <div className="rounded-2xl border border-gold-200 bg-gold-50/30 p-4">
            <div className="flex items-center gap-4">
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-maroon-200 flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-maroon-100 flex items-center justify-center border-2 border-maroon-200 flex-shrink-0">
                  <User className="h-7 w-7 text-maroon-400" />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold text-maroon-900 truncate">
                  {personalDetails.fullName || "Name not set"}
                </h3>
                {(personalDetails.currentCity ||
                  personalDetails.currentState) && (
                  <p className="flex items-center gap-1 text-sm text-maroon-600 mt-0.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {[
                        personalDetails.currentCity,
                        personalDetails.currentState,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Key Personal Details */}
          <div className="rounded-2xl border border-gold-200 bg-gold-50/30 p-4">
            <h4 className="font-display text-sm font-semibold text-maroon-800 mb-3">
              Personal Details
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {personalDetails.dateOfBirth && (
                <div>
                  <span className="text-maroon-500 text-xs">Date of Birth</span>
                  <p className="text-maroon-900 font-medium">
                    {formatDob(personalDetails.dateOfBirth)}
                  </p>
                </div>
              )}
              {personalDetails.height && (
                <div>
                  <span className="text-maroon-500 text-xs">Height</span>
                  <p className="text-maroon-900 font-medium">
                    {personalDetails.height}
                  </p>
                </div>
              )}
              {personalDetails.religion && (
                <div>
                  <span className="text-maroon-500 text-xs">Religion</span>
                  <p className="text-maroon-900 font-medium">
                    {personalDetails.religion}
                  </p>
                </div>
              )}
              {personalDetails.caste && (
                <div>
                  <span className="text-maroon-500 text-xs">Caste</span>
                  <p className="text-maroon-900 font-medium">
                    {personalDetails.caste}
                  </p>
                </div>
              )}
              {personalDetails.motherTongue && (
                <div>
                  <span className="text-maroon-500 text-xs">Mother Tongue</span>
                  <p className="text-maroon-900 font-medium">
                    {personalDetails.motherTongue}
                  </p>
                </div>
              )}
              {personalDetails.manglikStatus && (
                <div>
                  <span className="text-maroon-500 text-xs">Manglik</span>
                  <p className="text-maroon-900 font-medium">
                    {personalDetails.manglikStatus}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Contact Info */}
          {(contactDetails.phone || contactDetails.email) && (
            <div className="rounded-2xl border border-gold-200 bg-gold-50/30 p-4">
              <h4 className="font-display text-sm font-semibold text-maroon-800 mb-3">
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                {contactDetails.phone && contactDetails.showPhone !== false && (
                  <div className="flex items-center gap-2 text-maroon-700">
                    <Phone className="h-3.5 w-3.5 text-maroon-400 flex-shrink-0" />
                    <span>{contactDetails.phone}</span>
                  </div>
                )}
                {contactDetails.email && contactDetails.showEmail !== false && (
                  <div className="flex items-center gap-2 text-maroon-700">
                    <Mail className="h-3.5 w-3.5 text-maroon-400 flex-shrink-0" />
                    <span>{contactDetails.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="px-5 pb-5 pt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-full border border-maroon-200 text-maroon-800 text-sm font-semibold hover:bg-maroon-50 transition-colors"
          >
            Go Back & Edit
          </button>
          <button
            onClick={onConfirmDownload}
            className="flex-1 px-4 py-2.5 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-100 text-sm font-semibold transition-colors"
          >
            Looks Good, Download
          </button>
        </div>
      </div>
    </div>
  );
}

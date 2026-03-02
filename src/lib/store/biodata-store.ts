"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BiodataFormData, DEFAULT_BIODATA } from "@/lib/types/biodata";

interface BiodataStore {
  formData: BiodataFormData;
  currentStep: number;
  selectedTemplateId: string;
  selectedColorScheme: string;
  profilePhotoUrl: string | null;
  additionalPhotos: string[];
  lastSavedAt: number | null;
  lastStepVisited: number;

  setFormData: (data: Partial<BiodataFormData>) => void;
  updateSection: <K extends keyof BiodataFormData>(
    section: K,
    data: Partial<BiodataFormData[K]>
  ) => void;
  setCurrentStep: (step: number) => void;
  setSelectedTemplate: (templateId: string) => void;
  setSelectedColorScheme: (scheme: string) => void;
  setProfilePhoto: (url: string | null) => void;
  addAdditionalPhoto: (url: string) => void;
  removeAdditionalPhoto: (index: number) => void;
  resetForm: () => void;
  clearAllData: () => void;
  getCompletionPercentage: () => number;
  hasExistingData: () => boolean;
}

export const useBiodataStore = create<BiodataStore>()(
  persist(
    (set, get) => ({
      formData: DEFAULT_BIODATA,
      currentStep: 1,
      selectedTemplateId: "traditional-classic",
      selectedColorScheme: "default",
      profilePhotoUrl: null,
      additionalPhotos: [],
      lastSavedAt: null,
      lastStepVisited: 1,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
          lastSavedAt: Date.now(),
        })),

      updateSection: (section, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [section]: { ...state.formData[section], ...data },
          },
          lastSavedAt: Date.now(),
        })),

      setCurrentStep: (step) => set({ currentStep: step, lastStepVisited: step }),

      setSelectedTemplate: (templateId) =>
        set({ selectedTemplateId: templateId }),

      setSelectedColorScheme: (scheme) =>
        set({ selectedColorScheme: scheme }),

      setProfilePhoto: (url) => set({ profilePhotoUrl: url }),

      addAdditionalPhoto: (url) =>
        set((state) => ({
          additionalPhotos: [...state.additionalPhotos, url].slice(0, 4),
        })),

      removeAdditionalPhoto: (index) =>
        set((state) => ({
          additionalPhotos: state.additionalPhotos.filter((_, i) => i !== index),
        })),

      resetForm: () =>
        set({
          formData: DEFAULT_BIODATA,
          currentStep: 1,
          profilePhotoUrl: null,
          additionalPhotos: [],
        }),

      clearAllData: () =>
        set({
          formData: DEFAULT_BIODATA,
          currentStep: 1,
          selectedTemplateId: "traditional-classic",
          selectedColorScheme: "default",
          profilePhotoUrl: null,
          additionalPhotos: [],
          lastSavedAt: null,
          lastStepVisited: 1,
        }),

      hasExistingData: () => {
        const { formData } = get();
        const pd = formData.personalDetails;
        return !!(pd.fullName || pd.dateOfBirth || pd.religion);
      },

      getCompletionPercentage: () => {
        const { formData } = get();
        const pd = formData.personalDetails;
        const ec = formData.educationCareer;
        const fd = formData.familyDetails;
        const cd = formData.contactDetails;

        let filled = 0;
        const total = 10;

        if (pd.fullName) filled++;
        if (pd.dateOfBirth) filled++;
        if (pd.height) filled++;
        if (pd.religion) filled++;
        if (pd.motherTongue) filled++;
        if (pd.currentCity) filled++;
        if (ec.highestEducation) filled++;
        if (ec.occupation) filled++;
        if (fd.fatherName) filled++;
        if (cd.phone) filled++;

        return Math.round((filled / total) * 100);
      },
    }),
    {
      name: "biodata-craft-store",
    }
  )
);

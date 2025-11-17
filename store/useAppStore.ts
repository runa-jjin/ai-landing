"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CopyInput, CopyOutput } from "@/lib/schema";

type TabKey = "result" | "preview";

interface AppState {
  form: CopyInput;
  result: CopyOutput | null;
  isGenerating: boolean;
  usageCount: number;
  planType: string;
  error: string | null;
  activeTab: TabKey;
  isPaywallOpen: boolean;
  isUpgradePromptOpen: boolean;
  setFormField: <K extends keyof CopyInput>(key: K, value: CopyInput[K]) => void;
  setForm: (value: CopyInput) => void;
  setResult: (value: CopyOutput | null) => void;
  setIsGenerating: (value: boolean) => void;
  incrementUsage: () => void;
  setPlanType: (value: string) => void;
  setError: (value: string | null) => void;
  setActiveTab: (tab: TabKey) => void; 
  setPaywallOpen: (value: boolean) => void;
  setUpgradePromptOpen: (value: boolean) => void;
  reset: () => void; 
}

const defaultForm: CopyInput = {
  serviceName: "",
  industry: "뷰티",
  customIndustry: "",
  coreValue: "",
  tone: "담백",
  targetAudience: "",
  differentiator: "",
  language: "ko"
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      form: defaultForm,
      result: null,
      isGenerating: false,
      usageCount: 0,
      planType: 'free',
      error: null,
      activeTab: "preview",
      isPaywallOpen: false,
      isUpgradePromptOpen: false,
      setFormField: (key, value) =>
        set((state) => ({
          form: {
            ...state.form,
            [key]: value
          }
        })),
      setForm: (value) => set({ form: value }),
      setResult: (value) => set({ result: value }),
      setIsGenerating: (value) => set({ isGenerating: value }),
      incrementUsage: () => set((state) => ({ usageCount: state.usageCount + 1 })),
      setPlanType: (value) => set({ planType: value }),
      setError: (value) => set({ error: value }),
      setActiveTab: (tab) => set({ activeTab: tab }), 
      setPaywallOpen: (value) => set({ isPaywallOpen: value }),
      setUpgradePromptOpen: (value) => set({ isUpgradePromptOpen: value }),
      reset: () => set({ form: defaultForm, result: null, error: null })
    }),
    {
      name: "app-store",
      partialize: (state) => ({ usageCount: state.usageCount, planType: state.planType, form: state.form })
    }
  )
);
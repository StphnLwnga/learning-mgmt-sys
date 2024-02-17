import { create } from "zustand";
import { Locale } from "@/i18n";

type State = {
  lang: Locale;
}

type Action = {
  setLanguage: (lang: State['lang']) => void;
}

export const useLanguageStore = create<State & Action>((set) => ({
  lang: "en",
  setLanguage: (lang) => set(() => ({ lang })),
}))
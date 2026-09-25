import { FeatureConfig, LanguageConfig } from "@/types";

// Add a new language here and it shows up everywhere (home grid,
// dashboard filters, session engine) automatically.
export const LANGUAGES: LanguageConfig[] = [
  { code: "en", label: "English", flag: "🇬🇧", speechLocale: "en-US" },
  { code: "de", label: "German", flag: "🇩🇪", speechLocale: "de-DE" },
];

// Add a new feature (e.g. "antonym", "spelling") here. The session engine
// only needs a topic + word list per (language, feature) pair.
export const FEATURES: FeatureConfig[] = [
  {
    id: "synonym",
    label: "Synonyms",
    description: "Hear a word, say a synonym out loud.",
    promptLocale: "en", // overridden per-language at lookup time
    answerLocale: "en",
  },
  {
    id: "meaning",
    label: "Bangla meaning",
    description: "Hear a word, say its Bangla meaning out loud.",
    promptLocale: "en",
    answerLocale: "bn",
  },
];

export function getLanguage(code: string) {
  return LANGUAGES.find((l) => l.code === code);
}

export function getFeature(id: string) {
  return FEATURES.find((f) => f.id === id);
}

/** answer locale is language-specific for "synonym", fixed to Bangla for "meaning" */
export function resolveAnswerLocale(languageCode: string, featureId: string) {
  if (featureId === "meaning") return "bn-BD";
  const lang = getLanguage(languageCode);
  return lang?.speechLocale ?? "en-US";
}

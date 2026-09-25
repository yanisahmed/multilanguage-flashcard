// ---- Core domain types -----------------------------------------------
// Everything here is written to be data-driven: adding a new language or
// a new feature should mean adding config/data, not new components.

export type LanguageCode = "en" | "de";

export type FeatureId = "synonym" | "meaning";

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  flag: string;
  speechLocale: string; // BCP-47 locale for the Web Speech API
}

export interface FeatureConfig {
  id: FeatureId;
  label: string;
  description: string;
  /** What the user hears/reads as the prompt word's language */
  promptLocale: LanguageCode;
  /** What language the *spoken answer* should be recognized in */
  answerLocale: LanguageCode | "bn"; // bn = Bangla, used by "meaning"
}

export interface Topic {
  id: string;
  languageCode: LanguageCode;
  featureId: FeatureId;
  title: string;
  description: string;
}

export interface WordCard {
  id: string;
  topicId: string;
  prompt: string; // the word shown/spoken to the user
  /** Any of these spoken answers count as correct */
  acceptedAnswers: string[];
  /** Shown to the user if they get it wrong / for reference */
  displayAnswer: string;
  hint?: string;
}

export type AttemptResult = "correct" | "incorrect" | "skipped";

export interface Attempt {
  id: string;
  userId: string;
  languageCode: LanguageCode;
  featureId: FeatureId;
  topicId: string;
  wordId: string;
  spoken: string;
  result: AttemptResult;
  timestamp: number;
}

export interface SessionSummary {
  id: string;
  userId: string;
  languageCode: LanguageCode;
  featureId: FeatureId;
  topicId: string;
  startedAt: number;
  endedAt: number;
  correct: number;
  incorrect: number;
  skipped: number;
  newWordsSeen: string[];
}

export interface UserProfile {
  id: string; // email, used as the local storage partition key
  name: string;
  email: string;
  image?: string;
  createdAt: number;
}

import { repo } from "@/lib/db/localStorageRepository";
import { LANGUAGES, FEATURES } from "@/lib/data/registry";

export interface Breakdown {
  key: string;
  label: string;
  correct: number;
  incorrect: number;
  successRate: number;
}

export interface UserStats {
  totalSessions: number;
  totalAttempts: number;
  correct: number;
  incorrect: number;
  successRate: number;
  failureRate: number;
  newWordsLearned: number;
  minutesPracticed: number;
  breakdown: Breakdown[];
}

export function computeStats(userId: string): UserStats {
  const attempts = repo.getAttempts(userId);
  const sessions = repo.getSessions(userId);

  const correct = attempts.filter((a) => a.result === "correct").length;
  const incorrect = attempts.filter((a) => a.result === "incorrect").length;
  const total = correct + incorrect;

  const distinctWords = new Set(attempts.filter((a) => a.result === "correct").map((a) => a.wordId));

  const minutesPracticed = Math.round(
    sessions.reduce((sum, s) => sum + (s.endedAt - s.startedAt), 0) / 60000
  );

  const breakdown: Breakdown[] = [];
  for (const lang of LANGUAGES) {
    for (const feature of FEATURES) {
      const subset = attempts.filter(
        (a) => a.languageCode === lang.code && a.featureId === feature.id
      );
      const c = subset.filter((a) => a.result === "correct").length;
      const i = subset.filter((a) => a.result === "incorrect").length;
      const t = c + i;
      if (t === 0) continue;
      breakdown.push({
        key: `${lang.code}-${feature.id}`,
        label: `${lang.flag} ${lang.label} · ${feature.label}`,
        correct: c,
        incorrect: i,
        successRate: Math.round((c / t) * 100),
      });
    }
  }

  return {
    totalSessions: sessions.length,
    totalAttempts: total,
    correct,
    incorrect,
    successRate: total > 0 ? Math.round((correct / total) * 100) : 0,
    failureRate: total > 0 ? Math.round((incorrect / total) * 100) : 0,
    newWordsLearned: distinctWords.size,
    minutesPracticed,
    breakdown,
  };
}

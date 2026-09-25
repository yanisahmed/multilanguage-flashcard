// Normalizes and loosely compares the transcript from the Web Speech API
// against a card's accepted answers. Kept as a standalone, pure function
// so it's easy to unit test or later swap for a smarter (e.g. embedding
// similarity) matcher without touching the session engine.

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"]/g, "")
    .replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/** Returns true if `spoken` is close enough to any of `acceptedAnswers`. */
export function isCorrectAnswer(spoken: string, acceptedAnswers: string[]): boolean {
  const s = normalize(spoken);
  if (!s) return false;
  return acceptedAnswers.some((raw) => {
    const a = normalize(raw);
    if (s === a) return true;
    if (s.includes(a) || a.includes(s)) return true;
    // allow small mishears/typos relative to word length
    const distance = levenshtein(s, a);
    const tolerance = Math.max(1, Math.floor(a.length * 0.25));
    return distance <= tolerance;
  });
}

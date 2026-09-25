"use client";

import Link from "next/link";

export default function ScoreSummary({
  correct,
  incorrect,
  skipped,
  newWords,
}: {
  correct: number;
  incorrect: number;
  skipped: number;
  newWords: number;
}) {
  const total = correct + incorrect;
  const successRate = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="card mx-auto max-w-md p-8 text-center">
      <h2 className="font-display text-2xl">Session complete</h2>
      <p className="mt-1 text-sm text-ink/60">Nice work — here's how it went.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-card border border-line p-3">
          <div className="text-2xl font-semibold text-moss">{successRate}%</div>
          <div className="text-xs text-ink/60">Success rate</div>
        </div>
        <div className="rounded-card border border-line p-3">
          <div className="text-2xl font-semibold text-clay">{incorrect}</div>
          <div className="text-xs text-ink/60">Missed</div>
        </div>
        <div className="rounded-card border border-line p-3">
          <div className="text-2xl font-semibold">{correct}</div>
          <div className="text-xs text-ink/60">Correct</div>
        </div>
        <div className="rounded-card border border-line p-3">
          <div className="text-2xl font-semibold">{newWords}</div>
          <div className="text-xs text-ink/60">New words practiced</div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn-outline">Choose another drill</Link>
        <Link href="/dashboard" className="btn-primary">View dashboard</Link>
      </div>
    </div>
  );
}

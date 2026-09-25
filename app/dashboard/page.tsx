"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { computeStats, UserStats } from "@/lib/analytics";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      setStats(computeStats(session.user.email));
    }
  }, [session]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-ink/60">Sign in to see your dashboard.</p>
        <button onClick={() => signIn("google")} className="btn-primary mx-auto mt-4">
          Sign in with Google
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <h1 className="font-display text-2xl">Your progress</h1>
      <p className="mt-1 text-sm text-ink/60">Updated in real time as you complete sessions.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="New words learned" value={stats.newWordsLearned} accent="#3E5A48" />
        <StatCard label="Success rate" value={`${stats.successRate}%`} accent="#3E5A48" />
        <StatCard label="Failure rate" value={`${stats.failureRate}%`} accent="#B4552F" />
        <StatCard label="Sessions completed" value={stats.totalSessions} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total attempts" value={stats.totalAttempts} />
        <StatCard label="Correct answers" value={stats.correct} />
        <StatCard label="Missed answers" value={stats.incorrect} />
        <StatCard label="Minutes practiced" value={stats.minutesPracticed} />
      </div>

      <h2 className="mt-10 font-display text-lg">By language & feature</h2>
      <div className="mt-3 space-y-2">
        {stats.breakdown.length === 0 && (
          <p className="text-sm text-ink/50">Complete a session to see a breakdown here.</p>
        )}
        {stats.breakdown.map((b) => (
          <div key={b.key} className="card flex items-center justify-between p-4">
            <span className="text-sm">{b.label}</span>
            <div className="flex items-center gap-4 text-sm text-ink/60">
              <span>✓ {b.correct}</span>
              <span>✕ {b.incorrect}</span>
              <span className="font-medium text-moss">{b.successRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

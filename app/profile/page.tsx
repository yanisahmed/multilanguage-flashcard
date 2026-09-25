"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { computeStats, UserStats } from "@/lib/analytics";
import { repo } from "@/lib/db/localStorageRepository";
import StatCard from "@/components/StatCard";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [joined, setJoined] = useState<number | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      setStats(computeStats(session.user.email));
      setJoined(repo.getProfile(session.user.email)?.createdAt ?? null);
    }
  }, [session]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-ink/60">Sign in to view your profile.</p>
        <button onClick={() => signIn("google")} className="btn-primary mx-auto mt-4">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="card flex items-center gap-4 p-6">
        {session.user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="h-16 w-16 rounded-full" />
        )}
        <div>
          <h1 className="font-display text-xl">{session.user?.name}</h1>
          <p className="text-sm text-ink/60">{session.user?.email}</p>
          {joined && (
            <p className="text-xs text-ink/40 mt-1">
              Learning since {new Date(joined).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {stats && (
        <>
          <h2 className="mt-8 font-display text-lg">Lifetime stats</h2>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="New words learned" value={stats.newWordsLearned} accent="#3E5A48" />
            <StatCard label="Success rate" value={`${stats.successRate}%`} accent="#3E5A48" />
            <StatCard label="Failure rate" value={`${stats.failureRate}%`} accent="#B4552F" />
            <StatCard label="Sessions completed" value={stats.totalSessions} />
          </div>
        </>
      )}
    </div>
  );
}

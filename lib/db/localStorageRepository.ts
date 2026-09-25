import { Attempt, SessionSummary, UserProfile } from "@/types";
import { ProgressRepository } from "./types";

// All keys are namespaced per user so multiple Google accounts on the
// same browser don't collide, and so this can be mapped 1:1 onto
// per-user rows in a real database later.
const key = {
  profile: (uid: string) => `lf:${uid}:profile`,
  attempts: (uid: string) => `lf:${uid}:attempts`,
  sessions: (uid: string) => `lf:${uid}:sessions`,
};

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(k: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(k, JSON.stringify(value));
  } catch {
    // storage full / disabled — fail silently, the session still works
  }
}

class LocalStorageRepository implements ProgressRepository {
  getProfile(userId: string): UserProfile | null {
    return read<UserProfile | null>(key.profile(userId), null);
  }

  upsertProfile(profile: UserProfile): void {
    write(key.profile(profile.id), profile);
  }

  recordAttempt(attempt: Attempt): void {
    const list = read<Attempt[]>(key.attempts(attempt.userId), []);
    list.push(attempt);
    write(key.attempts(attempt.userId), list);
  }

  recordSession(summary: SessionSummary): void {
    const list = read<SessionSummary[]>(key.sessions(summary.userId), []);
    list.push(summary);
    write(key.sessions(summary.userId), list);
  }

  getAttempts(userId: string): Attempt[] {
    return read<Attempt[]>(key.attempts(userId), []);
  }

  getSessions(userId: string): SessionSummary[] {
    return read<SessionSummary[]>(key.sessions(userId), []);
  }
}

// Singleton export. Swapping storage backends later means changing this
// one line (and the class it points to) — nothing else in the app cares.
export const repo: ProgressRepository = new LocalStorageRepository();

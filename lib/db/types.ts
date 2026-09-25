import { Attempt, SessionSummary, UserProfile } from "@/types";

// This is the seam that makes the app "scalable": every screen talks to
// this interface, never to localStorage directly. Swap LocalStorageRepo
// for e.g. a Postgres-backed REST/Prisma implementation later without
// touching any component.
export interface ProgressRepository {
  getProfile(userId: string): UserProfile | null;
  upsertProfile(profile: UserProfile): void;

  recordAttempt(attempt: Attempt): void;
  recordSession(summary: SessionSummary): void;

  getAttempts(userId: string): Attempt[];
  getSessions(userId: string): SessionSummary[];
}

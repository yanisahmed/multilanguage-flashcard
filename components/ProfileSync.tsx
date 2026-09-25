"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { repo } from "@/lib/db/localStorageRepository";

/** Invisible component: keeps the localStorage profile record in sync with
 * whoever is currently signed in via Google. Mounted once in the root layout. */
export default function ProfileSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;
    const id = session.user.email;
    const existing = repo.getProfile(id);
    repo.upsertProfile({
      id,
      name: session.user.name ?? "Learner",
      email: id,
      image: session.user.image ?? undefined,
      createdAt: existing?.createdAt ?? Date.now(),
    });
  }, [session]);

  return null;
}

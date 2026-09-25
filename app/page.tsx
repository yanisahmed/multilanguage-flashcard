"use client";

import { signIn, useSession } from "next-auth/react";
import LanguageFeatureGrid from "@/components/LanguageFeatureGrid";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="font-display text-3xl">Speak it to learn it</h1>
        <p className="mt-3 text-ink/60">
          Timed spoken-vocabulary drills for IELTS prep, in English and German.
        </p>
        <button onClick={() => signIn("google")} className="btn-primary mx-auto mt-6">
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl">Choose a drill</h1>
      <p className="mt-1 text-sm text-ink/60">
        Pick a language and a feature, then a topic. Every session runs for 5 minutes.
      </p>
      <div className="mt-6">
        <LanguageFeatureGrid />
      </div>
    </div>
  );
}

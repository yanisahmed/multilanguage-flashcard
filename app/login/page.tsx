"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm py-24 text-center">
      <h1 className="font-display text-2xl">Welcome back</h1>
      <p className="mt-2 text-sm text-ink/60">
        Sign in to save your streak and progress across devices.
      </p>
      <button onClick={() => signIn("google", { callbackUrl: "/" })} className="btn-primary mx-auto mt-6">
        Continue with Google
      </button>
    </div>
  );
}

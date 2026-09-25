"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-line bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg tracking-tight">
          LinguaFlash
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          {status === "authenticated" && (
            <>
              <Link href="/" className="hover:text-moss">Practice</Link>
              <Link href="/dashboard" className="hover:text-moss">Dashboard</Link>
              <Link href="/profile" className="hover:text-moss">Profile</Link>
              <button onClick={() => signOut()} className="btn-outline !px-3 !py-1.5 text-xs">
                Sign out
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <button onClick={() => signIn("google")} className="btn-primary !px-3 !py-1.5 text-xs">
              Sign in with Google
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

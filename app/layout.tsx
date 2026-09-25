import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import ProfileSync from "@/components/ProfileSync";

export const metadata: Metadata = {
  title: "LinguaFlash — Speak-to-learn flashcards",
  description: "IELTS-style spoken vocabulary drills for English and German.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-parchment text-ink font-body antialiased">
        <Providers>
          <ProfileSync />
          <Navbar />
          <main className="mx-auto max-w-5xl px-5 pb-24 pt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { LANGUAGES, FEATURES } from "@/lib/data/registry";

export default function LanguageFeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {LANGUAGES.map((lang) =>
        FEATURES.map((feature) => (
          <Link
            key={`${lang.code}-${feature.id}`}
            href={`/practice/${lang.code}/${feature.id}`}
            className="card group flex flex-col gap-2 p-5 hover:border-moss"
          >
            <span className="text-2xl">{lang.flag}</span>
            <h3 className="font-display text-lg">
              {lang.label} · {feature.label}
            </h3>
            <p className="text-sm text-ink/60">{feature.description}</p>
            <span className="mt-2 text-sm font-medium text-moss group-hover:underline">
              Choose a topic →
            </span>
          </Link>
        ))
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Topic } from "@/types";

export default function TopicGrid({
  topics,
  lang,
  feature,
}: {
  topics: Topic[];
  lang: string;
  feature: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {topics.map((t) => (
        <Link
          key={t.id}
          href={`/practice/${lang}/${feature}/${t.id}`}
          className="card group flex flex-col gap-1 p-5 hover:border-moss"
        >
          <h3 className="font-display text-lg">{t.title}</h3>
          <p className="text-sm text-ink/60">{t.description}</p>
          <span className="mt-2 text-sm font-medium text-moss group-hover:underline">
            Start 5-minute session →
          </span>
        </Link>
      ))}
    </div>
  );
}

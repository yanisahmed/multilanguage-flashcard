import { getLanguage, getFeature } from "@/lib/data/registry";
import { getTopicsFor } from "@/lib/data/topics";
import TopicGrid from "@/components/TopicGrid";
import { notFound } from "next/navigation";

export default function TopicSelectPage({
  params,
}: {
  params: { lang: string; feature: string };
}) {
  const language = getLanguage(params.lang);
  const feature = getFeature(params.feature);
  if (!language || !feature) return notFound();

  const topics = getTopicsFor(params.lang, params.feature);

  return (
    <div>
      <p className="text-sm text-ink/60">
        {language.flag} {language.label} · {feature.label}
      </p>
      <h1 className="font-display text-2xl mt-1">Pick a topic</h1>
      <div className="mt-6">
        <TopicGrid topics={topics} lang={params.lang} feature={params.feature} />
      </div>
    </div>
  );
}

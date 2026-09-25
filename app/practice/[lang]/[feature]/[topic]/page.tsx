import { notFound } from "next/navigation";
import { getFeature, getLanguage, resolveAnswerLocale } from "@/lib/data/registry";
import { getTopic } from "@/lib/data/topics";
import { getWordsFor } from "@/lib/data/words";
import PracticeSession from "@/components/PracticeSession";

export default function SessionPage({
  params,
}: {
  params: { lang: string; feature: string; topic: string };
}) {
  const language = getLanguage(params.lang);
  const feature = getFeature(params.feature);
  const topic = getTopic(params.topic);
  if (!language || !feature || !topic) return notFound();

  const words = getWordsFor(topic.id);
  const speechLocale = resolveAnswerLocale(params.lang, params.feature);
  const answerLabel = feature.id === "meaning" ? "Bangla meaning" : "synonym";

  return (
    <div>
      <p className="text-center text-sm text-ink/60">
        {language.flag} {language.label} · {feature.label} · {topic.title}
      </p>
      <div className="mt-6">
        <PracticeSession
          words={words}
          languageCode={params.lang}
          featureId={params.feature}
          topicId={topic.id}
          speechLocale={speechLocale}
          answerLabel={answerLabel}
        />
      </div>
    </div>
  );
}

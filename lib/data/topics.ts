import { Topic } from "@/types";

// IELTS-style topic set, duplicated across both features and both
// languages by convention: topic id = `${languageCode}-${featureId}-${slug}`.
const TOPIC_DEFS = [
  { slug: "environment", title: "Environment", description: "Climate, nature, pollution" },
  { slug: "technology", title: "Technology", description: "Digital life, innovation" },
  { slug: "education", title: "Education", description: "Learning, schools, exams" },
  { slug: "health", title: "Health", description: "Wellbeing, medicine, fitness" },
];

function buildTopics(languageCode: "en" | "de", featureId: "synonym" | "meaning"): Topic[] {
  return TOPIC_DEFS.map((t) => ({
    id: `${languageCode}-${featureId}-${t.slug}`,
    languageCode,
    featureId,
    title: t.title,
    description: t.description,
  }));
}

export const TOPICS: Topic[] = [
  ...buildTopics("en", "synonym"),
  ...buildTopics("en", "meaning"),
  ...buildTopics("de", "synonym"),
  ...buildTopics("de", "meaning"),
];

export function getTopicsFor(languageCode: string, featureId: string): Topic[] {
  return TOPICS.filter((t) => t.languageCode === languageCode && t.featureId === featureId);
}

export function getTopic(topicId: string): Topic | undefined {
  return TOPICS.find((t) => t.id === topicId);
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { WordCard } from "@/types";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { isCorrectAnswer } from "@/lib/utils/matching";
import { repo } from "@/lib/db/localStorageRepository";
import ScoreSummary from "@/components/ScoreSummary";

const SESSION_SECONDS = 5 * 60;
const CORRECT_PAUSE_MS = 1200;
const INCORRECT_PAUSE_MS = 2800;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "answering" | "correct" | "incorrect" | "finished";

export default function PracticeSession({
  words,
  languageCode,
  featureId,
  topicId,
  speechLocale,
  answerLabel,
}: {
  words: WordCard[];
  languageCode: string;
  featureId: string;
  topicId: string;
  speechLocale: string;
  answerLabel: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.email ?? "guest";

  const queueRef = useRef<WordCard[]>(shuffle(words));
  const indexRef = useRef(0);
  const [current, setCurrent] = useState<WordCard | null>(queueRef.current[0] ?? null);
  const [phase, setPhase] = useState<Phase>("answering");
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [manualAnswer, setManualAnswer] = useState("");

  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const seenWords = useRef<Set<string>>(new Set());
  const startedAt = useRef(Date.now());

  const { status, transcript, start, setTranscript } = useSpeechRecognition(speechLocale);

  // countdown
  useEffect(() => {
    if (phase === "finished") return;
    if (secondsLeft <= 0) {
      finishSession();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase]);

  function nextWord() {
    indexRef.current += 1;
    if (indexRef.current >= queueRef.current.length) {
      queueRef.current = shuffle(words);
      indexRef.current = 0;
    }
    setCurrent(queueRef.current[indexRef.current]);
    setTranscript("");
    setManualAnswer("");
    setPhase("answering");
  }

  function finishSession() {
    setPhase("finished");
    repo.recordSession({
      id: `s${Date.now()}`,
      userId,
      languageCode: languageCode as any,
      featureId: featureId as any,
      topicId,
      startedAt: startedAt.current,
      endedAt: Date.now(),
      correct,
      incorrect,
      skipped,
      newWordsSeen: Array.from(seenWords.current),
    });
  }

  function submitAnswer(spoken: string) {
    if (!current || phase !== "answering" || !spoken.trim()) return;
    seenWords.current.add(current.id);
    const ok = isCorrectAnswer(spoken, current.acceptedAnswers);

    repo.recordAttempt({
      id: `a${Date.now()}`,
      userId,
      languageCode: languageCode as any,
      featureId: featureId as any,
      topicId,
      wordId: current.id,
      spoken,
      result: ok ? "correct" : "incorrect",
      timestamp: Date.now(),
    });

    if (ok) {
      setCorrect((c) => c + 1);
      setPhase("correct");
      setTimeout(nextWord, CORRECT_PAUSE_MS);
    } else {
      setIncorrect((c) => c + 1);
      setPhase("incorrect");
      setTimeout(nextWord, INCORRECT_PAUSE_MS);
    }
  }

  // fire once a spoken transcript arrives
  useEffect(() => {
    if (transcript) submitAnswer(transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  function skip() {
    if (!current) return;
    setSkipped((c) => c + 1);
    nextWord();
  }

  const minutes = useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft]);
  const secs = useMemo(() => String(secondsLeft % 60).padStart(2, "0"), [secondsLeft]);

  if (phase === "finished") {
    return (
      <ScoreSummary
        correct={correct}
        incorrect={incorrect}
        skipped={skipped}
        newWords={seenWords.current.size}
      />
    );
  }

  if (!current) return <p>No words in this topic yet.</p>;

  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-center justify-between text-sm text-ink/60">
        <span>Say the {answerLabel}</span>
        <span className="font-mono text-base text-ink">
          {minutes}:{secs}
        </span>
      </div>

      <div className="card mt-3 flex flex-col items-center gap-4 p-10 text-center">
        <span className="text-xs uppercase tracking-wide text-ink/40">Word {seenWords.current.size + (phase === "answering" ? 1 : 0)}</span>
        <h2 className="font-display text-4xl">{current.prompt}</h2>
        {current.hint && <p className="text-sm text-ink/50">Hint: {current.hint}</p>}

        {phase === "correct" && (
          <div className="rounded-card bg-moss/10 px-4 py-2 text-moss">✓ Correct — nice work</div>
        )}
        {phase === "incorrect" && (
          <div className="rounded-card bg-clay/10 px-4 py-2 text-clay">
            Not quite. A correct answer: <strong>{current.displayAnswer}</strong>
          </div>
        )}

        {phase === "answering" && (
          <>
            {status === "unsupported" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitAnswer(manualAnswer);
                }}
                className="flex w-full gap-2"
              >
                <input
                  value={manualAnswer}
                  onChange={(e) => setManualAnswer(e.target.value)}
                  placeholder="Type your answer"
                  className="w-full rounded-card border border-line px-3 py-2 text-sm"
                  autoFocus
                />
                <button type="submit" className="btn-primary">Check</button>
              </form>
            ) : (
              <button
                onClick={start}
                className="btn-primary"
                disabled={status === "listening"}
              >
                {status === "listening" ? "Listening…" : "🎤 Speak your answer"}
              </button>
            )}
            <button onClick={skip} className="text-xs text-ink/40 hover:text-ink/70">
              Skip
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-6 text-xs text-ink/50">
        <span>✓ {correct}</span>
        <span>✕ {incorrect}</span>
        <span>⏭ {skipped}</span>
      </div>
    </div>
  );
}

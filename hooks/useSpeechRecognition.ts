"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "listening" | "unsupported" | "error";

/**
 * Thin wrapper around the browser's Web Speech API (SpeechRecognition).
 * Chrome/Edge only at time of writing — `status` will be "unsupported"
 * elsewhere, and callers should show a manual text-input fallback.
 */
export function useSpeechRecognition(locale: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("unsupported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.lang = locale;

    recognition.onresult = (event: any) => {
      const text = event.results?.[0]?.[0]?.transcript ?? "";
      setTranscript(text);
      setStatus("idle");
    };
    recognition.onerror = () => setStatus("error");
    recognition.onend = () => setStatus((s) => (s === "listening" ? "idle" : s));

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [locale]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setStatus("listening");
    try {
      recognitionRef.current.start();
    } catch {
      // start() throws if already started; ignore
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return { status, transcript, start, stop, setTranscript };
}

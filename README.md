# LinguaFlash

Spoken-vocabulary flashcard drills for IELTS prep — English and German,
each with two features: **Synonyms** and **Bangla meaning**. Built with
Next.js (App Router), Tailwind, NextAuth (Google), and the Web Speech API.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

### Google OAuth setup (required for login)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.
2. Create an OAuth 2.0 Client ID, type "Web application".
3. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   (add your production URL's equivalent when you deploy).
4. Copy the Client ID / Secret into `.env.local`.
5. Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

Without these, the app runs but "Sign in with Google" will error — that's
expected until real credentials are added.

### Speech recognition

Uses the browser's built-in Web Speech API (`SpeechRecognition`). Currently
only Chrome/Edge implement it. On unsupported browsers the app automatically
falls back to a text input for the same flow, so nothing breaks — it's just
not hands-free there.

## Architecture — built to scale

- **`types/`** — all shared domain types (Language, Feature, Topic, WordCard,
  Attempt, Session, UserProfile). Every other layer is written against these.
- **`lib/data/registry.ts`** — the single place that lists supported
  languages and features. Add a language (e.g. Spanish) or a feature (e.g.
  "antonym", "spelling") here and the home page, topic pages, and session
  engine all pick it up automatically — no new components needed.
- **`lib/data/topics.ts` / `lib/data/words.ts`** — seed content. Each is a
  flat array with a `getXFor()` lookup, on purpose: swapping this for a
  `fetch()` call to a real content API is a one-file change.
- **`lib/db/`** — a `ProgressRepository` interface with a `localStorage`
  implementation (`localStorageRepository.ts`). Every screen (dashboard,
  profile, session engine) talks to `repo`, never to `window.localStorage`
  directly. When you outgrow local storage, write a
  `PostgresProgressRepository` (or hit a REST/GraphQL API) that implements
  the same interface and swap the one export in that file — no component
  changes required.
- **`components/PracticeSession.tsx`** — the generic session engine. It
  takes `words`, a `speechLocale`, and an `answerLabel` as props, so the
  same component runs all four drills (English/German × Synonym/Meaning).
  This is the "duplicate feature one / two" requirement solved by
  configuration instead of copy-pasted code.
- **`lib/utils/matching.ts`** — pure function that grades a spoken
  transcript against accepted answers (normalizes case/punctuation, allows
  minor mishears via edit distance). Isolated so it's easy to test or
  upgrade (e.g. to a semantic-similarity model) later.

## Adding a new language or feature

1. Add the language to `LANGUAGES` (or feature to `FEATURES`) in
   `lib/data/registry.ts`.
2. Add topics for it in `lib/data/topics.ts` (or reuse `TOPIC_DEFS`).
3. Add word cards in `lib/data/words.ts` following the existing `card(...)`
   pattern.

No route, component, or session-logic changes are needed — the grid,
topic picker, and session engine all read from the registry/data layer.

## Data model notes

- Progress is namespaced per signed-in user (`session.user.email`) so
  multiple Google accounts on the same device don't collide, and the keys
  map cleanly onto per-user rows if you migrate to a real database.
- `SessionSummary` records are written when a 5-minute session ends;
  individual `Attempt` records are written per word, which is what powers
  the dashboard's success/failure rate and "new words learned" counts.

## Known limitations (by design, given local-storage-only persistence)

- Progress does **not** sync across browsers/devices — it's tied to the
  browser's local storage, not the Google account server-side. If you need
  cross-device sync, that's exactly the point where you'd implement a real
  `ProgressRepository` backed by a database, per the architecture above.
- Web Speech API accuracy varies by accent/microphone; the fuzzy matcher in
  `lib/utils/matching.ts` is deliberately lenient to compensate.

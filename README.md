---
type: moc
topic: software-engineering
status: living
aliases:
  - Software Engineering MOC
  - SE MOC
  - TodayILearned
tags:
  - software-engineering
  - moc
---

# Today I Learned — Software Engineering

Notes from learning software engineering in public. This is the **remembering** half of a two-part system: concepts I reason with, retrieval prompts, and mistake logs live here; the code I actually ship lives in project repos.

These are **study artifacts, not tutorials.** Each note is a test surface — retrieval prompts with the answers deliberately withheld, a rebuild-from-memory drill, and a correctness check. If you're reading one and it feels like it's holding something back, that's the design.

## Domains

| Layer | Covers | Status |
|---|---|---|
| `01 - Foundations` | Architecture & APIs, data structures, design principles, paradigms | starting |
| `02 - Backend` | Java (deep), Spring | Java ~90 notes · Spring 13 |
| `03 - Frontend` | React, HTML, CSS | not started |
| `04 - Database` | SQL / PostgreSQL | 10 notes |
| `05 - Tooling & DevOps` | Git & GitHub, Maven, Postman, Eclipse | how-to notes |

## How a note is built

Every graduated note follows the same skeleton:

- **Retrieval Prompts** — question-shaped, answers in collapsed callouts. Never inline.
- **Rebuild Drill** — a blank-file task with an explicit success criterion, and no solution.
- **Correctness Check** — the domain's checklist, run against the note, with anything below ~90% confidence visibly flagged.
- **Flashcards** — atomic, why-over-syntax, under `#flashcards/<domain>/<topic>`.

The reasoning behind that shape — and the rules any AI assistant must follow when working in here — is in `_System/`:

- `_System/AI Operating Manual (READ ME).md` — the contract
- `_System/Refiner Spec (Graduate).md` — the raw-capture → study-artifact procedure
- `_System/My Study Operating Manual (READ ME).md` — the learner-side loop
- `<domain>/_refiner.md` — per-domain target folder, flashcard tag, and correctness checklist

The short version: **AI may improve the output; it must never do the thinking.** Notes are written to force retrieval, not to be reread.

## In Obsidian

Domain maps: [[Java MOC]] · [[Spring MOC]] · [[SQL MOC]]

Start at a MOC, answer its notes' retrieval prompts closed-book, do the rebuild drills from a blank file, and log the misses. Cards are scheduled by the Spaced Repetition plugin.

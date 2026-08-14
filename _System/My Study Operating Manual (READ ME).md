---
type: reference
topic: learning-system
status: living
aliases:
  - My Study Manual
  - Study Operating Manual
  - How I Learn
tags:
  - learning-system
  - study
  - meta
---

# My Study Operating Manual — READ ME

> How I learn, based on the evidence — not on how tidy my vault looks.
> **When in doubt: test myself, write code, fix mistakes.**

## The one idea

Learning happens in the **effortful act of retrieving and generating** — not in owning or rereading notes. So I spend my time **producing answers and code from memory**, and I keep the note system deliberately thin.

The trap to watch for: a clean note *feels* like mastery. That feeling is the **illusion of competence** — recognition, not recall. If I can reread it but can't reproduce it from a blank page, I haven't learned it.

---

## What actually works (in priority order)

1. **Spaced repetition** — my existing habit. Keep it, protect it. (Biggest single effect in the literature.)
2. **Retrieval practice** — every note worth keeping becomes a **question I answer closed-book before I check.**
3. **Worked examples + self-explanation** — study a correct solution, explain **why** each line is there, then fade the scaffolding and solve a similar one alone.
4. **Rebuild from a blank file** — re-implement things from memory. This is retrieval practice for *skill*, not just facts.
5. **Learn from mistakes** — my Mistake Logs become retrieval prompts, they don't just sit there. (Error-learning transfers strongly to new problems.)
6. **Interleave** — mix "which one do I use here?" decisions across topics instead of drilling one in isolation.

## What to stop over-investing in

- **Taxonomy / folder perfection, RAW↔refined ceremony, vault gardening.** Cheapest filing that reliably surfaces material for testing — then leave it alone.
- **Rereading polished notes and calling it studying.** Lowest-utility activity there is.
- **Note *quantity*.** A card I never justify is debt, not an asset.

---

## My daily loop

- **Before class (5 min):** attempt the **pretest** from the last Graduate run, closed-book. Guess freely — wrong guesses build the slot the answer drops into.
- **During class:** capture raw, fast, no polish (Obsidian inbox / session note) — and mark *thinking*, don't transcribe: `?` confusion · `!` distinction that matters · `->` link to a prior concept · `PREDICT` call the output before it's revealed (the best mark on the list) · `BUG` code I couldn't defend · `EXAMPLE` the one that made it click.
- **Same session:** graduate the material ([[Refiner Spec (Graduate)]]) into **retrieval prompts + one rebuild drill (+ pretest + transfer bank)**; attempt the prompts **closed-book**; only then have AI check me and name the gap.
- **Anything showable** → a dated **TIL in the git repo** (progress signal + portfolio).
- **Anything to remember** → a concept note + **SRS prompt** in Obsidian.

## My week — three sessions, ~130 min (plus the SRS habit)

Adherence beats optimization: 60% of this every week for twelve weeks beats 100% of it for three. Built for the version of me that is tired on a Thursday.

- **Session A — 35 min, within 24h of new material.** 12 min **brain dump**: blank page, everything closed, write what I remember; then AI marks it and names the gaps *without filling them*. 23 min **spoken exam**: voice mode, [[Examiner — Spoken Exam Prompt]], no notes visible, I talk 90%. Typed answers let me backspace mid-thought; an interview doesn't.
- **Session B — 35 min.** 25 min **rebuild drill** from the graduated note: smallest working artifact that proves the concept, plus one edge case. 10 min **defend it out loud**: why each decision, where it breaks, what I'd change under a different constraint. Showable result → the week's **TIL commit**.
- **Session C — 60 min, weekend.** 45 min **interleaved mixed quiz** — problems from every topic so far, labels stripped, weighted toward older material (the operative parameters — count, mix, weighting window — live in [[Interleaver — Weekly Quiz Prompt]]). Interleaving does my spacing at the problem level, on top of (not instead of) SRS. 15 min **delta pass**: the last month of `?` and `BUG` marks plus everything I missed this week, spoken once.
- **Alongside, unchanged:** the daily **SRS habit** (protected — cheap, existing, mine), weekly **SRS pruning** (delete cards I can't justify; cap daily reviews), and **ship or advance a real project** — the project is the point; the notes are fuel.

**Degraded mode — when the week goes wrong, cut in this order:** delta pass → the 10-min defend → half the quiz. **Never cut the brain dump or the spoken exam** — those 35 minutes carry most of the effect. A bad week is 35 minutes, not zero.

**Session log — six fields, nothing more,** in the day's session note: date · `?` marks · `BUG` marks · ladder level used · weakest exam answer · what broke in the build.

## Monthly mastery check

Once a month, run one ~3-week-old topic cold:

| Dimension | I can… | Evidence |
|---|---|---|
| **Recall** | explain the concept, its prerequisites, and its common failure modes with nothing open | 5–7 spoken sentences, unbroken, plus a code sketch from memory |
| **Application** | implement a working version, test an edge case, debug a mistake using it | a function, refactor, test, or design change that runs |
| **Transfer** | use it in a new context and say why it beats the alternatives | different language, data shape, or design constraint |

Failure routing: **Recall** → add Session A time. **Application** → add Session B time. Only **Transfer** → the quiz isn't varying the surface story enough; regenerate it with harder twists.

---

## How I use AI (my side of the contract)

- I **attempt first, from memory.** *Then* AI checks.
- I climb the **Assistance Ladder** one rung at a time and **log the level**; a full solution comes only after my timebox — **default 15 min stuck on a drill, 25 min on a build task, set before I start, not while stuck** — and costs a **same-day closed-note rebuild**. (Ladder lives in [[AI Operating Manual (READ ME)]].)
- I ask AI to **quiz me**, not to explain-and-let-me-move-on.
- I make **AI write the question; I write the answer.**
- If it feels **easy, I'm cheating myself** — add difficulty.
- I **verify AI's code** before trusting it.

Full contract for the AI side: [[AI Operating Manual (READ ME)]].

## My flashcard rules

- **Atomic** — one thing per card.
- **Why/concept over syntax** — memorize what exists and why, not exact signatures.
- **Only after I understand it** — cards *retain* understanding, they don't create it.
- **The 5-minute rule** — make a card only if not knowing it costs me **>5 min over my lifetime** *and* I'll need it **beyond ~5 days**.

---

## Honest reminders

- The durable artifacts are **my code** and **my recall**. Notes are scaffolding.
- **Published ≠ learned.** A public TIL is a real career win — but I still have to be able to rebuild it from scratch.
- **Green squares reward consistency, not perfection.** Ship small, ship often.
- SRS builds *recall*; it does **not** build *coding skill*. Only writing code does that.

---

*Sources:* Dunlosky 2013; Roediger & Karpicke 2006; Karpicke & Blunt 2011 (*Science*); gwern.net/spaced-repetition; Chi et al. 1989 (worked examples); Bego et al. 2024 (*IJ STEM Ed*) — classroom spaced-quizzing gains were small and fragile (≈+2 pts, not significant without the calculus course). My inference, not theirs: if even well-run classroom quizzing buys little per session, the binding constraint is doing it at all — so the week is designed for adherence first. *Related:* [[AI Operating Manual (READ ME)]] · the single-source-of-truth preference

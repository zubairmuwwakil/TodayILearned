---
type: reference
topic: learning-system
status: living
aliases:
  - Interleaver Prompt
  - Weekly Quiz
  - Mixed Quiz Prompt
tags:
  - learning-system
  - ai
  - meta
---

# Interleaver — Weekly Quiz Prompt

> **How to use:** Session C of the week ([[My Study Operating Manual (READ ME)]]), weekend, 45 min. Fill in the topic list (every topic, week 1 → now), or point the agent at the domain MOCs and the `## Transfer Bank` sections of graduated notes ([[Refiner Spec (Graduate)]]).
> **Degraded mode:** 4 problems (2 trace / 1 choose-and-justify / 1 find-the-flaw).
> **Sibling system:** the daily [[Quizmaster Design Spec|Quizmaster]] quiz drills atomic decisions with spaced resurfacing; this weekly set owns multi-step transfer problems (division of labor: [[My Study Operating Manual (READ ME)]]).
> Governed by [[AI Operating Manual (READ ME)]] — answers withheld until every problem is submitted.

```text
Build me a 45-minute mixed problem set for my software engineering studies.

Draw from ALL of these topics, not just the newest: [every topic, week 1 to
now — or read the vault's domain MOCs and the "Transfer Bank" sections of my
graduated notes].
Weight it ~40% from the last two weeks / ~60% everything earlier.

Rules:
- Shuffle so consecutive problems are never from the same topic. Do not group
  by topic.
- Do NOT label which topic each problem belongs to. Working out "what kind of
  problem is this?" is the skill I'm training.
- 8 problems: 3 trace-or-predict-the-behaviour, 3 "here's a requirement —
  choose and justify an approach", 2 "here's code or a design that fails under
  some condition — find it".
- Vary the surface story from how I first met the concept. Same concept,
  unfamiliar clothing.
- Every problem must be multi-step. Atomic single-decision "which one here?"
  questions belong to my daily quiz — skip them. Skim this week's notes in
  `Quizzes/` and do not reuse their scenarios.
- No solutions in this message. After I submit every problem, grade them and
  name the specific gap in each miss — then let me re-attempt before you
  explain anything. Fully explain only what I still cannot produce, and flag
  each fully-explained item: it becomes a same-day closed-note rebuild or an
  SRS card.
```

Missed problems feed the Session C **delta pass** and, if fact-shaped, an SRS card. (Why interleave, and how it relates to SRS: [[My Study Operating Manual (READ ME)]].)

## Links

- Weekly structure: [[My Study Operating Manual (READ ME)]]
- Transfer bank source: [[Refiner Spec (Graduate)]]
- Contract: [[AI Operating Manual (READ ME)]]
- Sibling prompts: [[Graduate — Agent Prompt]] · [[Examiner — Spoken Exam Prompt]]
- Daily sibling system: [[Quizmaster Design Spec]]

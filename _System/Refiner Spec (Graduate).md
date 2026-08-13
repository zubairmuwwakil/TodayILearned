---
type: reference
topic: learning-system
status: living
aliases:
  - Refiner Spec
  - Graduate Step
  - The Graduate Step
  - Refiner (Graduate)
tags:
  - learning-system
  - refiner
  - ai
  - meta
---

# Refiner Spec — the Graduate step

> **Single source of truth for the capture→refine pipeline.** All shared machinery lives here.
> Per-domain differences (target folder, flashcard tag, correctness checklist) live in each domain's `_refiner.md` — nowhere else.
> Governed by [[AI Operating Manual (READ ME)]]. If this spec and the contract ever disagree, the contract wins.

## What "Graduate" is

Graduating a note means turning **one understood raw capture** into a **study artifact you practise against** — not a polished reference page you reread.

The artifact is exactly four things (per the contract's "refiner's repurposed job"):

1. a **worked example** to study,
2. **retrieval prompts** — question-shaped, answers **withheld**,
3. **one rebuild-from-memory drill**, and
4. a **correctness check**.

Plus two supporting outputs: **flashcards** (only from understood material) and a **TIL-candidate pointer** to the git repo when the work is showable.

If you ever find yourself producing prose meant to be *reread*, stop — that's the fluency illusion, the lowest-utility activity there is. The output is a *test surface*, not a reference.

## When to run it

- **Same session as capture**, on **one** note at a time. Never bulk-graduate (collector's fallacy at machine speed).
- Only on material Zub has **already worked through** — Graduate *retains and tests* understanding, it does not create it.
- Source notes are the raw chronological captures under `20 Areas/Education/Obsidi Academy/Sessions/<Track>/Day NN/`. The graduated artifact lands in the domain's target folder (see the domain config).

## Inputs — read the domain's `_refiner.md`

Before graduating a note, load `<domain>/_refiner.md` and read these parameters. **They are the only things that vary by domain:**

| Parameter | Used for |
|---|---|
| **Target folder** | Where the graduated study note is written. |
| **Flashcard tag** | The `#flashcards/<domain>/<topic>` namespace for recall cards. |
| **Correctness checklist** | The domain-specific traps to verify in step ④. |
| **Output template** *(optional)* | A richer per-domain note structure. If absent, use the generic skeleton below. |

If a domain has no `_refiner.md` yet, do **not** improvise its parameters — see *Adding a new domain*.

## The Graduate procedure (shared machinery)

Work through these in order. Every step must leave Zub something to **generate or retrieve** — never something to passively receive.

**Gate — is this genuinely new to Zub?**
- **New topic** → produce the worked example (step ①). Novices learn faster from a correct worked example + self-explanation than from a blank page.
- **Already understood** → *skip the worked example* and go straight to prompts + drill. Re-showing known material is just rereading.

**① Worked example** *(new topics only)*
- Minimal and correct. Annotate with **subgoal labels** (what each block accomplishes), not line-by-line syntax noise.
- Add one **EiPE** line: *in plain English, what does this code accomplish* — not how.
- Then require Zub to **self-explain each block** and **rebuild it from a blank file** (that's step ③).

**② Retrieval prompts — answers WITHHELD**
- Question-shaped. Bias **why/how** over **what** (elaborative interrogation).
- Answers go in a collapsed `> [!answer]-` callout **or** as a spaced-repetition card — **never on the same line or the line directly below the question.** Regenerating from memory is the entire point.
- Interleave where useful: "which one do I reach for *here*?" across confusable siblings.

**③ One rebuild-from-memory drill**
- A **blank-file spec**: the task + an explicit **success criterion** (expected output / passing behaviour). No solution in the note.
- This is retrieval practice for *skill*, not just facts — the highest-value output for coding ability.

**④ Correctness check**
- Run the domain's **correctness checklist** (from `_refiner.md`) against everything you wrote.
- **Mentally compile/run every code block**; every stated output must be exactly right.
- **Flag anything below ~90% confidence** with a visible ⚠ and state the assumption. Never present an unverified fact as authoritative. (An earlier audit found 4 real errors in 27 notes — a return-type-overloading error rode raw→polished undetected. This step exists to catch that.)

**Flashcards** *(supporting output)*
- Draft only from material Zub **already understands**. Atomic; **why/concept over syntax**.
- Apply the **5-minute rule**: make a card only if not knowing it costs >5 min over a lifetime *and* he'll need it beyond ~5 days.
- Format under the domain tag:
  ```
  #flashcards/<domain>/<topic>

  Why does <...>?
  ?
  Because <...>
  ```
- Zub prunes. A card he can't justify is debt, not an asset.

**TIL-candidate pointer** *(supporting output)*
- If the artifact is showable (working code, a demonstrable skill), add a single line flagging it as a **TIL candidate** for the public git repo.
- **Link/pointer only — never copy content across the git↔Obsidian seam.** One home per item by job: doing/showing → git; remembering → Obsidian.

## Shared rules (the red lines)

These are non-negotiable and apply to every domain. Full rationale in [[AI Operating Manual (READ ME)]].

- **Name-based links only** — `[[Note]]` / `[[Note#Heading]]`. Never path/URL-style internal links.
- **Single source of truth** — surface a shared fact with `![[Note#Heading]]`. Never copy it. No concept lives in two places.
- **Never place an answer next to its prompt** — collapse it or move it to an SRS card.
- **Verify all code; flag <90% confidence** — AI improves the OUTPUT, never does the THINKING.
- **One home per item across git↔Obsidian** — link, never duplicate.
- **One note at a time; Zub prunes** — never bulk-generate notes or cards.
- **Preserve desirable difficulty** — if the interaction feels frictionless, he's offloading. Make him generate.

## Generic output skeleton (the floor)

The domain-agnostic minimum. A domain may override it via an **Output template** in its `_refiner.md` (Java does — see [[Java Concept Note]], a richer superset). Until a domain grows its own, use this:

```markdown
## Worked Example        %% subgoal-labelled + one EiPE line; omit if already understood %%
## Retrieval Prompts     %% answers withheld — collapsed [!answer]- or SR card, never inline %%
## Rebuild Drill         %% blank-file task + explicit success criterion, no solution %%
## Correctness Check     %% domain checklist result; ⚠-flag anything <90% %%
## Flashcards            %% #flashcards/<domain>/<topic> — atomic, why/concept, 5-min rule %%
## TIL candidate         %% pointer to git if showable — link, never copy %%
## Links                 %% name-based; ![[embed]] shared facts, don't restate %%
```

## Adding a new domain

1. Create `<Domain>/_refiner.md` from the schema used by the existing configs (`04 - Database/SQL/_refiner.md` in any domain folder is the model).
2. Fill exactly three things: **target folder**, **flashcard tag**, **correctness checklist**.
3. Optionally point **Output template** at a richer per-domain note if one exists.
4. Change nothing in *this* spec — that's the whole point of the split.

## Links

- Parent contract: [[AI Operating Manual (READ ME)]]
- Learner side: [[My Study Operating Manual (READ ME)]]
- Domain configs (10): `01 - Foundations/Architecture & APIs/_refiner.md` · `02 - Backend/Java/_refiner.md` · `02 - Backend/Spring/_refiner.md` · `03 - Frontend/HTML/_refiner.md` · `03 - Frontend/React/_refiner.md` · `04 - Database/SQL/_refiner.md` · `05 - Tooling & DevOps/CI-CD/_refiner.md` · `05 - Tooling & DevOps/Git & GitHub/_refiner.md` · `05 - Tooling & DevOps/Maven/_refiner.md` · `05 - Tooling & DevOps/Postman/_refiner.md`
- Domains still missing a config (create per *Adding a new domain*, don't improvise): **CSS**, **Eclipse**
- Java output template: [[Java Concept Note]]
- Operational prompt (hand raw notes to an agent): [[Graduate — Agent Prompt]]

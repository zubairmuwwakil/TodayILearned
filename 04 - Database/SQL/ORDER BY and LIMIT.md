---
type: concept
topic: ordering
status: learning
difficulty: easy
aliases:
  - ORDER BY
  - LIMIT
  - OFFSET
  - ASC DESC
  - Sorting in SQL
created: 2026-08-13
tags:
  - sql
  - postgres
  - ordering
  - concepts
---

# ORDER BY and LIMIT

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Small note, but it carries a trap the slides actively teach wrong: ASC/DESC binds PER COLUMN, not to the whole list. %%

## Retrieval Prompts

1. ⚠ Read carefully: `ORDER BY "studentName", "studentPhone" DESC`. Which columns sort descending?
> [!answer]- reveal
> **Only `"studentPhone"`.** Direction is **per column** — each one carries its own optional `ASC`/`DESC`, defaulting to `ASC`. To reverse both you must write `ORDER BY "studentName" DESC, "studentPhone" DESC`.
>
> Your slides show `ORDER BY "studentName", "studentPhone" ASC` and describe it as sorting ascending, which is *accidentally* true only because `ASC` is already the default. Swap in `DESC` and the illusion breaks — which is exactly when you'll hit it for real.

2. What does a second column in `ORDER BY` actually do?
> [!answer]- reveal
> It's a **tiebreaker**: it only affects rows where the first column's values are equal. Hence the slides' three `John Doe` rows — identical names, so `studentPhone` decides their order among themselves, leaving everyone else untouched.

3. Where do `NULL`s sort in Postgres by default?
> [!answer]- reveal
> Postgres treats `NULL` as **larger than any non-null value**. So the default is **`NULLS LAST` for `ASC`** and **`NULLS FIRST` for `DESC`**. Override explicitly with `ORDER BY col ASC NULLS FIRST`. Worth knowing because it differs between database engines — this is not portable behaviour.

4. What's wrong with `SELECT … LIMIT 10;` written without an `ORDER BY`?
> [!answer]- reveal
> **It's non-deterministic** — you get *ten* rows, but not reliably the *same* ten. With no `ORDER BY` there is no defined order (see [[Relational Model Vocabulary]]), so the rows depend on physical layout and the chosen plan, and both change over time. "Top 10" is only meaningful with an explicit sort.
>
> Related: even *with* `ORDER BY`, ties are not stably broken. For pagination, always sort on something unique — append the primary key as a final tiebreaker — or rows can repeat or vanish between pages.

5. What does `OFFSET` do, and why does it degrade on deep pages?
> [!answer]- reveal
> It **skips** the first *n* rows of the ordered result. It degrades because the skipped rows are still **computed and sorted, then discarded** — `OFFSET 100000` does all the work for 100,000 rows to hand you nothing. Serious pagination uses **keyset pagination** (`WHERE id > :lastSeenId ORDER BY id LIMIT 20`) instead.

6. Checklist item — what's the Postgres spelling for "give me the first N rows," and which dialect's keyword must you *not* use?
> [!answer]- reveal
> Postgres uses **`LIMIT n`** (with optional `OFFSET m`). Do **not** use **`TOP n`** — that's SQL Server. The ANSI-standard spelling, also supported by Postgres, is `FETCH FIRST n ROWS ONLY`.

## Rebuild Drill

From a blank query tool, against `students`, write four queries from memory and **predict the row order before running each**:

1. Sort by name ascending, then by phone **descending** — with the direction correct on both columns.
2. Return only the 5 rows after the first 10, in a deterministic order.
3. Sort by a column that contains `NULL`s so the `NULL`s appear **first** in an otherwise ascending sort.
4. The same as (2), rewritten as keyset pagination instead of `OFFSET`.

**Success criteria:** query 1 has `DESC` written explicitly on the second column *and* whatever you intend on the first — if you wrote it once and expected it to cover both, that's prompt 1 catching you. Query 2 includes an `ORDER BY` with a unique tiebreaker. Query 3 needs `NULLS FIRST` spelled out, because ascending defaults to last. Query 4 has no `OFFSET` in it at all.

## Correctness Check

- ✅ **Postgres specifics** (checklist item: "`LIMIT`/`OFFSET` (not `TOP`)") — covered in prompt 6, with the ANSI `FETCH FIRST` alternative. ✓
- ✅ **NULL three-valued logic** — Postgres sorts `NULL` as greater than any value, giving `NULLS LAST` on `ASC` and `NULLS FIRST` on `DESC`. Verified. ✓
- ✅ **Index use / sargability** — an `ORDER BY` matching an index's column order and direction can be served by the index and skip the sort entirely; a mismatched direction cannot. Noted rather than drilled; belongs to the backlog [[Indexing in Postgres]] note.
- ⚠️ **Correction to the raw slides:** they present `ORDER BY "studentName", "studentPhone" ASC;` as sorting both columns ascending. The `ASC` applies **only to `"studentPhone"`**. Their displayed output happens to be correct because `ASC` is the default for `"studentName"` anyway — so the example can never expose the misconception it teaches. Prompt 1 does.
- ✅ Traced the slides' two result tables against their input data: the single-column sort and the name-then-phone tiebreak orderings are both **correct** as printed (`'2378478'` before `'6558855'` — a string comparison, since the column is `VARCHAR`).
- ✅ The slides' explanation of *why* the primary keys appear out of order — an `UPDATE` rewrites the row elsewhere — is correct, and is the same fact that makes the "rows are ordered by insertion" claim in the RDBMS lesson wrong. Cross-referenced in [[Relational Model Vocabulary]].

## Flashcards

#flashcards/sql/ordering

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 3, 4, 5, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: a before/after demonstrating `OFFSET` vs keyset pagination timings on a table with a few hundred thousand rows. → git TIL. Link out; don't copy.

## Links

- Last stages of the pipeline in: [[GROUP BY Aggregates and HAVING]]
- Why order isn't inherent: [[Relational Model Vocabulary]]
- Prerequisite: [[SELECT WHERE and Operators]]
- Map: [[SQL MOC]]
- Backlog: [[Indexing in Postgres]] — an index can remove the sort step entirely

---
type: concept
topic: querying
status: learning
difficulty: medium
aliases:
  - SELECT Statement
  - WHERE Clause
  - SQL Operators
  - LIKE BETWEEN IN
  - NOT IN NULL trap
created: 2026-08-13
tags:
  - sql
  - postgres
  - querying
  - concepts
---

# SELECT WHERE and Operators

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Test surface, not a reference. The killer trap here is NOT IN against a list containing NULL — it returns zero rows and looks like missing data. %%

## Retrieval Prompts

1. `SELECT *` vs naming your columns — name two concrete reasons production code names them.
> [!answer]- reveal
> (1) **Stability** — `*` silently changes shape when someone adds or reorders a column, breaking positional consumers and inflating payloads. (2) **Cost** — you fetch and transmit columns you don't need, and you forfeit index-only scans, where the whole query could have been answered from an index without touching the table.
>
> `*` is fine for interactive exploration. That's the distinction, not "never use it."

2. Why does `WHERE "studentPhone" = NULL` return nothing, and what do you write instead?
> [!answer]- reveal
> SQL uses **three-valued logic**: any comparison with `NULL` yields `NULL` (unknown), never `TRUE`. `WHERE` keeps only rows evaluating to `TRUE`, so the row is dropped. Use **`IS NULL`** / **`IS NOT NULL`** — the only operators that test for it.

3. ⚠ The one that bites hardest: `WHERE "courseId" NOT IN (1, 5, NULL)`. How many rows come back, and why?
> [!answer]- reveal
> **Zero — always.** `NOT IN (…)` expands to `courseId <> 1 AND courseId <> 5 AND courseId <> NULL`. That last term is `NULL`, and `TRUE AND NULL` = `NULL`, so no row can ever evaluate `TRUE`.
>
> It bites because the `NULL` usually arrives from a **subquery** (`NOT IN (SELECT "courseId" FROM …)`) where you can't see it. The fix: use **`NOT EXISTS`**, or filter the inner query with `WHERE … IS NOT NULL`. Note `IN` with a `NULL` is *not* symmetric — it still returns matching rows.

4. `LIKE` — what do `%` and `_` match, and how do you make it case-insensitive in Postgres?
> [!answer]- reveal
> **`%`** = any sequence of characters including none. **`_`** = exactly one character. Case-insensitive: **`ILIKE`** (a Postgres extension, not standard SQL). So `LIKE 'Jo%'` finds `John` and `Jo`, but not `jo`.

5. Is `BETWEEN 1 AND 5` inclusive? And what's the trap when the column is a `timestamp`?
> [!answer]- reveal
> **Inclusive on both ends** — equivalent to `>= 1 AND <= 5`. On timestamps, `BETWEEN '2026-01-01' AND '2026-01-31'` silently excludes almost all of the 31st, because the bare date means `00:00:00` on that day. For date ranges prefer a **half-open** interval: `>= '2026-01-01' AND < '2026-02-01'`.

6. Predict: with `a = 2` and `b = 3` stored as integers, what does `b / a` return? What if they're `numeric`?
> [!answer]- reveal
> **`1`** — integer division **truncates toward zero**; it does not round, so `3/2` is `1` and not `1.5` or `2`. As `numeric` (or with a cast, `b::numeric / a`) you get **`1.5`**.
>
> This is a silent-wrong-answer bug, not an error — the classic case is computing a percentage as `count/total * 100` and getting `0`.

7. Operator precedence: `WHERE a = 1 OR a = 2 AND b = 3` — how does Postgres group it?
> [!answer]- reveal
> **`AND` binds tighter than `OR`**, so it reads as `a = 1 OR (a = 2 AND b = 3)`. Almost never what was meant. Parenthesise whenever you mix them.

8. Checklist item — what makes a `WHERE` predicate **non-sargable**, and why do you care?
> [!answer]- reveal
> "Sargable" = able to Search ARGument, i.e. usable by an index. You destroy it by **wrapping the indexed column in a function or expression** — `WHERE LOWER("studentName") = 'john'`, `WHERE "createdAt"::date = '2026-01-01'` — or by using a **leading wildcard**, `LIKE '%son'`. In each case Postgres must compute the expression for every row, forcing a full scan.
>
> Fixes: rewrite as a range (`>= … AND < …`), compare without the function, or build a matching **expression index**.

## Rebuild Drill

Against your `students` / `courses` tables, from a blank query tool, write **six** queries from memory — one each for: an exact match; a range; a `NULL` test; a prefix pattern; a set membership; and a compound condition that mixes `AND` with `OR` and therefore needs parentheses. Predict each row count **before** running.

Then write a **seventh** query designed to return zero rows for the wrong reason — a `NOT IN` list containing a `NULL` — and confirm it does.

**Success criteria:** all six predictions match. The seventh returns **0 rows despite matching data existing**, and you can state in one sentence why. Any mismatch → log it.

## Correctness Check

- ✅ **NULL three-valued logic** (checklist item) — covered three ways: `= NULL` fails, `NOT IN` with `NULL` returns nothing, and `WHERE` keeps only `TRUE`. All verified. ✓
- ✅ **Index use / sargability** (checklist item) — function-wrapped predicates and leading-wildcard `LIKE` named, with fixes. ✓
- ✅ **Join semantics / GROUP BY** — not applicable here; they live in [[GROUP BY Aggregates and HAVING]] and the backlog [[Joins]] note.
- ✅ `BETWEEN` inclusive; `<>` and `!=` equivalent in Postgres (`<>` is the standard spelling); `ILIKE` is a Postgres extension — verified.
- ✅ Integer division truncates toward zero — verified. The slides state `b / a will give 1` with `a=2, b=3` and are **correct**, but never say *why*; without the reason it reads as a typo. Prompt 6 supplies it.
- ℹ️ The slides also list `^` for exponentiation. Correct in Postgres, but it's a **Postgres extension** — not portable standard SQL. Minor; noted so you don't rely on it elsewhere.
- ℹ️ The slides' operator tables (`a=10, b=20` comparisons) were spot-checked and are all correct — deliberately **not** transcribed, since reading a truth table isn't retrieval.

## Flashcards

#flashcards/sql/querying

Why does WHERE col = NULL return no rows?
?
Three-valued logic: any comparison with NULL yields NULL (unknown), never TRUE, and WHERE keeps only TRUE. Use IS NULL / IS NOT NULL.

Why does NOT IN (1, 5, NULL) always return zero rows?
?
It expands to col <> 1 AND col <> 5 AND col <> NULL. That last term is NULL, and TRUE AND NULL = NULL, so nothing is ever TRUE. Use NOT EXISTS instead.

In LIKE patterns, what do % and _ match — and how do you go case-insensitive in Postgres?
?
% = any sequence including empty; _ = exactly one character. Case-insensitive is ILIKE (a Postgres extension).

With integers a=2, b=3, what is b / a — and why?
?
1. Integer division truncates toward zero (no rounding). Cast to numeric for 1.5. Silent wrong answers in percentage calculations.

In WHERE a = 1 OR a = 2 AND b = 3, how does SQL group the conditions?
?
AND binds tighter than OR, so it's a = 1 OR (a = 2 AND b = 3). Always parenthesise when mixing them.

What makes a WHERE predicate non-sargable?
?
Wrapping the indexed column in a function/expression, or a leading-wildcard LIKE '%x'. The index can't be used, forcing a full scan.

## TIL candidate

Showable: the `NOT IN` + `NULL` demo — a query returning zero rows over data that obviously matches, then the `NOT EXISTS` fix. → git TIL. Link out; don't copy.

## Links

- Prerequisite: [[Relational Model Vocabulary]] — what `NULL` means
- Builds into: [[GROUP BY Aggregates and HAVING]] — `WHERE` filters rows *before* grouping
- Then: [[ORDER BY and LIMIT]]
- Quoting: [[Identifier Quoting and Case Folding]]
- Map: [[SQL MOC]]
- Backlog: [[Joins]] · [[Subqueries]] — where the `NOT IN` trap actually ambushes you · [[Indexing in Postgres]]

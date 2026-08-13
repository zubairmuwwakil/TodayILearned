---
type: concept
topic: aggregation
status: learning
difficulty: hard
aliases:
  - GROUP BY
  - HAVING
  - Aggregate Functions
  - COUNT AVG SUM
  - WHERE vs HAVING
created: 2026-08-13
tags:
  - sql
  - postgres
  - aggregation
  - concepts
---

# GROUP BY Aggregates and HAVING

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Test surface, not a reference. The organising idea is the LOGICAL EVALUATION ORDER — nearly every GROUP BY error is really a "that clause hasn't run yet" error. %%

## Retrieval Prompts

1. Write out the **logical evaluation order** of a full query's clauses. (Not the order you type them — the order the database applies them.)
> [!answer]- reveal
> **`FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`**
>
> Note that `SELECT` is evaluated **second to last**, despite being written first. Almost every confusing aggregation error follows from this one fact — hold onto it and the rest of this note is deducible rather than memorised.

2. From that order, derive the answer: why can't you filter on an aggregate in `WHERE`?
> [!answer]- reveal
> Because `WHERE` runs **before** `GROUP BY` — at that moment the groups don't exist yet, so there is nothing for `COUNT()` to count. `WHERE` filters **rows going in**; `HAVING` runs after grouping and filters **groups coming out**.
>
> So: a condition on a raw column value → `WHERE` (also cheaper, since it discards rows before the grouping work). A condition on an aggregate → `HAVING`.

3. Also derivable: can you use a `SELECT` alias in `WHERE`? In `GROUP BY`? In `ORDER BY`?
> [!answer]- reveal
> **`WHERE`: no. `HAVING`: no.** Both run before `SELECT`, so the alias doesn't exist yet — you must repeat the expression.
> **`GROUP BY` and `ORDER BY`: yes** in Postgres — both may refer to an output column name. (`ORDER BY` is genuinely after `SELECT`; `GROUP BY` accepting it is a convenience Postgres provides.)

4. What's the rule about which columns may appear in `SELECT` alongside an aggregate?
> [!answer]- reveal
> **Every non-aggregated column in `SELECT` must also appear in `GROUP BY`.** Otherwise the database has many candidate values per group and no basis for picking one — Postgres rejects it outright (MySQL historically guessed, which is worse).
>
> One relaxation: if you `GROUP BY` a table's **primary key**, Postgres lets you select that table's other columns without listing them, because they're functionally dependent on the key.

5. ⚠ `COUNT(*)` vs `COUNT("studentPhone")` vs `COUNT(DISTINCT "courseId")` — what does each count?
> [!answer]- reveal
> **`COUNT(*)`** — every row in the group, `NULL`s included. **`COUNT(col)`** — rows where that column is **NOT NULL**; it silently skips them. **`COUNT(DISTINCT col)`** — distinct non-null values.
>
> That difference is the usual explanation for "my two counts disagree." All the other aggregates ignore `NULL` too: `AVG` divides by the count of **non-null** values, not the row count.

6. ⚠ A `SUM()` over a group containing **no rows at all** returns what? What about `COUNT()`?
> [!answer]- reveal
> **`SUM` returns `NULL`, not `0`.** `COUNT` returns `0`. So `SUM("amount")` on an empty set gives `NULL`, which then propagates through any arithmetic you do with it. Wrap it: **`COALESCE(SUM("amount"), 0)`**. This is a very common source of `NULL`s appearing in report totals.

7. What does `HAVING` do when there is **no** `GROUP BY` clause?
> [!answer]- reveal
> The whole table is treated as **one single group**. So `SELECT COUNT(*) FROM "students" HAVING COUNT(*) > 100;` returns one row if the table has more than 100 rows, and **no rows at all** otherwise.

## Rebuild Drill

From a blank query tool, against `courses` / `students`, write **one** query that uses every stage of the pipeline at once: join the two tables, exclude students with no phone number, group by course name, keep only courses with more than one such student, alias the count as `"totalStudents"`, and sort by that count descending.

Predict the result set — rows and values — **before** running it.

**Success criteria:** the phone-number filter is in `WHERE` (not `HAVING`); the count filter is in `HAVING` (not `WHERE`); `"courseName"` appears in `GROUP BY` because it's selected un-aggregated; the clauses are written in the legal order from prompt 1; and it runs first time. Second rung: change `COUNT(s."studentId")` to `COUNT(*)` and explain in one sentence why the numbers may differ.

## Correctness Check

- ✅ **GROUP BY** (checklist item: "every non-aggregated column in `SELECT` appears in `GROUP BY`; filter groups with `HAVING`, rows with `WHERE`") — this note *is* that item, derived from evaluation order rather than asserted. ✓
- ✅ **NULL handling in aggregates** (checklist item: "`COUNT(col)` skips NULLs, `COUNT(*)` doesn't") — prompt 5, extended with the `SUM`-of-nothing-is-`NULL` trap in prompt 6. ✓
- ✅ **Join semantics** — the drill's join is an `INNER JOIN`, so courses with zero students are excluded from the result entirely. That's correct for "more than one student," but it's the fan-out/filtering distinction to keep in mind. Full treatment in the backlog [[Joins]] note.
- ✅ Alias visibility rule verified against Postgres behaviour: usable in `GROUP BY`/`ORDER BY`, **not** in `WHERE`/`HAVING`. ✓
- ✅ Functional-dependency relaxation (group by PK, select that table's other columns) — verified, Postgres 9.1+. ✓
- ✅ The slides' `HAVING` example and its stated result ("Introduction to Computer Science", 2 students) — **traced against their own sample data and correct**: two students on course 1, one on course 2, `> 1` keeps only course 1.
- ✅ The slides' `GROUP BY` example (`COUNT("studentId") AS "totalStudents" … WHERE "studentPhone" IS NOT NULL GROUP BY "courseId" ORDER BY "courseId"`) — verified valid: the only un-aggregated selected column is `"courseId"`, which is grouped. ✓

## Flashcards

#flashcards/sql/aggregation

What is the logical evaluation order of SQL clauses?
?
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. SELECT runs second-to-last despite being written first.

Why can't you put an aggregate condition in WHERE?
?
WHERE runs before GROUP BY, so the groups don't exist yet. WHERE filters rows going in; HAVING filters groups coming out.

Can you use a SELECT alias in WHERE? In ORDER BY?
?
Not in WHERE or HAVING (they run before SELECT) — repeat the expression. Yes in ORDER BY and GROUP BY in Postgres.

COUNT(*) vs COUNT(col) — what's the difference?
?
COUNT(*) counts every row including NULLs. COUNT(col) counts only rows where col IS NOT NULL. The usual reason two counts disagree.

What does SUM() return over zero rows, and how do you defend against it?
?
NULL, not 0 (COUNT returns 0). Wrap it: COALESCE(SUM(x), 0), or the NULL propagates through later arithmetic.

What does HAVING do with no GROUP BY?
?
Treats the entire table as a single group — returns one row if the condition holds, and no rows if it doesn't.

## TIL candidate

Showable: a query demonstrating `COUNT(*)` and `COUNT(col)` disagreeing on the same data, plus `SUM` over an empty group returning `NULL`. → git TIL. Link out; don't copy.

## Links

- Prerequisite: [[SELECT WHERE and Operators]] — `WHERE` is stage two of the pipeline
- Then: [[ORDER BY and LIMIT]] — stages six and seven
- Keys that make the join work: [[Keys Primary and Foreign]]
- Map: [[SQL MOC]]
- Backlog: [[Joins]] — the drill's join deserves its own note · [[Subqueries]] · [[Window Functions]] — when you need aggregates *without* collapsing rows

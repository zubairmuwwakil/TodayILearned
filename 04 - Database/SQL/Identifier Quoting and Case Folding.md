---
type: concept
topic: identifiers
status: learning
difficulty: hard
aliases:
  - Quoting in SQL
  - Single vs Double Quotes
  - Case Sensitivity in Postgres
  - Delimited Identifiers
  - camelCase in Postgres
created: 2026-08-13
tags:
  - sql
  - postgres
  - identifiers
  - gotchas
---

# Identifier Quoting and Case Folding

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. THIS IS THE HIGHEST-VALUE NOTE IN THE SQL BATCH: it's an explicit item on the SQL correctness checklist, and the Academy's camelCase convention makes you live with the consequence in every single query you write this term. %%

## Retrieval Prompts

1. State the rule for each quote character in Postgres. What is each one *for*?
> [!answer]- reveal
> **Double quotes `"…"`** → a **delimited identifier**: the name of an object (table, column, index). **Single quotes `'…'`** → a **string literal**: a value.
>
> They are not interchangeable. `WHERE "studentName" = "Alex"` fails — Postgres reads `"Alex"` as a *column name* and reports `column "Alex" does not exist`. Correct is `WHERE "studentName" = 'Alex'`.

2. What does Postgres do to an **unquoted** identifier, and why is that the whole source of the problem?
> [!answer]- reveal
> It **folds it to lower case**. So `students`, `Students`, `STUDENTS` and `sTuDeNtS` are all the same object. A **quoted** identifier is stored **exactly as written** and compared case-sensitively — so `"Students"` and `"students"` are two different objects.
>
> Worth knowing: the SQL standard says fold to **UPPER** case. Postgres folds to **lower**. That's a documented deviation, and it's why scripts move badly between Postgres and Oracle.

3. Predict before answering: you ran `CREATE TABLE "courses" (…)`. Does `SELECT * FROM courses;` — unquoted — work? Now: you ran `CREATE TABLE "students" ("courseId" INT …)`. Does `SELECT courseId FROM students;` work?
> [!answer]- reveal
> **First: yes.** `"courses"` is already all-lowercase, so the stored name is `courses`; the unquoted `courses` folds to `courses` and matches. This is exactly why the slides' `REFERENCES courses("courseId")` line works despite mixing quoted and unquoted.
>
> **Second: no.** The stored name is literally `courseId`. Unquoted `courseId` folds to `courseid`, which doesn't exist → `ERROR: column "courseid" does not exist`. **Any camelCase identifier must be double-quoted forever, everywhere.** That is the price of the convention, and it's why the slides warn to use double quotes sparingly.

4. Given the above — why does the Academy's camelCase convention force quotes into *every* query, and what would snake_case buy you?
> [!answer]- reveal
> Because case only survives if it's quoted at creation, and once created case-sensitively it must be quoted at every reference — `SELECT`, `WHERE`, `JOIN … ON`, `GROUP BY`, `ORDER BY`, `INSERT` column lists, all of it. **snake_case** (`student_name`) is already lowercase, so it round-trips through folding untouched and never needs a quote. That's why snake_case is the Postgres community default.
>
> This is a *convention* decision, not a correctness one — follow the Academy's camelCase for coursework, and know why production Postgres usually doesn't.

5. Besides preserving case, what else do double quotes let you do that you otherwise couldn't?
> [!answer]- reveal
> Use names that are otherwise **illegal or ambiguous**: reserved words (`"select"`, `"order"`), names with spaces, and names containing characters with their own meaning — e.g. a column literally called `"student.id"`, which unquoted would parse as the `id` column of a `student` table.

6. How do you put an apostrophe inside a string literal?
> [!answer]- reveal
> **Double the single quote**: `'O''Brien'` — that's two apostrophes, not a double quote. (Postgres also offers dollar-quoting, `$$O'Brien$$`, which is what saves you inside function bodies.)

## Rebuild Drill

From a blank query tool, no source, run this experiment and **predict every result before executing**:

1. Create a table with **two** columns — one lowercase unquoted, one camelCase quoted.
2. `SELECT` the lowercase column **without** quotes, then **with** quotes.
3. `SELECT` the camelCase column **without** quotes.
4. `INSERT` one row using single quotes for the text value, then try the same `INSERT` with double quotes around the value.
5. `SELECT` the table using an ALL-CAPS unquoted table name.

**Success criteria:** steps 2 and 5 succeed (folding). Step 3 fails with `column "…" does not exist`, and the name in the error is **lowercased** — that lowercasing in the error message is the tell you should learn to recognise. Step 4's second form fails with a *column does not exist* error, not a syntax error. If any prediction missed, log it to a SQL mistake log.

## Correctness Check

- ✅ **Postgres specifics** (checklist item: "unquoted identifiers fold to lowercase; `"userId"` ≠ `userId`") — this note *is* that item, expanded. ✓
- ✅ Single quotes = string literal, double quotes = delimited identifier — verified; matches the slides.
- ✅ Postgres folds to **lower** while the SQL standard specifies **upper** — verified; the slides omit this, and it's the bit that explains the behaviour rather than just describing it.
- ✅ `''` as the escape for an embedded apostrophe — verified. Not in the slides; added because it's the first thing that breaks on real name data.
- ✅ The slides' claim that `SELECT * FROM "students";` and `SELECT * FROM students;` return the same thing — **correct**, and prompt 3 explains the precise reason (the stored name is already lowercase) rather than leaving it as a coincidence.
- ✅ No confidence flags on this note; every claim here is directly demonstrable in the rebuild drill above, which is why the drill is written as an experiment with predictions.

## Flashcards

#flashcards/sql/identifiers

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 2, 3, 4, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable and genuinely useful to others: a five-statement script that demonstrates folding, the camelCase failure, and the lowercased error message. → git TIL. Link out; don't copy.

## Links

- Applies to every statement in: [[CREATE TABLE and Constraints]] · [[SELECT WHERE and Operators]] · [[INSERT UPDATE and DELETE]] · [[GROUP BY Aggregates and HAVING]] · [[ORDER BY and LIMIT]]
- Related: [[Choosing a Postgres Data Type]] — the other Postgres-specific DDL trap
- Map: [[SQL MOC]]

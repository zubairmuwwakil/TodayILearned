---
type: concept
topic: ddl
status: learning
difficulty: medium
aliases:
  - CREATE TABLE
  - Constraints
  - CHECK Constraint
  - DROP vs TRUNCATE
  - DDL
created: 2026-08-13
tags:
  - sql
  - postgres
  - ddl
  - constraints
  - concepts
---

# CREATE TABLE and Constraints

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Test surface, not a reference. Load-bearing traps: UNIQUE permits many NULLs, and a CHECK that evaluates to NULL PASSES. %%

## Retrieval Prompts

1. What's the difference between a **column constraint** and a **table constraint**, and when are you *forced* to use the table form?
> [!answer]- reveal
> A column constraint is written inline after one column's type; a table constraint is a separate entry in the column list and names the columns it covers. You're **forced** into the table form whenever a constraint **spans more than one column** — a composite primary key, a multi-column `UNIQUE`, a composite foreign key, or a `CHECK` comparing two columns (`CHECK ("endDate" > "startDate")`).
>
> They're otherwise equivalent — the slides' two tables show both styles for a PK deliberately.

2. Name the five constraint types and say in one clause what each rejects.
> [!answer]- reveal
> **`NOT NULL`** — rejects a missing value. **`UNIQUE`** — rejects a duplicate. **`PRIMARY KEY`** — rejects both (it *is* `NOT NULL` + `UNIQUE`). **`CHECK`** — rejects a row failing your boolean condition. **`FOREIGN KEY`** — rejects a value with no matching parent row.

3. ⚠ Trap: a column is declared `UNIQUE` but not `NOT NULL`. How many rows can hold `NULL` in it?
> [!answer]- reveal
> **Many.** `UNIQUE` is enforced by inequality, and `NULL = NULL` is never true — so two `NULL`s are never "duplicates". If you need at most one missing value, add `NOT NULL` or (Postgres 15+) `UNIQUE NULLS NOT DISTINCT`.
>
> This is the same three-valued logic that makes `= NULL` useless. See [[SELECT WHERE and Operators]].

4. ⚠ Trap: you declare `CHECK ("age" > 0)` and insert a row with `age` = `NULL`. Is the row accepted?
> [!answer]- reveal
> **Yes.** `NULL > 0` evaluates to `NULL`, not `FALSE`, and a `CHECK` only rejects a row when the condition is **explicitly FALSE**. `NULL` passes. To actually require a positive age you need `NOT NULL` *as well as* the `CHECK`. This surprises nearly everyone once.

5. `DROP TABLE` vs `TRUNCATE` vs `DELETE FROM` with no `WHERE` — all three "empty" a table. Distinguish them on: what survives, whether you can filter, and whether row triggers fire.
> [!answer]- reveal
> **`DROP TABLE`** — removes the table itself plus its data, indexes, triggers, rules and constraints. Nothing survives.
> **`TRUNCATE`** — removes all rows, **keeps** the structure/constraints/columns. Cannot take a `WHERE`. Does **not** fire per-row `ON DELETE` triggers. Can `RESTART IDENTITY` to reset the key counter, and needs `CASCADE` if another table's FK references it. Fast, because it doesn't scan rows.
> **`DELETE FROM t;`** — removes all rows, keeps structure, **can** be filtered with `WHERE`, **does** fire row triggers, and is slower because it processes each row.
>
> Rule of thumb: filtering or triggers ⇒ `DELETE`; wiping a table clean ⇒ `TRUNCATE`; getting rid of the table ⇒ `DROP`.

6. What does `IF NOT EXISTS` change about a failed `CREATE TABLE`, and what does it *not* protect you from?
> [!answer]- reveal
> It downgrades the name-collision **error** to a **notice** — the statement succeeds quietly. What it does **not** do is reconcile the definitions: if a table of that name exists with entirely different columns, you get no table created and no warning that your intended schema wasn't applied. It's a convenience for idempotent scripts, not a schema-migration tool.

7. What does `NOT VALID` do on the foreign key in your `students` table?
> [!answer]- reveal
> It tells Postgres to **skip checking the rows already in the table** when adding the constraint. **New and updated rows are still enforced.** It exists so you can add a constraint to a large live table without a long blocking scan; you then run `ALTER TABLE … VALIDATE CONSTRAINT …` later. On an empty table it's a no-op — pgAdmin simply generates it by default, which is why it appeared in your DDL.

## Rebuild Drill

From a blank file, write DDL for a two-table schema of your own invention that uses **every one of the five constraint types at least once**, includes **one multi-column table constraint** (so you're forced out of the inline form), and gives at least one constraint an explicit name via the `CONSTRAINT … ` syntax. Use the Academy camelCase convention throughout.

Then, before executing, write down the five `INSERT` statements that should each be rejected — one per constraint type — **and the constraint that will reject each**.

**Success criteria:** the DDL creates without error; all five `INSERT`s are rejected; and the error message for each names the constraint you predicted. Bonus rung: write a sixth `INSERT` that you expect to *pass* despite looking like it should fail — a `NULL` in a `UNIQUE` column, or a `NULL` against a `CHECK` (prompts 3 and 4).

## Correctness Check

- ✅ **Postgres specifics** — `GENERATED ALWAYS AS IDENTITY` for auto-keys (see [[Choosing a Postgres Data Type]]); camelCase requires quoting throughout (see [[Identifier Quoting and Case Folding]]). ✓
- ✅ **NULL three-valued logic** (checklist item) — surfaced twice, in the `UNIQUE`-permits-many-`NULL`s trap and the `CHECK`-passes-on-`NULL` trap. Both verified. ✓
- ✅ `TRUNCATE` does not fire row-level `ON DELETE` triggers and requires `CASCADE` against referencing FKs — verified.
- ✅ `NOT VALID` semantics (skips existing rows, still enforces new ones) — verified.
- ⚠️ **Correction to the raw slides:** they list `TRUNCATE TABLE table_name` as simply "empty a table but keep everything else." True as far as it goes, but it omits the two behaviours that actually decide the choice — no `WHERE`, and no row triggers. Prompt 5 restores the distinction.
- ✅ The slides' claim that a PK "combines the `NOT NULL` and `UNIQUE` constraints" and that you should still use the `PRIMARY KEY` constraint rather than hand-rolling it — verified and correct.
- ℹ️ Not graduated from these slides: the `CREATE DATABASE` parameter catalogue (`LC_COLLATE`, `TABLESPACE`, `IS_TEMPLATE`, …). Pure lookup material, and the source itself notes you rarely create databases. One fact worth keeping instead: **`CREATE DATABASE` cannot run inside a transaction block** — that, not any pgAdmin limitation, is the real constraint on it.

## Flashcards

#flashcards/sql/ddl

When are you forced to use a table constraint instead of a column constraint?
?
When the constraint spans more than one column: composite PK, multi-column UNIQUE, composite FK, or a CHECK comparing two columns.

A column is UNIQUE but nullable. How many rows can hold NULL there?
?
Many. NULL = NULL is never true, so NULLs are never duplicates. Add NOT NULL, or UNIQUE NULLS NOT DISTINCT (PG15+).

You have CHECK (age > 0) and insert age = NULL. Accepted or rejected?
?
Accepted. NULL > 0 is NULL, not FALSE, and CHECK only rejects an explicitly FALSE condition. Add NOT NULL to actually require it.

DELETE FROM t vs TRUNCATE t — name two behavioural differences.
?
TRUNCATE takes no WHERE and fires no per-row ON DELETE triggers (and can RESTART IDENTITY). DELETE can filter and does fire triggers, but is slower.

What does NOT VALID do on a foreign key?
?
Skips checking rows already in the table; new and updated rows are still enforced. Lets you add a constraint to a big live table without a blocking scan.

## TIL candidate

Showable: a script that proves the two counter-intuitive passes — a `NULL` slipping through `UNIQUE` and through `CHECK`. Genuinely surprising to most people. → git TIL. Link out; don't copy.

## Links

- Declares: [[Keys Primary and Foreign]]
- Type choices: [[Choosing a Postgres Data Type]]
- Quoting rules that govern every identifier here: [[Identifier Quoting and Case Folding]]
- Contrast: [[INSERT UPDATE and DELETE]] — DML changes rows, DDL changes structure
- Map: [[SQL MOC]]
- Backlog: [[Database Normalization]] — decides what tables you create in the first place

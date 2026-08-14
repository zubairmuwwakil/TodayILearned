---
type: concept
topic: keys
status: learning
difficulty: medium
aliases:
  - Primary Key
  - Foreign Key
  - PK and FK
  - Keys in SQL
  - Referential Integrity
created: 2026-08-13
tags:
  - sql
  - keys
  - constraints
  - concepts
---

# Keys Primary and Foreign

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Test surface, not a reference. Load-bearing: every JOIN you ever write rides on the PK↔FK relationship. %%

## Retrieval Prompts

1. A `PRIMARY KEY` is shorthand for which two constraints combined? How many may a table have?
> [!answer]- reveal
> **`NOT NULL` + `UNIQUE`.** Exactly **one** per table — but it may be **composite** (span several columns), in which case the *combination* must be unique and every participating column is `NOT NULL`. Declaring `NOT NULL UNIQUE` by hand gives the same enforcement but loses the declared intent, so always use the `PRIMARY KEY` constraint.

2. What does a `FOREIGN KEY` actually enforce — and in which direction? Name the two tables' roles.
> [!answer]- reveal
> It enforces **referential integrity**: every non-NULL value in the child's FK column must already exist in the referenced column of the parent. The table holding the FK is the **child** (referencing) table; the one holding the PK is the **parent** (referenced) table. It constrains the **child on insert/update** *and* the **parent on delete/update**.

3. How many foreign keys may one table have, and why is that asymmetric with primary keys?
> [!answer]- reveal
> **Many.** A PK answers "how is *this* row identified" — there's one answer. An FK answers "which other row does this point at" — a row can point at many different parents (a `students` row referencing both a course and an advisor). This asymmetry is what makes the model *relational*.

4. Your `students` table declares `ON UPDATE NO ACTION ON DELETE NO ACTION`. You try to delete the `courses` row that a student references. What happens, and why did the course designers pick that?
> [!answer]- reveal
> The delete is **rejected** — Postgres refuses to orphan the child row. `NO ACTION` is the **default**; it means "no compensating action, so block it." It was chosen so the tables "don't worry about each other" during learning, i.e. errors surface loudly instead of silently cascading.

5. Interleaving — name the referential actions and pick one for each scenario: (a) deleting a user should delete their posts; (b) deleting a category should leave products uncategorised; (c) deleting a customer with invoices should be forbidden.
> [!answer]- reveal
> Actions: **`NO ACTION`** (default) · **`RESTRICT`** · **`CASCADE`** · **`SET NULL`** · **`SET DEFAULT`**.
> (a) `ON DELETE CASCADE` · (b) `ON DELETE SET NULL` (the FK column must be nullable) · (c) `ON DELETE RESTRICT` or `NO ACTION`.
> `RESTRICT` vs `NO ACTION`: `RESTRICT` refuses immediately; `NO ACTION` defers the check to the end of the statement, so it permits tricks a `RESTRICT` would block.

6. Must a foreign key reference a **primary** key specifically?
> [!answer]- reveal
> No — it must reference a column set with a **`UNIQUE` or `PRIMARY KEY` constraint**. Uniqueness is the real requirement; a PK is just the usual choice. Without uniqueness the reference would be ambiguous.

## Rebuild Drill

From a blank file, write the DDL for a two-table pair of your own (not courses/students): a parent with a surrogate identity PK, and a child carrying an FK to it plus one `NOT NULL` column. Give the FK an explicit `ON DELETE` action that fits your domain. Then, without running it, **write the exact outcome of three statements**: inserting a child whose FK value doesn't exist in the parent; deleting a referenced parent row; inserting a child with `NULL` in the FK column.

**Success criteria:** statement 1 → rejected, foreign key violation. Statement 2 → depends on your chosen action, and you can state which. Statement 3 → **allowed**, unless you also declared the FK column `NOT NULL` (an FK does *not* imply `NOT NULL` — this is the one most people get wrong). Then run it in pgAdmin and reconcile.

## Correctness Check

- ✅ **PK = NOT NULL + UNIQUE, one per table, composite allowed.** ✓
- ✅ **FK targets a UNIQUE/PK column set**, may be many per table, permits `NULL` unless separately constrained. ✓
- ✅ **Referential actions** — `NO ACTION` is the Postgres default; `RESTRICT`/`CASCADE`/`SET NULL`/`SET DEFAULT` verified. ✓
- ✅ **NULL three-valued logic** — noted that a nullable FK column is legal, which is where "optional relationship" comes from.
- ⚠️ **Imprecision corrected from the raw slides:** they write "PostgreSQL simply won't let us delete the courses **table** as a result." What `ON DELETE NO ACTION` blocks is deleting a **referenced row**. (`DROP TABLE courses` would also fail, but for a different reason — a dependent constraint — and needs `CASCADE`. Different error, different fix.) Prompt 4 tests the row case.
- ✅ Composite/candidate/super/alternate keys mentioned in the slides are deliberately **not** graduated — out of scope until normalization. Forward-linked below.

## Flashcards

#flashcards/sql/keys

Does a FOREIGN KEY column have to be NOT NULL?
?
No. A nullable FK is legal and is how you model an optional relationship. NOT NULL must be declared separately.

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Retrieval Prompts 1, 3, 5, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: a tiny two-table schema demonstrating each `ON DELETE` action and the exact error text when a violation is rejected. → git TIL. Link out; don't copy.

## Links

- Prerequisite: [[Relational Model Vocabulary]]
- Declared in: [[CREATE TABLE and Constraints]]
- Consumed by: [[GROUP BY Aggregates and HAVING]] — the join that feeds a grouped count
- Map: [[SQL MOC]]
- Backlog: [[Joins]] — PK↔FK is the join predicate · [[Database Normalization]] — candidate/composite keys live there · [[Entity Relationship Diagrams]]

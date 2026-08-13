---
type: concept
topic: relational-model
status: learning
difficulty: easy
aliases:
  - Relational Model
  - Tuple
  - Attribute
  - Degree and Cardinality
  - Table Anatomy
created: 2026-08-13
tags:
  - sql
  - relational-model
  - concepts
---

# Relational Model Vocabulary

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. Test surface, not a reference. The load-bearing traps: a data item is a CELL (not a row), and rows have NO guaranteed order. %%

## Retrieval Prompts

1. Give the formal term and the everyday term for each of the three structures: the whole thing, one horizontal entry, one vertical field.
> [!answer]- reveal
> **relation** = table · **tuple** = row (record) · **attribute** = column (field). "Relational" comes from *relation*, i.e. the table itself — **not** from tables relating to each other. That is the single most common misreading of the name.

2. A table has 3 columns and 5 rows. What is its **degree**, and what is its **cardinality**? Which one changes when you `INSERT`?
> [!answer]- reveal
> **Degree = 3** (number of attributes). **Cardinality = 5** (number of tuples). `INSERT` changes **cardinality**; changing degree needs `ALTER TABLE`. A relation with cardinality 0 is an empty table — still a valid relation.

3. What is a **domain**, and how is it more than just a data type?
> [!answer]- reveal
> The set of permitted values for an attribute. It starts with a data type but can add constraints beyond it — `maritalStatus` might be typed `VARCHAR` yet restricted to `married`/`unmarried`; an `age` domain excludes negatives. In Postgres you can make this literal with `CREATE DOMAIN` or a `CHECK` constraint.

4. What is the smallest unit of data in a table, and how do you know when a value is **not** atomic?
> [!answer]- reveal
> A **data item / cell** — one attribute's value in one tuple, at a single row×column intersection. Non-atomic means it can be meaningfully split: `fullName` is not atomic (firstName + lastName are); a comma-separated `"maths,physics"` is not atomic. Atomicity is the requirement of **first normal form**.

5. ⚠ Trap: your source claims rows are ordered "by order of insertion." Why is that wrong, and what is the only thing that guarantees order?
> [!answer]- reveal
> A relation is an **unordered set** of tuples. Postgres may return rows in any order and will change it — an `UPDATE` rewrites the row to a new physical location, so it often moves. The **only** guarantee is an explicit `ORDER BY`. Relying on observed order is a bug that hides until data volume or a plan change exposes it. See [[ORDER BY and LIMIT]].

6. `NULL` — what does it mean, and name three things it is *not*.
> [!answer]- reveal
> "Unknown or absent value." It is **not** `0`, **not** the empty string `''`, and **not** a space. It is not equal to anything, *including another `NULL`* — which is why `= NULL` never matches and you must use `IS NULL`. See [[SELECT WHERE and Operators]].

## Rebuild Drill

From a blank page, no source: draw a 3-column × 4-row table of your own invention. Then **label six things on it by their formal names**: the relation, one tuple, one attribute, one data item, the degree, the cardinality. Finally, write one sentence stating what guarantees the row order of a query against it.

**Success criteria:** degree = 3 and cardinality = 4 (not swapped); the data item you circle is a **single cell**, not a whole row; your order sentence names `ORDER BY` and says the table itself has no inherent order.

## Correctness Check

Ran the SQL checklist from `_refiner.md`:

- ✅ **NULL three-valued logic** — stated as "not equal to anything including NULL"; `IS NULL` named as the only test. ✓
- ✅ **Join semantics / GROUP BY / sargability** — not applicable to this note (no queries written).
- ✅ **Postgres specifics** — no identifiers or DDL written here; quoting is covered in [[Identifier Quoting and Case Folding]].
- ⚠️ **Two errors corrected from the raw slides:**
  1. The slides define a data item as the smallest unit at a row×column intersection, then illustrate it with `1, John, Web Development` — **that is a whole tuple, not a data item.** Prompt 4 uses the correct definition.
  2. The slides say "Rows in a table have a specific order… typically determined by the order of insertion." **False** — see prompt 5. The slides half-retract this later ("the order of rows is not always significant"), which is what made it slip through.
- ✅ Degree/cardinality definitions verified against the slides and standard relational terminology; they matched.

## Flashcards

#flashcards/sql/relational-model

Why is the relational model called "relational"?
?
Because a table IS a relation (a set of tuples). NOT because tables relate to each other — that's a common misreading.

What are degree and cardinality of a table?
?
Degree = number of attributes (columns). Cardinality = number of tuples (rows). INSERT changes cardinality; ALTER TABLE changes degree.

What guarantees the order of rows returned by a query?
?
Only an explicit ORDER BY. A relation is an unordered set — Postgres may return any order, and an UPDATE physically moves the row.

Why is fullName not atomic, and which normal form cares?
?
It can be meaningfully split into firstName + lastName. Atomicity is the requirement of first normal form (1NF).

NULL is not equal to what?
?
Anything — including another NULL. That's why `= NULL` never matches and you need IS NULL / IS NOT NULL.

## TIL candidate

Not showable on its own — vocabulary, not skill. Skip the git TIL.

## Links

- Next: [[Keys Primary and Foreign]] — how tuples in one relation point at another
- Related: [[DBMS and Database Components]] — where the relational model sits among the alternatives
- Applies in: [[SELECT WHERE and Operators]] · [[ORDER BY and LIMIT]]
- Map: [[SQL MOC]]
- Backlog: [[Database Normalization]] — 1NF starts from the atomicity rule above

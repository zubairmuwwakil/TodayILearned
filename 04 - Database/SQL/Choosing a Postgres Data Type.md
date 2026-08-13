---
type: concept
topic: data-types
status: learning
difficulty: medium
aliases:
  - Postgres Data Types
  - SQL Data Types
  - numeric vs real
  - timestamptz
  - IDENTITY vs serial
created: 2026-08-13
tags:
  - sql
  - postgres
  - data-types
  - concepts
---

# Choosing a Postgres Data Type

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — already worked through in pgAdmin. NOTE: the byte/range tables in the slides are DELIBERATELY not reproduced — the source itself says don't memorise them. What's graduated is the DECISION: which type do I reach for, and which choice silently corrupts data. %%

## Retrieval Prompts

1. You're storing a price. Why is `real` / `double precision` the wrong answer, and what is the right one?
> [!answer]- reveal
> `real` and `double precision` are **binary floating point — inexact**. `0.1 + 0.2` does not equal `0.3`, and rounding error compounds across sums, so ledgers stop balancing. Use **`numeric`** (a.k.a. `decimal`) — arbitrary precision and **exact**, e.g. `numeric(10,2)`. The trade-off is that `numeric` arithmetic is slower, because it isn't done in hardware.
>
> There is also a `money` type. Avoid it: its output is locale-dependent and it's awkward in arithmetic. The slides' own advice — work in `numeric`, convert to currency only for display — is right.

2. `varchar(n)` vs `varchar` vs `text` in Postgres — what's the *performance* difference, and what's the real reason to pick one?
> [!answer]- reveal
> **There is no performance difference** — all three are stored identically. `varchar(n)` just adds a length **check** constraint. So choose on **semantics**: use `varchar(n)` when the limit is a genuine business rule, `text` when there's no natural limit. (Postgres is unusual here; in other engines the choice does affect storage.)
>
> Avoid **`char(n)`** — it is blank-padded to the full width, so `'ab'` in a `char(10)` stores and compares with seven trailing spaces.

3. `timestamp` vs `timestamptz` — what does each actually store, and which should be your default?
> [!answer]- reveal
> **`timestamptz`** stores an absolute point in time (normalised to UTC), converting on input and output according to the session's `TimeZone`. **`timestamp`** (without time zone) stores a bare wall-clock reading with **no zone at all** — two users in different zones write "14:00" and it means two different instants, with nothing recording which.
>
> **Default to `timestamptz`.** Despite the name, it does *not* store a time zone — it stores an instant. Use plain `timestamp` only for genuinely zone-less values, e.g. a recurring 09:00 alarm.

4. Your `CREATE TABLE` used `INT GENERATED ALWAYS AS IDENTITY`, but the type list also offers `serial`. What's the difference, and which is current?
> [!answer]- reveal
> **`GENERATED … AS IDENTITY`** is standard SQL and the modern Postgres choice (v10+). **`serial`** is the legacy Postgres-only shorthand; it quietly creates a separate sequence whose ownership and permissions you then have to manage, and it doesn't stop you inserting conflicting explicit values.
>
> `ALWAYS` vs `BY DEFAULT`: **`ALWAYS`** rejects an explicit value unless you write `OVERRIDING SYSTEM VALUE`; **`BY DEFAULT`** accepts one. `ALWAYS` is the safer default — and it's exactly why the slides' own `INSERT` example fails (see Correctness Check).

5. What does `CREATE TYPE … AS ENUM` give you that a `CHECK` constraint doesn't — and name two ways enums bite back.
> [!answer]- reveal
> It gives a **named, reusable** type shared across columns and tables, with a **sort order set by declaration order** (not alphabetical) — so `ORDER BY` on it sorts logically.
>
> Biting back: (1) labels are **case-sensitive strings** — declare `'North'` and `'NORTH'` is rejected; (2) it's **hard to change** — adding needs `ALTER TYPE … ADD VALUE`, and removing or reordering a label effectively means recreating the type and rewriting dependent columns. For a set that will churn, a lookup table with an FK is more flexible.

6. Interleaving — pick the type: (a) a country code that is always exactly 2 letters; (b) a row-creation instant; (c) an invoice total; (d) a "how long did the job take" duration.
> [!answer]- reveal
> (a) `varchar(2)` — the limit is a real rule. (Not `char(2)`; you don't want blank padding semantics, though here the width matches so it's harmless.)
> (b) `timestamptz`, almost always with `DEFAULT now()`.
> (c) `numeric(12,2)` — exact.
> (d) `interval` — a duration, distinct from a point in time.

## Rebuild Drill

From a blank file, write `CREATE TABLE` for an `orders` table with six columns of your choosing that forces you to decide between each confusable pair above: an exact money column, a variable text column, an instant column, a duration column, a surrogate identity key, and one enum-or-lookup status column. **Write a one-line comment on each column justifying the type over its nearest rival.**

**Success criteria:** money is `numeric(p,s)` and not `real`/`money`; the instant is `timestamptz`; the key is `GENERATED ALWAYS AS IDENTITY` and not `serial`; the duration is `interval` and not an integer of unstated units; your justification for the status column names the churn trade-off from prompt 5. Then run it in pgAdmin — it must create without error.

## Correctness Check

- ✅ **Postgres specifics** (checklist item) — `GENERATED … AS IDENTITY` named as current, `serial` explicitly flagged as legacy. ✓
- ✅ `numeric`/`decimal` exact vs `real`/`double precision` inexact — verified; matches the slides' own "variable-precision, inexact" column, which they then undercut by not warning about money.
- ✅ `varchar`/`text` storage equivalence in Postgres — verified. ✓
- ⚠️ **The slides' `INSERT` example cannot run.** They write `INSERT INTO "courses" ("courseId", "courseName") VALUES (1, 'Web Development');` while `courseId` is `INT GENERATED ALWAYS AS IDENTITY`. Postgres raises `ERROR: cannot insert a non-DEFAULT value into column "courseId"` with `HINT: Use OVERRIDING SYSTEM VALUE to override.` The fix is to omit the column. Tested against prompt 4. Also covered in [[INSERT UPDATE and DELETE]].
- ⚠️ **The slides' enum example is malformed**: `CREATE TYPE week AS ENUM ('North', 'South', 'East', 'West');` — a type named `week` holding compass directions (a copy-paste artifact; rename it). The surrounding prose also says `NORTH, SOUTH, EAST, WEST` in caps while the labels are `'North'`… — since labels are case-sensitive, `'NORTH'` would be **rejected**. Tested in prompt 5.
- ⚠️ **Flagged for spot-check (<90% confident):** the slides list **`interval` as 12 bytes**; current Postgres documentation says **16 bytes**. I'm ~90% on this. It changes nothing you'd type — noted only so the number in your source isn't trusted blindly.
- ✅ Numeric ranges, `money` range, and `timestamp`/`date` bounds in the slides spot-checked and correct — but deliberately **not** transcribed here (lookup material, not retrieval material).

## Flashcards

#flashcards/sql/data-types

Why must money never be stored as real or double precision?
?
They're binary floating point — inexact. Rounding error compounds across sums and ledgers stop balancing. Use numeric/decimal, which is exact.

In Postgres, what's the performance difference between varchar(n), varchar and text?
?
None — they're stored identically. varchar(n) only adds a length check. Choose on semantics: a real business limit vs no natural limit.

What does timestamptz actually store?
?
An absolute instant, normalised to UTC, converted on input/output by the session TimeZone. It does NOT store a time zone. Default to it over plain timestamp.

GENERATED ALWAYS AS IDENTITY vs serial — which is current, and what does ALWAYS enforce?
?
IDENTITY is standard SQL and current (PG 10+); serial is legacy. ALWAYS rejects an explicit inserted value unless you write OVERRIDING SYSTEM VALUE.

How does an enum type sort, and why is it hard to change?
?
By declaration order, not alphabetically. Changing it needs ALTER TYPE ADD VALUE; removing or reordering means recreating the type and rewriting dependent columns.

## TIL candidate

Showable: a three-line demo proving `0.1::real + 0.2::real <> 0.3` while the `numeric` equivalent holds. → git TIL. Link out; don't copy.

## Links

- Used by: [[CREATE TABLE and Constraints]] — where these choices get declared
- Related: [[Identifier Quoting and Case Folding]] — the *other* Postgres-specific trap in the same DDL
- Prerequisite: [[Relational Model Vocabulary]] — a type is the basis of a domain
- Map: [[SQL MOC]]

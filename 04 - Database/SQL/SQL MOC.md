---
type: moc
topic: sql
status: living
aliases:
  - SQL MOC
  - SQL Map
  - Postgres MOC
  - Database MOC
tags:
  - sql
  - postgres
  - moc
---

# SQL MOC

## Purpose

The map of content for SQL / PostgreSQL notes. Use it to study related topics **together** and to see what's written vs. still on the backlog. A hub of links — **no concept content is copied here.**

## Conventions

- New SQL notes are graduated via [[Refiner Spec (Graduate)]] using `04 - Database/SQL/_refiner.md` (SQL uses the generic skeleton, not a template).
- Every note carries minimal frontmatter (`type`, `topic`, `status`, `tags`) so Dataview can list them without hand-kept indexes.
- Reduce duplication by **linking/embedding**, never copying. Canonical fact lives in one note; surface it elsewhere with `![[Note#Heading]]`.
- Cards live under `#flashcards/sql/<topic>`.

## Core Concepts

### Foundations
- [[DBMS and Database Components]] — data vs database vs DBMS; the five components; why concurrency/recovery justifies the whole thing
- [[Relational Model Vocabulary]] — relation/tuple/attribute/domain/degree/cardinality; rows are **unordered**

### Schema (DDL)
- [[CREATE TABLE and Constraints]] — the five constraint types; `UNIQUE` permits many `NULL`s; a `CHECK` on `NULL` **passes**
- [[Keys Primary and Foreign]] — PK = `NOT NULL` + `UNIQUE`; referential actions; a nullable FK is legal
- [[Choosing a Postgres Data Type]] — `numeric` not `real` for money; `timestamptz` by default; `IDENTITY` not `serial`

### Postgres gotchas
- ⭐ [[Identifier Quoting and Case Folding]] — unquoted folds to **lower**; camelCase must be quoted forever. The highest-value note in this domain.

### Querying (DML)
- [[SELECT WHERE and Operators]] — three-valued logic; the `NOT IN`+`NULL` zero-row trap; sargability
- [[GROUP BY Aggregates and HAVING]] — the logical evaluation order everything else derives from; `COUNT(*)` vs `COUNT(col)`
- [[ORDER BY and LIMIT]] — `ASC`/`DESC` binds **per column**; `LIMIT` without `ORDER BY` is non-deterministic
- [[INSERT UPDATE and DELETE]] — the missing `WHERE`; `RETURNING`; why `GENERATED ALWAYS` rejects your id

## Backlog (forward-links — not yet written)

Intentional unresolved links; write them when the material is graduated (no stub files).

- **From Day 14:** [[Joins]] — `INNER`/`LEFT`/`RIGHT`/`FULL` and fan-out · [[Subqueries]] · [[Set Operators]] (`DISTINCT`, `UNION`, `INTERSECT`, `EXCEPT`) · [[Database Normalization]] · [[Entity Relationship Diagrams]] · [[Transactions and ACID]] · [[Stored Procedures in Postgres]] · [[Triggers in Postgres]]
- **From Day 15:** [[Indexing in Postgres]] — clustered vs non-clustered, index types · [[JDBC]] — the Java↔Postgres seam
- **Not yet taught:** [[Window Functions]] — aggregates without collapsing rows · [[NoSQL]]

## Known errors in the Day 13–14 source material

Recorded once here so no individual note has to repeat them. Full detail sits in each note's **Correctness Check**.

| Slide claim | Reality | Note |
|---|---|---|
| `INSERT INTO "courses" ("courseId", …) VALUES (1, …)` | **Cannot run** — `GENERATED ALWAYS` rejects it | [[INSERT UPDATE and DELETE]] |
| An UPDATE comment describing different SQL than its code | Comment and statement disagree entirely | [[INSERT UPDATE and DELETE]] |
| A "data item" illustrated as `1, John, Web Development` | That's a **tuple**; a data item is one cell | [[Relational Model Vocabulary]] |
| "Rows are ordered by order of insertion" | Relations are **unordered**; only `ORDER BY` guarantees it | [[Relational Model Vocabulary]] |
| `ORDER BY a, b ASC` sorts both ascending | `ASC`/`DESC` binds **per column** | [[ORDER BY and LIMIT]] |
| "pgAdmin won't let you create a database with SQL" | It will — the real limit is no transaction block | [[CREATE TABLE and Constraints]] |
| `CREATE TYPE week AS ENUM ('North', …)` | Type name/values mismatched; labels are case-sensitive | [[Choosing a Postgres Data Type]] |
| `interval` is 12 bytes | Postgres docs say **16** — ⚠ spot-check | [[Choosing a Postgres Data Type]] |

## Study method

Per [[My Study Operating Manual (READ ME)]]: read a note once → answer its **Retrieval Prompts closed-book** → do the **Rebuild Drill** from a blank query tool → log misses. Let the **Spaced Repetition** plugin schedule the `#flashcards/sql/*` cards. Retrieval, not rereading; interleave once each topic is studied at least once.

**Suggested order for this batch:** [[Relational Model Vocabulary]] → [[Keys Primary and Foreign]] → [[Identifier Quoting and Case Folding]] → [[CREATE TABLE and Constraints]] → [[SELECT WHERE and Operators]] → [[INSERT UPDATE and DELETE]] → [[GROUP BY Aggregates and HAVING]] → [[ORDER BY and LIMIT]]. [[DBMS and Database Components]] and [[Choosing a Postgres Data Type]] can be interleaved anywhere.

## Related maps

- [[Java MOC]] — sibling domain; [[JDBC]] is the seam between them
- [[Spring MOC]] — [[JPA and Its Annotations]] maps these tables to objects

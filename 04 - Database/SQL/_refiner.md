---
type: refiner-config
domain: sql
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# SQL / PostgreSQL — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for SQL lives here.** All shared machinery and rules are in the spec.

> **This is the home for both SQL and PostgreSQL.** The semantics below are RDBMS-general; the last checklist item covers Postgres-specific traps.

- **Target folder:** `50 Resources/Software Engineering/04 - Database/SQL/`
- **Flashcard tag:** `#flashcards/sql/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

> **Raw source for this domain:** the session captures under `20 Areas/Education/Obsidi Academy/Sessions/Java/Day 13 Jul 23/Data & Databases/`, `Day 14 jul 24/` (SQL Commands, normalization, ERDs) and `Day 15 jul 25/` (indexing, JDBC). Graduated SQL notes land in `04 - Database/SQL/`. If you ever relocate an existing note, **move it** (don't copy) to keep one home per item.

## Correctness checklist (SQL)

Run against every graduated SQL note (spec step ④). SQL traps are semantic — a query that *runs* can still be *wrong*:

- [ ] **Join semantics** — the row-multiplication is correct for the join type: `INNER` keeps only matches, `LEFT`/`RIGHT` keep all rows of one side (NULLs on the other), `FULL` keeps both; unintended fan-out from many-to-many is accounted for.
- [ ] **NULL three-valued logic** — `= NULL` is never true; use `IS NULL` / `IS NOT NULL`. Note NULL handling in aggregates (`COUNT(col)` skips NULLs, `COUNT(*)` doesn't) and in `NOT IN`.
- [ ] **GROUP BY** — every non-aggregated column in `SELECT` appears in `GROUP BY`; filter groups with `HAVING`, rows with `WHERE`.
- [ ] **Index use / sargability** — predicates are sargable; wrapping an indexed column in a function or leading-wildcard `LIKE '%x'` prevents index use.
- [ ] **Postgres specifics** — auto-keys via `GENERATED … AS IDENTITY` (or legacy `SERIAL`); use `RETURNING` to read generated values; **unquoted identifiers fold to lowercase** (`"userId"` ≠ `userId`); `::type` casts; `LIMIT`/`OFFSET` (not `TOP`).

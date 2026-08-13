---
type: concept
topic: dbms
status: learning
difficulty: easy
aliases:
  - DBMS
  - Database Management System
  - Database Components
  - RDBMS vs NoSQL
created: 2026-08-13
tags:
  - sql
  - dbms
  - concepts
---

# DBMS and Database Components

%% Graduated via [[Refiner Spec (Graduate)]] using SQL/_refiner.md. Worked example omitted — no code, and already worked through. HEAVILY TRIAGED: the slides' advantages/disadvantages lists, the "role of databases in web apps" section, and the location/hosting/processing-power taxonomies are deliberately NOT here — enumeration recall with no transfer. What's kept is what changes a decision. %%

## Retrieval Prompts

1. Distinguish **data**, **database**, and **DBMS** in one sentence each.
> [!answer]- reveal
> **Data** — raw, unprocessed values with no inherent meaning. **Database** — an organised collection of that data. **DBMS** — the *software layer* that creates, manages and mediates access to databases. You query the **DBMS**; it manages the **database**; the database holds the **data**.
>
> Postgres is a DBMS. `bptn` is a database. `'Web Development'` is data.

2. Name the **five components** of a database system, and identify which one you are personally writing.
> [!answer]- reveal
> **Hardware · Software · Data · Procedures · Database Access Language.**
>
> You write the **access language** (SQL) and the **procedures** (the rules and stored routines governing use). Hardware and software are provisioned; data is the thing being managed. The framing that matters: SQL is a *component of the system*, not an add-on to it.

3. What are the four core functions a DBMS performs?
> [!answer]- reveal
> **Data definition** (structures, relationships, constraints — DDL) · **data manipulation** (insert, query, modify, remove — DML) · **concurrency and recovery** (many users at once without corruption; restore to a consistent state after a crash — this is where ACID lives) · **administration** (backup, restore, users and permissions, performance).
>
> Concurrency and recovery is the one that justifies the DBMS's existence. Everything else you could bodge with files; that one you cannot.

4. What does a DBMS give you that a folder of spreadsheets does not? Answer in terms of what it *prevents*.
> [!answer]- reveal
> It prevents **invalid data** (constraints and types are enforced centrally, not per-editor), **conflicting concurrent writes** (transactions and locking), **loss on failure** (write-ahead logging and recovery), and **unauthorised access** (authentication, authorisation, auditing). All four are guarantees you'd otherwise have to reimplement in every application that touches the data.
>
> The trade-off worth remembering from the disadvantages list: a DBMS is a **single point of failure**, and it introduces real operational cost and complexity.

5. Interleaving — which model fits: (a) financial transactions needing strict integrity; (b) a product catalogue whose fields differ per product; (c) a social graph of who-follows-whom; (d) a reporting warehouse scanning billions of rows for aggregates?
> [!answer]- reveal
> (a) **Relational** — constraints and ACID transactions. (b) **Document** NoSQL (MongoDB) — flexible schema. (c) **Graph** (Neo4j) — relationships are first-class rather than join-derived. (d) **Columnar / analytical** — reads a few columns across huge row counts.
>
> The split that actually matters day to day isn't the four-way model taxonomy — it's **operational (OLTP)**, tuned for many small concurrent transactions, versus **analytical (OLAP)**, tuned for large scans and aggregation.

6. Who defined the relational model, and roughly when?
> [!answer]- reveal
> **E. F. Codd**, at IBM. The famous public paper is *A Relational Model of Data for Large Shared Data Banks* (CACM, **1970**); an internal IBM report circulated in **1969**, which is the date your slides cite. Both are defensible — 1970 is the usual citation. Every RDBMS you'll touch still implements his model.

## Rebuild Drill

Conceptual material, so this is a **reconstruct-from-memory** drill rather than a blank-file one.

From a blank page, draw the stack from a user's click down to stored bytes, labelling each layer: application → access language → DBMS → database → data → hardware. Then annotate it with **where each of the four DBMS functions acts**, and mark the **one layer that is a single point of failure**.

**Success criteria:** SQL appears as the interface *between* application and DBMS, not inside the database; concurrency/recovery is attached to the DBMS layer, not the hardware; and your diagram distinguishes database (the organised collection) from DBMS (the managing software) as separate boxes. Check against this note only after drawing.

## Correctness Check

- ✅ Five components (hardware, software, data, procedures, database access language) — matches the source. ✓
- ✅ Four DBMS functions (definition, manipulation, concurrency & recovery, administration) — matches the source; ACID correctly located under concurrency/recovery. ✓
- ✅ NoSQL families (key-value, document, columnar, graph) and the OLTP/OLAP split — verified.
- ⚠️ **Date flagged (<90% certainty about which the course wants):** the slides date Codd's relational model to **1969**; the canonical published citation is **1970**. Both refer to real artifacts (internal report vs CACM paper). If an exam asks, give 1970 unless the course explicitly taught 1969.
- ✅ Charles Bachman's Integrated Data Store as an early DBMS from the 1960s — consistent with the historical record; not drilled, as it carries no transferable weight.
- ℹ️ **Deliberately not graduated** from these slides, and why: the 4 advantages / 6 disadvantages lists (enumeration recall, no transfer — the single genuinely decision-relevant item, single-point-of-failure, is folded into prompt 4); the DBMS taxonomies by location, design, hosting and processing power (trivia — the one that matters, operational vs analytical, is in prompt 5); the object-based and semi-structured data models (superseded, and not used in this course); and the entire "Role of Databases in Web Applications" section (eight generic reasons, nothing testable, nothing that changes what you type).

## Flashcards

#flashcards/sql/dbms

Distinguish data, database and DBMS.
?
Data = raw values. Database = an organised collection of them. DBMS = the software that creates, manages and mediates access. Postgres is a DBMS; bptn is a database.

What are the five components of a database system?
?
Hardware, software, data, procedures, and the database access language (SQL). You write the last two.

Which DBMS function justifies its existence over a folder of files?
?
Concurrency and recovery — many simultaneous users without corruption, plus restoration to a consistent state after a crash. That's where ACID lives.

What's the practical difference between OLTP and OLAP systems?
?
OLTP (operational) is tuned for many small concurrent transactions. OLAP (analytical) is tuned for large scans and aggregation over huge row counts.

Who defined the relational model and when?
?
E. F. Codd at IBM — CACM paper 1970 (internal report 1969). Every RDBMS still implements his model.

## TIL candidate

Not showable — conceptual framing, no artifact. Skip the git TIL.

## Links

- The model this describes: [[Relational Model Vocabulary]]
- The access language: [[SELECT WHERE and Operators]] · [[CREATE TABLE and Constraints]]
- Map: [[SQL MOC]]
- Backlog: [[Transactions and ACID]] — the concurrency/recovery guarantee, spelled out · [[NoSQL]] · [[Database Normalization]]

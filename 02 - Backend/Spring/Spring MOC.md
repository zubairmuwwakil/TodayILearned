---
type: moc
topic: spring
status: living
aliases:
  - Spring MOC
  - Spring Map
tags:
  - spring
  - moc
---

# Spring MOC

## Purpose

The map of content for Spring notes. Use it to study related topics **together** and to see what's written vs. still on the backlog. A hub of links — **no concept content is copied here.**

## Conventions

- New Spring notes are graduated via [[Refiner Spec (Graduate)]] (Spring uses the generic skeleton, not a template).
- Every note carries minimal frontmatter (`type`, `topic`, `status`, `tags`) so Dataview can list them without hand-kept indexes.
- Reduce duplication by **linking/embedding**, never copying. Canonical fact lives in one note; surface it elsewhere with `![[Note#Heading]]`.

## Core Concepts

### Foundations
- [[Framework vs Library]] — who calls whom (inversion of control)
- [[IoC and Dependency Injection]] — the principle + the pattern (absorbs Spring Core: container + beans)
- [[Bean Scopes]] — singleton vs prototype; the prototype-in-singleton trap

### Web
- [[Spring Boot Annotations]] — interleaving "which annotation here?" surface

### Data
- [[JPA and Its Annotations]] — mapping objects to tables

## Backlog (forward-links — not yet written)

Intentional unresolved links; write them when the material lands (no stub files).

- [[Spring MVC]] — DispatcherServlet → HandlerMapping → Controller → ViewResolver (deferred from Day 16)
- [[Spring JDBC]] — JdbcTemplate / RowMapper / DAO (deferred from Day 16)
- [[The Spring Framework]] · [[Spring Boot]] — overview + auto-config
- [[Object Relational Mapping (ORM)]] · [[Hibernate]] · [[Spring Data JPA]] — from Day 18
- **Design patterns live in Java, linked not duplicated:** [[Singleton Pattern]] · [[Factory Pattern]] · [[Proxy Pattern]]

## Study method

Per [[My Study Operating Manual (READ ME)]]: read a note once → answer its **Retrieval Prompts closed-book** → do the **Rebuild Drill** from a blank file → log misses. Let the **Spaced Repetition** plugin schedule the `#flashcards/spring/*` cards. Retrieval, not rereading; interleave once each topic is studied at least once.

## Related maps

- [[Java MOC]] — sibling domain

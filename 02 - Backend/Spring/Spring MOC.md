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
- [[Spring Boot]] — auto-configuration, the three annotations, and where component scanning starts
- [[Externalized Configuration with YAML]] — `application.yml`, config precedence, secrets out of the repo

### Web
- [[Spring MVC]] — DispatcherServlet → HandlerMapping → Controller → ViewResolver; `@Controller` vs `@RestController`
- [[Spring Boot Annotations]] — interleaving "which annotation here?" surface

### Data
- [[Spring JDBC]] — DAO + JdbcTemplate + RowMapper; the `rs.next()` trap
- [[JPA and Its Annotations]] — mapping objects to tables

### Security
- [[Spring Security Filter Chain]] — the servlet-filter perimeter; DelegatingFilterProxy → FilterChainProxy → first matching SecurityFilterChain
- [[Spring Security Authentication Flow]] — username/password path: AuthenticationManager → ProviderManager → UserDetailsService → SecurityContext (absorbs the "main classes" as roles)
- [[Authentication vs Authorization]] — who-are-you vs what-may-you-do; 401 vs 403

## Backlog (forward-links — not yet written)

Intentional unresolved links; write them when the material lands (no stub files).

- [[The Spring Framework]] — framework-wide overview (Boot itself is now written)
- [[Object Relational Mapping (ORM)]] · [[Hibernate]] · [[Spring Data JPA]] — from Day 18
- **Security (from Day 20):** [[JWT]] — token auth via a custom filter · [[RBAC vs ABAC]] — role- vs attribute-based access control

## Spring Hacks (doing, not remembering)

Click-paths and ad-hoc fixes — **not** study surfaces. They live in `Spring Hacks/` so the folder above stays graduated notes only. Per the boundary in [[AI Operating Manual (READ ME)]]: doing/showing → git or a how-to; remembering → a concept note.

- [[Row Mapper]] — Eclipse steps to generate a mapper (the *why* is in [[Spring JDBC]])
- [[Generate Getters & Setters]] · [[userbean (columns are mapped to attributes)]]

## Lives in another domain (linked, never duplicated)

- **Design patterns → Java:** [[Singleton Pattern]] · [[Factory Pattern]] · [[Proxy Pattern]] · [[MVC Pattern]] · [[Front Controller Pattern]]
- **Build & dependencies → Tooling:** [[Apache Maven]]
- **Data formats → Foundations:** [[XML and JSON]]
- **Team workflow → Tooling:** [[Git Project Workflow]]

## Study method

Per [[My Study Operating Manual (READ ME)]]: read a note once → answer its **Retrieval Prompts closed-book** → do the **Rebuild Drill** from a blank file → log misses. Let the **Spaced Repetition** plugin schedule the `#flashcards/spring/*` cards. Retrieval, not rereading; interleave once each topic is studied at least once.

## Related maps

- [[Java MOC]] — sibling domain

---
type: index
topic: backlog
status: living
aliases:
  - Concepts Backlog
  - Backlog
  - Study Queue
  - Unresolved Links
tags:
  - backlog
  - moc
---

# Concepts Backlog

> [!info] What this is
> A study queue of concepts you have **already linked to but not yet written**, grouped by domain and ranked by how often you reference them. Frequency is a *demand* signal — how load-bearing a concept is proven to be by your own writing — not a priority order. **Write a note when you sit down to learn the topic**, never pre-create empty stubs.

> [!note] This is a snapshot; the live version is built in
> Obsidian's **Unresolved links** pane (right sidebar) and the faded nodes in Graph view are always current.

> [!warning] Regenerate with the script, not by hand
> `python3 "_System/regenerate-backlog.py"` — it owns the counting rules, the merge map, and the exclusions that keep the numbers honest. Editing this file by hand is fine for ticking `[x]`; those marks are carried over. The reasoning behind each rule is documented in the script's header.


**105 open items** across 5 domains — 39 referenced 2+ times, 66 in the long tail.

Entries marked *aka* were separate queue items naming the **same concept**; their counts are combined. When you write one, add the aka names as `aliases:`.


## SQL (12)

*current focus — Day 14 material*


### Priority — referenced 2+ times (10)

- [ ] [[Joins]] — 6×
- [ ] [[Database Normalization]] — 5×
- [ ] [[Indexing in Postgres]] — 4×
- [ ] [[JDBC]] — 3×
- [ ] [[Subqueries]] — 3×
- [ ] [[Transactions and ACID]] — 3×
- [ ] [[Entity Relationship Diagrams]] — 2×
- [ ] [[NoSQL]] — 2×
- [ ] [[Triggers in Postgres]] — 2×
- [ ] [[Window Functions]] — 2×

### Long tail — referenced once (2)

> [!quote]- Show the long tail
> - [[Set Operators]]
> - [[Stored Procedures in Postgres]]


## Java (66)

*deepest domain; mostly gaps in early fundamentals*


### Priority — referenced 2+ times (21)

- [ ] [[Enhanced For Loop]] — 7×  *aka For-Each Loop*
- [ ] [[Objects Classes and Methods]] — 7×  *aka classes and objects*
- [ ] [[Comparable and Comparator]] — 6×  *aka Comparable, Comparator*
- [ ] [[Boolean Expressions]] — 4×
- [ ] [[Constructors in Java]] — 3×
- [ ] [[equals and hashCode]] — 3×  *aka hashCode and equals*
- [ ] [[Generics in Java]] — 3×  *aka Generics*
- [ ] [[ArrayDeque]] — 2×
- [ ] [[Checked vs Unchecked Exceptions]] — 2×
- [ ] [[Count-Controlled Loops]] — 2×
- [ ] [[Encapsulation]] — 2×
- [ ] [[Expressions and Assignment Statements]] — 2×
- [ ] [[Hello World in Java]] — 2×
- [ ] [[Instance Variables and Methods]] — 2×
- [ ] [[Intermediate Operations]] — 2×
- [ ] [[Stream Creation]] — 2×
- [ ] [[StringBuilder]] — 2×
- [ ] [[Switch Expressions]] — 2×
- [ ] [[The this Keyword]] — 2×
- [ ] [[Try-With-Resources]] — 2×
- [ ] [[Type Casting and Conversion]] — 2×  *aka Type Casting*

### Long tail — referenced once (45)

> [!quote]- Show the long tail
> - [[Access Modifiers]]
> - [[Anonymous Classes]]
> - [[Arithmetic Operators]]
> - [[Arrays Utility Class]]
> - [[Assignment Operators]]
> - [[Bytecode and the JIT Compiler]]
> - [[Comparison Operators]]
> - [[Compiled vs Interpreted Languages]]
> - [[Compound Assignment Operators]]
> - [[ConcurrentModificationException]]
> - [[Custom Exceptions]]
> - [[Defining and Calling Methods]]
> - [[Deque]]
> - [[Design Patterns]]
> - [[Enums]]
> - [[Exception Hierarchy]]
> - [[Inheritance vs Composition]]
> - [[Installing the JDK]]
> - [[Integer Division and Modulus]]
> - [[Intermediate vs Terminal Operations]]
> - [[Iterable Interface]]
> - [[Iterating Collections]]
> - [[Java Data Types]]
> - [[Java Pass by Value]]
> - [[List Interface and ArrayList]]
> - [[ListIterator]]
> - [[LRU Cache]]
> - [[Multidimensional Arrays]]
> - [[NavigableMap]]
> - [[NavigableSet]]
> - [[Nested If Statements]]
> - [[Optional]]
> - [[Parallel Streams]]
> - [[Queue]]
> - [[reduce and BinaryOperator]]
> - [[Reduce and Optional]]
> - [[Relational Operators]]
> - [[removeIf]]
> - [[Return Statement]]
> - [[SortedMap]]
> - [[Stream Operations]]
> - [[String Concatenation]]
> - [[String Formatting]]
> - [[String Immutability]]
> - [[Throwing and Declaring Exceptions]]


## Spring (13)

*from Days 16–20*


### Priority — referenced 2+ times (7)

- [ ] [[JWT]] — 3×
- [ ] [[Spring Data JPA]] — 3×
- [ ] [[Hibernate]] — 2×
- [ ] [[Object Relational Mapping (ORM)]] — 2×
- [ ] [[RBAC vs ABAC]] — 2×
- [ ] [[The Spring Framework]] — 2×
- [ ] [[Three Layer Architecture]] — 2×

### Long tail — referenced once (6)

> [!quote]- Show the long tail
> - [[ConfigurationProperties]]
> - [[HttpMessageConverter]]
> - [[Relational Databases]]
> - [[Spring Profiles]]
> - [[SQL]]
> - [[Transactional]]


## Tooling (11)

*Git, Maven, CI/CD*


### Priority — referenced 2+ times (1)

- [ ] [[Deployment Environments]] — 2×

### Long tail — referenced once (10)

> [!quote]- Show the long tail
> - [[Blue-Green Deployment]]
> - [[Code Review Practices]]
> - [[Dependency Scopes]]
> - [[GitHub Actions Matrix Builds]]
> - [[Maven Lifecycle Phases]]
> - [[Maven Surefire Plugin]]
> - [[Merge Conflicts]]
> - [[Secrets in GitHub Actions]]
> - [[Trunk-Based Development]]
> - [[YAML]]


## Foundations (3)

*cross-cutting*

### Long tail — referenced once (3)

> [!quote]- Show the long tail
> - [[HTTP Methods and Status Codes]]
> - [[Jackson]]
> - [[REST]]


## Recently cleared

Were backlog items in an earlier snapshot and now resolve:

- [x] [[01-OOP-Exceptions-Review]]
- [x] [[01-SOLID-Design-Principles]]
- [x] [[01-Static-Variables-and-Methods]]
- [x] [[01-The-Super-Keyword]]
- [x] [[01-Try-Catch-and-Finally]]
- [x] [[02-Catching-Multiple-Exceptions]]
- [x] [[02-Object-Superclass]]
- [x] [[03-Inheritance-and-Constructors]]
- [x] [[ArrayList]]
- [x] [[Big-O Notation]]
- [x] [[Collectors]]
- [x] [[Dependency Injection]]
- [x] [[Iterator Interface]]
- [x] [[Multi-Catch]]
- [x] [[Terminal Operations]]

## Links

- Domain maps: [[Java MOC]] · [[Spring MOC]] · [[SQL MOC]]
- Procedure for turning one of these into a note: [[Refiner Spec (Graduate)]]
- Front page: [[Software Engineering MOC]]

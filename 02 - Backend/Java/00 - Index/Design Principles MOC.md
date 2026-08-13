---
type: moc
topic: design-principles
tags:
  - java
  - moc
  - design-principles
---
# Design Principles MOC

> [!info] Principles for maintainable object-oriented design.

## Notes
- [[01-SOLID-Design-Principles]]

### Design patterns (from Day 16)
Creational and structural patterns Spring itself is built on. Written here, **linked** from [[Spring MOC]] — never duplicated.

- [[Singleton Pattern]] — one instance; the private constructor is what enforces it
- [[Factory Pattern]] — return the interface, keep `new` in one place
- [[Proxy Pattern]] — same interface, controlled access; why `@Transactional` self-invocation fails
- [[MVC Pattern]] — Model / View / Controller roles (Spring's version: [[Spring MVC]])
- [[Front Controller Pattern]] — one door for every request (Spring's version: `DispatcherServlet`)

## Practice & mistakes
- Log misses to [[Abstraction Polymorphism and Methods Mistake Log]]

## Up one level
- [[Java MOC]]

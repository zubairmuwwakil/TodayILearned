---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Spring Boot Annotations
  - Spring Annotations
  - "@SpringBootApplication"
  - "@RestController"
  - "@Autowired"
  - "@PathVariable"
  - "@RequestParam"
tags:
  - spring
  - annotations
  - flashcards
  - concepts
---

# Spring Boot Annotations

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. This is DELIBERATELY an interleaving retrieval surface, NOT a polished annotation list (contract: no polish-as-study). Answer each "which annotation?" before revealing. %%

## Interleaving Quiz — "which annotation goes here?"

1. Read `id` from the path `/users/42`.
> [!answer]- reveal
> **`@PathVariable`** — binds a URI *path segment* (`/users/{id}`).

2. Read `sort` from the query string `/users?sort=asc`.
> [!answer]- reveal
> **`@RequestParam`** — binds a *query-string* parameter. (⚠️ Day-16 called this `@PathVariable` — that's wrong; see Correctness Check.)

3. Mark a class as a REST endpoint whose return values become the response body (JSON).
> [!answer]- reveal
> **`@RestController`** = `@Controller` + `@ResponseBody`.

4. Mark a business-logic class so it's component-scanned into a bean.
> [!answer]- reveal
> **`@Service`** — a stereotype specialization of `@Component`.

5. Mark a data-access class *and* get persistence-exception translation.
> [!answer]- reveal
> **`@Repository`** — bean + translation of vendor `SQLException`s into Spring's `DataAccessException` hierarchy.

6. Handle an HTTP POST to `/posts`.
> [!answer]- reveal
> **`@PostMapping("/posts")`** — shorthand for `@RequestMapping(method = POST)`.

7. One annotation on the main class: configure + auto-config + component-scan + entry point.
> [!answer]- reveal
> **`@SpringBootApplication`** = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`.

8. Let Spring supply a dependency automatically.
> [!answer]- reveal
> **`@Autowired`** — automatic dependency injection (optional on a single constructor since Spring 4.3).

## Rebuild Drill

From memory, write a minimal `@RestController` with **one GET** at `/users/{id}` that reads the id from the path and **one GET** at `/users` that reads `?sort=`.
**Success criteria:** class has `@RestController`; the first method uses `@PathVariable`, the second uses `@RequestParam`; correct `@GetMapping` paths.

## Correctness Check

- ⚠️ **Fixed from raw notes:** Day-16 says `@PathVariable` captures `...?query=thing` from the URL. **Wrong** — that's a **query parameter (`@RequestParam`)**. `@PathVariable` binds URI *path* segments like `/users/{id}`. This quiz drills the correct split.
- ✅ `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan` — verified.
- ✅ `@RestController` = `@Controller` + `@ResponseBody` — verified.
- ✅ `@Service` / `@Repository` / `@Controller` are stereotype specializations of `@Component` — verified.

## Flashcards

#flashcards/spring/annotations

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Interleaving Quiz items 1/2, 3, 5, 7 removed — one question, one home. Answers live in the quiz's collapsed callouts. %%

@Service / @Repository / @Controller — what are they fundamentally?
?
Stereotype specializations of @Component: component-scanned into beans, and they signal the layer/intent.

## TIL candidate

Showable: *"What `@SpringBootApplication` replaces"* — the ~40-line XML bean/context config from Day-16 vs one annotation. → git TIL. Link out; don't paste the XML here.

## Links

- Related: [[IoC and Dependency Injection]] · [[Spring MVC]]
- Map: [[Spring MOC]]

---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Authentication vs Authorization
  - AuthN vs AuthZ
  - Authentication
  - Authorization
  - AuthN
  - AuthZ
  - 401 vs 403
tags:
  - spring
  - spring-security
  - authentication
  - authorization
  - security
  - concepts
---

# Authentication vs Authorization

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. The conceptual boundary that keeps [[Spring Security Filter Chain]] and [[Spring Security Authentication Flow]] from blurring. Filed in Spring for cohesion; it's a domain-general security concept. Test surface, not a reference. %%

## Big Picture (read once, then cover)

Two words that sound alike and get swapped constantly. This note is the **distinction** and its consequences (order, Spring machinery, HTTP status codes). Test surface below — answer closed-book, then rebuild the comparison table from memory.

## Retrieval Prompts

1. One phrase each — what question does **authentication** answer, and what question does **authorization** answer?
> [!answer]- reveal
> **Authentication (AuthN) = "who are you?"** — verify identity. **Authorization (AuthZ) = "what are you allowed to do?"** — grant or deny access to a resource/action.

2. Which runs **first**, and *why can't* it be the other way around?
> [!answer]- reveal
> **Authentication first.** Authorization *reads* the identity and authorities that authentication established — with no known identity there is nothing to base an access decision on.

3. Map each to its Spring Security machinery.
> [!answer]- reveal
> **AuthN** → `AuthenticationManager` / `ProviderManager`, producing an `Authentication` that carries granted authorities (detail in [[Spring Security Authentication Flow]]). **AuthZ** → an authorization filter / method security (`authorizeHttpRequests(...)`, `@PreAuthorize`) via `AuthorizationManager` (legacy `AccessDecisionManager`).

4. **The status-code trap:** which HTTP code means "not authenticated," and which means "authenticated but not permitted"? (Mind the naming irony.)
> [!answer]- reveal
> **`401 Unauthorized` = not *authenticated*** (misnamed — it really means "unauthenticated"; missing/invalid credentials). **`403 Forbidden` = authenticated but not *authorized*** (known user, insufficient rights). See [[403 Bug]].

5. Where does authentication's *result* live so the authorization step can read it later in the same request?
> [!answer]- reveal
> In the **`SecurityContext`** (via `SecurityContextHolder`). The authorization check pulls the `Authentication` and its authorities from there.

6. **Interleaving** — label each AuthN or AuthZ: (a) checking a JWT's signature and expiry · (b) `@PreAuthorize("hasRole('ADMIN')")` · (c) comparing a submitted password to a stored hash · (d) an admin-only endpoint rejecting a logged-in *basic* user.
> [!answer]- reveal
> (a) **AuthN** · (b) **AuthZ** · (c) **AuthN** · (d) **AuthZ**.

## Reconstruct Drill

**Task (blank page):** from memory, fill a two-column table — **Authentication | Authorization** — across these rows: *question it answers · when it runs · Spring component · HTTP failure code · one concrete example.*

**Success criterion:** every cell correct, and `401`/`403` **not** swapped.

> [!answer]- filled table — check only after your attempt
> | Row | Authentication | Authorization |
> |---|---|---|
> | Question | "Who are you?" | "What may you do?" |
> | When | First | After authentication |
> | Spring component | `AuthenticationManager`/`ProviderManager` | authz filter / `@PreAuthorize` (`AuthorizationManager`) |
> | Failure code | `401 Unauthorized` (really *unauthenticated*) | `403 Forbidden` |
> | Example | password / JWT check | role-gated `/admin` endpoint |

## Correctness Check

Ran the Spring `_refiner` checklist:

- ✅ **`401` vs `403` semantics** — `401` = unauthenticated (missing/invalid credentials), `403` = authenticated but forbidden. High confidence; the RFC's label "Unauthorized" for `401` is the source of the confusion, so I flagged the irony rather than hiding it.
- ✅ **Spring mapping** — AuthN via `AuthenticationManager`; AuthZ via authorization filter / method security. Consistent with [[Spring Security Authentication Flow]].
- ➖ **Bean scope / DI / `@Transactional`** — N/A (pure concept, no container-lifecycle code).
- ➖ Access-control *strategies* (RBAC vs ABAC) are an **authorization** sub-topic from the same slides — deliberately **not folded here** to keep this atomic; see backlog link.

## Flashcards

#flashcards/spring/security

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Retrieval Prompts 1, 2, 3, 4 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

FeedApp demonstrates both live: the login endpoint is **authentication**; a role-protected endpoint returning `403` to a basic user is **authorization**. When you wire role-gating, a good git TIL is *"401 vs 403 in Spring Security: unauthenticated vs forbidden,"* linking the config commit. Pointer only — don't copy code here.

## Links

- AuthN in detail: [[Spring Security Authentication Flow]]
- Enforced by: [[Spring Security Filter Chain]] — different filters do AuthN vs AuthZ
- Seen in practice: [[403 Bug]] — a real `403` (authorized-but-forbidden) case in Postman
- Map: [[Spring MOC]]
- Backlog (forward-link): [[RBAC vs ABAC]] — role- vs attribute-based access control (an authorization strategy)

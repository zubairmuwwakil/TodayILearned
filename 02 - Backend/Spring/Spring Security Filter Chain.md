---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Spring Security Filter Chain
  - SecurityFilterChain
  - FilterChainProxy
  - DelegatingFilterProxy
  - Servlet Filter
  - Security Filters
  - Spring Security Filters
tags:
  - spring
  - spring-security
  - servlet
  - filters
  - security
  - concepts
---

# Spring Security Filter Chain

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Owns the servlet-FILTER mechanism (the security perimeter). The auth hand-offs live in [[Spring Security Authentication Flow]] — one home each, linked not duplicated. Test surface, not a reference. %%

## Big Picture (read once, then cover)

Scope: **where** Spring Security sits in the request path and **how** it gets there — the servlet-filter layer in front of your app. The verification that happens *inside* one of these filters is a separate note ([[Spring Security Authentication Flow]]).

Test surface below — answer closed-book, then reconstruct the path from a blank page. Key is collapsed in the Reconstruct Drill.

## Retrieval Prompts

1. Your `@Controller` never runs until the request has passed through something first. What is that "something," and does it live in Spring MVC or the servlet container? (why: placement)
> [!answer]- reveal
> A chain of servlet **`Filter`s** (the security filter chain), running in the **servlet container**, *before* Spring MVC's `DispatcherServlet` dispatches to your controller. That placement is *why* security can reject a request before your code ever sees it.

2. Does Spring Security create its own servlets? If not, how does it get into the request path?
> [!answer]- reveal
> **No.** It **inserts filters**. A container-registered filter, **`DelegatingFilterProxy`** (default bean name `springSecurityFilterChain`), delegates into the Spring context to **`FilterChainProxy`**, which runs the security filters. Spring Security never owns the servlet itself.

3. Each filter makes one decision about the request. What are its two options, and which method call means "pass it on"?
> [!answer]- reveal
> Either **pass** the request to the next filter — `chain.doFilter(request, response)` — or **halt** it (respond `401`/`403`, or redirect to login) by *not* calling `doFilter`.

4. `FilterChainProxy` can hold several `SecurityFilterChain`s. For one request, how many run, and how is the winner chosen? (common gotcha)
> [!answer]- reveal
> **Exactly one** — the **first** `SecurityFilterChain` whose `RequestMatcher` matches the request. The rest are skipped entirely. So chain **order and matchers** decide which rules apply.

5. *Why* does the **order** of filters within a chain matter?
> [!answer]- reveal
> Filters depend on each other: the **authentication** filter must run *before* the **authorization** filter (you can't decide "what may this user do" before establishing "who is this user"), and CSRF / header / exception filters sit at defined positions. Wrong order ⇒ broken or insecure behaviour.

6. What *is* a **servlet**, precisely — including its lifecycle? (corrects a common misconception)
> [!answer]- reveal
> A Java class that handles HTTP requests. It is **initialized once**, then serves **many** requests (often concurrently), and is **destroyed only at shutdown** — *not* created and destroyed per request.

7. **Contrast:** a servlet `Filter` vs a Spring MVC `HandlerInterceptor` — which does Spring Security use, and why?
> [!answer]- reveal
> A servlet **`Filter`**. It runs in the container *before* `DispatcherServlet`, so security wraps the **entire** request (every endpoint, including error dispatches and non-MVC routes). A `HandlerInterceptor` runs later, *inside* MVC after dispatch — too late to be the security perimeter.

## Reconstruct Drill

**Task (blank page):** trace a request from the servlet container to your controller through Spring Security's filter integration. Name the container filter, the Spring bean it delegates to, how the applicable chain is chosen, what each filter can do, and where the authentication filter sits relative to the authorization filter.

**Success criterion:** your trace names every hop in the key below and puts authentication *before* authorization.

> [!answer]- canonical path — check only after your attempt
> request → container filters → **`DelegatingFilterProxy`** (`springSecurityFilterChain`)
> → **`FilterChainProxy`**
> → selects the **first** matching **`SecurityFilterChain`** (by `RequestMatcher`)
> → runs that chain's **ordered** filters; each either `chain.doFilter(...)` (pass) or **halts** (`401`/`403`/redirect)
> → authentication filter runs **before** authorization filter
> → if all pass → `DispatcherServlet` → your `@Controller`.

## Correctness Check

Ran the Spring `_refiner` checklist:

- ✅ **Bean scope** — `FilterChainProxy` and the individual filters are container **singletons**; per-request identity is not stored in them (it goes to the `SecurityContext`).
- ✅ **Dependency injection** — filters are Spring beans, constructor-wired; `DelegatingFilterProxy` is the bridge from the container to the DI context.
- ➖ **`@Transactional` proxy** — N/A here.
- ⚠ **"First matching chain only" (~92%)** — confident this is the `FilterChainProxy` contract (only the first matched `SecurityFilterChain` executes), but verify if your course shows multiple chains.
- ⚠ **Default bean name `springSecurityFilterChain` (~90%)** — that's the Boot-registered `DelegatingFilterProxy` target name; low stakes if slightly off.
- Reused slide correction: the **servlet lifecycle** (many requests between init and destroy, not one).

## Flashcards

#flashcards/spring/security

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 2, 3, 4, 6, 7 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable when you build it: FeedApp's `JwtAuthorizationFilter` is a **custom filter you add to this chain** (typically extending `OncePerRequestFilter`). When it works, commit it and log a git TIL that **links the commit** — e.g. *"Added a JWT filter to Spring Security's chain; it sets the SecurityContext before authorization runs."* Don't copy the code here.

## Links

- Triggers: [[Spring Security Authentication Flow]] — the auth filter kicks that off
- Distinction: [[Authentication vs Authorization]] — enforced by *different* filters in this chain
- Sits in front of: [[Spring MVC]] — `DispatcherServlet` runs only after the filters pass (backlog)
- Map: [[Spring MOC]]
- Backlog (forward-link): [[teachback jwt]] — the token filter you add to this chain

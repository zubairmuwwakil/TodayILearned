---
type: concept
topic: spring
status: learning
difficulty: hard
aliases:
  - Spring Security Authentication Flow
  - Spring Security Architecture
  - Spring Security Auth Flow
  - AuthenticationManager
  - ProviderManager
  - AuthenticationProvider
  - DaoAuthenticationProvider
  - UserDetailsService
  - UserDetails
  - SecurityContext
  - SecurityContextHolder
tags:
  - spring
  - spring-security
  - authentication
  - security
  - concepts
---

# Spring Security Authentication Flow

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Absorbs the slide's "main Spring Security classes" as ROLES in one flow (AuthenticationManager, ProviderManager, AuthenticationProvider, UserDetailsService, UserDetails, SecurityContext) — one home, not a stub note per class. Test surface, not a reference. %%

## Big Picture (read once, then cover)

Scope: the **username/password authentication** path — from the request hitting the security filters to the verified identity being parked for the rest of the request. (Token/JWT login is a *different* path handled by a custom filter — see Links.)

Everything below is a **test surface**. Answer the prompts closed-book first; the full component-by-component flow is the **collapsed key** in the Reconstruct Drill. Don't peek until you've attempted it from a blank page.

## Retrieval Prompts

1. When a login request arrives, *where* does Spring Security intercept it relative to your `@Controller`s, and what is that interceptor made of?
> [!answer]- reveal
> **Before** your controllers, down in the servlet layer — a `SecurityFilterChain`, an ordered chain of servlet `Filter`s. Each filter is a gate; one of them is the authentication filter. Mechanism lives in [[Spring Security Filter Chain]].

2. The authentication filter now holds the raw username + password. What object does it build, and is that object authenticated yet?
> [!answer]- reveal
> An **`Authentication`** — for form login a **`UsernamePasswordAuthenticationToken`** — carrying the principal + credentials, initially **unauthenticated** (`isAuthenticated() == false`).

3. That token is handed to the `AuthenticationManager`. What is its standard implementation, and *how* does it choose which component authenticates the token?
> [!answer]- reveal
> **`ProviderManager`**. It walks an ordered list of **`AuthenticationProvider`s**, calling `supports(tokenType)`, and delegates to the first provider that supports this token type.

4. For a username/password token, which provider handles it, and what **two** collaborators does it use to verify the credentials?
> [!answer]- reveal
> **`DaoAuthenticationProvider`**. It uses a **`UserDetailsService`** (load the stored user) and a **`PasswordEncoder`** (compare the presented *raw* password against the stored **encoded** one).

5. *Why* does `UserDetailsService` return a `UserDetails` instead of your JPA `User` entity directly? (design)
> [!answer]- reveal
> **Decoupling.** `UserDetails` exposes exactly what auth needs — username, encoded password, authorities, account-status flags — so Spring Security never depends on your domain model. In FeedApp you adapt the entity to it (a `CustomUserDetails`).

6. Authentication succeeds. How does the *rest* of the request — your controller, method security — know *who* the user is?
> [!answer]- reveal
> The fully-authenticated `Authentication` is stored in the **`SecurityContext`**, held by **`SecurityContextHolder`** (a `ThreadLocal` by default). `getAuthentication()` reads it back for the request's lifecycle; the filter set it with `setAuthentication(...)`.

7. The slide says a *"DecisionManager makes the final decision"* as the last step of the `AuthenticationManager`. What's the error, and which component actually makes that decision?
> [!answer]- reveal
> It **conflates authentication with authorization.** Authentication *ends* when `ProviderManager` returns an authenticated `Authentication`. **Authorization** ("may this user reach this resource?") is a **separate, later** step done by an `AuthorizationManager` (modern) / `AccessDecisionManager` (legacy, deprecated) — run by an authorization filter or method security, not by the `AuthenticationManager`. See [[Authentication vs Authorization]].

8. **Interleaving** — match each responsibility to its component: (a) compares the password · (b) loads the user record · (c) holds the current user for the request · (d) iterates providers until one fits · (e) builds the initial *unauthenticated* token.
> [!answer]- reveal
> (a) `DaoAuthenticationProvider` via `PasswordEncoder` · (b) `UserDetailsService` · (c) `SecurityContext` / `SecurityContextHolder` · (d) `ProviderManager` · (e) the authentication filter (e.g. `UsernamePasswordAuthenticationFilter`).

## Reconstruct Drill

**Task (blank page):** redraw the **username/password authentication** flow. Name every component and every hand-off, in order, from the request hitting the security filters to the verified user being available to your controller. Explicitly mark **where authentication ends**, and note that **authorization is not part of this flow**.

**Success criterion:** your diagram names every hand-off in the key below *and* places the authentication/authorization boundary correctly — and contains **no "DecisionManager"** inside the authentication path.

> [!answer]- canonical flow — check only after your attempt
> `SecurityFilterChain`
> → authentication filter builds `UsernamePasswordAuthenticationToken` (unauthenticated)
> → `AuthenticationManager` (**= `ProviderManager`**)
> → iterates `AuthenticationProvider`s via `supports()`
> → `DaoAuthenticationProvider`
> → `UserDetailsService.loadUserByUsername()` → returns `UserDetails` (encoded password + authorities)
> → `PasswordEncoder.matches(raw, encoded)`
> → on success returns a **fully-authenticated `Authentication`** (authorities populated, credentials erased)
> → filter stores it: `SecurityContextHolder.getContext().setAuthentication(auth)`
> → **authentication ends here.** Authorization is a *separate, later* step (`AuthorizationManager` / legacy `AccessDecisionManager`).

## Correctness Check

Ran the Spring `_refiner` checklist against this note:

- ✅ **Bean scope** — `UserDetailsService`, `PasswordEncoder`, and the providers are container **singletons** (shared across all requests). The *per-request* identity is NOT held in those beans — it lives in the `SecurityContext` (`ThreadLocal`). Naming this avoids the "where's the current user stored?" trap.
- ✅ **Dependency injection** — the collaborators are constructor-wired beans (e.g. `DaoAuthenticationProvider` receives its `UserDetailsService` + `PasswordEncoder`). Ties to [[IoC and Dependency Injection]].
- ➖ **`@Transactional` proxy** — N/A (no transactional boundary in this flow).
- ⚠ **Annotation / config drift (~85%)** — modern Spring Security (6.x) configures this with a `@Bean SecurityFilterChain` in a `@Configuration` class; the older `WebSecurityConfigurerAdapter` is **removed**, and `AuthenticationManagerBuilder` is the legacy helper. FeedApp's course may still use the older style — **verify against your Spring Security version.**
- ⚠ **Legacy vs modern naming (~90%)** — `AccessDecisionManager` was **deprecated in favour of `AuthorizationManager`** in Spring Security 6. I've named both; confirm which your course uses.
- Corrected from the slides → notes: (1) it was **Spring Security** (from *Acegi Security*), not "Spring Boot," that entered the Spring portfolio (~2007–08); Spring Boot didn't exist until 2014. (2) `UserDetails` is an **interface**, not a class. (3) A servlet is init'd once and serves **many** concurrent requests before destroy — not one-and-done. (4) The "DecisionManager" fix above.

## Flashcards

#flashcards/spring/security

What does `HttpSecurity` configure?
?
Per-request HTTP security — URL authorization rules, the filter chain, security headers, CORS/CSRF, and form login/logout.

%% Deduped 2026-08-14 red-line sweep: 6 cards restating Retrieval Prompts 3, 4, 5, 6, 7 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable when you build it: FeedApp's `CustomUserDetailsService` + `WebSecurityConfig` turn this flow into running code. Commit them to the FeedApp repo and log a dated git TIL that **links the commit** — e.g. *"Wired Spring Security's username/password flow: UserDetailsService + PasswordEncoder."* Don't copy that code here — Obsidian remembers the *flow*, git shows the *doing*.

## Links

- Mechanism: [[Spring Security Filter Chain]] — the servlet-filter layer this flow is triggered from
- Distinction: [[Authentication vs Authorization]] — the boundary this note corrects
- Related: [[IoC and Dependency Injection]] — the providers/services are DI-wired beans
- Map: [[Spring MOC]]
- Backlog (forward-link, not yet written): [[JWT]] — FeedApp's token path, handled by a custom filter that sets the `SecurityContext` directly

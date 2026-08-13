---
type: concept
topic: design-principles
status: learning
difficulty: medium
aliases:
  - Front Controller Pattern
  - Front Controller
  - Dispatcher
tags:
  - java
  - design-principles
  - design-patterns
  - architecture
---

# Front Controller Pattern

%% Graduated via [[Refiner Spec (Graduate)]] using Java/_refiner.md. Architecture material with little code — per the Graduate prompt this is weighted toward retrieval prompts and a reconstruct-from-memory drill rather than a code trace. %%

## What it is

An architectural pattern that funnels **every** incoming request through a **single handler** before anything else runs. That handler performs the work common to all requests, then hands off to whichever specific handler should do the real job.

Three parts: the **Front Controller** (the one entry point), the **Dispatcher** (chooses and invokes the right handler), and the **View** (what eventually gets rendered back).

## Why it matters

Cross-cutting concerns — authentication, authorization, logging, request tracking, error handling — get applied **once, in one place**, instead of being copy-pasted into every handler and forgotten in exactly the one that mattered. It's also the only practical place to enforce something globally.

## Syntax / Pattern

```
ALL requests → Front Controller → [auth · logging · error handling]
                     → Dispatcher → the right handler → View → response
```

## Worked Example

```java
// 1. THE DISPATCHER — knows the routing table, nothing else
class Dispatcher {
    void dispatch(String request) {
        if ("student".equals(request)) new StudentView().show();
        else                            new HomeView().show();
    }
}

// 2. THE FRONT CONTROLLER — the single door. Common work happens HERE, once.
class FrontController {
    private final Dispatcher dispatcher = new Dispatcher();

    private boolean isAuthenticUser() {
        System.out.println("User verified");
        return true;
    }
    private void trackRequest(String request) {
        System.out.println("Request: " + request);
    }

    void handleRequest(String request) {
        trackRequest(request);                       // 3. every request is logged
        if (isAuthenticUser()) {                     // 4. every request is checked
            dispatcher.dispatch(request);            // 5. only then does routing happen
        }
    }
}
```

**Explain in plain English (EiPE):** no request can reach a handler without first passing the logging and authentication that live in the one entry point.

## Retrieval Prompts

1. What is the *structural* guarantee a front controller gives you that a convention like "remember to call `checkAuth()` in every handler" cannot?
> [!answer]- reveal
> **It cannot be forgotten.** A convention is enforced by discipline and fails silently the first time someone adds a handler and skips the call. A front controller makes the check part of the **only path that exists** — there is no route to a handler that bypasses it.

2. Front Controller and Dispatcher are listed as separate parts. Why split them rather than let the front controller route directly?
> [!answer]- reveal
> **Different jobs, different reasons to change.** The front controller owns *what happens to every request*; the dispatcher owns *which handler gets this one*. Adding a route shouldn't mean editing the authentication code, and vice versa — single responsibility at the component level.

3. Where have you already met this pattern in Spring, and what plays each of the three roles?
> [!answer]- reveal
> **`DispatcherServlet` is the front controller** — every HTTP request enters through it. **`HandlerMapping`** plays the dispatcher role (choosing the controller method), and the **View** (resolved by `ViewResolver`) is the third part. This is why the class is literally named *Dispatcher*Servlet. See [[Spring MVC]].

4. *Interleaving:* Front Controller vs [[Proxy Pattern]] — both intercept. What's the difference in what they stand in front of?
> [!answer]- reveal
> A **proxy** stands in front of **one object**, implementing its interface so callers can't tell. A **front controller** stands in front of **the entire request-handling subsystem** and doesn't impersonate any single handler. Proxy = object-level interception; front controller = application-entry-level.

5. What's the cost of this pattern — what does making one component see every request buy you *problems* with?
> [!answer]- reveal
> It's a **single point of failure and a bottleneck**: a bug or a slow check there degrades every request in the application, and the class tends to accumulate responsibilities until it becomes the thing nobody wants to touch. (Spring's answer is a *chain* of filters rather than one fat method — see [[Spring Security Filter Chain]].)

## Rebuild Drill

From a **blank page**, draw the flow of two different requests — `/student` and `/home` — through a front controller architecture. Label every component, every arrow, and mark clearly **where** logging and authentication happen.

**Success criteria:** both requests enter at the **same** component; logging and auth appear **once**, before any routing, on the shared path; the dispatcher is a **separate** box from the front controller; the two paths diverge only *after* the dispatcher; and both responses exit back through the front controller. Then name, in one line, the Spring class that plays this role.

## Common Mistakes

- **Putting the routing table inside the front controller** → merges two responsibilities; every new route now edits the security-critical class.
- **Thinking "one entry point" means "one handler"** → there are many handlers; there's one *door*.
- **Doing per-request work in the front controller that only some requests need** → everything pays for the slowest check. Push request-specific work into the handler.

## Recall Questions

#flashcards/java/design-patterns

What does a front controller guarantee that a "always call checkAuth() first" convention cannot?
?
That the check cannot be skipped — it's on the only path that reaches any handler, rather than depending on every developer remembering it.

Why separate the Dispatcher from the Front Controller?
?
They change for different reasons: the front controller owns what happens to every request, the dispatcher owns which handler serves this one. Adding a route shouldn't touch the auth code.

Which Spring class is the front controller, and what tells you so from its name?
?
DispatcherServlet — every HTTP request enters through it, and the name reflects that it dispatches each request to the right handler.

What is the main cost of the front controller pattern?
?
It's a single point of failure and a bottleneck — every request pays for whatever it does, and the class tends to accumulate responsibilities.

## Mini Practice

1. Build the `FrontController` / `Dispatcher` / two-view example from a blank file. **Expected output** for `handleRequest("student")`: `Request: student`, `User verified`, then the student view's line.
2. Add a third route **without editing `FrontController`**. **Success criterion:** only `Dispatcher` and the new view class change — which is the proof that the split in prompt 2 was worth making.

## Correctness Check

Ran the Java checklist from `Java/_refiner.md`:

- ✅ **Compiles** — assumes `StudentView` and `HomeView` each expose a no-arg `show()`; `"student".equals(request)` is null-safe by putting the literal first.
- ✅ **`==` vs `.equals()`** — `String` comparison uses `.equals()`, **not** `==`. Deliberate: `==` would compare references and fail for a runtime-built string.
- ➖ **Overloading / autobox cache** — N/A.
- ✅ **Spring mapping verified** — `DispatcherServlet` is Spring's front controller; `HandlerMapping` performs handler selection. Consistent with [[Spring MVC]] and not duplicated here.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Spring's implementation: [[Spring MVC]] · [[Spring Security Filter Chain]]
- Composed with: [[MVC Pattern]]
- Contrast: [[Proxy Pattern]] — object-level vs entry-level interception
- Map: [[Design Principles MOC]]

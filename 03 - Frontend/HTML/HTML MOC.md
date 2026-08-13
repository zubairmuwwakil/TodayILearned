---
type: moc
topic: html
aliases:
  - HTML MOC
  - HTML Map
  - Frontend HTML
tags:
  - html
  - frontend
  - moc
---

# HTML MOC

> [!info] What this map is for
> HTML's atomic notes each answer a different question, and reviewing them in isolation hides how they interlock — the same `id` that labels a form field is the thing a fragment link jumps to, and the reason a `<button>` beats a `<div>` is the same reason `<nav>` beats `<div>`. This map pulls them into one theme so you can review them **together**. It holds **links only** — every fact still lives in exactly one note.

## The mental model

HTML answers **"what is this?"** — not what it looks like (CSS) and not what it does (JS). Every trap in this folder comes from that one idea being violated in a different direction:

- Use a `<div>` where meaning was needed → the page renders, and assistive tech is blind to it.
- Use a `<table>` for layout → the page renders, and AT announces structure that doesn't exist.
- Reach for `id` where `class` belonged → the page renders, and your CSS becomes unoverridable.
- Omit `name` on a form control → the page renders, and the data never arrives.

**The through-line: HTML fails silently.** The browser recovers from almost anything, so "it looked right in Chrome" is never evidence. That's why every drill in this folder ends with an *observable* check — a validator, a query string, a Lighthouse score, an unplugged mouse.

## Core notes

- [[Semantic HTML and Page Structure]] — which element means what; landmarks; why `<div>` is a last resort
- [[HTML Accessibility Essentials]] — the contract beyond structure: names, roles, focus, `alt`, `lang`
- [[HTML Forms and Label Association]] — `for`/`id`/`name`; what actually submits; validation is not security
- [[The HTML head and Page Metadata]] — charset, viewport, `base`, script loading; the parts no user sees

## Cross-cutting mechanics

- [[HTML class and id Attributes]] — the two hooks everything else hangs on (styling, linking, labelling, scripting)
- [[Block and Inline Elements]] — the default `display` values you inherit before writing any CSS

## Where this connects outward

- [[Get vs Post]] — what a form's `method` changes on the wire
- [[XML and JSON]] — same angle-bracket, paired-tag ancestry; stricter rules
- [[MVC Pattern]] — HTML is the View; the "which region" instinct is the same one
- [[Spring MVC]] — the server that revalidates everything your form claims

## Backlog — not yet graduated

Deliberate calls from the Day 27 triage, not oversights:

- **Tables** (`caption`/`thead`/`tbody`/`colspan`) — *deferred*: already built in the Day 27 capture and mostly lookup-shaped. The layout-table antipattern is covered in [[HTML Accessibility Essentials]]
- **Document structure & void tags** — *deferred*: covered by muscle memory; the rules live in the folder's `_refiner.md` checklist
- **Text-level semantics** (`sup`/`sub`/`hr`/`br`) — *skipped*: fails the 5-minute rule. The one part that mattered — `<strong>`/`<em>` meaning vs `<b>`/`<i>` appearance — is a card in [[HTML Accessibility Essentials]]
- **CSS** — has **no `_refiner.md` yet**. Create one per the *Adding a new domain* section of [[Refiner Spec (Graduate)]] before graduating any CSS material; don't borrow this one
- Forward-links awaiting notes: `CSS Selectors` · `CSS Box Model` · `CSS Flexbox`

## Interleave check (mix these, don't study in a block)

Answer without peeking, then open the note that owns each one:

1. A field is labelled correctly, focusable, and its value never reaches the server. What's missing — and which note owns that fact?
2. `width: 200px` works on one of `<div>` / `<span>` / `<img>` and not another. Which, and why is `<img>` the odd one out?
3. Your CSS rule and your `#jump` link both silently fail. What's the single first thing to check?
4. Which of these becomes a screen-reader landmark on its own: `<nav>`, `<section>`, `<main>`, `<footer>`?
5. You click a `<button>` inside a `<form>` and the page reloads. Why?
6. Two of these are obsolete in HTML5: `cellpadding`, `colspan`, `valign`, `caption`. Which two, and what replaced them?
7. When is `alt=""` the *correct* answer, and how does it differ from leaving `alt` off?

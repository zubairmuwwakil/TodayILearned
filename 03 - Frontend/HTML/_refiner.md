---
type: refiner-config
domain: html
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# HTML — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for HTML lives here.** All shared machinery and rules are in the spec.

> **Scope.** Document structure, semantic elements, forms, tables, attributes, and accessibility. Anything about *appearance* (colour, spacing, layout, responsiveness) belongs to CSS; anything about *behaviour in the browser* belongs to JavaScript/React. Link across, never duplicate.
>
> **Why this exists:** the routing table in [[Graduate — Agent Prompt]] sends `React / HTML / CSS` to the React config, but that config's target folder and checklist (rules of hooks, `key` props, effect deps) cannot be run against markup. HTML gets its own config; the routing line should be updated to match.

- **Target folder:** `50 Resources/Software Engineering/03 - Frontend/HTML/`
- **Flashcard tag:** `#flashcards/html/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

## Correctness checklist (HTML)

Run against every graduated HTML note (spec step ④). HTML's failure mode is unique: **it renders fine and is still wrong.** The browser silently recovers from almost anything, so "it looked right" proves nothing. These are the traps that survive a clean-looking page:

- [ ] **Semantic element for the job** — `<button>` not a clickable `<div>`; `<nav>`/`<main>`/`<header>` not generic containers. A `div` with `onclick` is **not keyboard-focusable** and is **not announced as a control**. `<div>`/`<span>` are the last resort, not the default.
- [ ] **One `<main>` per document**, and it must **not** be nested inside `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`.
- [ ] **Label association** — every input has a `<label for="…">` matching the input's **`id`**. `name` is what gets **sent to the server**; `id` is what `for` **targets**. They are not interchangeable, and `placeholder` is **not** a label.
- [ ] **`alt` describes function, not filename** — decorative images take `alt=""` (**empty, not missing**; a missing `alt` may make AT read out the file name).
- [ ] **`head` vs `header` vs `h1`** — metadata container vs page-region element vs heading level. Never used interchangeably. Heading levels don't skip.
- [ ] **No obsolete presentational attributes** — `cellpadding`, `cellspacing`, `valign`, `align`, `width` on tables/cells are **non-conforming in HTML5**; layout belongs in CSS. Tables are for **data**, never for layout.
- [ ] **Escaping** — `<` and `&` must be escaped in text content (`&lt;`, `&amp;`); `>` is tolerated but `&gt;` is safer. HTML comments are `<!-- -->` — **never** `//` or `/* */`, which render as visible text.
- [ ] **Void vs paired tags** — `<img>`, `<br>`, `<hr>`, `<input>`, `<link>`, `<meta>` take no closing tag; everything else must be closed and properly nested.

## Links

- Machinery: [[Refiner Spec (Graduate)]]
- Contract: [[AI Operating Manual (READ ME)]]

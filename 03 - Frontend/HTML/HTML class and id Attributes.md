---
type: concept
topic: html
status: learning
difficulty: easy
aliases:
  - class vs id
  - class attribute
  - id attribute
  - HTML Attributes
  - Fragment Links
  - Anchor Links
tags:
  - html
  - frontend
  - attributes
  - concepts
---

# HTML class and id Attributes

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference. Treated as NEW — no attribute material in the Day 27 capture. Small note on purpose: it is trap-dense rather than large, and it is load-bearing for CSS next week. %%

## Worked Example

Attributes are **key–value pairs written inside the opening tag**. `class` and `id` are the two you'll reach for constantly, and they are not interchangeable.

```html
<!-- 1. id: UNIQUE in the document. One element, one id. Doubles as a link target. -->
<section id="pricing">

  <!-- 2. class: REUSABLE. Space-separated list — this element has three. -->
  <article class="card card--featured is-visible">
    <h3>Pro plan</h3>
  </article>

  <!-- 3. same class, different element: that's the point of a class -->
  <article class="card">
    <h3>Free plan</h3>
  </article>
</section>

<!-- 4. the id above is what makes this in-page jump work -->
<a href="#pricing">Jump to pricing</a>
```

**Explain in plain English (EiPE):** `class` says *"this element is one of a kind of thing"*; `id` says *"this element is that specific thing"* — and only the second one can be a navigation target.

| | `class` | `id` |
|---|---|---|
| How many per element | many (space-separated) | one |
| How many per document | unlimited reuse | **must be unique** |
| Typical job | shared styling, grouped JS targeting | one-off styling, **link target**, label `for`, JS lookup |
| CSS selector | `.card` | `#pricing` |
| Case-sensitive? | **yes** | **yes** |

## Retrieval Prompts

1. Your CSS isn't applying and your in-page links aren't jumping. The lesson names **one thing to check first**. What, and why is it such a common miss?
> [!answer]- reveal
> **Capitalisation.** Both `class` and `id` values are **case-sensitive** — `class="navBar"` is not matched by `.navbar`, and `href="#Pricing"` will not find `id="pricing"`. It's a frequent miss because HTML is forgiving almost everywhere else (tag names and attribute *names* are case-insensitive), so the strictness here is inconsistent with your expectations.

2. Nothing stops you writing the same `id` on two elements — the page renders. What actually goes wrong?
> [!answer]- reveal
> It's **invalid HTML**, and everything that resolves an id resolves **only the first match**: `document.getElementById()` returns the first, a `#fragment` link scrolls to the first, and a `<label for="…">` associates with the first. The second element becomes silently unreachable by id — a bug with no error message. (CSS `#id` selectors will still *style* both in practice, which makes the inconsistency worse, not better.)

3. `href="#top"` is described as a special case. What's special about it, and how does that differ from every other fragment link?
> [!answer]- reveal
> Every other fragment (`#pricing`) requires a matching `id` on the page or the link does nothing. `#top` — and the empty fragment `#` — are **defined by the spec to scroll to the top of the document** with no `id` required. So it's the one fragment link you can write without adding anything to the markup.

4. You need to style all your buttons consistently *and* scroll-link to one specific section. Which attribute for which, and what's the reasoning — not just the convention?
> [!answer]- reveal
> `class` for the buttons, `id` for the section. The reasoning is **cardinality**: shared styling is inherently a one-to-many relationship, and `class` is the only one that can be applied many times. A link target is inherently one-to-one — the browser has to resolve it to exactly one element, which is precisely the uniqueness constraint `id` enforces. Match the attribute's cardinality to the job's.

5. Interleaving (forward — you'll meet this in CSS): if an element matches both a `.card` rule and a `#pricing` rule that set the same property, which wins? Predict now, verify when you get to CSS.
> [!answer]- reveal
> The **`id`** rule wins. CSS specificity ranks id selectors (0,1,0,0) above class selectors (0,0,1,0), regardless of source order. This is *why* over-using `id` for styling is discouraged — it creates rules that are hard to override later, forcing escalation. Style with classes; reserve `id` for identity.

## Rebuild Drill

**Blank-file task.** From an empty `index.html`, build a single-page FAQ with a working "jump to section" menu.

Requirements:
- an `<h1>` and a `<nav>` containing **four** links
- **four** `<section>`s, each with an `<h2>` and a paragraph
- clicking any nav link scrolls to its section; a final "Back to top" link at the bottom of each section
- all four sections share a class for styling; give one of them a second class as well
- the "Back to top" links must work **without adding any `id` to do it**

**Success criteria:**
1. All four jump links work, and all four "Back to top" links work.
2. Paste into the [W3C validator](https://validator.w3.org/nu/) → **zero errors** (this is what catches a duplicated `id`).
3. Deliberately break one link by changing only the **capitalisation** of the fragment. Predict what happens, then confirm — that's the failure mode you're inoculating against.

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **Escaping / comments** — `<!-- -->` only.
- ✅ **Void vs paired tags** — no void tags misused in the example.
- ✅ **Label association** — `id` correctly identified as `for`'s target (cross-referenced, not restated).
- ✅ **Semantic element for the job** — `<section>`/`<article>` used correctly in the example rather than `<div>`.
- ✅ **Mentally parsed** — the worked example is well-formed; the `#pricing` link resolves to the `<section id="pricing">` above it.
- **Verified specifically:** `#top`/empty-fragment behaviour is spec-defined and does not require an `id` — the slide's claim is **correct**, checked because it sounded like folklore.

**Note on the raw slides:** the deck says quoting attribute values is "generally a good idea" and optional in some cases. True but under-sold — unquoted values break on any whitespace and on several characters, so treat quotes as **mandatory**, not stylistic. Every linter and formatter will add them regardless.

⚠ **Below 90% — spot-check:** browsers' *practical* handling of duplicate `id`s in CSS selector matching varies a little by engine. The spec-level rule (invalid; id-resolution APIs return the first match) is solid; the exact rendering behaviour of a duplicated id under a `#id` CSS rule is the part I'd verify in DevTools before relying on it.

## Flashcards

#flashcards/html/attributes

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 2, 3, 4, 5 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Not showable on its own — this is a building block. It'll ride along in the FAQ page from the drill if you push that.

## Links

- Map: [[HTML MOC]]
- Elements these attributes hang on: [[Semantic HTML and Page Structure]]
- `id` as `label for` target: [[HTML Accessibility Essentials]]
- Where specificity is settled: forward-link to CSS Selectors *(unwritten — backlog)*
- Same key–value shape, stricter rules: [[XML and JSON]]

---
type: concept
topic: html
status: learning
difficulty: medium
aliases:
  - Accessibility
  - a11y
  - Web Accessibility
  - Screen Readers
  - alt text
  - ARIA
  - Accessible Forms
tags:
  - html
  - frontend
  - accessibility
  - a11y
  - concepts
---

# HTML Accessibility Essentials

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference. Treated as NEW — the Day 27 capture contains no accessibility material. Split from [[Semantic HTML and Page Structure]] on purpose: that note is WHICH element means what; this one is the contract beyond structure (names, focus, language). %%

## Worked Example

Four defects, each invisible in a browser. The page on the left renders perfectly and is unusable.

```html
<!-- ❌ BEFORE -->
<div class="btn" onclick="addToCart()">Add to cart</div>
<img src="hdph.jpg">
<input type="email" placeholder="Email">
<a href="/returns">Click here</a> for our returns policy.
```

```html
<!-- ✅ AFTER -->

<!-- 1. native control: focusable by Tab, fires on Enter AND Space, announced as "button" -->
<button type="button" onclick="addToCart()">Add to cart</button>

<!-- 2. alt describes what the image CONVEYS, not what the file is called -->
<img src="hdph.jpg" alt="Aura NC-100 headphones in matte black, earcups facing forward">

<!-- 3. a real label, tied by for → id; placeholder is a hint, never a name -->
<label for="email">Email address</label>
<input type="email" id="email" name="user_email" placeholder="you@example.com" required>

<!-- 4. link text that makes sense read out of context -->
See our <a href="/returns">returns policy</a>.
```

**Explain in plain English (EiPE):** each fix gives an element a **name** and a **role** that assistive technology can announce, and makes every interactive thing reachable **without a mouse**.

### The four antipatterns, and what each one actually breaks

| Antipattern | What breaks |
|---|---|
| **Generic containers** — `<div onclick>` as a button | Not in the tab order, no `button` role announced, Enter/Space do nothing |
| **"Click here"** links | Screen-reader users often tab link-to-link out of context; a list of "click here" is a list of nothing |
| **Silent images** — missing `alt` | AT may fall back to reading the **file name** (`hdph.jpg`) |
| **Floating inputs** — no `<label>` | The field is announced as "edit text, blank" — the user cannot tell what to type |

## Retrieval Prompts

1. `<div class="btn" onclick="doThing()">` and `<button onclick="doThing()">` both work when clicked. Name the **three** distinct things the `<div>` fails to do.
> [!answer]- reveal
> (i) **Not focusable** — it isn't in the tab order, so a keyboard-only user can never reach it (needs `tabindex="0"` to fake it).
> (ii) **No role** — AT announces the text but not that it's a control, so the user doesn't know it's actionable.
> (iii) **No keyboard activation** — a native `<button>` fires its click handler on **Enter and Space**; a `div` fires on neither, so you'd have to hand-write a `keydown` handler for both keys.
> That's three separate patches to reimplement what one tag gives free — which is the whole argument for native elements.

2. `for`, `id`, and `name` all appear on a labelled input. What does each one do? Which two are wired to each other?
> [!answer]- reveal
> `for` (on the `<label>`) targets an **`id`** — that pairing is what associates them, and clicking the label then focuses the input. `name` is unrelated to labelling: it is the **key sent to the server** in the request body / query string. Wire `for` ↔ `id`; `name` is for the backend. A `for` pointing at a `name` silently does nothing.

3. When is the correct `alt` value the **empty string**, and why is `alt=""` different from leaving `alt` off entirely?
> [!answer]- reveal
> Use `alt=""` for **purely decorative** images (spacers, flourishes, an icon whose meaning is already in adjacent text) — it tells AT to **skip the image**. Omitting `alt` is not the same: it leaves the image un-named, so AT may announce the **file name** or "unlabelled image." Empty = "deliberately nothing to say." Missing = "nobody thought about it."

4. Coding 3.4 has you write `<button>Add NC-100 to Cart</button>` *and* `<nav aria-label="Primary Site Links">`. One adds ARIA, one doesn't. What's the governing principle?
> [!answer]- reveal
> **The first rule of ARIA: don't use ARIA if a native element does the job.** `<button>` already has role, focus and keyboard behaviour — adding `role="button"` would be redundant. `aria-label` on `<nav>` adds something HTML *can't* express: a **name to distinguish multiple navs** (primary vs legal vs breadcrumb) in the landmark list. Use ARIA to add information, never to re-declare it.

5. Why does `<html lang="en">` matter to a screen-reader user? What goes wrong without it?
> [!answer]- reveal
> It selects the **pronunciation engine / voice**. Without it, AT falls back to the user's default language, so English content may be read with (say) Spanish phonetics — technically audible, practically incomprehensible. It also drives correct hyphenation and translation offers. One attribute, whole-document effect.

6. Interleaving — a design hands you an icon-only button showing a trash can. It's a real `<button>` and it's focusable. Is it accessible? What's still missing?
> [!answer]- reveal
> No — it has a **role** but no **accessible name**. The icon is a glyph or an SVG, so AT announces "button" with nothing else. Fix by giving it text: `aria-label="Delete item"` on the button, or visually-hidden text inside it. **Role and name are two separate requirements** — native elements give you the role free, but the name still has to come from somewhere.

## Rebuild Drill

**Blank-file task.** Refactor the snippet below for accessibility, from scratch, **without scrolling back up** and without looking at the "after" code in the slide deck.

*(This is deliberately not the WeatherApp snippet from class — you've already seen that answer, so re-doing it would be recognition, not recall.)*

```html
<div id="bar">
  <div class="brand">City Library</div>
  <div class="link" onclick="go('/search')">Search</div>
  <div class="link" onclick="go('/account')">My account</div>
</div>

<div class="page">
  <h1>New arrivals</h1>
  <h4>This month's featured titles</h4>
  <img src="cover-9781234.jpg">
  <p>Reserve a copy before they're gone. <a href="/reserve">Click here</a>.</p>
  <div class="cta" onclick="reserve()">Reserve</div>
</div>

<div class="bottom">
  <span>Get our newsletter:</span>
  <input type="text" placeholder="Email">
  <div class="btn" onclick="signup()">Go</div>
</div>
```

**Success criteria** (all five must hold):
1. **Zero** `<div>`s remain that should be a semantic region or a control.
2. Every interactive element is reachable and activatable **using only Tab and Enter** — unplug your mouse and prove it.
3. Every image has an `alt` you can defend: descriptive, or empty-and-decorative.
4. The email field has a real `<label>` tied by `for`/`id`, and the input `type` is corrected.
5. Heading levels don't skip — *there is a specific violation above; find it.*

Then check yourself: run the page through your browser's built-in accessibility audit (Chrome DevTools → Lighthouse → Accessibility, or Firefox → Accessibility panel → "Check for issues"). **Predict your score before you run it.**

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **Semantic element for the job** — the `div`-vs-`button` failure is decomposed into its three concrete mechanisms (prompt 1) rather than asserted.
- ✅ **Label association** — `for` ↔ `id` vs `name` distinguished explicitly (prompt 2); `placeholder` shown *alongside* a label, never instead of one.
- ✅ **`alt` describes function** — empty vs missing distinguished (prompt 3).
- ✅ **Escaping / comments** — `<!-- -->` throughout.
- ✅ **Void tags** — `<img>`, `<input>` written unpaired.
- ✅ **Mentally parsed** — both code blocks are well-formed; the "after" block validates.

**Errors corrected from the raw slides:**
- The deck teaches accessibility, then in **Coding 3.4** instructs a `<table>` for two-column **layout** with `cellpadding`/`cellspacing`/`valign`/`width`. Layout tables are a textbook antipattern (AT announces table structure for what is purely visual), and those attributes are obsolete in HTML5. Use CSS (`flex`/`grid`). **The exercise contradicts its own lesson** — worth raising with Aquib.
- The deck describes `<strong>` as "essentially make text bold" and `<em>` as styling. In HTML5 `<strong>` = **strong importance**, `<em>` = **stress emphasis**, `<b>`/`<i>` = stylistically offset with **no added meaning**. All four look the same by default; the difference is exactly what AT conveys — which makes it an accessibility point, not a styling one.
- Deck's "Before" snippet keeps `<div class="logo">` inside the fixed `<nav>` in its own "After" code — a leftover; a brand mark is usually a link home, and the logo arguably belongs in `<header>` rather than inside `<nav>`. Minor, but the "after" is not a perfect answer key.

⚠ **Below 90% — spot-check:** whether a given screen reader reads the **file name** for a missing `alt` is implementation-dependent (JAWS/NVDA/VoiceOver differ, and behaviour changes with version). The *rule* — always supply `alt`, empty when decorative — is not in doubt; the specific fallback behaviour is.

## Flashcards

#flashcards/html/accessibility

%% Deduped 2026-08-14 red-line sweep: 6 cards restating Retrieval Prompts 1, 2, 3, 4, 5, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

The refactored City Library snippet, plus its before/after Lighthouse accessibility scores, is a strong **TIL candidate** — "what four HTML changes moved an accessibility score from X to 100." Push code + screenshots to the public repo; link, don't copy.

## Links

- Map: [[HTML MOC]]
- Prerequisite: [[Semantic HTML and Page Structure]]
- Naming and targeting elements: [[HTML class and id Attributes]]
- Why an unstyled `<button>` looks cramped: [[Block and Inline Elements]]
- External: [The A11y Project](https://www.a11yproject.com/) · [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

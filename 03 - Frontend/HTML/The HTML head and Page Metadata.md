---
type: concept
topic: html
status: learning
difficulty: medium
aliases:
  - HTML head
  - head element
  - Page Metadata
  - meta charset
  - meta viewport
  - meta description
  - favicon
  - link rel
  - base tag
tags:
  - html
  - frontend
  - metadata
  - concepts
---

# The HTML head and Page Metadata

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference.
GATE: **already understood → worked example deliberately OMITTED.** The Day 27 capture already has a working `<head>` with `<title>`, `meta charset` and `meta name="viewport"`, plus correct explanations of the last two. What's new here is the *inventory* and the *ordering constraints* — reference-shaped material, so an annotated head block would be a page to reread, not a test surface. Prompts + an observable drill instead.
`head` vs `header` vs `h1` lives in [[Semantic HTML and Page Structure]] — linked, not restated. %%

## Retrieval Prompts

1. Nothing in `<head>` is painted to the screen. So what is it *for* — name three distinct jobs its children do, each with a different consumer.
> [!answer]- reveal
> (i) **Instruct the parser** — `charset` tells the browser how to decode the bytes into characters *before* it can render anything.
> (ii) **Pull in external resources** — `<link>` for stylesheets and the favicon, `<script>` for behaviour.
> (iii) **Describe the document to other machines** — `<title>` and `<meta name="description">` are consumed by tabs, bookmarks, search-result snippets and link previews, not by the page itself.
> Three different audiences: the parser, the network, and everything outside the page.

2. `<meta charset="utf-8">` has a placement rule that no other metadata has. What is it, and what's the reasoning behind it?
> [!answer]- reveal
> It must appear **within the first 1024 bytes** of the document. The reasoning is a chicken-and-egg: the parser can't turn bytes into characters until it knows the encoding, so it does a limited **prescan** of the opening bytes looking for the declaration. Find it late and the browser has to **throw away its work and re-parse** from the start with the right encoding. That's why it's conventionally the very first thing inside `<head>`.

3. You drop the viewport meta from a page that was fine on desktop. On a phone it now renders tiny and zoomed-out. What was that tag doing?
> [!answer]- reveal
> `<meta name="viewport" content="width=device-width, initial-scale=1">` tells the browser to lay the page out at the **device's actual width** at 100% zoom. Without it, mobile browsers assume a legacy desktop-sized virtual viewport (~980px) and scale the whole page down to fit — a compatibility hack from the era before responsive design, still the default for pages that don't opt out. It is the single tag that makes responsive CSS take effect.

4. `<base href="https://example.com/">` looks harmless. Name its two constraints and the failure mode when you get them wrong.
> [!answer]- reveal
> **At most one per document**, and it must appear **before any element that uses a URL** — otherwise elements earlier in the document already resolved their URLs against the old base. Failure mode: some links/images resolve one way, some another, on the same page. It rewrites the meaning of **every relative URL** in the document, which is why it's rarely worth the blast radius.

5. `<script src="app.js"></script>` in the `<head>` with no other attributes. What does it do to page load — and what do `defer` and `async` each change?
> [!answer]- reveal
> Plain: it **blocks HTML parsing** while it downloads *and* executes. The user stares at a blank page.
> `defer` — downloads in parallel with parsing, executes **after** parsing completes, and multiple deferred scripts run **in document order**. This is the safe default for scripts that touch the DOM.
> `async` — downloads in parallel, executes **as soon as it arrives**, order **not guaranteed**. For independent third-party scripts (analytics), not for anything with dependencies.

6. The deck's description of `<template>` is cut off mid-sentence. What actually makes it different from any other element you could hide with CSS?
> [!answer]- reveal
> Its contents are **parsed but completely inert**: not rendered, scripts inside don't run, images inside aren't fetched. A `display: none` div is fully live — its images still download. `<template>` is a **stamp**: JS clones its content and inserts copies where needed. It's the vanilla-HTML ancestor of the component idea you'll meet in React.

7. Interleaving — for each, which head element? (a) the text in the browser tab; (b) the little icon next to it; (c) the sentence Google shows under your link; (d) a message for users with JS disabled.
> [!answer]- reveal
> (a) `<title>` — also used for bookmarks and as the default share text.
> (b) `<link rel="icon" href="…">` — the favicon.
> (c) `<meta name="description" content="…">` — search engines *may* use it for the snippet (they often write their own instead), and it's not a direct ranking factor.
> (d) `<noscript>` — its content renders only when scripting is unavailable.

## Rebuild Drill

**Blank-file task.** From an empty `index.html`, write a complete, production-shaped `<head>` from memory. Then prove each element is doing its job by **breaking it**.

Requirements: `charset` · descriptive `<title>` · `<meta name="description">` · viewport · a linked stylesheet · a favicon.

**Success criteria — predict each outcome *before* you look:**
1. Browser tab shows your title **and** your favicon.
2. Put a `—` (em dash) and an accented character like `café` in the body. Confirm they render. Now **delete the charset line and reload.** Predict what happens first. *(Note: if you're serving via Live Server, an HTTP `Content-Type` header can supply the encoding and override your meta tag — so you may see no change. That's not a failed test; it's a more interesting result. Work out why.)*
3. Open DevTools' device toolbar and pick a phone. **Delete the viewport meta and reload.** Predict, then observe.
4. Move the stylesheet `<link>` to the very bottom of `<body>` instead. Predict whether the styles still apply and whether you see a flash of unstyled content.
5. Add `<script>alert('hi')</script>` at the top of `<head>`, above your content. Predict whether you see the page or the alert first — then add `defer` and predict again.

The output of this drill is the **list of your mismatches**, not the file.

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **`head` vs `header` vs `h1`** — the checklist item is satisfied by [[Semantic HTML and Page Structure]] and **linked, not duplicated** (single source of truth).
- ✅ **Void vs paired tags** — `<meta>`, `<link>` void; `<title>`, `<script>`, `<noscript>`, `<template>` paired. Prompt 6 turns the `<template>` case into reasoning rather than a list.
- ✅ **Escaping / comments** — no raw `<` or `&` in text content.
- ✅ **Semantic element for the job** — every element mapped to its actual consumer (prompt 1) instead of listed.
- ✅ **Verified** — the 1024-byte prescan window, the single-`<base>`-before-URLs constraint, and `defer`-executes-in-document-order vs `async`-does-not are all as stated.

**Errors corrected from the raw slides:**
- The deck's `<meta charset=”UTF-8” />` uses **curly quotes**. Pasted as-is that's not a valid attribute — straight quotes only. (Transcription artifact, but it's the kind that costs 20 minutes.)
- The `<template>` explanation **cuts off mid-sentence** (*"anything in between the opening and closing tags of a"*). Completed in prompt 6.
- The deck describes `<base>` as "a helpful trick… not strictly necessary" without either constraint. Both added — an unconstrained `<base>` breaks relative URLs page-wide.
- The deck lists `<script>` in the head neutrally, with no mention that a plain script **blocks parsing**. That's the single most consequential fact about where you put a script tag.

⚠ **Below 90% — spot-check:** the exact precedence order when a **BOM**, an **HTTP `Content-Type` charset**, and a **`<meta charset>`** disagree. I'm confident the HTTP header beats the meta tag (that's the caveat in drill step 2) and that a BOM ranks very high, but I would not assert the full ordering from memory — check the encoding sniffing algorithm if it ever matters.

## Flashcards

#flashcards/html/metadata

Why must `<meta charset>` appear within the first 1024 bytes?
?
The parser can't decode bytes into characters until it knows the encoding, so it **prescans** only the opening bytes. Declared later, the browser must discard its work and **re-parse** the document.

What does the viewport meta tag actually do?
?
Lays the page out at the **device's real width** at 100% zoom. Without it, mobile browsers assume a ~980px virtual viewport and scale the page down — so responsive CSS never takes effect.

What does a plain `<script src>` in `<head>` do to page load, and how do `defer` and `async` differ?
?
Plain: **blocks parsing** during download *and* execution. `defer`: parallel download, executes after parsing, **in document order**. `async`: parallel download, executes on arrival, **order not guaranteed**.

What are the two constraints on `<base>`?
?
**At most one per document**, and it must come **before any element that uses a URL** — otherwise earlier elements already resolved against the old base. It rewrites every relative URL in the document.

How is `<template>` different from a `display: none` element?
?
`<template>` content is **inert** — not rendered, scripts don't run, images aren't fetched. A hidden element is fully live and still downloads its resources. Template content is cloned by JS.

## TIL candidate

The break-it-and-observe drill is genuinely showable — **TIL candidate**: "five head tags, and what each page looks like without them," with before/after screenshots. Push to the public repo; link, don't copy.

## Links

- Map: [[HTML MOC]]
- `head` vs `header` vs `h1`, and where the rest of the document goes: [[Semantic HTML and Page Structure]]
- Favicon and stylesheet targets are hooked by: [[HTML class and id Attributes]]
- `lang` on `<html>` and why it matters: [[HTML Accessibility Essentials]]
- Where the linked stylesheet takes over: forward-link to CSS Box Model *(unwritten — backlog)*

---
type: concept
topic: html
status: learning
difficulty: medium
aliases:
  - Semantic HTML
  - Semantic Markup
  - Page Structure
  - HTML Landmarks
  - header nav main footer
  - Why not to use div
tags:
  - html
  - frontend
  - semantics
  - accessibility
  - concepts
---

# Semantic HTML and Page Structure

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference. Treated as NEW (Day 27 capture covers boilerplate, tables and forms — it contains no region elements at all), so a worked example is included. %%

## Worked Example

Every tag below could be a `<div>` and the page would look **identical**. The difference is invisible in the browser and load-bearing everywhere else.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- 1. metadata: nothing here is painted to the screen -->
    <meta charset="utf-8" />
    <title>Animal Kingdom</title>
  </head>
  <body>
    <!-- 2. page-level banner: masthead, site title -->
    <header>
      <h1>Animal Kingdom</h1>
    </header>

    <!-- 3. a named navigation landmark; the label distinguishes it from other navs -->
    <nav aria-label="Primary">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="lion.html">Lion</a></li>
      </ul>
    </nav>

    <!-- 4. the ONE main region: the content unique to this page -->
    <main>
      <!-- 5. thematic grouping; named, so it becomes a real landmark -->
      <section aria-labelledby="animals-heading">
        <h2 id="animals-heading">Choose an animal</h2>

        <!-- 6. self-contained: would still make sense syndicated alone -->
        <article>
          <h3>Lion</h3>
          <img src="images/lion.png" alt="A male lion resting in tall savanna grass" />
          <p>The lion is a large cat native to Africa and parts of Asia.</p>
        </article>
      </section>

      <!-- 7. tangential to the main content, not part of its flow -->
      <aside>
        <h2>Did you know?</h2>
        <p>A group of lions is called a pride.</p>
      </aside>
    </main>

    <!-- 8. page-level footer: copyright, legal, contact -->
    <footer>
      <p>&copy; 2026 Animals</p>
    </footer>
  </body>
</html>
```

**Explain in plain English (EiPE):** this markup tells assistive technology *what each region of the page is for*, so a screen-reader user can jump straight to the navigation or the main content instead of listening to the whole page top to bottom.

> The slide's framing is the right one: `<div>` everywhere is a **blank map**; semantic elements are a **GPS**. But the mechanism is specific — see the landmark table in the prompts below.

## Retrieval Prompts

1. Your page looks pixel-identical whether you use `<header>/<nav>/<main>` or `<div class="header">/<div class="nav">/<div class="main">`. So what *concretely* changes? Name the mechanism, not the vibe.
> [!answer]- reveal
> Semantic elements are mapped to **ARIA landmark roles**, which assistive tech exposes as a **jump menu**: `<nav>` → `navigation`, `<main>` → `main`, `<aside>` → `complementary`, and — **only when they are page-level, not nested inside `<article>`/`<section>`/`<aside>`/`<nav>`** — `<header>` → `banner` and `<footer>` → `contentinfo`. (That scoping is the same rule as prompt 6a: a `<footer>` inside an `<article>` belongs to the article, so it is not the page's `contentinfo`.) A screen-reader user can list landmarks and skip directly to one. A `<div>` has **no role**, so it never appears in that menu — the user must traverse linearly. Browsers also use these for reader modes, and search engines for content extraction.

2. There is one structural rule about `<main>` that the browser will not enforce but that is still wrong to break. What is it — and what's the second half of the rule about nesting?
> [!answer]- reveal
> **Only one `<main>` per document** (additional ones are allowed only if `hidden`). Second half: `<main>` must **not be a descendant** of `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`. It is the page's unique content — by definition it cannot live inside a sub-region.

3. `<section>` and `<article>` both group content. What's the actual test that decides which one you reach for?
> [!answer]- reveal
> **The syndication test.** `<article>` is for content that would **still make sense on its own** if you lifted it out and republished it — a blog post, a product review, a comment, a news item. `<section>` is a **thematic grouping within a document** that generally carries a heading but is not independently distributable. Rule of thumb: if you'd give it its own RSS entry, it's an `<article>`.

4. `<section>` is the odd one out among the region elements — it does **not** always become a landmark. What does it need?
> [!answer]- reveal
> An **accessible name**. A bare `<section>` is *not* exposed as a landmark; it only becomes a `region` landmark when it has `aria-label` or `aria-labelledby` (or, historically, a `title`). That is exactly why Coding 3.4 wrote `<section aria-labelledby="product-title-id">` — without the label the section is invisible to a landmark jump menu. Same applies to `<form>`.

5. Slide deck warns: *"Do not get confused"* about `<head>`, `<header>`, and `<h1>`. Distinguish all three in one sentence each.
> [!answer]- reveal
> `<head>` — the **metadata container**; its contents are never painted to the screen (title, charset, links, scripts).
> `<header>` — a **page or section region** for introductory content; it *is* rendered, and there can be several (one per `<article>`/`<section>`).
> `<h1>`–`<h6>` — **heading levels** for the outline of the content. `<h1>` is not "big text"; it's rank 1 in the document outline, and levels shouldn't skip.

6. Interleaving: for each of these, which element? (a) the copyright line at the bottom of a blog post; (b) a sidebar of "related articles"; (c) a wrapper you only added so CSS could apply flexbox; (d) a customer review inside a product page.
> [!answer]- reveal
> (a) `<footer>` — footer belongs to the *nearest sectioning ancestor*, so a `<footer>` inside an `<article>` is that article's footer, not the page's.
> (b) `<aside>` — tangentially related to the surrounding content.
> (c) `<div>` — this is the legitimate use. `<div>` isn't banned; it's for grouping with **no semantic meaning to convey**. Styling hooks are exactly that.
> (d) `<article>` — self-contained and independently meaningful.

## Rebuild Drill

**Blank-file task.** Rebuild Coding 3.3's *Employee Profile* page from memory, in a fresh `index.html` — but built the way it *should* have been, not the way the slide wrote it.

Requirements:
- `<!DOCTYPE html>` and `<html lang="en">`
- a `<head>` with `charset` and a descriptive `<title>`
- semantic regions: `<header>`, `<nav>`, `<main>`, `<footer>` — **zero `<div>`s**
- an `<h1>` for the employee name and a `<p>` role description
- a `<ul>` of contact details and an `<ol>` of three projects, each under its own `<h2>`
- a **data** table with a `<caption>`, `<thead>`/`<tbody>`, and **five complete rows** — every `<tr>` must contain cells

**Success criteria** (all four must hold):
1. Page renders with no visible stray text. *(The slide's version leaks — find out why before you write it.)*
2. A metric cell containing the text `< 4 Hours` displays **correctly and completely**. *(Type it naively first, look at the output, then fix it. That mismatch is the lesson.)*
3. No `<tr>` is empty and no presentational attributes appear on the table.
4. Paste into the [W3C validator](https://validator.w3.org/nu/) → **zero errors**.

Log any mismatch between what you predicted and what rendered.

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **Semantic element for the job** — every region in the worked example carries meaning; `<div>` appears only in prompt 6, explicitly as the legitimate no-semantics case.
- ✅ **One `<main>`, not nested** — stated in prompt 2; the worked example has exactly one, directly under `<body>`.
- ✅ **`head` vs `header` vs `h1`** — prompt 5.
- ✅ **`alt` describes function** — `alt="A male lion resting in tall savanna grass"`, not `"lion.png"`.
- ✅ **Void tags** — `<meta>`, `<img>` unclosed-by-pair (self-closing slash is permitted and inert in HTML5).
- ✅ **Escaping** — `&copy;` used as an entity; comments are `<!-- -->` throughout.
- ✅ **Mentally parsed** — the worked example is well-formed and validates as written.

**Errors corrected from the raw slides:**
- Coding 3.2's boilerplate omits `lang` on `<html>` while Coding 3.4 *requires* it. `lang` is included here — it's the one-attribute fix that tells a screen reader which language to pronounce.
- Coding 3.4 instructs a `<table>` for **two-column layout** with `width`/`border`/`cellpadding`/`cellspacing`/`valign` — an accessibility antipattern taught on the same page as the accessibility lesson. Excluded deliberately; see [[HTML Accessibility Essentials]].

⚠ **Below 90% — spot-check if it matters to you:** the precise conformance status of the bare `border` attribute on `<table>` has shifted across spec revisions (it was at one point tolerated as a data-table hint). `cellpadding`, `cellspacing`, `valign`, `align` and `width` are unambiguously obsolete — I'm only hedging on `border`.

## Flashcards

#flashcards/html/semantics

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Retrieval Prompts 1, 2, 3, 4 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

The rebuilt semantic employee-profile page is showable — **TIL candidate** for the public `TodayILearned` repo once it validates clean. Push the code there and link it from here; do **not** paste the file back into this note.

## Links

- Map: [[HTML MOC]]
- Why it matters: [[HTML Accessibility Essentials]]
- Styling hooks on these elements: [[HTML class and id Attributes]]
- How these elements lay themselves out: [[Block and Inline Elements]]
- Markup ancestry — same angle-bracket, paired-tag model: [[XML and JSON]]
- Server-side counterpart of the same "which region" thinking: [[MVC Pattern]]

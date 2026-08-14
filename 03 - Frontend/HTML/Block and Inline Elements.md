---
type: concept
topic: html
status: learning
difficulty: medium
aliases:
  - Block vs Inline
  - Block Level Elements
  - Inline Elements
  - inline-block
  - div vs span
  - Display Values
tags:
  - html
  - frontend
  - layout
  - concepts
---

# Block and Inline Elements

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference. Treated as NEW — no layout material in the Day 27 capture. Lives in HTML because these are the DEFAULTS elements ship with; the property itself is CSS. %%

## Worked Example

Every element arrives with a **default `display` value** from the browser's built-in stylesheet. Nothing here is a property of HTML itself — it's CSS you didn't write, which is exactly why it surprises you.

```html
<!-- 1. block: forces a new line, fills the available width -->
<p>First paragraph.</p>
<p>Second paragraph.</p>
<!-- → stacked vertically, each spanning the full container width -->

<!-- 2. inline: no line break, width shrinks to the content -->
<p>The <em>emphasised</em> word sits <strong>inside</strong> the sentence.</p>
<!-- → flows in the text; setting width/height on <em> does NOTHING -->

<!-- 3. inline-block: flows inline, but width/height DO apply -->
<button>Buy</button>
<button>Add to cart</button>
<!-- → side by side, each hugging its own text — but sizeable, unlike (2) -->

<!-- 4. div vs span: same "no meaning" job, opposite flow -->
<div>I break onto my own line.</div>
<span>I don't.</span>
```

**Explain in plain English (EiPE):** whether an element stacks or flows — and whether you can give it a size at all — is decided before you write a single line of CSS.

### The three behaviours

| | starts a new line? | width | `width`/`height` apply? | vertical margin pushes siblings? |
|---|---|---|---|---|
| **block** | yes | fills available | ✅ | ✅ |
| **inline** | no | shrinks to content | ❌ **ignored** | ❌ |
| **inline-block** | no | shrinks to content | ✅ | ✅ |

**Roughly who's who:** block — `div`, `p`, `h1`–`h6`, `section`, `header`, `nav`, `main`, `footer`, `article`, `hr`. Inline — `span`, `a`, `em`, `strong`, `b`, `i`, `sub`, `sup`, `img`. Inline-block — `button`, `input`, `select`, `textarea`.

> Two elements people assume are "block" and aren't, exactly: `<table>` defaults to `display: table` and `<li>` to `display: list-item`. Both *behave* block-ish (they start new lines) but they're their own display types, which is why table layout has its own rules.

## Retrieval Prompts

1. You set `width: 200px; height: 50px` on a `<span>` and nothing happens. On a `<div>` it works. Why — and what's the smallest fix that keeps the span flowing inline?
> [!answer]- reveal
> `width` and `height` **do not apply to non-replaced inline elements** — the box is sized by its content, full stop. The `div` is block, so they apply. Smallest fix that preserves inline flow: `display: inline-block`. (`display: block` would also make the size work, but it breaks the element onto its own line, which is usually not what you wanted.)

2. The lesson explains that unstyled buttons look "incredibly cramped… just wide enough to fit the text." The explanation given is that buttons are inline. That's *almost* right. What's the precise version, and why does the difference matter in practice?
> [!answer]- reveal
> Buttons are **`inline-block`**, not `inline`. Both shrink-to-fit their content, which is why the cramped look is the same — but the consequence is opposite: on `inline-block` you **can** set `width`, `height` and vertical padding and they take effect. If buttons were truly `inline`, the cramping would be unfixable without changing `display` first. Same symptom, completely different fix.

3. `<img>` is listed as inline, yet you can obviously set an image's width and height. Is the list wrong?
> [!answer]- reveal
> No — `<img>` is inline, but it's a **replaced element**: its content comes from outside the document (the image file), and it carries **intrinsic dimensions**. The "width/height don't apply" rule is specifically about *non-replaced* inline elements. Replaced inline elements (`img`, `video`, `iframe`, form controls) are sizeable. This is the exception that makes the rule look broken.

4. You add `padding: 40px` to an inline `<a>` inside a paragraph. Predict what happens vertically — and specifically, what happens to the lines above and below.
> [!answer]- reveal
> The padding **renders** — you'll see the background colour bleed above and below — but it does **not** affect line height, so it **overlaps the surrounding lines** instead of pushing them apart. Vertical padding and margin on inline elements paint without reserving space. This is the classic "why is my link's background overlapping the text above it" bug; the fix is `inline-block`.

5. Why does `<span>` exist at all, given `<div>` already means "no semantic meaning"?
> [!answer]- reveal
> They're the same job at **different flow levels**: `<div>` is the block-level no-meaning container, `<span>` is the inline one. You reach for `<span>` when you need to hook styling or scripting onto a **fragment of text without disturbing the layout** — wrapping a word in a `<div>` would break it onto its own line. Both are last resorts: use them when there is genuinely no semantic element for the job.

6. Interleaving: which do you reach for — `<br>`, a new `<p>`, or CSS margin — for (a) a new paragraph of prose; (b) the line break in a postal address; (c) space between two sections?
> [!answer]- reveal
> (a) **new `<p>`** — the deck says this explicitly: if you're starting a new paragraph, use the element that means "paragraph," not a line break inside the old one.
> (b) **`<br>`** — this is its legitimate case: a line break that is part of the *content's meaning* (addresses, poetry, song lyrics).
> (c) **CSS margin** — spacing is presentation, not structure. `<br><br>` for spacing is markup doing CSS's job.

## Rebuild Drill

**Blank-file task.** From an empty `index.html` with a `<style>` block, build a page that *demonstrates* — not describes — all three display behaviours.

Requirements:
- three `<span>`s in a row, each with a visible background colour and `width: 150px` set. **Predict before you load it:** does the width apply?
- change **only** their `display` so the widths take effect *and* they stay on one line
- a paragraph containing an inline `<a>` with `padding: 30px` and a background colour — observe the overlap with the lines above/below, then fix it with a one-property change
- two `<div>`s and two `<span>`s with identical content and styling, side by side, so the flow difference is visible

**Success criteria:**
1. You wrote your prediction for the span-width question **before** loading the page, and reconciled it after.
2. The final page shows all three behaviours distinctly, and you can point at which is which without reading your CSS.
3. You can state the one-property fix for the padding-overlap bug from memory.

Log any prediction mismatch — that gap is the actual output of this drill.

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **Semantic element for the job** — `div`/`span` framed as last resorts throughout (prompt 5), consistent with [[Semantic HTML and Page Structure]].
- ✅ **Void vs paired tags** — `<hr>`, `<br>`, `<img>` all written unpaired.
- ✅ **Escaping / comments** — `<!-- -->` only.
- ✅ **Mentally parsed** — all blocks well-formed.
- **Verified specifically:** the `width`/`height` rule applies to **non-replaced** inline elements; `<img>` is inline *and* replaced, hence sizeable. Checked because the slide's flat "img is inline" would otherwise contradict everyday experience.

**Errors corrected from the raw slides:**
- The deck calls `<button>` and `<select>` **inline**. They are **`inline-block`** in every major browser. The distinction is the whole point: `inline-block` accepts `width`/`height`, pure `inline` doesn't — so the deck's own "cramped button" example has a fix its explanation would rule out.
- The deck presents block/inline as *"two values HTML has"*. They are **CSS `display` values supplied by the browser's user-agent stylesheet** — defaults, not HTML features, and overridable at will. Worth keeping straight, because next week you'll override them constantly with `flex` and `grid`.
- The deck lists `<table>` implicitly among block elements; its default is `display: table`.

⚠ **Below 90% — spot-check:** the exact default `display` for form controls has minor cross-browser variation (and `input` has historically differed by `type`). The behaviour that matters — they shrink to content **and** accept `width`/`height` — holds everywhere. If you ever depend on the precise computed value, read it in DevTools rather than trusting this note.

## Flashcards

#flashcards/html/layout

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Retrieval Prompts 1, 3, 4, 5 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

Are block and inline features of HTML?
?
No — they're **CSS `display` values applied by the browser's user-agent stylesheet**. They're defaults you inherit, and you can override any of them.

## TIL candidate

The three-behaviour demo page is small but genuinely showable — a **TIL candidate**: "inline vs inline-block, demonstrated in 30 lines." Push to the public repo and link it here; don't copy the code back.

## Links

- Map: [[HTML MOC]]
- What these elements mean: [[Semantic HTML and Page Structure]]
- Why unstyled buttons matter beyond looks: [[HTML Accessibility Essentials]]
- Hooking styles onto elements: [[HTML class and id Attributes]]
- Where you'll override all of this: forward-link to CSS Box Model and CSS Flexbox *(unwritten — backlog)*

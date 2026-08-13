---
type: concept
topic: html
status: learning
difficulty: medium
aliases:
  - HTML Forms
  - Forms
  - label for id
  - Form Inputs
  - input name
  - Form Validation
  - select and option
tags:
  - html
  - frontend
  - forms
  - accessibility
  - concepts
---

# HTML Forms and Label Association

%% Graduated via [[Refiner Spec (Graduate)]] using 03 - Frontend/HTML/_refiner.md. Test surface, not a reference.
GATE: **already understood → worked example deliberately OMITTED.** The Day 27 capture already contains a complete, correct form (`action`/`method`, `label for`/`id`, `type="email"`, `required`, `textarea`). Re-showing it would be rereading. Straight to prompts + drill; the prompts carry the parts the capture does NOT cover (`select`/`option`, `button` default type, what actually submits). %%

## Retrieval Prompts

1. You ship a form. Everything renders, the user fills it in, submit works — and one field's data never arrives at the server. Nothing errors. What's the most likely single cause?
> [!answer]- reveal
> The control has **no `name` attribute**. A form control without `name` is **not submitted at all** — it's excluded from the form data set. It'll still render, still be focusable, still be labelled correctly. This is the quietest bug in HTML forms: `id` makes the label work, so the field *looks* wired up, but `name` is what puts it in the payload.

2. `for`, `id`, `name` — you use all three on one input. Say what each does, then say which one you could delete and still have a *correctly labelled* (but broken) form.
> [!answer]- reveal
> `for` (on `<label>`) → targets the input's `id`; that pairing is the association, and it's why clicking the label focuses the field. `id` → the unique handle `for` points at. `name` → the **key in the submitted data**.
> Delete **`name`**: the label still associates, the field still focuses, screen readers still announce it — and the value silently never reaches the server. Labelling and submission are two independent wirings, and only one of them fails loudly.

3. There's a second way to associate a label that needs no `for` and no `id` at all. What is it, and when would you *still* prefer the explicit form?
> [!answer]- reveal
> **Implicit labelling** — wrap the control in the label: `<label>Email <input type="email" name="email"></label>`. The association is structural.
> Prefer **explicit** `for`/`id` when your CSS or layout needs the label and input as siblings (grids, floating labels), or when they can't be nested for design reasons. Explicit is also more robust across older assistive tech. Many teams use both belt-and-braces.

4. `<button>Save</button>` sits inside a `<form>`. The user clicks it and the page unexpectedly reloads. Why — and what's the fix?
> [!answer]- reveal
> A `<button>` inside a form **defaults to `type="submit"`**. Clicking it submits the form, which navigates. Fix: `type="button"` for a button that should only run JS, or `type="submit"` explicitly where you *do* want submission.
> This is what the deck was gesturing at with *"`<button type="button">` is a thing, but does it do what you want?"* — stated backwards. The trap isn't `type="button"`; it's **omitting `type` and getting `submit` by surprise.** Always be explicit.

5. `type="email"` and `required` give you validation in the browser for free. Why is it a serious mistake to treat that as validation?
> [!answer]- reveal
> Because it is **client-side only, and the client is not yours**. Anyone can bypass it — DevTools to delete the attribute, or `curl`/Postman to POST straight to the endpoint, skipping your HTML entirely. Browser validation is a **UX affordance** (fast feedback, fewer round-trips), never a security or data-integrity control. The server must revalidate **everything**. Same lesson as `@Valid` on the Spring side: the boundary that matters is the one you control.

6. Two value-storage gotchas that break the pattern you'd expect. (a) Where does a `<textarea>`'s value live? (b) In `<option>Canada</option>` with no `value` attribute, what gets submitted?
> [!answer]- reveal
> (a) A `<textarea>`'s value is its **content between the tags**, not a `value` attribute — which is why it's a paired tag while `<input>` is void. Putting `value="…"` on a textarea does nothing.
> (b) The **text content** — `Canada` — is submitted. `<option>`'s `value` attribute *overrides* the display text when present; with no `value`, display text and submitted value are the same thing. That's fine until someone translates the label and silently changes your data.

7. *(Slightly beyond the slides, but it's the case that will bite you.)* You have five radio buttons for a rating. How do you make them one group, and how does a screen-reader user learn what the group is asking?
> [!answer]- reveal
> **They share the same `name`** — that's what makes them mutually exclusive and submits one value. (Same `name` on radios is correct; on text inputs it's usually a bug.) Each needs its **own `id`** and its own `<label>`.
> For the group's question, wrap them in `<fieldset>` with a `<legend>`: AT announces the legend alongside each option, so the user hears *"Rating — 3 stars, radio button"* rather than a naked *"3 stars."* Without a fieldset the individual labels are announced but the question they answer is not.

## Rebuild Drill

**Blank-file task.** From an empty `feedback.html`, build a complete accessible feedback form. No reference, no scrolling up.

Requirements:
- text input (name, required) · email input (required) · a `<select>` with 4 options · a radio group of 3 options wrapped in `<fieldset>`/`<legend>` · a `<textarea>` · a submit button
- every control has a real `<label>` associated by `for`/`id`
- every control that should submit has a `name`
- use **`method="get"`** — deliberately, see below

**Success criteria** (all five):
1. **Submit and read the URL.** With `method="get"`, the browser puts the form data in the query string: `feedback.html?name=Zub&email=…&topic=…`. Every field you expect must appear, under the **key you expect**. This is a full backend-free proof of what actually submitted.
2. **Deliberately delete one `name` attribute, resubmit, and watch that key vanish from the URL** while the field still looks perfectly fine. Predict which key disappears before you look.
3. Clicking **every** label's text focuses its control. (Free proof that `for`/`id` is wired — if a click does nothing, the association is broken.)
4. Fill nothing and submit: the browser blocks it and points at the first required field.
5. Complete and submit the whole form **using only the keyboard** — Tab, arrow keys for the radios, Enter to submit.

Log any prediction mismatch on criteria 1, 2, and 5.

## Correctness Check

Run against the HTML checklist in `_refiner.md`:

- ✅ **Label association** — `for` ↔ `id` vs `name` separated in prompts 2, 3 and 7; the checklist's exact trap is the spine of this note.
- ✅ **`placeholder` is not a label** — carried in [[HTML Accessibility Essentials]]; **linked, not restated** (single source of truth).
- ✅ **Semantic element for the job** — native controls throughout; `<fieldset>`/`<legend>` for grouping.
- ✅ **Void vs paired tags** — `<input>` void, `<textarea>`/`<button>`/`<select>` paired; prompt 6a explains *why* the asymmetry exists rather than asserting it.
- ✅ **Escaping / comments** — no raw `<` or `&` in text content.
- ✅ **Mentally checked** — the `method="get"` query-string behaviour in the drill is standard form submission; every attribute named exists and behaves as described.

**Errors corrected from the raw slides:**
- The deck's aside — *"`<button type="button">` is a thing, but does it do what you want it to do? Probably not"* — is **backwards**. The hazard is **omitting** `type` inside a form and silently getting `submit`. `type="button"` is the correct choice for a JS-only button. Corrected in prompt 4.
- Coding 3.1 uses `<input type="submit" value="Submit">`; 3.4 uses `<button type="submit">Submit Review</button>`. The deck never says why. Both work; `<button>` can contain markup and takes its label from its content, `<input type="submit">` is void and takes its label from `value`. Prefer `<button>`.
- Coding 3.1's form has **no `action` and no `method`** — it submits to the current URL via GET. Fine for a demo, but the deck presents it as a finished form. Your own Day 27 capture is *better than the slide here*: it has `action="/submit-data" method="POST"`.

⚠ **Below 90% — spot-check:** whether *older* assistive tech reliably honours **implicit** (wrapping) labels as well as explicit `for`/`id` is the part I'd verify before relying on it in production. Explicit association is universally supported; that's why I recommended it as the default.

## Flashcards

#flashcards/html/forms

A form field renders fine, is labelled correctly, and its value never reaches the server. What's missing?
?
The **`name`** attribute. A control without `name` is excluded from the submitted form data — `id` makes the label work, `name` is what puts the value in the payload.

On a labelled input, what does each of `for`, `id`, `name` do?
?
`for` (on the label) targets the **`id`**; that pairing is the association. `name` is the **key sent to the server**. Labelling and submission are independent wirings.

What `type` does a `<button>` default to inside a form?
?
**`type="submit"`** — so an unlabelled `<button>` submits the form and navigates. Use `type="button"` for JS-only buttons, and always be explicit.

Why is `required` / `type="email"` not real validation?
?
It's **client-side only** and trivially bypassed via DevTools or a direct `curl`/Postman request. It's a UX affordance; the **server must revalidate everything**.

Where does a `<textarea>`'s value live, and why is that different from `<input>`?
?
In its **content between the tags** — which is why `<textarea>` is a paired tag and `<input>` is void. A `value` attribute on a textarea does nothing.

What makes a set of radio buttons one mutually-exclusive group, and how does a screen-reader user learn the question?
?
They **share the same `name`** (each with its own `id` + label). Wrap them in `<fieldset>` with a `<legend>` so AT announces the group's question with each option.

## TIL candidate

The accessible feedback form is showable — **TIL candidate**: "the `name` attribute is what submits, and here's how to prove it with zero backend." The `method="get"` query-string trick is the demonstrable part. Push to the public repo; link, don't copy.

## Links

- Map: [[HTML MOC]]
- Naming and targeting the controls: [[HTML class and id Attributes]]
- Labels, focus order, and why `placeholder` isn't a label: [[HTML Accessibility Essentials]]
- Where the form sits in the page: [[Semantic HTML and Page Structure]]
- Why `<button>` hugs its text: [[Block and Inline Elements]]
- What `method` actually changes on the wire: [[Get vs Post]]
- Server-side revalidation, the boundary that counts: [[Spring MVC]]

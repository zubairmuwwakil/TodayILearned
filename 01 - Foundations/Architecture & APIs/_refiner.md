---
type: refiner-config
domain: architecture
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Architecture & APIs — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for this domain lives here.** All shared machinery and rules are in the spec.

> **Scope — the cross-cutting layer.** This is the home for concepts that are **not owned by any one framework or language**: data-interchange formats (JSON, XML), HTTP/REST semantics, client–server architecture, microservices vs monolith, architectural patterns like MVC when discussed independently of Spring. If a concept only makes sense *inside* Spring/React/SQL, it belongs in that domain instead — link across, never duplicate.

- **Target folder:** `50 Resources/Software Engineering/01 - Foundations/Architecture & APIs/`
- **Flashcard tag:** `#flashcards/architecture/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

## Correctness checklist (Architecture & APIs)

Run against every graduated note here (spec step ④). These traps are about **format strictness and protocol semantics** — a payload that looks fine can still be rejected:

- [ ] **JSON is stricter than JavaScript** — keys are **double-quoted strings**; **no trailing commas**, **no comments**, **no single quotes**. Any example shown must actually parse.
- [ ] **JSON value types are exactly six** — string, number, boolean, `null`, object, array. There is **no date type** (dates are strings by convention, e.g. ISO-8601) and no `undefined`.
- [ ] **XML well-formed vs valid** — *well-formed* = syntax only (exactly **one root element**, every tag closed, properly nested, `&` `<` `>` escaped). *Valid* = well-formed **and** conforms to a DTD/XSD. Don't use the words interchangeably.
- [ ] **Structural asymmetry** — XML requires a single root and has **no native array type** (repetition is expressed by repeated sibling elements); JSON's top level may be an object *or* an array.
- [ ] **HTTP semantics** — if the note states a method or status code, it must be right: `GET` is safe and idempotent, `POST` is neither, `PUT`/`DELETE` are idempotent but not safe; `200` vs `201 Created` vs `204 No Content`; `401` = unauthenticated, `403` = authenticated but forbidden.
- [ ] **Media type matches the body** — `application/json` vs `application/xml`; the `Content-Type` describes the body being sent, `Accept` describes the response wanted.

## Links

- Machinery: [[Refiner Spec (Graduate)]]
- Contract: [[AI Operating Manual (READ ME)]]

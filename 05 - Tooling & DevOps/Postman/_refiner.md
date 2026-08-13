---
type: refiner-config
domain: postman
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# Postman — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for Postman lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/05 - Tooling & DevOps/Postman/`
- **Flashcard tag:** `#flashcards/postman/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

> **Tooling domain — read this first.** Postman is about *doing*, not *remembering*. Most showable Postman work belongs in a **git TIL or a saved/exported collection**, not an Obsidian concept note (one home per item *by job*). Graduate to Obsidian only the **transferable why** — what an assertion proves, why variables beat hardcoded URLs. Here the spec's "worked example" = an **annotated request**, and the "rebuild drill" = **reproduce the request/collection from a blank tab**.

## Correctness checklist (Postman)

Run against every graduated Postman note (spec step ④). Postman errors are about **test rigor** and **reproducibility**, not compilation:

- [ ] **Assert status AND body** — a test checks the status code *and* the response body/schema, not just that it returned `200 OK`.
- [ ] **No hardcoded values** — base URL, tokens, and IDs come from **environment / collection variables** (`{{baseUrl}}`), so the collection runs unchanged across dev/prod.
- [ ] **Tests live in the Scripts tab** — assertions use `pm.test(...)` / `pm.expect(...)`, not eyeballing the response pane.
- [ ] **Auth handled deliberately** — correct auth type at the right level (collection vs request); secrets in variables/vault, never committed in the URL or a saved response.
- [ ] **Re-runnable** — a request that creates data has a matching teardown or is safe to re-run, so the collection doesn't accumulate state.

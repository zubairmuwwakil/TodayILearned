---
type: refiner-config
domain: react
topic: learning-system
status: living
tags:
  - learning-system
  - refiner
---

# React — refiner config

Parameters for the [[Refiner Spec (Graduate)]]. **Only what differs for React lives here.** All shared machinery and rules are in the spec.

- **Target folder:** `50 Resources/Software Engineering/03 - Frontend/React/`
- **Flashcard tag:** `#flashcards/react/<topic>`
- **Output template:** *(none — use the generic skeleton in the spec)*

## Correctness checklist (React)

Run against every graduated React note (spec step ④). React traps are about *when things run* and *what stays stable across renders*:

- [ ] **Rules of hooks** — hooks called only at the **top level** of a component/custom hook, in the same order every render — never inside conditionals, loops, or nested functions.
- [ ] **`key` props** — keys on list items are **stable and identity-based** (an id), never the array index when the list can reorder/insert/delete.
- [ ] **State immutability** — never mutate state in place; produce a **new** object/array. `setState` replaces (objects don't auto-merge like class `setState` did); functional updater `setX(prev => …)` when the next value depends on the previous.
- [ ] **Effect dependencies** — `useEffect` dependency array lists **every** reactive value read inside; missing deps cause stale closures, and effects that set state without a correct dep/guard can loop.

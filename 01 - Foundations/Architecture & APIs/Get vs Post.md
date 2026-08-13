---
type: capture
topic: http
status: raw
aliases:
  - GET vs POST
tags:
  - architecture
  - http
  - raw-capture
---
# Get vs Post

> [!warning] Raw capture — NOT graduated, and it contains an error
> Moved here from `02 - Backend/` (HTTP semantics are language/framework-agnostic → this layer).
> Two things to fix before this graduates. Answer each from memory *first*:
>
> 1. One of the two arrows below is pointing the wrong way. **Which verb actually "requests info"?**
> 2. "POST hides the request" is true about the *URL* — but what does it **not** protect against? Name the thing that actually provides confidentiality.
> 3. Not captured at all: which of GET/POST is **safe**, and which is **idempotent**? (One is both, one is neither.)
>
> > [!answer]- Check yourself (only after answering)
> > 1. **GET** retrieves/requests a representation. **POST** submits data to create or change server state — the original note has these swapped.
> > 2. Hiding data from the URL is **not encryption**. The body is plaintext on the wire without **HTTPS/TLS**. (URLs are worse for a different reason: they land in browser history, server access logs, and `Referer` headers.)
> > 3. **GET** = safe *and* idempotent. **POST** = neither.

## Original capture (unedited)

get is publicy available because it shows 

get - > fetch 
in the url 


post -> requests info 
post requests hides the request so it cant
be seen in the url 

## Links

- Graduate target: this layer (`01 - Foundations/Architecture & APIs/`), per its `_refiner.md`
- Related: [[Spring MOC]] (where GET/POST show up as `@GetMapping` / `@PostMapping`)

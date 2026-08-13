#!/usr/bin/env python3
"""
Regenerate `Concepts Backlog.md` at the Software Engineering root.

WHAT IT DOES
    Scans the SE tree for [[wikilinks]] that resolve to nothing anywhere in the
    vault, groups them by domain, and ranks them by reference count. The result
    is a study queue derived from your own writing rather than from planning.

WHY THE RULES BELOW MATTER
    Three exclusions keep the counts honest. Each one existed as a real bug:

    1. SELF-EXCLUSION. A backlog file full of [[links]] counts as a referrer and
       inflates every item it lists. The pre-2026-08-13 file had this bug, which
       is why its numbers ran ~1 low per item after the fix.
    2. ALIASES COUNT AS RESOLVED. [[ArrayList]] is not backlog — it reaches
       `02 - ArrayList Fundamentals` via an alias. Both YAML alias styles must be
       parsed: block (`aliases:\n  - X`) and inline flow (`aliases: [X, Y]`).
       Missing the inline form silently reports written notes as unwritten.
    3. _System/ AND _Templates/ ARE SKIPPED. Template placeholders such as
       [[<nearby concept>]] are not real queue items.

    A filename beats an alias in Obsidian's resolution order. That is why raw
    session captures are prefixed `DNN - ` — an un-prefixed capture named
    `ArrayList.md` shadows the graduated note and silently steals the link.

MERGE MAP
    Some items are the same concept typed differently. Merging combines their
    counts under a canonical name and records the variants as "aka", so the
    alias decision is already made when the note gets written. Only merge when
    the two names cannot denote different notes. Do NOT merge things that are
    genuinely distinct (Switch Statements vs Switch Expressions; the three
    stream-operations entries, which may be three real topics).

BEFORE ADDING AN ALIAS INSTEAD OF A BACKLOG ENTRY
    Grep the candidate note's BODY for the concept, not its title. `For Loops.md`
    mentions "Enhanced For" only in a Links line — it teaches classic for-loops
    only, so [[Enhanced For Loop]] is a real backlog item, not an alias.

USAGE
    python3 "_System/regenerate-backlog.py"          # writes Concepts Backlog.md
    python3 "_System/regenerate-backlog.py" --dry    # prints a summary only

    Manual [x] check marks and the "Recently cleared" list are carried over.
"""
import os, re, io, sys, collections

BACKLOG   = "Concepts Backlog.md"
SKIP_DIRS = ("_System", "_Templates", ".git", ".obsidian")
NOISE     = ("Note", "embed")

# canonical name  <-  variants that mean the same concept
MERGE = {
    "For-Each Loop":                "Enhanced For Loop",
    "classes and objects":          "Objects Classes and Methods",
    "hashCode and equals":          "equals and hashCode",
    "Generics":                     "Generics in Java",
    "Type Casting":                 "Type Casting and Conversion",
    "Comparable":                   "Comparable and Comparator",
    "Comparator":                   "Comparable and Comparator",
}

DOMAINS = [("01 - Foundations", "Foundations"), ("02 - Backend/Java", "Java"),
           ("02 - Backend/Spring", "Spring"),   ("03 - Frontend", "Frontend"),
           ("04 - Database", "SQL"),            ("05 - Tooling & DevOps", "Tooling")]

ORDER = [("SQL", "current focus — Day 14 material"),
         ("Java", "deepest domain; mostly gaps in early fundamentals"),
         ("Spring", "from Days 16–20"), ("Tooling", "Git, Maven, CI/CD"),
         ("Foundations", "cross-cutting"), ("Frontend", "not yet started"), ("General", "")]

HEADER = """---
type: index
topic: backlog
status: living
aliases:
  - Concepts Backlog
  - Backlog
  - Study Queue
  - Unresolved Links
tags:
  - backlog
  - moc
---

# Concepts Backlog

> [!info] What this is
> A study queue of concepts you have **already linked to but not yet written**, grouped by domain and ranked by how often you reference them. Frequency is a *demand* signal — how load-bearing a concept is proven to be by your own writing — not a priority order. **Write a note when you sit down to learn the topic**, never pre-create empty stubs.

> [!note] This is a snapshot; the live version is built in
> Obsidian's **Unresolved links** pane (right sidebar) and the faded nodes in Graph view are always current.

> [!warning] Regenerate with the script, not by hand
> `python3 "_System/regenerate-backlog.py"` — it owns the counting rules, the merge map, and the exclusions that keep the numbers honest. Editing this file by hand is fine for ticking `[x]`; those marks are carried over. The reasoning behind each rule is documented in the script's header.
"""

def find_vault(start):
    p = os.path.abspath(start)
    while p != "/":
        if os.path.isdir(os.path.join(p, ".obsidian")): return p
        p = os.path.dirname(p)
    return os.path.abspath(os.path.join(start, "..", ".."))

def aliases_of(text):
    m = re.match(r"^---\n(.*?)\n---", text, re.S)
    if not m: return []
    fm = m.group(1)
    inline = re.search(r"^aliases:\s*\[(.*?)\]\s*$", fm, re.M)
    if inline:
        return [a.strip().strip("'\"") for a in inline.group(1).split(",")]
    if "aliases:" not in fm: return []
    out = []
    for line in fm.split("aliases:", 1)[1].split("\n")[1:]:
        if re.match(r"^\s*-\s+", line): out.append(re.sub(r"^\s*-\s+", "", line).strip().strip("'\""))
        elif line.strip() and not line.startswith((" ", "\t")): break
    return out

def main():
    se    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    vault = find_vault(se)

    known = set()                                    # every filename + alias, vault-wide
    for root, dirs, files in os.walk(vault):
        dirs[:] = [d for d in dirs if d not in (".git", ".obsidian")]
        for f in files:
            if not f.endswith(".md"): continue
            known.add(f[:-3].lower())
            try: known.update(a.lower() for a in aliases_of(io.open(os.path.join(root, f), encoding="utf-8").read(4000)))
            except Exception: pass

    def domain(rel):
        for prefix, name in DOMAINS:
            if rel.startswith(prefix): return name
        return "General"

    hits = collections.defaultdict(lambda: {"n": 0, "doms": collections.Counter(), "aka": set()})
    for root, dirs, files in os.walk(se):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if not f.endswith(".md"): continue
            rel = os.path.relpath(os.path.join(root, f), se)
            if rel == BACKLOG: continue                                   # rule 1: self-exclusion
            for link in re.findall(r"\[\[([^\]|#]+)", io.open(os.path.join(root, f), encoding="utf-8").read()):
                link = link.strip()
                if link.lower() in known: continue                        # rule 2: aliases resolve
                if link in NOISE or link.startswith("<") or link.startswith("Pasted image"): continue
                canon = MERGE.get(link, link)
                h = hits[canon]; h["n"] += 1; h["doms"][domain(rel)] += 1
                if canon != link: h["aka"].add(link)

    path = os.path.join(se, BACKLOG)
    prev = io.open(path, encoding="utf-8").read() if os.path.exists(path) else ""
    # Only scan the queue body — everything from "## Links" onward is navigation,
    # not queue items, and would otherwise leak into "Recently cleared".
    body   = prev.split("\n## Links")[0]
    ticked = set(re.findall(r"- \[x\] \[\[([^\]|]+)", body))            # carry over manual [x]
    listed = set(re.findall(r"\[\[([^\]|]+)", body))
    cleared = sorted(ticked | {n for n in listed if n.lower() in known})

    by = collections.defaultdict(list)
    for name, h in hits.items():
        by[h["doms"].most_common(1)[0][0]].append((h["n"], name, sorted(h["aka"])))
    total = sum(len(v) for v in by.values())
    prio  = sum(1 for v in by.values() for t in v if t[0] >= 2)

    if "--dry" in sys.argv:
        print(f"{total} items, {prio} priority")
        for d, _ in ORDER:
            if by.get(d): print(f"  {d:12s} {len(by[d])}")
        return

    L = [HEADER,
         f"\n**{total} open items** across {len([k for k in by if by[k]])} domains — "
         f"{prio} referenced 2+ times, {total - prio} in the long tail.",
         "\nEntries marked *aka* were separate queue items naming the **same concept**; their counts are "
         "combined. When you write one, add the aka names as `aliases:`.\n"]
    for dname, note in ORDER:
        items = sorted(by.get(dname, []), key=lambda t: (-t[0], t[1].lower()))
        if not items: continue
        top  = [t for t in items if t[0] >= 2]
        tail = [t for t in items if t[0] < 2]
        L.append(f"\n## {dname} ({len(items)})" + (f"\n\n*{note}*" if note else ""))
        if top:
            L.append(f"\n\n### Priority — referenced 2+ times ({len(top)})\n")
            for n, x, aka in top:
                L.append(f"- [ ] [[{x}]] — {n}×" + (f"  *aka {', '.join(aka)}*" if aka else ""))
        if tail:
            L.append(f"\n### Long tail — referenced once ({len(tail)})\n\n> [!quote]- Show the long tail")
            for n, x, aka in tail:
                L.append(f"> - [[{x}]]" + (f"  *aka {', '.join(aka)}*" if aka else ""))
        L.append("")
    L.append("\n## Recently cleared\n\nWere backlog items in an earlier snapshot and now resolve:\n")
    L += [f"- [x] [[{n}]]" for n in cleared]
    L.append("""
## Links

- Domain maps: [[Java MOC]] · [[Spring MOC]] · [[SQL MOC]]
- Procedure for turning one of these into a note: [[Refiner Spec (Graduate)]]
- Front page: [[Software Engineering MOC]]
""")
    io.open(path, "w", encoding="utf-8").write("\n".join(L))
    print(f"wrote {BACKLOG}: {total} items, {prio} priority")

if __name__ == "__main__":
    main()

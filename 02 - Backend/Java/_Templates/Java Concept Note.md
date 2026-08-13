---
type: concept
topic: <section-slug>
status: learning
difficulty: easy
aliases:
  - <alias>
tags:
  - java
  - <topic-slug>
  - <concept-slug>
created: {{date}}
---
%% HOW TO USE: Point Settings > Templates (or Templater) at the "_Templates" folder,
then insert this into every new note. Replace <placeholders>. Delete sections that
truly don't apply, but keep Worked Example, Trace, Recall Questions, and Mini Practice —
those are the ones that do the learning. %%

# <Concept Name>

## What it is
<One or two sentences in YOUR OWN WORDS. Rewriting > copying (generation effect).>

## Why it matters
<When/why you reach for this. What breaks without it.>

## Syntax / Pattern
```java
<minimal skeleton>
```

## Worked Example
%% Annotate with SUBGOAL LABELS, not incidental comments (Morrison, Margulieux & Guzdial 2015). %%
```java
// 1. <subgoal: set up>
// 2. <subgoal: the core step>
// 3. <subgoal: produce result>
<code>
```

**Explain in plain English (EiPE):** <one sentence: what does this code ACCOMPLISH, not how.>

## Trace
%% PREDICT before you run. Then run and reconcile mismatches into the Mistake Log. %%
**Predict the output first (write it before reading on):**  `___`

Variable-tracking table (build the "notional machine" — du Boulay 1986):

| Line | Action | var1 | var2 | output |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |

**Actual output:** `<...>`  — matched your prediction? If not, log it below.

## Faded Practice
%% The rung between reading an example and writing from scratch. Blank the load-bearing line. %%
Complete the missing line (the loop condition / accumulator update / base case / collector):
```java
<code with ONE key line replaced by ______>
```
> [!answer]- Answer
> <answer and brief reason>

Progression as this topic matures: read labeled example → reorder scrambled lines (Parsons) → complete-the-code → write from a blank editor.

## Common Mistakes
- <mistake> → <why it's wrong / the rule>

## Examples and Non-Examples
**Example:**
```java
<correct usage>
```
**Non-Example** (names the FALSE belief it kills):
```java
<wrong usage>  // FALSE BELIEF: "<the misconception>"
```

## Recall Questions
%% Reviewed through the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), NOT by rereading.
Bias toward WHY/HOW over WHAT (elaborative interrogation, Dunlosky 2013).
Format: question line, then a line that is exactly "?", then the answer. %%
#flashcards/java/<topic>

Why does <...>?
?
Because <...>
<!--SR:!2026-07-26,3,250-->

What is the difference between <A> and <B>?
?
<A> ..., <B> ...
<!--SR:!2026-07-23,0,230-->

## Mini Practice
%% Each item gets a SUCCESS CRITERION so there is built-in feedback (deliberate practice). %%
1. Write a program that <task>. **Expected output:** `<...>`  (predict, then run.)

## Mistake Log
%% When you get one wrong, add it to 90 - Mistake Log with this schema, and LINK the rule — don't restate it. %%
Log misses to [[<section mistake log>]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[<opposite or sibling concept>]]
- Map: [[<MOC or parent topic>]]
- Related: [[<nearby concept>]]
- Prerequisites: [[<what you need first>]]

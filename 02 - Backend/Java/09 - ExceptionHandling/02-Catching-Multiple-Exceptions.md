---
aliases:
  - Multi-Catch
type: concept
topic: exception-handling
status: learning
difficulty: medium
tags:
  - java
  - exceptions
  - multiple-catch
  - catch-ordering
  - finally
---
# Catching Multiple Exceptions

## What it is

One `try` block can be followed by **several `catch` blocks**. When an exception is thrown, Java tests the handlers **top to bottom and runs the first one whose type is compatible** — then skips the rest. It is *not* a best-match search; it is first-match-wins in source order.

For unrelated types that share the same handling, a single **multi-catch** (`A | B`) collapses them into one block.

## Why it matters

Different failures usually need different responses, and one method may fail in several ways:

- invalid text input → ask for a number (`NumberFormatException`)
- division by zero → explain the denominator rule (`ArithmeticException`)
- missing file → report the path (`FileNotFoundException`)
- anything unforeseen → log it and let it propagate to a boundary

Separate handlers let each failure get the right recovery instead of one vague catch-all.

## Syntax / Pattern

```java
try {
    // risky code
} catch (SpecificException e) {   // most specific first
    // targeted handling
} catch (Exception e) {           // broadest fallback last
    // generic handling
} finally {
    // optional cleanup — runs no matter what (even on return)
}
```

## Ordering Rule

Handlers must run **most specific → most general**. If a broader type is listed before one of its subtypes, the subtype's block becomes *unreachable* and the code **will not compile**.

```java
// CORRECT — narrowing to widening
try { risky(); }
catch (ArithmeticException e) { /* specific */ }
catch (RuntimeException e)   { /* broader  */ }
catch (Exception e)          { /* broadest */ }
```

```java
// COMPILE ERROR — Exception already covers ArithmeticException
try { risky(); }
catch (Exception e)          { }
catch (ArithmeticException e) { }   // error: exception has already been caught
```

## Worked Example

```java
public class Calculator {

    public static int divide(String left, String right) {
        try {
            int numerator   = Integer.parseInt(left);    // 1. may throw NumberFormatException
            int denominator = Integer.parseInt(right);    // 1. (same)
            return numerator / denominator;               // 2. may throw ArithmeticException on /0
        } catch (NumberFormatException e) {               // 3. bad text lands here
            System.out.println("Both values must be valid integers.");
        } catch (ArithmeticException e) {                 // 4. divide-by-zero lands here
            System.out.println("The denominator cannot be zero.");
        } finally {
            System.out.println("Division attempt completed."); // 5. always runs
        }
        return 0;                                         // 6. reached only after a caught failure
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Calculator.divide("20", "4");       // clean path
        Calculator.divide("twenty", "4");   // NumberFormatException path
        Calculator.divide("20", "0");       // ArithmeticException path
    }
}
```

**Explain in plain English (EiPE):** each call routes its specific failure to its own handler, `finally` always prints the completion line, and only failing calls fall through to `return 0`.

## Trace

**Predict the output first (write it before reading on):**  `___`

| # | `main()` call | What happens inside `divide` | Output |
|---|---|---|---|
| 1 | `divide("20", "4")` | parse ok → `20 / 4 = 5`; `finally` runs, *then* returns `5` | `Division attempt completed.` |
| 2a | `divide("twenty", "4")` | `parseInt("twenty")` throws `NumberFormatException` → first matching catch | `Both values must be valid integers.` |
| 2b | *(same call)* | `finally` runs, then returns `0` | `Division attempt completed.` |
| 3a | `divide("20", "0")` | parse ok → `20 / 0` throws `ArithmeticException` → second catch | `The denominator cannot be zero.` |
| 3b | *(same call)* | `finally` runs, then returns `0` | `Division attempt completed.` |

**Actual output:**
```
Division attempt completed.
Both values must be valid integers.
Division attempt completed.
The denominator cannot be zero.
Division attempt completed.
```
The return values (`5`, `0`, `0`) are never printed — `main` ignores them. Note step 1: `finally` runs *before* the `return` value leaves the method.

## Multi-Catch

When several **unrelated** exception types need the *same* handling, list them with `|` in one block:

```java
try {
    riskyOperation();
} catch (IllegalArgumentException | IllegalStateException e) {
    System.out.println("Invalid operation: " + e.getMessage());
}
```

Rules:
- separate the alternatives with `|`
- the alternatives **cannot be in a parent–child relationship** (they must be disjoint)
- the caught variable `e` is implicitly **final** — you cannot reassign it

```java
// COMPILE ERROR — types must be disjoint
catch (RuntimeException | NumberFormatException e) { }
// NumberFormatException is already a subtype of RuntimeException,
// so listing both is redundant and illegal.
```

## Faded Practice

Fill the blank so this compiles and gives the missing-file case its own message (the load-bearing decision is *which type is more specific*):

```java
import java.io.*;

try {
    readConfig();                         // declares throws IOException
} catch (______ e) {                      // most specific — must come first
    System.out.println("Config file missing: " + e.getMessage());
} catch (IOException e) {
    System.out.println("I/O failed while reading config.");
}
```

> [!answer]- Answer
> `FileNotFoundException`. It is a subclass of `IOException`, so it must be caught **before** the broader `IOException`. Reverse the order and the `FileNotFoundException` block is unreachable → compile error.

## Common Mistakes

- Putting `catch (Exception e)` (or any broader type) before a specific one → unreachable-catch **compile error**.
- Writing several catch blocks with identical bodies → use **multi-catch** instead.
- Listing a parent and its child in one multi-catch → "types must be disjoint" error.
- Catching an exception the `try` block cannot actually throw → for *checked* types this is a compile error; for unchecked it is dead code.
- Swallowing the exception (empty catch) → the failure vanishes silently.
- Returning a misleading default (like `0`) after failure → the caller can't tell success from failure.
- Assuming every catch runs → **exactly one** catch handles a given throw; `finally` then runs once.
- Re-throwing without preserving the cause → wrap as `new XException("context", e)`, not `new XException("context")`.

## Catch or Propagate?

Don't catch an exception just because you can. If a method cannot *meaningfully recover*, let the exception propagate to a layer that can:

```java
public void processOrder(Order order) {   // no try/catch — nothing useful to do here
    validate(order);
    save(order);
}
```

A higher boundary then turns the failure into a user message, an HTTP error, a log entry, or a retry decision.

## When to Use What

| Situation | Better choice |
|---|---|
| Different recovery per failure | Separate `catch` blocks |
| Same recovery for unrelated types | Multi-catch (`A \| B`) |
| Cannot recover at this layer | Let it propagate |
| Guaranteed resource cleanup | Try-with-resources |
| Final non-resource cleanup | `finally` |

## Examples and Non-Examples

**Example** (specific first, fallback last — compiles):
```java
try { risky(); }
catch (ArithmeticException e) { /* handle /0 */ }
catch (Exception e)          { /* everything else */ }
```

**Non-Example:**
```java
try { risky(); }
catch (Exception e)           { }
catch (ArithmeticException e) { }   // COMPILE ERROR: unreachable
// FALSE BELIEF: "catch order doesn't matter — Java picks the best-matching handler."
// It doesn't: Java runs the FIRST compatible catch in source order.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/exceptions

In what order does Java test multiple catch blocks, and which one runs?
?
Top to bottom in source order; the **first** catch whose type is compatible with the thrown exception runs, and the rest are skipped. It is first-match, not best-match.

Why must a specific exception be caught before a broader supertype?
?
A broader catch listed first already covers the subtype, making the later specific block **unreachable** — a compile-time error.

When should you use multi-catch (`A | B`) instead of separate catches?
?
When two or more **unrelated** exception types need the *same* handling. It removes duplicated catch bodies.

## Mini Practice

Write and run:
```java
public static int readArrayValue(String indexText)
```
It should: (1) parse `indexText` to an `int`, (2) index a fixed `int[]` such as `{10, 20, 30}`, (3) `catch (NumberFormatException e)`, (4) `catch (ArrayIndexOutOfBoundsException e)`, (5) use `finally` to print `"Lookup finished"`, then return the value (or `-1` on failure).

Predict each output before running:
- `readArrayValue("1")` → **Expected output:** `Lookup finished` (returns `20`)
- `readArrayValue("nine")` → **Expected output:** a `NumberFormatException` message, then `Lookup finished` (returns `-1`)
- `readArrayValue("9")` → **Expected output:** an out-of-bounds message, then `Lookup finished` (returns `-1`)

## Mistake Log

Log misses to [[Exceptions Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[01-Try-Catch-and-Finally]] (single handler) vs many handlers here; separate catches vs multi-catch.
- Map: [[Java MOC]]
- Related: [[Try-With-Resources]] · [[Exception Hierarchy]] · [[Checked vs Unchecked Exceptions]]
- Prerequisites: [[01-Try-Catch-and-Finally]]

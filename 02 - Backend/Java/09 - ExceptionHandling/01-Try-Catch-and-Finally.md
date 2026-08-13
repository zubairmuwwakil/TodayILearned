---
type: concept
topic: exception-handling
status: learning
difficulty: medium
tags:
  - java
  - exceptions
  - try-catch
  - finally
  - exception-handling
---
# Try, Catch, and Finally

## What it is

An **exception** is an object representing an abnormal condition that interrupts normal program flow. When something goes wrong, Java **throws** an exception, then searches up the call stack for a compatible `catch` block, transfers control to that handler, and — once handled — resumes *after* the try/catch structure.

The `try`/`catch`/`finally` statement wraps that flow:

- `try` — code that might throw.
- `catch (Type e)` — the handler that runs *only if* a matching exception is thrown.
- `finally` — cleanup that runs **whether or not** an exception occurred.

Every exception is a `Throwable`. The two branches you care about are `Error` and `Exception`:

| Category | Meaning | Typical handling |
|---|---|---|
| `Error` | Serious JVM / environment failure (`OutOfMemoryError`, `StackOverflowError`) | Usually **not** caught by application code |
| `Exception` | A condition an application may recover from (`IOException`, `IllegalArgumentException`) | Often caught or declared |

> [!important]
> Not every exception should be caught. Catch one only when the current layer can **recover**, **add useful context**, or **perform necessary cleanup**. Otherwise let it propagate.

## Why it matters

Separating "what to do" from "what to do when it fails" keeps the happy path readable while still handling errors deliberately. A precise `catch` recovers from the failures you expect and lets the unexpected ones surface loudly (with a stack trace) instead of corrupting state silently. `finally` guarantees resources are released even when the code above it blows up.

## Syntax / Pattern

```java
try {
    // code that may throw an exception
} catch (SpecificException e) {
    // handling code — runs only if a matching exception is thrown
} finally {
    // cleanup — runs whether or not an exception occurred
}
```

Both `catch` and `finally` are optional individually, but a `try` needs at least one of them. Catch the **most specific** type you can handle.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};

        try {
            // 1. this line throws — index 8 does not exist in a length-3 array
            System.out.println(numbers[8]);
            // 2. skipped: control left the try the instant line 1 threw
            System.out.println("This never prints");
        } catch (ArrayIndexOutOfBoundsException e) {
            // 3. the matching handler runs; e.getMessage() describes the fault
            System.out.println("Invalid array index: " + e.getMessage());
        } finally {
            // 4. cleanup — always runs, exception or not
            System.out.println("Array operation finished.");
        }

        // 5. flow resumes AFTER the whole structure, not at the throwing line
        System.out.println("Program continues.");
    }
}
```

**Explain in plain English (EiPE):** a bad array access throws, the rest of the `try` is abandoned, the matching `catch` reports it, `finally` cleans up, and the program carries on past the block.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Runs? | Output |
|---|---|---|---|
| 1 | `System.out.println(numbers[8]);` | throws | — |
| 2 | `System.out.println("This never prints");` | skipped | — |
| 3 | `catch` → print message | yes | `Invalid array index: Index 8 out of bounds for length 3` |
| 4 | `finally` → print | yes | `Array operation finished.` |
| 5 | `System.out.println("Program continues.");` | yes | `Program continues.` |

**Actual output:**
```text
Invalid array index: Index 8 out of bounds for length 3
Array operation finished.
Program continues.
```
The throw jumps straight from line 1 to the `catch` — line 2 never executes. The exact wording of the message can differ by Java version.

## Faded Practice
Fill the blank so `close()` is guaranteed to run even when `nextLine()` throws (the load-bearing decision):
```java
Scanner scanner = new Scanner(System.in);
try {
    System.out.println(scanner.nextLine());
} ______ {                 // which block always runs, success or failure?
    scanner.close();
}
```
> [!answer]- Answer
> `finally`. A `catch` runs only when a matching exception is thrown, so cleanup placed there would be skipped on the success path (and on unmatched exceptions). `finally` runs on every path. In modern Java, prefer **try-with-resources** for closeables — it auto-closes for you:
> ```java
> try (Scanner scanner = new Scanner(System.in)) {
>     System.out.println(scanner.nextLine());
> }   // scanner.close() called automatically
> ```

> [!note]
> `finally` almost always runs, but it is not an absolute guarantee: `System.exit`, JVM termination, a killed process, or a catastrophic failure can bypass it.

## Checked vs Unchecked Exceptions

| Kind | Rule | Examples |
|---|---|---|
| **Checked** | Compiler forces you to `catch` or declare with `throws` | `IOException`, `SQLException` |
| **Unchecked** | Subclasses of `RuntimeException`; compiler does not require handling | `NullPointerException`, `IllegalArgumentException`, `ArithmeticException` |

Unchecked exceptions usually signal a programming bug (fix the code); checked exceptions usually signal a foreseeable external failure (handle or propagate it).

## Accessing Exception Information

```java
catch (Exception e) {
    System.out.println(e.getMessage());  // short human-readable description
    e.getCause();                        // the wrapped underlying exception, if any
    e.printStackTrace();                 // full call path + source locations (debugging)
}
```

A stack trace shows the exact call path that led to the failure — invaluable for locating the source line. Preserve the original cause when wrapping (`new MyException("...", e)`) so it isn't lost.

## Common Mistakes
- Empty `catch` block → you have silenced the error; log it, handle it, or don't catch it.
- Catching `Exception` (or `Throwable`) everywhere → hides real bugs; catch the **specific** type you can actually handle.
- Placing a broad `catch` before a narrower one → **compile error** ("exception X has already been caught"); order handlers most-specific first.
- Using exceptions for ordinary control flow → they are for *exceptional* conditions, not loop exits.
- Assuming execution resumes at the line that threw → it resumes **after** the try/catch, not mid-`try`.
- `return`/`throw` inside `finally` → it **overrides** any return or exception from the `try`, silently swallowing it.
- Catching `Error` as routine recovery → those signal unrecoverable JVM problems; let them terminate.

## Examples and Non-Examples

**Example — recover from an expected, specific failure:**
```java
try {
    int age = Integer.parseInt(input);
} catch (NumberFormatException e) {   // exactly the failure we can handle
    System.out.println("Age must be a whole number.");
}
```

**Non-Example — swallowing everything:**
```java
try {
    riskyOperation();
} catch (Exception e) {
    // do nothing
    // FALSE BELIEF: "catching an exception fixes the problem."
    // Catching only decides who handles it; an empty catch hides the bug entirely.
}
```

**Non-Example — cleanup in the wrong block:**
```java
Scanner s = new Scanner(System.in);
try {
    s.nextLine();
} catch (Exception e) {
    s.close();   // FALSE BELIEF: "catch runs on every path, so cleanup belongs here."
}                // If nextLine() succeeds, catch is skipped and s is never closed. Use finally.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/exception-handling

What is the difference between `Error` and `Exception`?
?
Both extend `Throwable`. `Error` signals serious JVM/environment failures normally not caught by app code; `Exception` signals conditions an application may reasonably handle.

What is `finally` for, and when might it NOT run?
?
Guaranteed cleanup on every path (success or failure). It can be bypassed by `System.exit`, JVM/process termination, or catastrophic failure.

Does catching an exception fix the underlying bug?
?
No. Catching only decides who handles it. An empty or overly broad catch hides the real problem; you still must recover, add context, or clean up.

## Mini Practice
Write a program that reads two integers, divides the first by the second, and handles the failures. **Predict each output before running.**

1. Parse both inputs and print `first / second`. **Expected output** for `10` and `2`: `5`.
2. Catch invalid number input separately from division by zero (two `catch` blocks). **Expected output** for input `abc`: a message about non-numeric input — *not* a raw stack trace.
3. **Expected output** for `10` and `0`: a "cannot divide by zero" message (integer division by zero throws `ArithmeticException`).
4. Print a final "Done." message from a `finally` block. **Success criterion:** `Done.` prints in all three cases above.

## Mistake Log
Log misses to [[Exception Handling Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: `finally` (manual always-run cleanup) vs [[Try-With-Resources]] (automatic close)
- Map: [[Exception Handling MOC]]
- Related: [[Checked vs Unchecked Exceptions]] · [[Throwing and Declaring Exceptions]] · [[Custom Exceptions]] · [[Multi-Catch]]
- Prerequisites: [[Inheritance in Java]] (exceptions form a class hierarchy) · [[classes and objects]]

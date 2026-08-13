---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - program-structure
---
# Basic Java Program Structure

## What it is

Every Java program is source code **organized inside a class**, and execution begins at a special method: `public static void main(String[] args)`. The JVM loads your class, finds `main`, and runs its statements top to bottom. Braces `{ }` group code into blocks; a semicolon `;` ends a statement.

## Why it matters

This is the skeleton under *every* Java file you will ever write. Once the four moving parts — class, `main`, braces, semicolons — click, unfamiliar code stops looking like noise and starts looking like structure you can read and edit.

## Syntax / Pattern

```java
public class ClassName {                          // file must be ClassName.java
    public static void main(String[] args) {      // entry point the JVM calls
        // statements run here, top to bottom
    }
}
```

Class = *where code lives*. `main` = *where execution starts*.

## Worked Example

```java
public class Hello {                              // 1. class declaration — file MUST be Hello.java
    public static void main(String[] args) {      // 2. main: the entry point the JVM calls first
        System.out.println("Hello");              // 3. first statement — prints, then a newline
        System.out.println("World");              // 4. second statement — prints, then a newline
    }
}
```

**Explain in plain English (EiPE):** the JVM locates `main`, then runs its statements in order, printing each string on its own line.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | What happens | Output |
|---|---|---|---|
| 1 | `public class Hello {` | JVM loads the class (nothing prints yet) | — |
| 2 | `public static void main(String[] args) {` | JVM calls `main` to begin execution | — |
| 3 | `System.out.println("Hello");` | prints text, then a newline | `Hello` |
| 4 | `System.out.println("World");` | prints text, then a newline | `World` |

**Actual output:**
```
Hello
World
```
Two separate lines, because `println` adds a newline after each string.

## Faded Practice

Fill the blank so the JVM will accept this as a runnable entry point (the load-bearing decision):
```java
public class Hello {
    public ______ void main(String[] args) {   // which modifier lets the JVM call main without an object?
        System.out.println("Hi");
    }
}
```
> [!answer]- Answer
> `static`. `main` must be `static` so the JVM can call it **without creating an instance** of the class. Omit it and the code still compiles, but launching fails with `Error: Main method is not static in class Hello`.

## Common Mistakes

- File name doesn't match the public class → a file holding `public class Hello` must be named `Hello.java`.
- Missing semicolon → most statements must end with `;`; the compiler stops at the next unexpected token.
- Missing or mismatched braces → every `{` needs a matching `}`; blocks nest, so count them in pairs.
- Making a top-level class `private` or `protected` → not allowed; a top-level class can only be `public` or package-private (no modifier).
- Writing `main` without `static` → the JVM invokes `main` before any object exists, so it must be `static`, or launch fails.
- Mistyping the signature → only `public static void main(String[] args)` (or `String... args`) is recognized as the entry point.
- Assuming a project has exactly one `main` → any class can declare `main`; you choose which one runs.

## Examples and Non-Examples

**Example:**
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Run me");   // compiles and runs
    }
}
```

**Non-Example:**
```java
private class Main {   // FALSE BELIEF: "a top-level class can take any access modifier"
    public static void main(String[] args) {
        System.out.println("Run me")   // and: missing semicolon
    }
}
```
A top-level class accepts only `public` or package-private — `private`/`protected` are compile errors, and the missing `;` is a second one.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/program-structure

Why must `main` be `static`?
?
So the JVM can call it without first creating an instance of the class; otherwise launch fails with "Main method is not static".

## Mini Practice

1. Write a `HelloWorld` program from memory that prints `Hello, World!`. **Expected output:** `Hello, World!` (predict it, then run).
2. Delete one closing `}`, then compile. **Success criterion:** you can point to the `'}' expected` / "reached end of file while parsing" error and add the brace back.
3. Remove `static` from `main`, compile, and run. **Success criterion:** it compiles but launching fails with `Main method is not static` — restore `static` to fix it.
4. Rename the public class (e.g. `Hello` → `Greeter`). **Success criterion:** the code only runs once you rename the file to `Greeter.java`.

## Mistake Log

Log misses to [[Java Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[classes and objects]] — a class is the compile-time blueprint; an object is the runtime instance.
- Map: [[Java Fundamentals MOC]]
- Related: [[Printing Output]] · [[Java Typing System and Naming Conventions]]
- Prerequisites: [[Java Execution Model - JDK JRE JVM]]

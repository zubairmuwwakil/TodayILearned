---
aliases:
  - Primitive Types
  - Primitive Data Types
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - primitive-types
---
# Primitive Types, Null, and Defaults

## What it is

Java's **primitive types** hold a raw value — a number, a single character, or a truth value — **directly in the variable**, with no object involved. There are exactly **8**: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`.

`null` is **not** a primitive type. It is a special value that a *reference* variable holds when it points to no object, so **only reference types** (like `String`) can be `null`.

Two initialization rules follow from where a variable lives:
- **Fields** (declared at class level) receive **automatic default values**.
- **Local variables** (declared inside a method) get **no default** — you must initialize them before reading, or the code will not compile.

| Type | Bits | Default (as field) |
|---|---|---|
| `byte` | 8 | `0` |
| `short` | 16 | `0` |
| `int` | 32 | `0` |
| `long` | 64 | `0L` |
| `float` | 32 | `0.0f` |
| `double` | 64 | `0.0` |
| `char` | 16 | `'\u0000'` (null character, code point 0) |
| `boolean` | — | `false` |

Reference types (e.g. `String`, arrays, any class) default to `null`. `char` is unsigned (0–65,535); the integer types are signed; `boolean`'s exact storage size is left undefined by the JVM spec.

## Why it matters

Most beginner bugs in this area are compile-time, not runtime: assigning `null` to a primitive, forgetting a `float`/`long` suffix, or reading an uninitialized local. Knowing which variables are guaranteed a default (fields) and which are not (locals) removes a whole class of "why won't this compile / why is this 0?" confusion.

## Syntax / Pattern

```java
byte  b   = 100;
short s   = 30000;
int   age = 25;
long  pop = 8_000_000_000L;   // L: literal is a long, not an int
float t   = 36.5f;            // f: literal is a float, not a double
double p  = 19.99;
char  g   = 'A';              // single quotes
boolean a = true;

String city = null;           // only reference types may hold null
```

## Worked Example

```java
public class Main {
    // 1. fields declared without an initializer -> automatic defaults
    static int score;
    static boolean active;
    static String name;

    public static void main(String[] args) {
        // 2. locals must be initialized explicitly before use
        int age = 25;
        String city = null;   // a reference type CAN be null

        // 3. print to compare assigned values against field defaults
        System.out.println(age);    // 25
        System.out.println(score);  // 0     (int field default)
        System.out.println(active); // false (boolean field default)
        System.out.println(name);   // null  (reference field default)
        System.out.println(city);   // null  (explicitly assigned)
    }
}
```

**Explain in plain English (EiPE):** the fields print their built-in defaults (`0`, `false`, `null`) even though nothing assigned them, while the locals print exactly what we gave them.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Kind | Value | Output |
|---|---|---|---|---|
| 1 | `int age = 25;` | local (initialized) | `25` | — |
| 2 | `String city = null;` | local reference | `null` | — |
| 3 | `System.out.println(age);` | read local | `25` | `25` |
| 4 | `System.out.println(score);` | read static field | `0` (default) | `0` |
| 5 | `System.out.println(active);` | read static field | `false` (default) | `false` |
| 6 | `System.out.println(name);` | read static field | `null` (default) | `null` |
| 7 | `System.out.println(city);` | read local | `null` | `null` |

**Actual output:**
```
25
0
false
null
null
```
The fields never appear in an assignment, yet they print sensible defaults — that is the default-value rule doing its job.

## Faded Practice

Fill the blank so the code compiles and prints `null` (the load-bearing decision — which category of type can legally hold `null`?):

```java
public class Main {
    public static void main(String[] args) {
        ______ message = null;
        System.out.println(message);   // prints: null
    }
}
```

> [!answer]- Answer
> A **reference type** — e.g. `String`. A primitive such as `int` cannot hold `null` (`int message = null;` fails with *"incompatible types: <null> cannot be converted to int"*) because a primitive stores a value directly, not a reference to an object.

## Common Mistakes

- Treating `null` as a data type → it is a *value*, and only reference types can hold it.
- Assigning `null` to a primitive (`int x = null;`) → won't compile: *"cannot be converted to int"*; primitives store values, not references.
- Omitting the `f` on a float literal (`float t = 36.5;`) → `36.5` is a `double`; the assignment is a lossy narrowing. Write `36.5f`.
- Omitting `L` on a large long literal (`long p = 8000000000;`) → javac reports *"integer number too large"* because the literal is read as an `int` (max 2,147,483,647). Add `L`.
- Expecting local variables to get defaults → only fields do; reading an uninitialized local is a compile error (*"variable x might not have been initialized"*).
- Using double quotes for a `char` (`char c = "A";`) → `char` uses single quotes; `"A"` is a `String`.

## Examples and Non-Examples

**Examples**

```java
double average = 87.5;    // double literal, no suffix needed
char letter = 'Z';        // single quotes -> a char
boolean passed = true;
String message = null;    // reference type may hold null
```

**Non-Examples**

```java
int age = null;      // FALSE BELIEF: "any variable can be null" — primitives can't; won't compile
char grade = "A";    // FALSE BELIEF: "the quote style doesn't matter" — "A" is a String, not a char
float temp = 36.5;   // FALSE BELIEF: "decimal literals are floats" — 36.5 is a double; needs 36.5f
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/primitive-types

Do local variables get default values?
?
No. Locals must be explicitly initialized before use or the code won't compile. Only **fields** receive automatic defaults.

Why does `float temp = 36.5;` fail to compile?
?
`36.5` is a `double` literal, so assigning it to a `float` is a lossy narrowing conversion. Write `36.5f`.

## Mini Practice

1. Declare one variable of each of the 8 primitive types, assign each a value, and print them. **Expected output:** 8 lines showing your assigned values (predict them first, then run).
2. Write `int x;` as a **local**, then `System.out.println(x);`. Predict, then compile. **Success criterion:** the compiler error *"variable x might not have been initialized"*.
3. Move that same variable up to a `static int x;` **field** and print it. **Expected output:** `0` — proof that fields, unlike locals, get defaults.

## Mistake Log

Log misses to [[Java Fundamentals Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Primitive vs Reference Variables]] — a primitive stores the value; a reference stores an address (and can be `null`).
- Map: [[Java Fundamentals MOC]]
- Related: [[Variables and Types]] · [[Character Input and Unicode ASCII]]
- Prerequisites: [[Variables and Types]]

---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - type-system
  - naming-conventions
---
# Java Typing System and Naming Conventions

## What it is

Two independent ideas that together describe how Java treats identifiers and their values:

- **Static typing** — every variable's type is fixed at declaration and checked by the **compiler**, before the program runs.
- **Strong typing** — Java refuses to silently mix incompatible types; converting between them needs an explicit, valid cast.
- **Naming conventions** — community-standard casing (camelCase / PascalCase / UPPER_SNAKE_CASE) that the compiler does *not* enforce but every Java codebase follows.

These are separate axes: "static vs dynamic" is *when* types are checked; "strong vs weak" is *how strict* the mixing rules are. Java is both static and strong.

## Why it matters

Static + strong typing catches whole classes of bugs at compile time instead of in production — a misspelled type or a `String` where an `int` belongs never even runs. Naming conventions carry no compiler weight but are load-bearing for *humans*: consistent casing lets a reader tell a class from a variable from a constant at a glance, which is why they read as "professional" Java.

## Syntax / Pattern

```java
int age = 25;                       // variable / parameter  -> camelCase
boolean isLoggedIn = true;          // boolean often reads like a yes/no question (is/has/can)

class BankAccount { }               // class / interface     -> PascalCase
void transferFunds() { }            // method                -> camelCase

static final int MAX_USERS = 100;   // constant              -> UPPER_SNAKE_CASE
```

## Worked Example

```java
public class StudentProfile {
    public static void main(String[] args) {
        // 1. declare each variable with a fixed type + camelCase name
        String firstName = "Z";
        int studentAge = 25;
        boolean isEnrolled = true;

        // 2. printf matches each value to a type-specific placeholder
        System.out.printf("%s is %d. Enrolled: %b%n",
                firstName, studentAge, isEnrolled);
    }
}
```

**Explain in plain English (EiPE):** each variable is locked to one type at declaration, and `printf` prints them through placeholders that must match those types (`%s` String, `%d` int, `%b` boolean).

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `firstName` | `studentAge` | `isEnrolled` | Output |
|---|---|---|---|---|---|
| 1 | `String firstName = "Z";` | `"Z"` | — | — | — |
| 2 | `int studentAge = 25;` | `"Z"` | `25` | — | — |
| 3 | `boolean isEnrolled = true;` | `"Z"` | `25` | `true` | — |
| 4 | `System.out.printf("%s is %d. Enrolled: %b%n", ...)` | `"Z"` | `25` | `true` | `Z is 25. Enrolled: true` |

**Actual output:** `Z is 25. Enrolled: true` — `%b` prints `true`/`false`, and `%n` ends the line. Each placeholder is bound to the argument's static type; passing `studentAge` to `%s` would still work (any object stringifies), but passing `firstName` to `%d` throws an `IllegalFormatConversionException`.

## Faded Practice

Fill the blank so `MAX_USERS` is a genuine constant, not just a nicely named field (the load-bearing keyword):
```java
public class Config {
    public static ______ int MAX_USERS = 100;   // UPPER_SNAKE_CASE signals intent — what enforces it?
}
```
> [!answer]- Answer
> `final` — the UPPER_SNAKE_CASE name only *signals* "don't reassign me"; `final` is what actually makes reassignment a compile error. `static` shares one copy across all instances; `final` locks the value. A constant is conventionally `static final`.

## Common Mistakes

- Calling Java dynamically typed → it is **statically** typed; types are checked at compile time, not runtime.
- Expecting a declared variable to switch type later → its type is fixed at declaration; `x = "cat"` on an `int x` is a compile error.
- Calling Python "weakly typed" → Python is dynamically typed but **strongly** typed (`"1" + 1` raises a `TypeError`). Strong/weak and static/dynamic are different axes.
- Using snake_case for variables → it compiles, but Java convention is camelCase; UPPER_SNAKE_CASE is reserved for constants.
- Naming an identifier with a reserved word (`class`, `static`, `if`) or starting it with a digit → both are compile errors.
- Treating `age` and `Age` as the same variable → Java is case-sensitive; they are two distinct identifiers.

## Examples and Non-Examples

**Examples:**
```java
int totalScore = 95;              // camelCase variable
String favoriteCity = "Toronto";  // camelCase variable
static final int MAX_RETRIES = 3; // UPPER_SNAKE_CASE constant
```

**Non-Examples:**
```java
int total_score = 95;   // FALSE BELIEF: "snake_case is fine in Java" — it compiles, but violates convention
String 1city = "T";     // FALSE BELIEF: "identifiers can start with anything" — must begin with letter, _, or $
int class = 5;          // FALSE BELIEF: "any word can be a name" — 'class' is a reserved keyword

int x = 5;
x = "cat";              // FALSE BELIEF: "a variable can change type" — incompatible types, compile error
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/typing-and-naming

What does "statically typed" mean, and when are types checked?
?
Every variable's type is fixed at declaration and verified by the compiler **before** the program runs — type errors surface at compile time, not runtime.

What does "strongly typed" mean?
?
The language refuses to silently mix incompatible types; converting between them requires an explicit, valid cast. It is a separate axis from static/dynamic.

## Mini Practice

1. Declare `int score = 95;` then add the line `score = "A";` and compile. **Expected output:** a compiler error like `incompatible types: String cannot be converted to int`. (Predict the message, then run.)
2. Write one class (PascalCase), one variable (camelCase), and one constant (`static final`, UPPER_SNAKE_CASE), then print all three. **Success criterion:** it compiles and each name matches its convention.
3. Change `%d` to `%s` (and vice versa) in the Worked Example's `printf`. **Predict** which swap still runs and which throws `IllegalFormatConversionException`, then run to confirm.

## Mistake Log

When you miss one, log it to [[Java Fundamentals Mistakes]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: static + strong typing (Java) vs [[Type Casting and Conversion]] (the explicit escape hatch strong typing requires)
- Map: [[Java Fundamentals MOC]]
- Related: [[Variables and Types]] · [[Primitive Types Null and Defaults]]
- Prerequisites: [[Hello World in Java]]

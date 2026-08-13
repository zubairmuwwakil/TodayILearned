---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - memory-model
---
# Primitive vs Reference Variables

## What it is

Java has two kinds of variables. A **primitive** variable holds its value **directly** (the number, character, or boolean lives inside the variable itself). A **reference** variable holds an **address** that points to an object stored elsewhere; the object is not inside the variable. Assigning one reference to another copies the *address*, so both names can point at the **same** object.

The eight primitives are `byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. Everything else — `String`, arrays, `StringBuilder`, your own classes — is a reference type.

## Why it matters

This one distinction explains a cluster of beginner surprises: why references can be `null` but primitives cannot, why mutating an object through one variable is visible through another, why `==` compares *addresses* for objects, and why `String` (immutable) behaves differently from `StringBuilder` (mutable).

## Syntax / Pattern

```java
int age = 25;                                // primitive: holds 25 directly
String name = "Z";                           // reference: holds an address to a String
StringBuilder sb = new StringBuilder("Hi");  // reference: holds an address to an object
```

Primitive → the value **is** the variable. Reference → the variable is a **handle** to an object living elsewhere.

## Worked Example

```java
public class Main {
    public static void main(String[] args) {
        // 1. create one StringBuilder object; 'a' holds its address
        StringBuilder a = new StringBuilder("Hi");
        // 2. copy the ADDRESS into 'b' — no new object is created
        StringBuilder b = a;
        // 3. mutate the shared object THROUGH b
        b.append(" Java");
        // 4. both names see the change, because both point at the same object
        System.out.println(a);
        System.out.println(b);
    }
}
```

**Explain in plain English (EiPE):** `b = a` copied the reference, not the object, so `a` and `b` are two names for one `StringBuilder` — appending through `b` is visible through `a`.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `a` refers to | `b` refers to | Output |
|---|---|---|---|---|
| 1 | `StringBuilder a = new StringBuilder("Hi");` | obj#1 = `"Hi"` | — | — |
| 2 | `StringBuilder b = a;` | obj#1 = `"Hi"` | obj#1 (same) | — |
| 3 | `b.append(" Java");` | obj#1 = `"Hi Java"` | obj#1 = `"Hi Java"` | — |
| 4 | `System.out.println(a);` | obj#1 | obj#1 | `Hi Java` |
| 5 | `System.out.println(b);` | obj#1 | obj#1 | `Hi Java` |

**Actual output:**
```
Hi Java
Hi Java
```
There was only ever **one** object. `b = a` made a second name for it, and the append mutated that shared object.

## Faded Practice
Fill the blank so mutating `b` leaves `a` untouched (the load-bearing decision):
```java
StringBuilder a = new StringBuilder("Hi");
StringBuilder b = ______;    // make b an INDEPENDENT object, not another name for a
b.append(" Java");
System.out.println(a);       // must stay: Hi
System.out.println(b);       // Hi Java
```
> [!answer]- Answer
> `new StringBuilder(a)` — this allocates a **separate** object copying the text `"Hi"`. Writing `b = a` would copy only the address, so both names would share one object and `a` would also become `"Hi Java"`. (`new StringBuilder(a.toString())` works too.)

## Common Mistakes
- Thinking `b = a` copies the object → it copies the **reference (address)**; both names then point at one shared object.
- Forgetting a reference can be `null` → dereferencing a `null` reference throws `NullPointerException`.
- Thinking a primitive can be `null` → primitives always hold a value; `int x = null;` does not compile.
- Treating `String` like `StringBuilder` → `String` is immutable, so "changing" it builds a **new** object and re-points the reference; other aliases are unaffected.
- Confusing reassignment with mutation → `b = ...` re-points `b`; `b.append(...)` mutates the object `b` points at.
- Using `==` on objects expecting content equality → `==` compares **addresses** for references; use `.equals()` to compare contents.

## Examples and Non-Examples

**Examples**
```java
int x = 5;            // primitive: holds 5 directly
String s = "Hi";      // reference: holds an address to a String object
int[] nums = {1, 2};  // reference: arrays are objects too
```

**Contrast — reassignment vs mutation (`String` is immutable):**
```java
String a = "Hi";
String b = a;          // b copies the reference (same object)
b = b + " Java";       // '+' builds a NEW String; b now points to it, a does not
System.out.println(a); // Hi
System.out.println(b); // Hi Java
```
The same-looking `b = a` had a different visible result here than in the worked example — because you **reassigned** `b` instead of **mutating** a shared object.

**Non-Example**
```java
int age = null;   // does NOT compile
// FALSE BELIEF: "every variable can be null" — primitives always hold a value; only references can be null.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/fundamentals

What does a primitive variable store, versus a reference variable?
?
A primitive stores its value directly. A reference stores an address that points to an object living elsewhere (the heap) — not the object itself.

Why can a reference be `null` but a primitive cannot?
?
`null` means "points at no object", which only makes sense for something that holds an address. A primitive always holds an actual value, so `int x = null;` won't compile.

After `StringBuilder b = a;`, why does `b.append("x")` also change what `a` prints?
?
`b = a` copied the reference, so `a` and `b` name the same object. `append` mutates that one shared object, visible through either name.

## Mini Practice
1. Point two `StringBuilder` variables at the **same** object, then `append` through one. Predict both prints, then run. **Expected output:** both print the mutated text (e.g. `Hi Java` twice).
2. Repeat with two `String` variables, using `b = b + " Java"`. **Expected output:** `a` prints the original, `b` prints the concatenation — proof that reassignment doesn't touch the other name.
3. Write down which of these are primitives and which are references: `double`, `int[]`, `boolean`, `String`, `char`, `StringBuilder`. **Success criterion:** exactly `double`, `boolean`, `char` are primitives; the rest are references.

## Mistake Log
When you miss one, log it to [[Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Java Pass by Value]] (how primitives vs references behave when passed to methods)
- Map: [[Fundamentals MOC]]
- Related: [[Variables and Types]] · [[Primitive Types Null and Defaults]] · [[String Immutability]] · [[Java Typing System and Naming Conventions]]
- Prerequisites: [[Variables and Types]]

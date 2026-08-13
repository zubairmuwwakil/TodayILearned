---
aliases:
  - Strings in Java
  - String
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - strings
---
# String Fundamentals

## What it is

A `String` is an **object that holds a sequence of characters**. `String` is a *class* (a blueprint), so a String variable stores a *reference* to a String object — unlike a primitive such as `int`, which stores the value directly.

```java
String greeting = "Hello";   // greeting refers to a String object holding H e l l o
```

Every String is **immutable**: once created, its characters never change. Operations like concatenation don't edit the original — they build and return a *new* String.

## Why it matters

Strings appear in almost every program: names, messages, user input, printed output, file paths, labels, and any text processing. They are also the first place you meet a core Java distinction — some values are **primitives**, some are **objects**:

```java
int age = 25;            // primitive: the variable IS the value
char grade = 'A';        // primitive
boolean passed = true;   // primitive
String name = "Zubair";  // object: the variable REFERS to an object
```

That reference-vs-value difference is exactly why Strings are compared with `.equals()`, not `==` (see Common Mistakes).

## Syntax / Pattern

```java
String s = "literal";              // preferred: string literal
String t = new String("literal");  // works, but rarely needed
s.length();                        // number of characters (a METHOD)
s.charAt(i);                       // char at index i (0-based)
String joined = a + " " + b;       // concatenation → a NEW String
boolean same = a.equals(b);        // content comparison
```

## Worked Example

```java
public class Greeting {
    public static void main(String[] args) {
        // 1. create two String objects from literals
        String firstName = "John";
        String lastName = "Doe";
        // 2. concatenation builds a NEW String; the originals are unchanged
        String fullName = firstName + " " + lastName;
        // 3. ask the object for its length — a method call, not a field
        System.out.println(fullName);
        System.out.println("Length: " + fullName.length());
    }
}
```

**Explain in plain English (EiPE):** it joins two names with a space into one new String, then reports how many characters that String contains.

### Indexing and looping
```java
public class LoopString {
    public static void main(String[] args) {
        String word = "Java";                       // 1. valid indexes are 0..3
        for (int i = 0; i < word.length(); i++) {   // 2. stop at length() (exclusive)
            System.out.println(word.charAt(i));     // 3. read one character by index
        }
    }
}
```
Each character sits at an index starting from `0`; the loop reads them one at a time.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `firstName` | `lastName` | `fullName` | Output |
|---|---|---|---|---|---|
| 1 | `String firstName = "John";` | `"John"` | — | — | — |
| 2 | `String lastName = "Doe";` | `"John"` | `"Doe"` | — | — |
| 3 | `String fullName = firstName + " " + lastName;` | `"John"` | `"Doe"` | `"John Doe"` | — |
| 4 | `System.out.println(fullName);` | `"John"` | `"Doe"` | `"John Doe"` | `John Doe` |
| 5 | `System.out.println("Length: " + fullName.length());` | `"John"` | `"Doe"` | `"John Doe"` | `Length: 8` |

**Actual output:** `John Doe` then `Length: 8`. The space counts as a character, so `"John Doe"` has 8 characters (`J o h n · D o e`).

## Faded Practice
Fill the blank so the loop reads every character exactly once (the load-bearing decision):
```java
String word = "Java";
for (int i = 0; i < word.______; i++) {   // how do you count a String's characters?
    System.out.println(word.charAt(i));
}
```
> [!answer]- Answer
> `length()` — with parentheses. For a `String`, length is a **method**, so `word.length()`. Only arrays expose length as a field (`numbers.length`, no parentheses). Writing `word.length` on a String fails to compile.

## Common Mistakes
- Using `.length` (no parentheses) on a String → String length is a **method**: use `.length()`. Only arrays use the `.length` field.
- Comparing Strings with `==` → `==` compares *references* (identity), not text. Use `.equals()` (or `.equalsIgnoreCase()`) for content.
- Expecting `+=` to modify the original String → Strings are **immutable**; `+=` builds a *new* String and reassigns the variable.
- Off-by-one with indexes → valid indexes are `0 .. length()-1`; `charAt(length())` throws `StringIndexOutOfBoundsException`.
- Mixing up quotes → `'A'` is a `char` (single quotes); `"A"` is a `String` (double quotes).
- Forgetting to escape a backslash → `"\U"` is an illegal escape; write `"\\"` for one literal backslash.
- Assuming `"Score: " + 10 + 5` adds the numbers → once an operand is a String, `+` concatenates left to right. Parenthesize math you want done first: `(10 + 5)`.

## Examples and Non-Examples
**Example — valid String and concatenation:**
```java
String name = "John";
String fullName = "John" + " " + "Doe";   // "John Doe"
```

**Non-Example — comparing content with `==`:**
```java
String a = new String("Hi");
String b = new String("Hi");
System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
// FALSE BELIEF: "== compares the text of two Strings"
// == compares object identity; a and b are two DIFFERENT objects. Only .equals() compares characters.
```

**Non-Example — expecting numeric addition inside a String:**
```java
System.out.println("Score: " + 10 + 5);   // Score: 105  (concatenation, left to right)
System.out.println("Score: " + (10 + 5)); // Score: 15   (parentheses force addition first)
// FALSE BELIEF: "numbers next to a String are always added"
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/strings

Why does `numbers.length` work for an array but `word.length` fail for a String?
?
For arrays, `length` is a **field**; for a `String`, length is a **method**. A String needs the parentheses: `word.length()`.

Why should you compare Strings with `.equals()` instead of `==`?
?
`==` tests whether two references point to the same object; `.equals()` tests whether the characters match. Two Strings with identical text can be different objects (e.g. via `new String(...)`), so `==` can be `false` while `.equals()` is `true`.

Strings are immutable — so what does `message += "!";` actually do?
?
It creates a brand-new String containing the old text plus `"!"` and points `message` at it. The original String object is never changed.

Why does `System.out.println("Score: " + 10 + 5)` print `Score: 105`?
?
`+` evaluates left to right, and once an operand is a String every following `+` concatenates: `("Score: " + 10) + 5` → `"Score: 10" + 5` → `"Score: 105"`. Use `(10 + 5)` to force addition first.

## Mini Practice
1. Create `firstName` and `lastName`, then print the full name. **Expected output:** the two names joined by a space. (Predict, then run.)
2. For `String word = "Java";` print `word.charAt(0)`. **Expected output:** `J`.
3. Loop through `"Java"` and print each character on its own line. **Expected output:** `J`, `a`, `v`, `a` (four lines).
4. Print the path `"C:\\Users\\Zubair"`. **Expected output:** `C:\Users\Zubair`.
5. Predict then run:
```java
System.out.println("Total: " + 5 + 3);
System.out.println("Total: " + (5 + 3));
```
**Expected output:** `Total: 53` then `Total: 8`.
6. Create `String a = new String("hi");` and `String b = new String("hi");`, then print `a == b` and `a.equals(b)`. **Success criterion:** `false` then `true` — proof that `==` and `.equals()` ask different questions.

## Mistake Log
When you miss one, add it to [[Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[StringBuilder]] (mutable text) vs `String` (immutable); `'A'` (`char`, primitive) vs `"A"` (`String`, object) — see [[Primitive Types]]
- Map: [[Java MOC]]
- Related: [[String Methods]] · [[Objects Classes and Methods]] · [[Java Arrays]] · [[For Loops]] · [[Expressions and Assignment Statements]]
- Prerequisites: [[Variables]] · [[Primitive Types]]

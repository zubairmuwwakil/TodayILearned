---
type: concept
topic: strings
status: learning
difficulty: easy
tags:
  - java
  - strings
  - string-methods
---
# String Class Methods

## What it is

A `String` is an object that stores a sequence of characters, each with an **index that starts at `0`**. Because `String` is a class, every string comes with **methods** — small pieces of behaviour that let you inspect, compare, and transform text.

```java
String message = "Hello";
```

```text
Index:  0   1   2   3   4
Char:   H   e   l   l   o
```

Key fact: `String` is **immutable**. A method like `toUpperCase()` never changes the original string — it returns a **new** string. The variable only changes if you reassign it.

## Why it matters

Strings are everywhere in Java: user input, messages, names, file paths, search text, labels. Their methods answer the everyday questions you actually ask of text — *How long is it? Does it contain this word? Where does that word start? Are these two equal? What does the uppercase version look like?* — so knowing the method names (and their sharp edges) is basic literacy for any program that touches text.

## Syntax / Pattern

```java
String result = objectName.methodName(arguments);   // methods use () and return a value
int len       = array.length;                        // arrays use a FIELD: no ()
```

A **method** runs code, so it needs parentheses. A **field** is just stored data, so it has none. Strings expose `length()` (a method); arrays expose `length` (a field). (Java says *field*, not "property"; and reusable behaviour that lives on a class is a *method*, not a standalone "function".)

## Common String Methods

| Method | Returns | Example | Result |
|---|---|---|---|
| `length()` | count of chars (incl. spaces + punctuation) | `"Hello!".length()` | `6` |
| `substring(from, to)` | chars from `from` up to **but excluding** `to` | `"Hello".substring(1, 4)` | `"ell"` |
| `substring(from)` | chars from `from` to the end | `"Hello".substring(2)` | `"llo"` |
| `indexOf(str)` | index of first match, or `-1` if absent | `"Hello Class".indexOf("Class")` | `6` |
| `toLowerCase()` | new all-lowercase copy | `"Hello".toLowerCase()` | `"hello"` |
| `toUpperCase()` | new all-uppercase copy | `"Hello".toUpperCase()` | `"HELLO"` |
| `equals(other)` | `true` if same chars in same order (case-sensitive) | `"Hi".equals("hi")` | `false` |
| `equalsIgnoreCase(other)` | like `equals`, but ignores case | `"Hi".equalsIgnoreCase("hi")` | `true` |
| `compareTo(other)` | sign gives lexicographic order (neg / 0 / pos) | `"Apple".compareTo("Banana")` | negative |

## Worked Example

```java
public class StringMethods {
    public static void main(String[] args) {
        String message = "Hello Class";                  // 1. an 11-char String (the space counts)

        System.out.println(message.length());            // 2. count every character
        System.out.println(message.substring(4, 5));     // 3. chars in range [4, 5)
        System.out.println(message.indexOf("Hello"));    // 4. where does "Hello" first appear?
        System.out.println(message.toLowerCase());       // 5. new lowercase copy
        System.out.println(message.toUpperCase());       // 6. new uppercase copy
    }
}
```

**Explain in plain English (EiPE):** each line asks `message` a different question about its text, printing the answer — and `message` itself is never modified.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | Computed value | Output |
|---|---|---|---|
| 1 | `String message = "Hello Class";` | `"Hello Class"` (11 chars) | — |
| 2 | `message.length()` | counts all 11 chars | `11` |
| 3 | `message.substring(4, 5)` | index 4 only (stops before 5) | `o` |
| 4 | `message.indexOf("Hello")` | match begins at index 0 | `0` |
| 5 | `message.toLowerCase()` | new String, original untouched | `hello class` |
| 6 | `message.toUpperCase()` | new String, original untouched | `HELLO CLASS` |

**Actual output:**
```text
11
o
0
hello class
HELLO CLASS
```
`message` is still `"Hello Class"` after all of this — lines 5 and 6 returned new strings that were printed and discarded.

## Faded Practice
Fill the blank so `word` holds `"Class"` (the load-bearing index):
```java
String message = "Hello Class";
String word = message.substring(______);   // which start index gives "Class"?
System.out.println(word);                   // Class
```
> [!answer]- Answer
> `6` — `substring(6)` returns from index 6 to the end: `"Class"`. Index 6 is the `C`; the space sits at index 5. Equivalent explicit form: `substring(6, 11)`.

## Common Mistakes
- Writing `str.length` instead of `str.length()` → `String` uses the **method** `length()`; only arrays use the `.length` **field**.
- Assuming `substring(from, to)` includes `to` → the end index is **exclusive**; it stops just before `to`.
- Treating `indexOf` `-1` like a real position → `-1` means "not found"; `0` is a valid index (the first char), so test for `-1`, not `0`.
- Comparing text with `==` → `==` compares object **references**; use `.equals()` for content.
- Expecting `.equals()` to ignore case → it is case-sensitive; use `.equalsIgnoreCase()` when case shouldn't matter.
- Memorizing exact `compareTo` numbers → only the **sign** (negative / zero / positive) is meaningful; the magnitude is an implementation detail.
- Thinking `toUpperCase()` (or any transform) edits the original → `String` is immutable; these return a **new** string you must capture.

## Examples and Non-Examples
**Example — content comparison:**
```java
String password = new String("abc123");   // e.g. built from runtime input, not interned
if (password.equals("abc123")) {   // compares the actual characters
    System.out.println("Correct password");
}
```
**Non-Example — reference comparison:**
```java
if (password == "abc123") { ... }   // false here: password is a distinct object, not the interned literal
// FALSE BELIEF: "== compares the text of two Strings" — it compares object references, not content
// (Caveat: two identical String LITERALS are interned to the same object, so == would return true for them —
//  which is exactly why == is unreliable for comparing content; always use .equals().)
```

**Example — length of a String:**
```java
"Hello".length();   // 5   (String -> method with () )
```
**Non-Example — treating length like an array field:**
```java
"Hello".length;
// FALSE BELIEF: "Strings expose a length field like arrays" — String has length(), a method
```

**Example — substring range:**
```java
"Programming".substring(0, 3);   // "Pro"
```
**Non-Example — expecting the end index inside:**
```java
"Programming".substring(0, 3);
// FALSE BELIEF: "the end index is included" — the end is exclusive, so this is "Pro", not "Prog"
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/string-methods

In `"Hello".substring(1, 4)`, why is the result `"ell"` and not `"ello"`?
?
The end index is **exclusive**: it includes indexes 1, 2, 3 and stops before 4, so index 4 (`o`) is left out.

What does `indexOf` return when the search text is absent, and why is treating it like 0 a bug?
?
It returns `-1`. Index `0` is a valid position (the first character), so mistaking "not found" for "found at start" corrupts the logic — test for `-1`.

When reading a `compareTo` result, what actually matters?
?
Only the **sign**: negative means this string sorts before the other, `0` means equal, positive means after. The exact magnitude is not meaningful.

## Mini Practice
Predict each result before you run it.
1. `String course = "Java Programming";` then print `course.length()`. **Expected output:** `16` (the space counts).
2. Print only `"Java"` from `course` with `substring`. **Expected output:** `Java` (`substring(0, 4)`).
3. Use `indexOf` to find where `"Programming"` starts in `course`. **Expected output:** `5`.
4. Evaluate `"apple".compareTo("banana")`. **Success criterion:** you predict a **negative** result (`'a'` < `'b'`) before running.
5. Read a password from the user and check it against `"secret123"` with `.equals()`. **Success criterion:** it matches only on an exact, case-sensitive match (`Secret123` fails).

## Mistake Log
When you miss one, add it to [[Strings Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[String]] (immutable text) vs [[StringBuilder]] (mutable buffer)
- Map: [[Strings MOC]]
- Related: [[String Fundamentals]] · [[Java Arrays]] · [[For Loops]]
- Prerequisites: [[Primitive Types]] · [[Objects Classes and Methods]] · [[Expressions and Assignment Statements]]

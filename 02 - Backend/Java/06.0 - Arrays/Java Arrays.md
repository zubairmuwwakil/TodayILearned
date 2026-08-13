---
type: concept
topic: arrays
status: learning
difficulty: easy
tags:
  - java
  - arrays
  - data-structures
---
# Java Arrays

## What it is

An **array** is a fixed-size, ordered collection of values of the **same type**, stored under one name and reached by a numeric **index** (starting at `0`). Arrays are **objects** in Java: `new int[5]` allocates the slots and hands back a reference to them. Fresh slots are **zero-filled** by default — `0` for numbers, `false` for `boolean`, `null` for object types.

## Why it matters

One name holds many related values, so 100 exam scores need one variable instead of 100. Because each element is reached by an index, arrays pair naturally with loops — the engine behind sums, searches, and building sequences. The size is chosen once at creation and cannot grow; when you need growth, that is the boundary where you reach for [[ArrayList]].

## Syntax / Pattern

```java
int[] scores;                          // declare a reference (no array yet)
scores = new int[5];                   // create 5 zero-filled slots
int[] a = new int[5];                  // declare + create in one line
int[] b = {90, 85, 100, 76, 92};       // declare + create + fill (literal)

int first = b[0];                      // read by index
b[1] = 95;                             // modify by index
int n = b.length;                      // size — a FIELD, no parentheses

for (int i = 0; i < b.length; i++) {   // classic index loop
    System.out.println(b[i]);
}
```

Any `int` expression is a valid index: `b[i + 1]`, `b[b.length - 1]`.

## Worked Example
```java
public class ArrayExample {
    public static void main(String[] args) {
        int[] scores = {90, 85, 100, 76, 92};   // 1. create and fill in one step
        System.out.println("First: " + scores[0]);   // 2. read the slot at index 0
        scores[1] = 95;                          // 3. overwrite one slot in place
        System.out.println("Second: " + scores[1]);
        System.out.println("Count: " + scores.length); // 4. size via .length (no parens)
    }
}
```

**Explain in plain English (EiPE):** it makes a 5-element `int` array, reads one element, changes another in place, and reports how many slots exist.

### Building an array with a loop (Fibonacci)
```java
import java.util.Arrays;

public class Fibonacci {
    public static void main(String[] args) {
        int[] fib = new int[10];                 // 1. reserve 10 zero-filled slots
        fib[0] = 0;                              // 2. seed the first two values
        fib[1] = 1;
        for (int i = 2; i < fib.length; i++) {   // 3. each slot = sum of the two before it
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        System.out.println(Arrays.toString(fib));   // 4. print the whole array at once
    }
}
```
Output: `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`. The loop starts at `2` because slots `0` and `1` are seeded by hand; each later slot is computed from the two already filled.

## Trace
**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `scores` contents | Output |
|---|---|---|---|
| 1 | `int[] scores = {90,85,100,76,92};` | `[90, 85, 100, 76, 92]` | — |
| 2 | `println("First: " + scores[0]);` | `[90, 85, 100, 76, 92]` | `First: 90` |
| 3 | `scores[1] = 95;` | `[90, 95, 100, 76, 92]` | — |
| 4 | `println("Second: " + scores[1]);` | `[90, 95, 100, 76, 92]` | `Second: 95` |
| 5 | `println("Count: " + scores.length);` | `[90, 95, 100, 76, 92]` | `Count: 5` |

**Actual output:**
```text
First: 90
Second: 95
Count: 5
```

## Faded Practice
Fill the blank so the loop touches every element and never runs off the end (the load-bearing decision):
```java
int[] numbers = {10, 20, 30, 40, 50};
for (int i = 0; ______; i++) {   // stop exactly at the end
    System.out.println(numbers[i]);
}
```
> [!answer]- Answer
> `i < numbers.length`. Valid indexes are `0` to `length - 1`, so `<` stops at the last real slot. Using `<=` would read `numbers[5]`, which does not exist, throwing `ArrayIndexOutOfBoundsException`.

Progression to aim for: read this labeled loop → complete-the-code (above) → write the Fibonacci builder from a blank editor → sum an array of scores (see Mini Practice).

## Common Mistakes
- Thinking indexes start at `1` → they start at `0`; the first element is `arr[0]`, the last is `arr[arr.length - 1]`.
- Writing `arr.length()` → arrays expose a **field** `arr.length` (no parentheses); classes like `String` and `StringBuilder` use the *method* `.length()`.
- Looping with `i <= arr.length` → the last valid index is `length - 1`; use `i < arr.length`.
- Reassigning with a bare brace literal after declaration → `arr = {1, 2, 3};` won't compile; use `arr = new int[]{1, 2, 3};` or fill at declaration.
- Reading an index at or past the end (or a negative one) → runtime `ArrayIndexOutOfBoundsException`; arrays are fixed-size and bounds-checked.
- Assuming `new int[n]` starts empty or garbage → it is zero-filled (`0`, `false`, or `null`).

## Examples and Non-Examples
**Example:**
```java
int[] scores = {90, 85, 100};   // one type, filled at declaration — fine
```
**Non-Example:**
```java
int[] scores = {90, "A+", 100};
// FALSE BELIEF: "one array can mix types" — an int[] holds only int; this won't compile.
```
**Non-Example:**
```java
String[] cars;
cars = {"Toyota", "BMW", "Ford"};
// FALSE BELIEF: "the {...} shorthand works anytime" — it is valid only at declaration.
```
**Non-Example:**
```java
for (int i = 0; i <= scores.length; i++) System.out.println(scores[i]);
// FALSE BELIEF: "length is the last valid index" — it is one PAST it; this overruns the array.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/arrays

Why does `i < array.length` prevent an out-of-bounds error, but `i <= array.length` cause one?
?
Valid indexes run `0` to `length - 1`. `<` stops after the last real slot; `<=` reads `array[length]`, which doesn't exist, throwing `ArrayIndexOutOfBoundsException`.

Why is it `array.length` and not `array.length()`?
?
For arrays, `length` is a public field, not a method — no parentheses. (Classes like `String` and `StringBuilder` use the `.length()` method.)

What values does `new int[3]` hold before you assign anything?
?
`0, 0, 0` — arrays are zero-filled by default (`0` for numbers, `false` for `boolean`, `null` for object types).

## Mini Practice
1. Make an `int[] ages` with 5 values; print the first and last using `ages[0]` and `ages[ages.length - 1]`. **Success criterion:** the last print stays correct even if you change the array's size.
2. Make a `String[] names` and print every name with an index `for` loop. **Expected output:** one name per line, in order. (Predict, then run.)
3. Make an `int[]` of 6 numbers and print only the values at odd indexes (`i = 1; i += 2`). **Expected output:** the 2nd, 4th, and 6th values.
4. Store the first 12 Fibonacci numbers in an array. **Expected output:** `0 1 1 2 3 5 8 13 21 34 55 89`.
5. Make an `int[]` of 5 exam scores and print their total with an accumulator loop. **Success criterion:** the printed sum equals the values added by hand.

## Mistake Log
When you miss one, log it to [[Arrays Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[ArrayList]] (fixed-size array vs resizable list) · [[Multidimensional Arrays]] (2D and beyond)
- Map: [[Java MOC]]
- Related: [[For Loops]] · [[Enhanced For Loop]] · [[Arrays Utility Class]] · [[String Fundamentals]]
- Prerequisites: [[Primitive Types]] · [[Variables]] · [[For Loops]]

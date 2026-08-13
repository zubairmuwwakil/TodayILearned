---
type: concept
topic: loops
status: learning
difficulty: easy
tags:
  - java
  - loops
  - for-loops
---
# For Loops

## What it is

A `for` loop repeats a block of code a **known number of times**, driven by a counter it manages itself. It bundles the three parts of counting — **initialization**, **condition**, and **update** — into one header, so the loop's start, stop, and step are all visible in a single line.

It is **entry-controlled**: Java checks the condition *before* each pass, so a loop whose condition is false from the start runs its body zero times.

## Why it matters

Reach for a `for` loop when the number of repetitions is known before the loop begins — the count-controlled case. Keeping the counter logic in the header (not scattered through the body) makes off-by-one errors easy to spot and the loop easy to read.

Typical uses:

- processing a fixed number of items
- printing or summing a range of numbers
- walking array or list indexes
- accumulating a total for a known item count

## Syntax / Pattern

```java
for (initialization; condition; update) {
    // repeated code
}
```

- **initialization** runs once, before the first check (usually `int i = 0`).
- **condition** is tested before every pass; the loop stops when it is false.
- **update** runs after each pass (usually `i++`).

Minimal example:

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);   // prints 1 2 3 4 5 on separate lines
}
```

## Worked Example

```java
import java.util.Scanner;

public class ShoppingCart {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double total = 0;                                   // 1. accumulator starts at a known value

        System.out.print("How many items are you buying? ");
        int itemCount = scanner.nextInt();                  // 2. fixes how many times to loop

        for (int i = 1; i <= itemCount; i++) {              // 3. one pass per item
            System.out.printf("Enter price for item %d: ", i);
            double cost = scanner.nextDouble();
            total += cost;                                  // 4. fold each price into the running total
        }

        System.out.printf("Total amount: $%.2f%n", total);  // 5. report once, after the loop
        scanner.close();
    }
}
```

**Explain in plain English (EiPE):** the loop runs once per item, adds each entered price into a running total, and then prints that sum after every item has been counted.

## Trace

**Predict the output first (write it before reading on):**  `___`

Assume the user enters `3` items with prices `10`, `5.50`, and `2.25`.

| Line | Statement | `i` | `cost` | `total` | Output |
|---|---|---|---|---|---|
| 1 | `double total = 0;` | — | — | `0.0` | — |
| 2 | `itemCount = 3` (from input) | — | — | `0.0` | — |
| 3 | `i = 1`; check `1 <= 3` ✓ | `1` | — | `0.0` | — |
| 4 | `cost = 10`; `total += cost` | `1` | `10.0` | `10.0` | — |
| 5 | `i++`; check `2 <= 3` ✓ | `2` | `10.0` | `10.0` | — |
| 6 | `cost = 5.50`; `total += cost` | `2` | `5.5` | `15.5` | — |
| 7 | `i++`; check `3 <= 3` ✓ | `3` | `5.5` | `15.5` | — |
| 8 | `cost = 2.25`; `total += cost` | `3` | `2.25` | `17.75` | — |
| 9 | `i++`; check `4 <= 3` ✗ → exit | `4` | — | `17.75` | — |
| 10 | print `total` (loop is over) | *(out of scope)* | — | `17.75` | `Total amount: $17.75` |

**Actual output:** `Total amount: $17.75`. The condition is checked **before** each pass, so the loop stops the moment `i` reaches `4` — it never runs a fourth time. `i` lives only inside the loop, so it no longer exists on line 10.

## Faded Practice

Fill the blank so the loop runs exactly once per item and stops after the last one (the load-bearing decision):

```java
for (int i = 1; ______; i++) {
    System.out.printf("Enter price for item %d: ", i);
    double cost = scanner.nextDouble();
    total += cost;
}
```

> [!answer]- Answer
> `i <= itemCount`. Starting at `1` and using `<=` means the last pass is `i == itemCount`, so an input of `3` gives passes for items 1, 2, and 3. Using `<` here would stop one item early (only 1 and 2).

Progression to aim for: read this labeled example → predict the trace → complete-the-code (above) → write the shopping-cart loop from a blank editor (see Mini Practice).

## Common Mistakes

- Starting the counter at `0` when your printed numbers begin at `1` → match the counter's start to the numbering you display.
- Using `<` when you meant `<=` (or vice versa) → decide whether the last value is *included* before choosing the operator.
- Forgetting the update `i++` → the condition never changes, giving an **infinite loop**.
- Reassigning the bound (`itemCount`) inside the body → keep the loop bound constant; change a separate variable if you need to.
- Declaring a loop-only variable (`cost`) outside the loop → declare it in the smallest scope that needs it.
- Not initializing `total` before the loop → an accumulator must start from a known value (`0`).

## Examples and Non-Examples

**Example:**

```java
for (int i = 1; i <= itemCount; i++) {   // count is known up front → for loop fits
    System.out.println(i);
}
```

Good: the number of repetitions is fixed before the loop starts (count-controlled).

**Non-Example:**

```java
int chosenNumber;
for (int i = 1; chosenNumber != 0; i++) {   // condition depends on unknown user input
    chosenNumber = scanner.nextInt();
    // FALSE BELIEF: "any repetition should be written as a for loop"
}
```

This is really a **sentinel-controlled** input loop — you don't know how many numbers the user will type. A [[While Loops|while]] loop states that intent more clearly; the `for` counter `i` here is just noise.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/for-loops

What are the three parts of a `for` loop header, and when does each run?
?
Initialization (once, before the first check), condition (tested before every pass), and update (after each pass). Written as `for (init; condition; update)`.

What is the scope of the counter declared in `for (int i = ...)`?
?
It exists only inside the loop. After the loop ends, `i` is out of scope and cannot be referenced.

## Mini Practice

1. Print the numbers from 1 to 20, one per line. **Expected output:** the integers `1` through `20`. Predict the loop header, then run.
2. Ask the user for 5 test scores and print their total. **Success criterion:** the loop runs exactly 5 times and the printed total equals the sum of the five inputs.
3. Rebuild the shopping-cart loop from a blank editor: ask how many items were bought, then sum their prices. **Expected output:** `Total amount: $<sum>` formatted to two decimals. Predict the total for a sample input, then run to confirm.

## Mistake Log

Log misses to [[Loops Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[While Loops]] (condition/sentinel-controlled) vs `for` (count-controlled)
- Map: [[Loops MOC]]
- Related: [[Loop Selection Guide]] · [[Enhanced For Loop]] · [[Scanner Input]]
- Prerequisites: [[Variables]] · [[Operators]]

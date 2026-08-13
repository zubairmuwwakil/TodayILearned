---
type: concept
topic: algorithms-and-complexity
status: learning
difficulty: easy
aliases:
  - Algorithm Characteristics
  - Algorithm Basics
  - Properties of an Algorithm
tags:
  - java
  - algorithms-and-complexity
  - algorithm-characteristics
---
# Characteristics of an Algorithm

## What it is

An algorithm is a finite, precise set of steps for solving a problem. A useful algorithm has clear inputs, clear outputs, unambiguous instructions, finite steps, effective steps, and a language-independent idea that can be implemented in Java or another language.

## Why it matters

Good algorithm vocabulary helps you break large problems into smaller steps, explain your approach to other developers, and search for help using the right terms. It also keeps you focused on scalability and performance instead of only making code work for one small example.

## Syntax / Pattern

```java
public static int solve(int input) {
    // 1. validate or prepare the input
    // 2. process the input with finite, clear steps
    int output = input;

    // 3. return the output
    return output;
}
```

## Worked Example

```java
public class Main {
    public static int max(int[] numbers) {
        // 1. choose a starting candidate
        int best = numbers[0];

        // 2. check every remaining value
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > best) {
                best = numbers[i];
            }
        }

        // 3. produce the result
        return best;
    }

    public static void main(String[] args) {
        int[] scores = {72, 91, 84};
        System.out.println(max(scores));
    }
}
```

**Explain in plain English (EiPE):** this algorithm scans the input once and returns the largest value it finds.

## Trace

**Predict the output first:** `___`

| Line | Statement | `i` | `best` | output |
|---|---|---:|---:|---|
| 1 | `int best = numbers[0];` | - | 72 | - |
| 2 | `i = 1`, compare `91 > 72` | 1 | 91 | - |
| 3 | `i = 2`, compare `84 > 91` | 2 | 91 | - |
| 4 | `return best;` | - | 91 | - |
| 5 | `System.out.println(max(scores));` | - | - | `91` |

**Actual output:** `91`

## Faded Practice

Complete the load-bearing update line:

```java
public static int min(int[] numbers) {
    int best = numbers[0];

    for (int i = 1; i < numbers.length; i++) {
        if (numbers[i] < best) {
            ______
        }
    }

    return best;
}
```

> [!answer]- Answer
> `best = numbers[i];`

## Common Mistakes

- Writing steps that are vague to humans or machines -> an algorithm should be unambiguous.
- Forgetting a stopping point -> algorithms must be finite.
- Keeping steps that do not affect the result -> each step should be effective.
- Confusing the algorithm with Java syntax -> the algorithm is the language-independent plan; Java is one implementation.
- Testing only tiny inputs -> scalability problems often appear when input size grows.

## Examples and Non-Examples

**Example:**

```java
// Find the maximum by checking each number once and tracking the best seen so far.
int best = numbers[0];
for (int i = 1; i < numbers.length; i++) {
    if (numbers[i] > best) {
        best = numbers[i];
    }
}
```

**Non-Example** (names the FALSE belief it kills):

```java
// Look through the numbers and somehow pick the biggest one.
// FALSE BELIEF: "an algorithm can leave important steps implicit"
```

## Mini Practice

1. Write pseudocode for finding whether an array contains an even number. **Success criterion:** it has a clear input, one or more clear outputs, and a finite stopping condition. Predict the result for `{3, 5, 8}` before implementing it.
2. Implement the pseudocode in Java as `containsEven(int[] numbers)`. **Expected output:** `true` for `{3, 5, 8}` and `false` for `{1, 7, 9}`. Predict, then run.

## Mistake Log

Log misses to [[Algorithms Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Big-O Notation]]
- Map: [[Algorithms and Complexity MOC]]
- Related: [[Linear Search]] · [[Binary Search]] · [[Loop Selection Guide]]
- Prerequisites: [[Basic Java Program Structure]] · [[Variables and Types]] · [[For Loops]]

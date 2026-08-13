---
type: concept
topic: algorithms-and-complexity
status: learning
difficulty: medium
aliases:
  - Big O
  - Big-O
  - Time Complexity
  - Space Complexity
  - Algorithm Complexity
tags:
  - java
  - algorithms-and-complexity
  - big-o
---
# Big-O Notation

## What it is

Big-O notation describes how an algorithm's resource use grows as input size `n` grows. In beginner Java lessons, it is usually used to discuss worst-case time complexity, but the notation itself describes an asymptotic upper bound and can also describe space complexity.

## Why it matters

When several algorithms solve the same problem, Big-O helps you compare how they scale. It lets you see why an approach that feels fine on 10 items may become unusable on 1,000,000 items.

## Syntax / Pattern

```java
public static void compareGrowth(int[] numbers) {
    // O(1): constant work
    int first = numbers[0];

    // O(n): grows with the number of elements
    for (int number : numbers) {
        System.out.println(number);
    }

    // O(log n): repeatedly cuts the search space in half
    int left = 0;
    int right = numbers.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        break; // placeholder for the keep-one-half decision
    }
}
```

Big-O drops constants and lower-order terms because they matter less as `n` grows very large.

## Worked Example

```java
public class Main {
    public static boolean contains(int[] numbers, int target) {
        // 1. check each candidate once
        for (int i = 0; i < numbers.length; i++) {
            // 2. stop early if the target is found
            if (numbers[i] == target) {
                return true;
            }
        }

        // 3. report failure after all candidates are checked
        return false;
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        System.out.println(contains(numbers, 99));
    }
}
```

**Explain in plain English (EiPE):** this algorithm may need to inspect every element, so its worst-case time grows in direct proportion to the input size.

## Trace

**Predict the output first:** `___`

| Line | Statement | `i` | `numbers[i]` | output |
|---|---|---:|---:|---|
| 1 | compare `numbers[0] == 99` | 0 | 10 | - |
| 2 | compare `numbers[1] == 99` | 1 | 20 | - |
| 3 | compare `numbers[2] == 99` | 2 | 30 | - |
| 4 | `return false;` | - | - | - |
| 5 | `System.out.println(contains(numbers, 99));` | - | - | `false` |

**Actual output:** `false`

## Faded Practice

Complete the missing complexity label:

```java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// Time complexity: ______
```

> [!answer]- Answer
> `O(n)` because the loop body can run once per element.

## Common Mistakes

- Treating Big-O as exact wall-clock time -> it describes growth rate, not seconds.
- Keeping constants in the final classification -> `2n` and `100n` both simplify to `O(n)`.
- Keeping smaller terms -> `n^2 + n + 5` simplifies to `O(n^2)`.
- Saying Big-O is always worst case -> courses often use it that way, but Big-O itself is an upper-bound notation.
- Assuming lower time complexity is always the only goal -> sometimes you spend more memory to save time, or choose simpler code for small data.
- Calling memory "CPU space" -> space complexity is about extra memory, such as variables and data structures.

## Examples and Non-Examples

**Example:**

```java
for (int i = 0; i < names.length; i++) {
    if (names[i].equals("Zoe")) {
        System.out.println(i);
    }
}
// O(n): one pass through the array
```

**Non-Example** (names the FALSE belief it kills):

```java
for (int i = 0; i < names.length; i++) {
    System.out.println(names[i]);
}
// O(1)
// FALSE BELIEF: "one loop is always constant because there is only one block of code"
```

## Recall Questions

#flashcards/java/algorithms-and-complexity

Why does Big-O ignore constants?
?
Because constants do not change the dominant growth pattern as input size becomes very large.

Why is linear search `O(n)` in the worst case?
?
Because it may need to check every element once before finding the target or proving the target is absent.

Why is binary search `O(log n)`?
?
Because each comparison discards about half of the remaining search space.

## Mini Practice

1. Classify a loop that prints every element of an array. **Expected output:** complexity `O(n)`. Predict, then explain why.
2. Classify code that prints only `numbers[0]`. **Expected output:** complexity `O(1)`. Predict, then explain why.
3. Compare [[Linear Search]] and [[Binary Search]] on 100 items. **Success criterion:** you can explain why linear search may check 100 items, while binary search needs about 7 comparisons in the worst case.

## Mistake Log

Log misses to [[Algorithms Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Linear Search]] vs [[Binary Search]]
- Map: [[Algorithms and Complexity MOC]]
- Related: [[06 - ArrayList vs LinkedList]] · [[Map Implementations Comparison]] · [[Set Implementations Comparison]]
- Prerequisites: [[Characteristics of an Algorithm]] · [[For Loops]] · [[While Loops]]

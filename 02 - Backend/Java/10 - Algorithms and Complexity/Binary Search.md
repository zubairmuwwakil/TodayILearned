---
type: concept
topic: algorithms-and-complexity
status: learning
difficulty: medium
aliases:
  - Binary Search Algorithm
  - Search Sorted Data
tags:
  - java
  - algorithms-and-complexity
  - binary-search
---
# Binary Search

## What it is

Binary search finds a target in sorted data by repeatedly checking the middle value and discarding the half that cannot contain the target. It is much faster than linear search for large sorted inputs, but it only works when the data is sorted according to the same order used by the comparisons.

## Why it matters

Binary search turns a large search into a small number of comparisons. When `n` doubles, the worst-case number of comparisons only grows by about one, so its time complexity is `O(log n)`.

## Syntax / Pattern

```java
int left = 0;
int right = numbers.length - 1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (numbers[mid] == target) {
        return mid;
    } else if (numbers[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return -1;
```

## Worked Example

```java
public class Main {
    public static int binarySearch(int[] numbers, int target) {
        // 1. start with the full sorted range
        int left = 0;
        int right = numbers.length - 1;

        while (left <= right) {
            // 2. check the middle of the current range
            int mid = left + (right - left) / 2;

            if (numbers[mid] == target) {
                return mid;
            }

            // 3. discard the half that cannot contain the target
            if (numbers[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // 4. report failure when the range is empty
        return -1;
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        System.out.println(binarySearch(numbers, 40));
    }
}
```

**Explain in plain English (EiPE):** this algorithm keeps only the half of the sorted array where the target could still be.

## Trace

**Predict the output first:** `___`

| Line | Statement | `left` | `right` | `mid` | output |
|---|---|---:|---:|---:|---|
| 1 | start search | 0 | 4 | - | - |
| 2 | `mid = 0 + (4 - 0) / 2`, compare `30 < 40` | 0 | 4 | 2 | - |
| 3 | `left = mid + 1;` | 3 | 4 | 2 | - |
| 4 | `mid = 3 + (4 - 3) / 2`, compare `40 == 40` | 3 | 4 | 3 | - |
| 5 | `return mid;` | 3 | 4 | 3 | - |
| 6 | `System.out.println(binarySearch(numbers, 40));` | - | - | - | `3` |

**Actual output:** `3`

## Faded Practice

Complete the line that keeps the right half when the middle value is too small:

```java
if (numbers[mid] < target) {
    ______
} else {
    right = mid - 1;
}
```

> [!answer]- Answer
> `left = mid + 1;`

## Common Mistakes

- Running binary search on unsorted data -> the discard-half logic is only valid when the data is sorted.
- Updating `left = mid` or `right = mid` -> the loop can get stuck checking the same middle index.
- Writing `left + right / 2` -> Java evaluates division first; use `left + (right - left) / 2`.
- Forgetting the `left <= right` condition -> the final remaining element still needs to be checked.
- Thinking binary search is always the best choice -> sorting first costs time, so one search on unsorted data may not justify it.

## Examples and Non-Examples

**Example:**

```java
int[] sorted = {10, 20, 30, 40, 50};
int index = binarySearch(sorted, 40);  // 3
```

**Non-Example** (names the FALSE belief it kills):

```java
int[] unsorted = {40, 10, 50, 20, 30};
int index = binarySearch(unsorted, 40);
// FALSE BELIEF: "binary search is correct on any array because it checks the middle"
```

## Recall Questions

#flashcards/java/algorithms-and-complexity

Why must binary search use sorted data?
?
Because each comparison discards half the range, and that discard is only logically valid when values are ordered.

Why does the loop use `left <= right` instead of `left < right`?
?
Because `left == right` means one candidate remains, and that candidate still needs to be checked.

Why is `left + (right - left) / 2` safer than `left + right / 2`?
?
Because it gives the intended midpoint calculation, avoids Java's division-before-addition precedence problem, and avoids overflow from adding two large indexes.

## Mini Practice

1. Trace binary search for `50` in `{10, 20, 30, 40, 50}`. **Expected output:** index `4`. Predict each `left`, `right`, and `mid`, then run.
2. Trace binary search for `25` in `{10, 20, 30, 40, 50}`. **Expected output:** `-1`. Predict where the range becomes empty, then run.
3. Add a comparison counter to the loop. **Success criterion:** for 100 sorted values, a missing target takes about 7 comparisons, not 100.

## Mistake Log

Log misses to [[Algorithms Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Linear Search]]
- Map: [[Algorithms and Complexity MOC]]
- Related: [[Big-O Notation]] · [[Java Arrays]] · [[02 - ArrayList Fundamentals]]
- Prerequisites: [[While Loops]] · [[If Else and Else If Statements]] · [[Integer Division and Modulus]]

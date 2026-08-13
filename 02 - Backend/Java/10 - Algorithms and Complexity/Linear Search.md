---
type: concept
topic: algorithms-and-complexity
status: learning
difficulty: easy
aliases:
  - Sequential Search
  - Linear Search Algorithm
  - Sequential Search Algorithm
tags:
  - java
  - algorithms-and-complexity
  - linear-search
---
# Linear Search

## What it is

Linear search checks elements one at a time until it finds the target or reaches the end. It works on unsorted arrays, sorted arrays, `ArrayList`s, and other list-like data because it does not rely on ordering.

## Why it matters

Linear search is simple, reliable, and often the first search algorithm to reach for when the data is small or unsorted. Its trade-off is that the worst case grows directly with the number of elements: `O(n)`.

## Syntax / Pattern

```java
for (int i = 0; i < values.length; i++) {
    if (values[i] == target) {
        return i;
    }
}
return -1;
```

For object values such as `String`, compare contents with `.equals`, not `==`.

## Worked Example

```java
public class Main {
    public static int linearSearch(int[] numbers, int target) {
        // 1. inspect each index from left to right
        for (int i = 0; i < numbers.length; i++) {
            // 2. return immediately when the target is found
            if (numbers[i] == target) {
                return i;
            }
        }

        // 3. use -1 to signal "not found"
        return -1;
    }

    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        System.out.println(linearSearch(numbers, 30));
    }
}
```

**Explain in plain English (EiPE):** this algorithm walks through the array in order and returns the index where the target first appears.

## Trace

**Predict the output first:** `___`

| Line | Statement | `i` | `numbers[i]` | output |
|---|---|---:|---:|---|
| 1 | compare `numbers[0] == 30` | 0 | 10 | - |
| 2 | compare `numbers[1] == 30` | 1 | 20 | - |
| 3 | compare `numbers[2] == 30` | 2 | 30 | - |
| 4 | `return i;` | 2 | 30 | - |
| 5 | `System.out.println(linearSearch(numbers, 30));` | - | - | `2` |

**Actual output:** `2`

## Faded Practice

Complete the load-bearing comparison line:

```java
public static int linearSearch(String[] words, String target) {
    for (int i = 0; i < words.length; i++) {
        if (______) {
            return i;
        }
    }
    return -1;
}
```

> [!answer]- Answer
> `words[i].equals(target)` — strings should be compared by contents, not by reference identity.

## Common Mistakes

- Using `==` for `String` or other object content search -> use `.equals` when you mean same value.
- Forgetting the `return -1` path -> callers need a clear "not found" result.
- Starting at index `1` by accident -> arrays and lists start at index `0`.
- Assuming linear search requires sorted data -> it works even when data is unsorted.
- Calling it inefficient in every context -> for small lists or one-off searches, its simplicity can be enough.

## Examples and Non-Examples

**Example:**

```java
String[] names = {"Ada", "Grace", "Linus"};

for (int i = 0; i < names.length; i++) {
    if (names[i].equals("Grace")) {
        System.out.println(i);
    }
}
```

**Non-Example** (names the FALSE belief it kills):

```java
String[] names = {"Ada", "Grace", "Linus"};

for (int i = 0; i < names.length; i++) {
    if (names[i] == "Grace") {
        System.out.println(i);
    }
}
// FALSE BELIEF: "== checks whether two String objects contain the same characters"
```

## Recall Questions

#flashcards/java/algorithms-and-complexity

Why does linear search work on unsorted data?
?
Because it checks each element directly and does not assume any ordering.

## Mini Practice

1. Search `{7, 2, 9, 4}` for `9`. **Expected output:** index `2`. Predict the checks, then run.
2. Search `{7, 2, 9, 4}` for `5`. **Expected output:** `-1`. Predict how many comparisons happen, then run.
3. Write an `ArrayList<String>` version using `size()` and `get(i)`. **Success criterion:** it finds `"zyzzyva"` with `.equals` and returns `-1` for a missing word.

## Mistake Log

Log misses to [[Algorithms Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Binary Search]]
- Map: [[Algorithms and Complexity MOC]]
- Related: [[Big-O Notation]] · [[Java Arrays]] · [[02 - ArrayList Fundamentals]]
- Prerequisites: [[For Loops]] · [[If Else and Else If Statements]] · [[String Fundamentals]]

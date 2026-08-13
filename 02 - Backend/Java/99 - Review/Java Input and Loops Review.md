---
type: review
topic: review
tags:
  - java
  - review
---
# Java Input and Loops Review

## What it is

This is a retrieval practice note for Scanner, primitive input, conditionals, and loops.

Do not use this note by rereading only. Use it to test yourself.

## Why it matters

Active recall and retrieval practice are more effective than passive rereading. The goal is to pull answers from memory, then check your notes.

## Syntax / Pattern

Core patterns to remember:

```java
Scanner scanner = new Scanner(System.in);
```

```java
while (number != 0) {
    // process
    number = scanner.nextInt();
}
```

```java
for (int i = 1; i <= count; i++) {
    // repeat known number of times
}
```

```java
do {
    // runs at least once
} while (condition);
```

## Worked Example

```java
import java.util.Scanner;

public class ReviewExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int total = 0;
        int count = 0;

        System.out.print("Enter a number (0 to stop): ");
        int number = scanner.nextInt();

        while (number != 0) {
            total += number;
            count++;

            System.out.print("Enter a number (0 to stop): ");
            number = scanner.nextInt();
        }

        double average = count > 0 ? (double) total / count : 0.0;

        System.out.printf("Total: %d%nAverage: %.2f%n", total, average);

        scanner.close();
    }
}
```

## Trace

If input is:

```text
10
20
0
```

Then:

1. `number = 10`
2. `10 != 0`, enter loop.
3. `total = 10`, `count = 1`
4. Read `20`
5. `20 != 0`, continue.
6. `total = 30`, `count = 2`
7. Read `0`
8. `0 != 0` is false.
9. Loop ends.
10. Average is `30 / 2.0 = 15.00`.

## Common Mistakes

- Reading input without a prompt.
- Processing sentinel values.
- Forgetting to update loop variables.
- Mixing `nextInt()` and `nextLine()` incorrectly.
- Using the wrong loop for the situation.
- Integer division when calculating averages.
- Forgetting to handle zero inputs.

## Examples and Non-Examples

### Example

```java
double average = count > 0 ? (double) total / count : 0.0;
```

Good because it avoids division by zero and avoids integer division.

### Non-Example

```java
double average = total / count;
```

Risky because `count` may be zero and integer division may happen if both values are integers.

## Recall Questions

1. Write the correct Scanner import from memory.
2. Which loop should you use when the number of repetitions is known?
3. Which loop should you use when input stops at a sentinel value?
4. Why does `do while` run at least once?
5. How do you check if a number is even?
6. Why is `(double)` used when calculating an average?
7. What is the Scanner newline trap?

## Mini Practice

1. Write a program that asks for 5 prices and prints the total.
2. Write a program that asks for integers until `0`, then prints the number of positives.
3. Write a PIN program that allows 3 attempts.
4. Trace the `IntegerOperations` program using the inputs `3`, `-5`, `8`, `0`.

## Links / Related Notes

- [[Java MOC]]
- [[Scanner Input]]
- [[Loop Selection Guide]]
- [[Sentinel-Controlled Loops]]
- [[Scanner Mistakes]]

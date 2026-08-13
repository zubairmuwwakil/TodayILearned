---
type: concept
topic: multithreading
status: learning
difficulty: medium
aliases:
  - Synchronized Method
  - Java Synchronized Methods
tags:
  - java
  - multithreading
  - synchronized-methods
---
# Synchronized Methods

## What it is

A synchronized instance method requires a thread to acquire that object's monitor lock before the method body runs.

For two calls on the same object, only one thread can be inside synchronized instance code guarded by that object at a time.

## Why it matters

Synchronized methods are the simplest way to protect a whole method that reads or writes shared state. They trade some concurrency for easier correctness.

## Syntax / Pattern

```java
class SharedTable {
    public synchronized void printTable(int number) {
        // critical section guarded by this object's lock
    }
}
```

Instance synchronized method lock: `this`.

Static synchronized method lock: the class object, such as `SharedTable.class`.

## Worked Example

```java
class SharedTable {
    public synchronized void printTable(int number) {
        // 1. hold this object's lock for the whole method
        for (int i = 1; i <= 3; i++) {
            System.out.println(number * i);
        }
    }
}

public class SynchronizedMethodExample {
    public static void main(String[] args) throws InterruptedException {
        // 2. share the same object between both threads
        SharedTable table = new SharedTable();

        Thread first = new Thread(() -> table.printTable(5));
        Thread second = new Thread(() -> table.printTable(100));

        // 3. run in a fixed order for a readable trace
        first.start();
        first.join();
        second.start();
        second.join();
    }
}
```

**Explain in plain English (EiPE):** the shared object's synchronized method runs as one complete locked unit; if both threads overlap, the same object lock prevents their method bodies from interleaving.

## Trace

**Predict the output first:** `___`

| Step | Statement | lock owner | output |
|---|---|---|---|
| 1 | `first.start()` | `first` | `5` |
| 2 | first loop continues | `first` | `10` |
| 3 | first loop finishes | `first` | `15` |
| 4 | `second.start()` after join | `second` | `100` |
| 5 | second loop continues | `second` | `200` |
| 6 | second loop finishes | `second` | `300` |

**Actual output:**
```text
5
10
15
100
200
300
```

## Faded Practice

Complete the modifier that guards the whole method:

```java
class SharedTable {
    public ______ void printTable(int number) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(number * i);
        }
    }
}
```

> [!answer]- Answer
> `synchronized` guards the whole instance method using `this` as the lock.

## Common Mistakes

- Saying only one thread can execute the method globally -> instance synchronized methods lock per object instance.
- Synchronizing a method when only a few lines need protection -> a [[Synchronized Blocks|synchronized block]] may be tighter.
- Assuming synchronized methods on different objects block each other -> they use different object locks.
- Mixing synchronized writes with unsynchronized reads carelessly -> visibility and consistency still need a coherent design.

## Examples and Non-Examples

**Example:**
```java
SharedTable oneTable = new SharedTable();
new Thread(() -> oneTable.printTable(5)).start();
new Thread(() -> oneTable.printTable(100)).start();
```

**Non-Example:**
```java
SharedTable a = new SharedTable();
SharedTable b = new SharedTable();
new Thread(() -> a.printTable(5)).start();
new Thread(() -> b.printTable(100)).start();
// FALSE BELIEF: "synchronized instance methods lock every object of that class"
```

## Mini Practice

1. Write a `SharedTable.printTable(int n)` synchronized method that prints `n * 1` through `n * 5`. Use two threads on the same table. **Expected output:** one full table, then the other full table; either table may come first. Predict, then run.
2. Create two separate `SharedTable` objects and use one per thread. **Success criterion:** you can explain why output may interleave.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Synchronized Blocks]]
- Map: [[Multithreading MOC]]
- Related: [[Synchronization in Java]] · [[Thread Lifecycle]]
- Prerequisites: [[Objects Classes and Methods]] · [[The this Keyword]]

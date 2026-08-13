---
type: concept
topic: multithreading
status: learning
difficulty: medium
aliases:
  - Thread Synchronization
  - Java Synchronization
  - Race Conditions
tags:
  - java
  - multithreading
  - synchronization
---
# Synchronization in Java

## What it is

Synchronization controls access to shared mutable data so multiple threads do not corrupt it by modifying it at the same time.

In Java, the `synchronized` keyword uses an object's monitor lock. A thread must acquire the relevant lock before entering synchronized code guarded by that lock.

## Why it matters

When threads only work on separate data, concurrency is usually easier. When they share data, timing can change the result. Synchronization protects critical sections so the program remains predictable.

## Syntax / Pattern

```java
class Counter {
    private int count;

    public synchronized void increment() {
        count++;
    }
}
```

Key rule: synchronization protects code that uses the same lock. It does not automatically block every possible access to an object.

## Worked Example

```java
class SafeCounter {
    private int count;

    public synchronized void increment() {
        // 1. acquire this object's monitor before changing shared state
        count++;
    }

    public int getCount() {
        // 2. read the final value after the threads have finished
        return count;
    }
}

public class SynchronizationExample {
    public static void main(String[] args) throws InterruptedException {
        // 3. share one counter between two threads
        SafeCounter counter = new SafeCounter();

        Thread first = new Thread(() -> counter.increment());
        Thread second = new Thread(() -> counter.increment());

        // 4. run both threads and wait for both results
        first.start();
        second.start();
        first.join();
        second.join();

        System.out.println(counter.getCount());
    }
}
```

**Explain in plain English (EiPE):** both threads update the same counter, but `synchronized` makes the updates take turns so no increment is lost.

## Trace

**Predict the output first:** `___`

| Step | Statement | `count` | lock owner | output |
|---|---|---:|---|---|
| 1 | `first.start()` | 0 | maybe `first` | - |
| 2 | `second.start()` | 0 or 1 | maybe waiting | - |
| 3 | first `increment()` completes | 1 | none | - |
| 4 | second `increment()` completes | 2 | none | - |
| 5 | `System.out.println(counter.getCount())` | 2 | none | `2` |

**Actual output:** `2`

## Faded Practice

Complete the keyword that protects the shared update:

```java
class SafeCounter {
    private int count;

    public ______ void increment() {
        count++;
    }
}
```

> [!answer]- Answer
> `synchronized` makes callers acquire the object's monitor before entering the method.

## Common Mistakes

- Sharing mutable data without coordination -> race conditions can make results depend on timing.
- Thinking synchronization is free -> locks add coordination overhead and can reduce concurrency.
- Synchronizing the wrong object -> only code using the same lock excludes other threads.
- Believing synchronization makes all access to an object safe -> unsynchronized code can still access the object unless you design around it.

## Examples and Non-Examples

**Example:**
```java
public synchronized void addOne() {
    count++;
}
```

**Non-Example:**
```java
public void addOne() {
    count++;
}
// FALSE BELIEF: "count++ is one indivisible operation, so two threads cannot interfere"
```

## Recall Questions

#flashcards/java/multithreading

Why can shared mutable data cause race conditions?
?
Because the final result can depend on the timing of overlapping reads and writes from multiple threads.

What does `synchronized` require before a thread enters guarded code?
?
The thread must acquire the monitor lock for the object used as the lock.

## Mini Practice

1. Write a `SafeCounter` with synchronized `increment()`, start two threads that each call it once, join both, then print the count. **Expected output:** `2`. Predict, then run.
2. Remove `synchronized` and increase each thread to loop 100000 times. **Success criterion:** you can explain why the wrong result may appear.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Synchronized Methods]] vs [[Synchronized Blocks]]
- Map: [[Multithreading MOC]]
- Related: [[Thread Lifecycle]] · [[Thread Methods]]
- Prerequisites: [[Primitive vs Reference Variables]] · [[Instance Variables and Methods]]


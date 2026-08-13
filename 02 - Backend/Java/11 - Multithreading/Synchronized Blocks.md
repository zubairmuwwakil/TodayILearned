---
type: concept
topic: multithreading
status: learning
difficulty: medium
aliases:
  - Synchronized Block
  - Java Synchronized Blocks
tags:
  - java
  - multithreading
  - synchronized-blocks
---
# Synchronized Blocks

## What it is

A synchronized block protects a specific section of code by requiring a thread to acquire a chosen lock object before entering that block.

It is the same monitor-lock idea as a synchronized method, but with smaller scope.

## Why it matters

Synchronized blocks let you protect only the critical section instead of locking an entire method. That can reduce unnecessary waiting while still protecting shared data.

## Syntax / Pattern

```java
private final Object lock = new Object();

public void method() {
    // non-critical work can run concurrently

    synchronized (lock) {
        // critical section guarded by lock
    }
}
```

Only threads that try to enter synchronized code using the same lock object wait for each other.

## Worked Example

```java
class BlockTable {
    private final Object lock = new Object();

    public void printTable(int number) {
        // 1. leave unrelated work outside the lock

        synchronized (lock) {
            // 2. guard only the shared output sequence
            for (int i = 1; i <= 3; i++) {
                System.out.println(number * i);
            }
        }
    }
}

public class SynchronizedBlockExample {
    public static void main(String[] args) throws InterruptedException {
        // 3. share one table, therefore one lock object
        BlockTable table = new BlockTable();

        Thread first = new Thread(() -> table.printTable(5));
        Thread second = new Thread(() -> table.printTable(100));

        // 4. run in a fixed order for a readable trace
        first.start();
        first.join();
        second.start();
        second.join();
    }
}
```

**Explain in plain English (EiPE):** both calls use one lock, so the protected print loop runs as one uninterrupted block whenever two threads overlap on that same lock.

## Trace

**Predict the output first:** `___`

| Step | Statement | `lock` owner | output |
|---|---|---|---|
| 1 | `first.start()` | `first` | `5` |
| 2 | first loop continues | `first` | `10` |
| 3 | first loop finishes | none | `15` |
| 4 | `second.start()` after join | `second` | `100` |
| 5 | second loop continues | `second` | `200` |
| 6 | second loop finishes | none | `300` |

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

Complete the lock expression:

```java
private final Object lock = new Object();

public void update() {
    synchronized (______) {
        // shared state update
    }
}
```

> [!answer]- Answer
> `lock` uses the dedicated lock object. This avoids exposing the lock through `this`.

## Common Mistakes

- Thinking a synchronized block locks all access to an object -> it only blocks other synchronized code using the same lock.
- Synchronizing on a new object each time -> every thread gets a different lock, so nothing is protected.
- Using too broad a block -> unnecessary waiting and less concurrency.
- Using an exposed lock object carelessly -> outside code can also synchronize on it and create surprising delays.

## Examples and Non-Examples

**Example:**
```java
private final Object lock = new Object();

void addOne() {
    synchronized (lock) {
        count++;
    }
}
```

**Non-Example:**
```java
void addOne() {
    synchronized (new Object()) {
        count++;
    }
}
// FALSE BELIEF: "any object in synchronized(...) protects shared state"
```

## Mini Practice

1. Create a class with `private final Object lock = new Object();` and guard only `count++` inside `synchronized (lock)`. **Expected output:** after two joined increment threads, count is `2`. Predict, then run.
2. Move `new Object()` directly into the synchronized expression. **Success criterion:** you can explain why that does not protect shared state.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Synchronized Methods]]
- Map: [[Multithreading MOC]]
- Related: [[Synchronization in Java]] · [[Thread Lifecycle]]
- Prerequisites: [[Primitive vs Reference Variables]] · [[Objects Classes and Methods]]

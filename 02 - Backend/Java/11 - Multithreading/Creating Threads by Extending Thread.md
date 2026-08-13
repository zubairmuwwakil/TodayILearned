---
type: concept
topic: multithreading
status: learning
difficulty: easy
aliases:
  - Extending Thread
  - Thread Class
  - Create a Thread by Extending Thread
tags:
  - java
  - multithreading
  - thread-class
---
# Creating Threads by Extending Thread

## What it is

One way to create a Java thread is to define a class that extends `Thread`, override its `run()` method, create an object, and call `start()`.

The code inside `run()` is the task the new thread will execute. The call to `start()` is what asks the JVM to create a new thread of execution.

## Why it matters

This pattern is simple and makes the thread behavior easy to see. Its downside is design flexibility: because Java has single inheritance for classes, a class that extends `Thread` cannot also extend another base class.

## Syntax / Pattern

```java
class MyThread extends Thread {
    @Override
    public void run() {
        // code for the new thread
    }
}

MyThread thread = new MyThread();
thread.start();
```

## Worked Example

```java
class GreetingThread extends Thread {
    @Override
    public void run() {
        // 1. define what the worker thread does
        System.out.println("worker");
    }
}

public class ExtendingThreadExample {
    public static void main(String[] args) throws InterruptedException {
        // 2. create the thread object
        GreetingThread thread = new GreetingThread();

        // 3. start a new thread, then wait so output order is predictable
        thread.start();
        thread.join();

        // 4. continue on the main thread
        System.out.println("main");
    }
}
```

**Explain in plain English (EiPE):** `start()` runs the overridden `run()` method on a separate thread, then `join()` makes `main` wait before printing its own line.

## Trace

**Predict the output first:** `___`

| Line | Statement | `thread` state | output |
|---|---|---|---|
| 1 | `new GreetingThread()` | `NEW` | - |
| 2 | `thread.start()` | runnable/ran | `worker` |
| 3 | `thread.join()` | `TERMINATED` after wait | - |
| 4 | `System.out.println("main")` | `TERMINATED` | `main` |

**Actual output:**
```text
worker
main
```

## Faded Practice

Complete the load-bearing line that actually creates a new thread of execution:

```java
GreetingThread thread = new GreetingThread();
______;
```

> [!answer]- Answer
> `thread.start();` creates/schedules a new thread. `thread.run();` would be only a normal method call on the current thread.

## Common Mistakes

- Calling `run()` directly -> it does not start a new thread.
- Forgetting to override `run()` -> the thread has no useful task.
- Extending `Thread` when the class also needs another superclass -> Java classes can extend only one class.
- Assuming output order is guaranteed without `join()` or another coordination mechanism -> scheduling is not deterministic.

## Examples and Non-Examples

**Example:**
```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("new thread");
    }
}
```

**Non-Example:**
```java
Thread t = new MyThread();
t.run();
// FALSE BELIEF: "run() and start() are interchangeable"
```

## Recall Questions

#flashcards/java/multithreading

What is the difference between `start()` and `run()`?
?
`start()` asks the JVM to create/schedule a new thread that invokes `run()`; direct `run()` is just a normal method call on the current thread.

## Mini Practice

1. Create a `CountingThread` that prints `1`, `2`, `3` from `run()`. Start it and join it from `main`. **Expected output:** `1`, `2`, `3` before `main` finishes. Predict, then run.
2. Replace `start()` with `run()` and print `Thread.currentThread().getName()` inside `run()`. **Success criterion:** you can explain why the code runs on `main`.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Creating Threads with Runnable]]
- Map: [[Multithreading MOC]]
- Related: [[Thread Lifecycle]] · [[Thread Methods]]
- Prerequisites: [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]] · [[20 Areas/Education/Obsidi Academy/Sessions/Java/day 7 jul 14/Concepts/Inheritance and Constructors]]


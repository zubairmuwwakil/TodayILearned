---
type: concept
topic: multithreading
status: learning
difficulty: easy
aliases:
  - Important Thread Methods
  - Java Thread Methods
  - start getState sleep join isAlive
tags:
  - java
  - multithreading
  - thread-methods
---
# Thread Methods

## What it is

`Thread` methods let you start a thread, inspect it, pause the current thread, or wait for another thread to finish.

The beginner set is `start()`, `getState()`, `getName()`, `getPriority()`, `sleep(...)`, `join()`, and `isAlive()`.

## Why it matters

Thread methods are how you move from "I created a thread object" to "I can start it, identify it, coordinate with it, and reason about its state."

## Syntax / Pattern

```java
thread.start();          // start a new thread
thread.join();           // current thread waits for thread to finish
thread.getState();       // inspect lifecycle state
thread.getName();        // inspect name
thread.getPriority();    // inspect scheduling hint
thread.isAlive();        // started and not yet terminated?
Thread.sleep(100);       // current thread pauses for 100 ms
```

## Worked Example

```java
public class ThreadMethodsExample {
    public static void main(String[] args) throws InterruptedException {
        // 1. create a named worker thread
        Thread worker = new Thread(() -> {
            System.out.println(Thread.currentThread().getName());
        }, "worker-1");

        // 2. inspect metadata before starting
        System.out.println(worker.getName());
        System.out.println(worker.isAlive());

        // 3. start and wait for completion
        worker.start();
        worker.join();

        // 4. inspect after completion
        System.out.println(worker.isAlive());
        System.out.println(worker.getState());
    }
}
```

**Explain in plain English (EiPE):** the main thread names and starts a worker, waits for it to finish, then confirms the worker is no longer alive.

## Trace

**Predict the output first:** `___`

| Line | Statement | `worker` alive? | `worker` state | output |
|---|---|---|---|---|
| 1 | `new Thread(..., "worker-1")` | `false` | `NEW` | - |
| 2 | `getName()` | `false` | `NEW` | `worker-1` |
| 3 | `isAlive()` | `false` | `NEW` | `false` |
| 4 | `start()` | `true` briefly | runnable/ran | `worker-1` |
| 5 | `join()` | `false` after wait | `TERMINATED` | - |
| 6 | `isAlive()` | `false` | `TERMINATED` | `false` |
| 7 | `getState()` | `false` | `TERMINATED` | `TERMINATED` |

**Actual output:**
```text
worker-1
false
worker-1
false
TERMINATED
```

## Faded Practice

Complete the line that makes the main thread wait before checking final state:

```java
worker.start();
______;
System.out.println(worker.getState());
```

> [!answer]- Answer
> `worker.join();` waits until `worker` is done, so the final state can be checked predictably.

## Common Mistakes

- Calling `sleep(...)` as if it pauses another thread -> `Thread.sleep(...)` pauses the current thread.
- Treating priority as guaranteed order -> priority is a scheduler hint, not a reliable sequencing tool.
- Calling `join()` on the wrong thread -> the current thread waits for the target thread.
- Reading `isAlive()` as "currently on CPU" -> it means started and not yet terminated.
- Calling `start()` twice on the same `Thread` -> throws `IllegalThreadStateException`.

## Examples and Non-Examples

**Example:**
```java
thread.start();
thread.join();
System.out.println("thread is finished");
```

**Non-Example:**
```java
Thread.sleep(1000);
// FALSE BELIEF: "this sleeps whichever worker thread I just created"
```

## Mini Practice

1. Create a named thread `"reporter"` that prints its own name. **Expected output:** `reporter`. Predict, then run.
2. Print `isAlive()` before `start()` and after `join()`. **Expected output:** `false` both times in those exact positions. Predict, then run.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Thread Lifecycle]]
- Map: [[Multithreading MOC]]
- Related: [[Creating Threads by Extending Thread]] · [[Creating Threads with Runnable]]
- Prerequisites: [[Basic Java Program Structure]]


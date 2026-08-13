---
type: concept
topic: multithreading
status: learning
difficulty: medium
aliases:
  - Java Thread States
  - Thread States
  - Lifecycle of a Thread
tags:
  - java
  - multithreading
  - thread-lifecycle
---
# Thread Lifecycle

## What it is

A Java thread is always in one of the states from `Thread.State`: `NEW`, `RUNNABLE`, `BLOCKED`, `WAITING`, `TIMED_WAITING`, or `TERMINATED`.

The thread scheduler and operating system decide when runnable threads actually get CPU time. A Java `RUNNABLE` thread may be actively running or ready to run but waiting for the OS to schedule it.

## Why it matters

Thread states help you explain why a program appears paused, stuck, or inconsistent. They are especially useful when debugging [[Synchronization in Java]], slow code, or code where one thread waits for another with [[Thread Methods]] like `join()` or `sleep()`.

## Syntax / Pattern

```java
Thread thread = new Thread(task);
System.out.println(thread.getState()); // NEW

thread.start();                        // eventually RUNNABLE
thread.join();                         // current thread waits

System.out.println(thread.getState()); // TERMINATED
```

Common state meanings:

| State | Meaning |
|---|---|
| `NEW` | Created, but `start()` has not been called. |
| `RUNNABLE` | Eligible to run; may be running or waiting for CPU time. |
| `BLOCKED` | Waiting to enter synchronized code because another thread owns the same monitor lock. |
| `WAITING` | Waiting indefinitely for another thread's action. |
| `TIMED_WAITING` | Waiting for a bounded time, such as during `sleep(...)` or timed `join(...)`. |
| `TERMINATED` | The `run()` method finished or ended by an uncaught exception. |

## Worked Example

```java
public class ThreadLifecycleExample {
    public static void main(String[] args) throws InterruptedException {
        // 1. create the thread but do not start it yet
        Thread worker = new Thread(() -> System.out.println("working"));

        // 2. inspect the not-yet-started state
        System.out.println(worker.getState());

        // 3. start the new call stack, then wait until it finishes
        worker.start();
        worker.join();

        // 4. inspect the finished state
        System.out.println(worker.getState());
    }
}
```

**Explain in plain English (EiPE):** the thread begins as `NEW`, runs its task after `start()`, and becomes `TERMINATED` after `join()` confirms the task is finished.

## Trace

**Predict the output first:** `___`

| Line | Statement | `worker` state | output |
|---|---|---|---|
| 1 | `new Thread(...)` | `NEW` | - |
| 2 | `System.out.println(worker.getState())` | `NEW` | `NEW` |
| 3 | `worker.start()` | runnable/ran | maybe `working` |
| 4 | `worker.join()` | waits until done | maybe `working` if not printed yet |
| 5 | `System.out.println(worker.getState())` | `TERMINATED` | `TERMINATED` |

**Actual output:**
```text
NEW
working
TERMINATED
```

## Faded Practice

Complete the missing line so the final state is guaranteed to be `TERMINATED` before printing:

```java
Thread worker = new Thread(() -> System.out.println("done"));
worker.start();
______;
System.out.println(worker.getState());
```

> [!answer]- Answer
> `worker.join();` waits for `worker` to finish before the main thread continues.

## Common Mistakes

- Treating `RUNNABLE` as "definitely running right now" -> it may also mean ready and waiting for CPU time.
- Describing `BLOCKED` as any kind of waiting -> in `Thread.State`, `BLOCKED` specifically means waiting for a monitor lock.
- Assuming thread scheduling is predictable because priority exists -> priority is only a hint, not a reliable ordering tool.
- Saying Java safely "kills" a thread on request -> normal termination happens when `run()` returns or throws an uncaught exception.

## Examples and Non-Examples

**Example:**
```java
Thread t = new Thread(() -> System.out.println("task"));
System.out.println(t.getState()); // NEW
t.start();
```

**Non-Example:**
```java
Thread t = new Thread(() -> System.out.println("task"));
t.run();                  // ordinary method call on the current thread
// FALSE BELIEF: "calling run() moves a Thread from NEW into a real new thread"
```

## Mini Practice

1. Create a thread that prints `hello`, print its state before `start()`, call `start()`, call `join()`, and print its state again. **Expected output:** `NEW`, then `hello`, then `TERMINATED`. Predict, then run.
2. Create a thread that sleeps for 200 milliseconds. While it sleeps, print `getState()` from `main`. **Success criterion:** you can explain why `TIMED_WAITING` is likely, but timing-based observations are scheduler-dependent.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Creating Threads by Extending Thread]] vs [[Creating Threads with Runnable]]
- Map: [[Multithreading MOC]]
- Related: [[Thread Methods]] · [[Synchronization in Java]]
- Prerequisites: [[Basic Java Program Structure]] · [[Lambda Expressions]]


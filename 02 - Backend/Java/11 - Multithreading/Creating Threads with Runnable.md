---
type: concept
topic: multithreading
status: learning
difficulty: easy
aliases:
  - Runnable Interface
  - Implementing Runnable
  - Create a Thread by Implementing Runnable Interface
tags:
  - java
  - multithreading
  - runnable
---
# Creating Threads with Runnable

## What it is

`Runnable` is a functional interface whose single abstract method is `run()`. To create a thread with it, put the task in a `Runnable`, pass that task to a `Thread`, and call `start()` on the `Thread`.

This separates the work to do from the thread object that runs it.

## Why it matters

Implementing `Runnable` is usually more flexible than extending `Thread`. Your class can still extend another class, and the same task can be passed to different execution mechanisms later.

## Syntax / Pattern

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        // task code
    }
}

Runnable task = new MyRunnable();
Thread thread = new Thread(task);
thread.start();
```

## Worked Example

```java
class PrintTask implements Runnable {
    @Override
    public void run() {
        // 1. define the task separately from the Thread object
        System.out.println("task running");
    }
}

public class RunnableExample {
    public static void main(String[] args) throws InterruptedException {
        // 2. create the task object
        Runnable task = new PrintTask();

        // 3. wrap the task in a Thread
        Thread thread = new Thread(task);

        // 4. start and coordinate with the new thread
        thread.start();
        thread.join();
        System.out.println("main done");
    }
}
```

**Explain in plain English (EiPE):** the `Runnable` holds the job, and the `Thread` is the worker that runs that job on a separate call stack.

## Trace

**Predict the output first:** `___`

| Line | Statement | `task` type | `thread` state | output |
|---|---|---|---|---|
| 1 | `Runnable task = new PrintTask()` | `Runnable` | - | - |
| 2 | `new Thread(task)` | `Runnable` | `NEW` | - |
| 3 | `thread.start()` | `Runnable` | runnable/ran | `task running` |
| 4 | `thread.join()` | `Runnable` | `TERMINATED` after wait | - |
| 5 | `System.out.println("main done")` | `Runnable` | `TERMINATED` | `main done` |

**Actual output:**
```text
task running
main done
```

## Faded Practice

Complete the line that connects the task object to the thread object:

```java
Runnable task = new PrintTask();
Thread thread = ______;
thread.start();
```

> [!answer]- Answer
> `new Thread(task)` passes the `Runnable` task into the `Thread` constructor.

## Common Mistakes

- Calling `task.run()` directly -> it runs on the current thread, not a new one.
- Forgetting the `Thread` wrapper -> a `Runnable` is only the task, not the running thread.
- Thinking `Runnable` prevents use of OOP -> it works with polymorphism and lets the class extend another class.
- Assuming `start()` can be called twice on the same `Thread` -> a started `Thread` object cannot be restarted.

## Examples and Non-Examples

**Example:**
```java
Runnable task = () -> System.out.println("lambda task");
Thread thread = new Thread(task);
thread.start();
```

**Non-Example:**
```java
Runnable task = () -> System.out.println("lambda task");
task.run();
// FALSE BELIEF: "a Runnable starts a new thread by itself"
```

## Recall Questions

#flashcards/java/multithreading

Why is `Runnable` often preferred over extending `Thread`?
?
It separates the task from the thread and leaves the class free to extend another superclass.

## Mini Practice

1. Write a `Runnable` class that prints `from task`, pass it to a `Thread`, start it, and join it. **Expected output:** `from task`. Predict, then run.
2. Rewrite the same task with a lambda: `Runnable task = () -> ...`. **Success criterion:** behavior matches the class-based version.

## Mistake Log

Log misses to [[Multithreading Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links

- Contrast: [[Creating Threads by Extending Thread]]
- Map: [[Multithreading MOC]]
- Related: [[Thread Methods]] · [[Functional Interfaces]] · [[Lambda Expressions]]
- Prerequisites: [[Interfaces]] · [[Polymorphism]]


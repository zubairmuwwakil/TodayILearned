---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - linkedlist
  - data-structures
  - doubly-linked-list
aliases:
  - LinkedList
---
# LinkedList Fundamentals

## What it is

`LinkedList<E>` is a **doubly linked** implementation of both `List<E>` and `Deque<E>`. Instead of one contiguous backing array, it stores each element in its own **node**, and every node holds a reference to the node before it and the node after it:

```text
previous reference | element | next reference
```

For the list `["How", "Lists", "Work"]` the nodes are chained like this:

```text
null <- [How] <-> [Lists] <-> [Work] -> null
```

The head node has no previous, the tail node has no next, and every middle node points both ways. There is no index arithmetic — you reach an element only by following references.

## Why it matters

Because the ends are directly reachable, adding or removing at the **head or tail is O(1)** — no shifting, just relink a couple of references. That makes `LinkedList` a natural fit when the collection behaves like a **queue or deque** (add one end, remove the other) rather than an indexed array.

The trade-off: there is no random access. Reaching an arbitrary index means walking node by node, so `get(index)` is O(n). For general-purpose indexed lists, [[ArrayList Fundamentals|ArrayList]] is the better default.

## Performance & Memory

The claim *"LinkedList insertion is always faster than ArrayList insertion"* is incomplete. Relinking nodes is cheap **only after the target position is found** — and finding it is the expensive part.

| Operation | LinkedList | Why |
|---|---|---|
| `addFirst` / `addLast` / `removeFirst` / `removeLast` | O(1) | ends are directly reachable |
| `get(i)` / `set(i, x)` | O(n) | must traverse from nearest end |
| `add(i, x)` at a middle index | O(n) | O(n) to locate + O(1) to relink |
| membership `contains(x)` | O(n) | linear scan |

Each node also stores an element reference, a previous-node reference, a next-node reference, and object metadata — so a `LinkedList` typically uses **more** memory per element than an `ArrayList`, and its scattered nodes have worse cache locality. The advantage is structural flexibility at the ends, not lower memory use or faster access.

## Syntax / Pattern

```java
import java.util.LinkedList;

LinkedList<String> shoppingList = new LinkedList<>();   // concrete type
```

Prefer programming to the interface — declare the **least specific type that exposes what you need**:

```java
List<String>  list  = new LinkedList<>();   // only indexed-list operations
Deque<String> queue = new LinkedList<>();   // double-ended / queue operations
```

Reach for `LinkedList` on the left only when you specifically depend on class-only behaviour. For plain FIFO/LIFO work, `Deque<String> d = new ArrayDeque<>();` is often the better concrete choice.

## Common Methods

`List` methods (indexed) — inherited from the `List` contract:

| Method | Purpose |
|---|---|
| `add(element)` | Adds to the end |
| `add(index, element)` | Inserts at an index |
| `get(index)` | Returns the element at an index |
| `set(index, element)` | Replaces the element at an index |
| `remove(index)` | Removes by index |
| `remove(object)` | Removes the first matching value |
| `contains(object)` | Tests membership |
| `size()` / `clear()` | Element count / removes all |

`Deque` methods (ends) — what `ArrayList` does **not** give you:

| Method | Purpose |
|---|---|
| `addFirst(e)` / `addLast(e)` | Insert at the head / tail (throw nothing; grow the list) |
| `getFirst()` / `getLast()` | Peek at the head / tail (throw if empty) |
| `removeFirst()` / `removeLast()` | Remove and return the head / tail (throw if empty) |
| `offer(e)` / `poll()` / `peek()` | Queue-style enqueue (tail) / dequeue (head) / peek — return `false`/`null` instead of throwing when empty |

> [!tip] Two method families
> `getFirst`/`removeFirst` **throw** `NoSuchElementException` on an empty list; `peek`/`poll` return `null` instead. Pick the throwing family when "empty" is a bug, the returning family when "empty" is expected.

## Worked Example

```java
import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<String> tasks = new LinkedList<>();

        // 1. append to the tail (normal List add)
        tasks.add("Study");
        tasks.add("Exercise");

        // 2. push onto the head and tail using Deque methods
        tasks.addFirst("Eat breakfast");
        tasks.addLast("Review notes");
        System.out.println(tasks);

        // 3. pop the head off the front and peek at the new front
        String completed = tasks.removeFirst();
        System.out.println("Completed: " + completed);
        System.out.println("Next task: " + tasks.getFirst());
    }
}
```

**Explain in plain English (EiPE):** the list grows at both ends, then `removeFirst` pulls the head element off and `getFirst` reveals whatever is now first.

### As a Queue (FIFO)

```java
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Queue<String> customers = new LinkedList<>();

        customers.offer("Andrea");   // 1. enqueue at the tail
        customers.offer("Malik");
        customers.offer("Jordan");

        System.out.println(customers.poll());   // 2. dequeue from the head
        System.out.println(customers.poll());
        System.out.println(customers);          // 3. what's left
    }
}
```

Output: `Andrea`, then `Malik`, then `[Jordan]` — **First In, First Out**: the earliest enqueued customer is served first.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `tasks` after | Output |
|---|---|---|---|
| 1 | `LinkedList<String> tasks = new LinkedList<>();` | `[]` | — |
| 2 | `tasks.add("Study");` | `[Study]` | — |
| 3 | `tasks.add("Exercise");` | `[Study, Exercise]` | — |
| 4 | `tasks.addFirst("Eat breakfast");` | `[Eat breakfast, Study, Exercise]` | — |
| 5 | `tasks.addLast("Review notes");` | `[Eat breakfast, Study, Exercise, Review notes]` | — |
| 6 | `System.out.println(tasks);` | *(unchanged)* | `[Eat breakfast, Study, Exercise, Review notes]` |
| 7 | `String completed = tasks.removeFirst();` | `[Study, Exercise, Review notes]` | — |
| 8 | `System.out.println("Completed: " + completed);` | *(unchanged)* | `Completed: Eat breakfast` |
| 9 | `System.out.println("Next task: " + tasks.getFirst());` | *(unchanged)* | `Next task: Study` |

**Actual output:**
```text
[Eat breakfast, Study, Exercise, Review notes]
Completed: Eat breakfast
Next task: Study
```
`addFirst` put "Eat breakfast" ahead of "Study", so after `removeFirst` the new head is "Study".

## Faded Practice

Fill the blank so "login" lands at the **front** in O(1) (the load-bearing method choice):

```java
LinkedList<String> pages = new LinkedList<>();
pages.add("home");
pages.______("login");   // put "login" at the FRONT, not the back
System.out.println(pages);   // want: [login, home]
```

> [!answer]- Answer
> `addFirst` → `pages.addFirst("login");`. Plain `add(...)` appends to the tail, giving `[home, login]`. `add(0, "login")` also works but is an indexed insert; `addFirst` is the direct O(1) head operation.

Progression to aim for: read this labeled example → predict which method fits → complete-the-code (above) → build a FIFO queue and a browser history from a blank editor (see Mini Practice).

## Common Mistakes

- Believing indexed access is fast, e.g. `linkedList.get(9000)` → it traverses node by node; `get`/`set` are O(n), not constant-time random access.
- Choosing `LinkedList` automatically "because inserts are faster" → a middle insert must first *find* the node (O(n)); only the relink is O(1).
- Assuming `LinkedList` uses less memory → each node adds two reference fields plus metadata, so per-element overhead is *higher* than `ArrayList`.
- Calling `getFirst()` / `removeFirst()` on an empty list → they throw `NoSuchElementException`; use `peek()` / `poll()` when empty is a valid state.
- Using raw types, `LinkedList list = new LinkedList();` → always parameterise: `LinkedList<String> list = new LinkedList<>();`.
- Dropping the semicolon on an import, `import java.util.*` → statements end in `;`.

## Examples and Non-Examples

**Example — deque-style ends work (what LinkedList is for):**
```java
LinkedList<String> history = new LinkedList<>();
history.addFirst("Current page");   // O(1) at the head
history.removeFirst();              // O(1) at the head
```

**Non-Example — indexed traversal in a loop:**
```java
for (int i = 0; i < linkedList.size(); i++) {
    System.out.println(linkedList.get(i));   // each get(i) re-walks the chain
}
// FALSE BELIEF: "get(i) in a loop is fine — it's O(1) like an array."
// It is O(n) per call, so the loop is O(n^2). Iterate instead:
for (String value : linkedList) {   // the iterator advances node-to-node, O(n) total
    System.out.println(value);
}
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/linkedlist

Which two interfaces does `LinkedList<E>` implement, and how do they shape its use?
?
`List<E>` gives indexed list operations; `Deque<E>` gives double-ended/queue operations. Since `Deque` extends `Queue`, a `LinkedList` also works as a `Queue`.

What is the difference between `removeFirst()` and `poll()` on an empty `LinkedList`?
?
`removeFirst()` throws `NoSuchElementException`; `poll()` returns `null`. Choose the throwing family when empty means a bug, the returning family when empty is expected.

## Mini Practice

Model a browser history with a `LinkedList<String>`. **Predict each printed line before running.**

1. Add three pages with `add`. **Expected state:** `[page1, page2, page3]`.
2. Push a homepage to the front with `addFirst`. **Expected state:** `[home, page1, page2, page3]`.
3. Print `getFirst()` and `getLast()`. **Expected output:** `home` then `page3`.
4. `removeLast()`, then print the list. **Expected output:** `[home, page1, page2]`.
5. Rewrite the declaration as `Deque<String> history = new LinkedList<>();`. **Success criterion:** it still compiles and every end-based call above works — proof you were only using the `Deque` contract.

## Mistake Log

When you miss one, log it to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[ArrayList Fundamentals]] — array-backed (fast index, slow ends) vs node-backed (fast ends, slow index)
- Map: [[Collections MOC]]
- Related: [[Deque]] · [[Queue]] · [[ArrayDeque]] · [[Big-O Notation]]
- Prerequisites: [[List Interface]] · [[03 - List Interface and Polymorphism]]

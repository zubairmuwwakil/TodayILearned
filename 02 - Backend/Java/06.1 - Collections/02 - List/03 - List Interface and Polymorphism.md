---
type: concept
topic: collections
status: learning
difficulty: medium
tags:
  - java
  - collections
  - list
  - interfaces
  - polymorphism
  - program-to-an-interface
aliases:
  - List Interface
  - Program to an Interface
---
# List Interface and Polymorphism

## What it is

`List<E>` is an **interface** describing an ordered sequence of elements. It defines *what a list can do* — preserve positional (insertion) order, allow index-based access, typically allow duplicates, and support operations like `add`, `get`, `set`, and `remove` — without saying *how* those operations are implemented.

Because an interface has no constructor, you cannot instantiate it directly. A concrete class that `implements List<E>` (such as `ArrayList` or `LinkedList`) creates the actual object:

```java
List<String> names = new List<>();       // compile error: List is abstract
List<String> names = new ArrayList<>();  // OK: ArrayList IS a List
```

Holding an `ArrayList` object through a `List` reference is **interface-based polymorphism** — the interface counterpart of the superclass/override polymorphism in [[Polymorphism]].

## Why it matters

Declaring the variable with the **interface** type decouples your code from any one implementation. Swap the backend and callers that use only `List` operations keep compiling unchanged:

```java
List<String> names = new ArrayList<>();   // array-backed today
List<String> names = new LinkedList<>();  // node-backed tomorrow — same List API
```

This is the design rule *"program to an interface, not a concrete implementation."* It maximises flexibility, reuse, and testability, and it is why library methods take `List<E>` rather than `ArrayList<E>`.

> [!important] The one rule to remember
> `List<String> values = new ArrayList<>();` does **not** create a `List` object. Java creates an **`ArrayList`** object and lets you use it *through* a `List` reference. The interface is the lens, the concrete class is the thing.

## Syntax / Pattern

```java
InterfaceType<E> ref = new ConcreteClass<>();   // program to the interface
ref.interfaceMethod();                          // only List-declared methods are visible
```

| Part of `List<String> names = new ArrayList<>();` | Role |
|---|---|
| `List<String>` | Compile-time **reference type** — controls which methods the compiler allows |
| `names` | Reference variable |
| `new ArrayList<>()` | Creates the runtime **object** |
| `ArrayList` | Concrete implementation — controls which overridden code actually runs |

Reference type → *what you can call* (compile time). Object type → *which implementation runs* (runtime).

## Worked Example

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Main {
    // 1. accept ANY List implementation via the interface type
    static void printAll(List<String> names) {
        for (String name : names) {
            System.out.println(name);
        }
    }

    public static void main(String[] args) {
        // 2. reference type List, runtime object ArrayList
        List<String> people = new ArrayList<>();
        people.add("Andrea");
        people.add("Zubair");
        printAll(people);

        // 3. swap the implementation — printAll needs NO change
        people = new LinkedList<>();
        people.add("Maya");
        printAll(people);
    }
}
```

**Explain in plain English (EiPE):** the same `printAll` method works on both an `ArrayList` and a `LinkedList` because it depends only on the `List` contract, never on the concrete class.

## Trace

**Predict the output first (write it before reading on):**  `___`

```java
List<String> values = new ArrayList<>();   // line 1
values.add("A");                           // line 2
values.add("B");                           // line 3
System.out.println(values.get(0));         // line 4
System.out.println(values.size());         // line 5
```

| Line | Statement | reference type | runtime object | `values` | Output |
|---|---|---|---|---|---|
| 1 | `List<String> values = new ArrayList<>();` | `List<String>` | `ArrayList` | `[]` | — |
| 2 | `values.add("A");` | `List<String>` | `ArrayList` | `[A]` | — |
| 3 | `values.add("B");` | `List<String>` | `ArrayList` | `[A, B]` | — |
| 4 | `System.out.println(values.get(0));` | `List<String>` | `ArrayList` | `[A, B]` | `A` |
| 5 | `System.out.println(values.size());` | `List<String>` | `ArrayList` | `[A, B]` | `2` |

**Actual output:** `A` then `2`. The reference type stayed `List<String>` throughout; the `ArrayList` object did the real work.

## Faded Practice

Fill the blank so `display` accepts **both** an `ArrayList<String>` and a `LinkedList<String>` (the load-bearing decision):

```java
static void display(______<String> values) {   // which type covers every implementation?
    System.out.println(values);
}
```

> [!answer]- Answer
> `List` — the interface. Declaring the parameter as `ArrayList` would reject a `LinkedList`; declaring the `List` interface accepts every class that implements it.

Progression to aim for: read this labeled example → predict which lines compile in Mini Practice #1 → complete-the-code (above) → write `int total(List<Integer>)` from a blank editor and run it against both backends (Mini Practice #2).

## List Implementations

The interface stays the same; the class you plug in changes the performance profile.

| Class | Reach for it when | Notes |
|---|---|---|
| `ArrayList` | indexed reads and iteration are common; most inserts are at the end | best general-purpose default |
| `LinkedList` | used as a deque; adds/removes at the ends; sequential access is fine | also implements `Deque` |
| `Vector`, `Stack` | almost never in new code | legacy; prefer `ArrayList` and `ArrayDeque` |

## Common List Methods

| Method | Meaning |
|---|---|
| `add(element)` | Appends an element |
| `add(index, element)` | Inserts at a position |
| `addAll(collection)` | Adds all elements from another collection |
| `get(index)` | Returns the element at a position |
| `set(index, element)` | Replaces the element at a position |
| `remove(index)` | Removes by position |
| `indexOf(object)` | First matching index, or `-1` |
| `lastIndexOf(object)` | Last matching index, or `-1` |
| `size()` | Number of elements |
| `contains(object)` | Tests membership |

## Common Mistakes

- Calling `ArrayList` an interface → it is a **class** that *implements* the `List` interface.
- Saying "ArrayList is a child class of List" → an interface is not a superclass; the precise phrasing is "`ArrayList` **implements** `List`."
- Believing the right side (`new ArrayList<>()`) controls which methods you can call → the **left-side reference type** fixes the compile-time API.
- Writing `new List<>()` → interfaces have no constructor; instantiate a concrete class instead.
- Expecting `ArrayList`-only methods (e.g. `ensureCapacity`) through a `List` reference → they are not in the `List` contract, so it is a compile error.
- Declaring parameters/fields as the concrete type "to be specific" → program to the interface unless you genuinely need implementation-specific behaviour.

## Examples and Non-Examples

**Example — flexible parameter:**
```java
static void display(List<String> values) {   // accepts ArrayList AND LinkedList
    System.out.println(values);
}
```

**Non-Example — needlessly restrictive parameter:**
```java
static void display(ArrayList<String> values) {
    // FALSE BELIEF: "the parameter type should match the object I usually pass"
    // rejects LinkedList<String> even though only List behaviour is used
    System.out.println(values);
}
```

**Non-Example — instantiating the interface:**
```java
List<String> names = new List<>();
// FALSE BELIEF: "an interface can be instantiated like a class"
// interfaces have no constructor — use new ArrayList<>()
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/list

Why can `new List<>()` not compile?
?
`List` is an interface; interfaces have no constructor and cannot be instantiated directly. You must create an object of a concrete class that implements it, e.g. `new ArrayList<>()`.

In `List<String> x = new ArrayList<>();`, what object is created, and what does the `List` reference expose?
?
An `ArrayList` object is created; the `List` reference exposes only the `List`/`Collection` contract — not `ArrayList`-specific methods like `ensureCapacity`.

## Mini Practice

1. For each line, state the reference type, the runtime object type, and whether it compiles. **Predict first, then run.**
   ```java
   List<Integer> a = new ArrayList<>();
   ArrayList<Integer> b = new ArrayList<>();
   List<Integer> c = new LinkedList<>();
   LinkedList<Integer> d = new List<>();
   ```
   **Expected:** `a`, `b`, `c` compile; `d` fails — you cannot instantiate the `List` interface (`new List<>()`).

2. Write `static int total(List<Integer> numbers)` that returns the sum of all values, then call it with both an `ArrayList<Integer>` and a `LinkedList<Integer>`. **Success criterion:** the *same* method compiles and works for both; for `[1, 2, 3]` it returns `6`. (Predict the sums, then run.)

## Mistake Log

Log misses to [[Collections Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[06 - ArrayList vs LinkedList|ArrayList vs LinkedList]] — the two backends you can swap behind one `List` reference
- Map: [[Collections MOC]]
- Related: [[02 - ArrayList Fundamentals|ArrayList Fundamentals]] · [[05 - LinkedList Fundamentals|LinkedList Fundamentals]] · [[Interfaces]]
- Prerequisites: [[Polymorphism]] · [[01 - Java Collections Framework|Java Collections Framework]]

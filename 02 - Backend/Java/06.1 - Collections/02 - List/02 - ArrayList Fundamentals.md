---
type: concept
topic: collections
status: learning
difficulty: easy
tags:
  - java
  - collections
  - arraylist
  - generics
  - autoboxing
aliases:
  - ArrayList
  - ArrayList Fundamentals
---
# ArrayList Fundamentals

## What it is

An `ArrayList<E>` is a **resizable-array** implementation of the `List<E>` interface. It stores elements in insertion order, permits duplicates, and gives fast index-based access starting at index `0`.

The type inside `< >` is the element type the list is allowed to hold — and it must be a **reference type**, never a primitive.

## Why it matters

`ArrayList` is the default general-purpose list in Java. Reach for it when:

- you don't know the final element count up front
- you need to add or remove elements over time
- you need fast random access by index (`get`/`set` are effectively constant time)
- order matters and duplicates are acceptable

## Internal Mental Model

An `ArrayList` wraps an ordinary array and tracks two separate numbers:

```text
size     = number of elements actually stored
capacity = number of slots in the backing array (capacity >= size)
```

- Adding does **not** allocate a new array every time — it fills existing slots.
- When `size` would exceed `capacity`, Java allocates a larger backing array and copies the elements over. This is why the list can "grow".
- Removing shifts later elements left; it does **not** shrink the backing array on each removal.

## Syntax / Pattern

```java
import java.util.ArrayList;

ArrayList<ElementType> name = new ArrayList<>();  // ElementType MUST be a reference type
name.add(element);          // append to the end
name.get(index);            // read by position
name.set(index, element);   // replace an existing element
name.remove(index);         // delete by position
```

## Wrapper Classes and Autoboxing

Generic type arguments cannot be primitives, so you use the wrapper class:

```java
ArrayList<int> numbers = new ArrayList<>();      // does NOT compile
ArrayList<Integer> numbers = new ArrayList<>();  // correct
```

Once the type is `Integer`, Java quietly converts between the primitive and the wrapper:

```java
numbers.add(25);             // int 25 is AUTOBOXED into Integer
int value = numbers.get(0);  // Integer is UNBOXED back into int
```

The primitive value passes through fine — but the declared type still has to be `Integer`, not `int`.

## Common Methods

| Method | Purpose |
|---|---|
| `size()` | Number of elements |
| `isEmpty()` | Whether the list has zero elements |
| `add(element)` | Append to the end |
| `add(index, element)` | Insert at a position (shifts right) |
| `get(index)` | Read the element at a position |
| `set(index, element)` | Replace the element at a position |
| `remove(index)` | Remove by position |
| `remove(object)` | Remove the first matching value |
| `contains(object)` | Whether a value is present |
| `indexOf(object)` | First index of a value, or `-1` |
| `clear()` | Remove every element |

## Worked Example

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // 1. create an empty list of Strings
        ArrayList<String> cars = new ArrayList<>();

        // 2. append three elements
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");

        // 3. insert (shifts right) then replace (no shift)
        cars.add(1, "Mazda");
        cars.set(2, "Toyota");

        // 4. read by index, and remove by index (remove RETURNS the removed element)
        String firstCar = cars.get(0);
        String removedCar = cars.remove(3);

        System.out.println(cars);
        System.out.println("First: " + firstCar);
        System.out.println("Removed: " + removedCar);
        System.out.println("Size: " + cars.size());
    }
}
```

**Explain in plain English (EiPE):** the list is built, then `add(index,…)` (insert) and `set` (replace) are contrasted, and finally an element is read and removed by index — printing how each step changed the list.

Output:

```text
[Volvo, Mazda, Toyota]
First: Volvo
Removed: Ford
Size: 3
```

## Trace

**Predict the final list before reading on:**  `___`

```java
ArrayList<Integer> values = new ArrayList<>();
values.add(25);
values.add(73);
values.add(14);
values.add(85);
values.add(9);

values.set(3, 555);
values.add(2, 5);
values.add(777);
values.remove(1);
System.out.println(values);
```

| Operation | Index 0 | Index 1 | Index 2 | Index 3 | Index 4 | Index 5 | Index 6 | Size |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Initial additions | 25 | 73 | 14 | 85 | 9 |  |  | 5 |
| `set(3, 555)` (replace) | 25 | 73 | 14 | 555 | 9 |  |  | 5 |
| `add(2, 5)` (insert, shift right) | 25 | 73 | 5 | 14 | 555 | 9 |  | 6 |
| `add(777)` (append) | 25 | 73 | 5 | 14 | 555 | 9 | 777 | 7 |
| `remove(1)` (delete index 1, shift left) | 25 | 5 | 14 | 555 | 9 | 777 |  | 6 |

**Actual output:** `[25, 5, 14, 555, 9, 777]`. Notice `set` kept the size the same, `add(index,…)` grew it, and `remove` shrank it and closed the gap.

## Faded Practice

Fill the blank so the **value** `1` is removed rather than the element at index `1` (the load-bearing overload choice):

```java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(10);
nums.add(20);
nums.add(1);

nums.______;                 // remove the VALUE 1, not the element at index 1
System.out.println(nums);    // want: [10, 20]
```

> [!answer]- Answer
> `remove(Integer.valueOf(1))`. A bare `remove(1)` binds to `remove(int index)` and deletes index 1 (the `20`). Boxing the argument to `Integer` selects the `remove(Object)` overload, which removes the first element *equal to* `1`.

## `set` vs `add`

These are not interchangeable:

```java
list.set(2, "New");   // REPLACES the element at index 2 — size unchanged
list.add(2, "New");   // INSERTS at index 2, shifts later elements right — size + 1
```

## The `remove` Overload Trap

For an `ArrayList<Integer>` there are two `remove` methods and the argument type decides which runs:

```java
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(1);

numbers.remove(1);                  // remove(int index)  -> deletes the 20 at index 1
numbers.remove(Integer.valueOf(1)); // remove(Object)     -> deletes the value 1
```

## Common Mistakes

- Using an index outside `0 .. size()-1` -> throws `IndexOutOfBoundsException` (valid indexes stop at `size()-1`, not `size()`).
- Confusing capacity with size -> `new ArrayList<>(100)` has capacity 100 but `size()` is `0` until you add elements.
- Declaring a primitive element type (`ArrayList<int>`) -> generic arguments must be reference types; use the wrapper `Integer`.
- Expecting a gap after removal -> later elements shift left and indexes stay contiguous.
- Calling `remove(intLiteral)` to delete a value from `ArrayList<Integer>` -> it deletes by index; box the value to hit `remove(Object)`.

## Examples and Non-Examples

**Example — ordered values with duplicates allowed:**

```java
ArrayList<String> names = new ArrayList<>();
names.add("Zoe");
names.add("Sam");
names.add("Zoe");
System.out.println(names);   // [Zoe, Sam, Zoe]
```

**Non-Example — using `set` to create the first element:**

```java
ArrayList<String> names = new ArrayList<>();
names.set(0, "Zoe");
// FALSE BELIEF: "set can create the first element like add does"
// Throws IndexOutOfBoundsException — set only REPLACES an element that already exists.
```

Use `add` to create the first element:

```java
names.add("Zoe");   // now index 0 exists, and set(0, ...) would work
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/collections

Why can an `ArrayList` change size when it is backed by a fixed array?
?
When the element count would exceed the backing array's capacity, Java allocates a larger array and copies the elements into it, so the logical size can grow past the original capacity.

What is the difference between an `ArrayList`'s size and its capacity?
?
Size is the number of elements actually stored; capacity is the number of slots in the backing array. Capacity is always at least size and is an internal detail you rarely set directly.

Why must you write `ArrayList<Integer>` instead of `ArrayList<int>`?
?
Generic type arguments must be reference types; primitives like `int` are not allowed, so you use the wrapper class `Integer`.

For an `ArrayList<Integer>`, what does `remove(1)` do, and how do you delete the value 1?
?
`remove(1)` calls `remove(int index)` and deletes the element at index 1. To delete the value 1, call `remove(Integer.valueOf(1))` so the `remove(Object)` overload runs.

## Mini Practice

1. Predict the output, then run:

```java
ArrayList<String> foods = new ArrayList<>();
foods.add("Rice");
foods.add("Chicken");
foods.add("Mango");
foods.add(1, "Beans");
foods.set(2, "Fish");
foods.remove(0);

System.out.println(foods);
System.out.println(foods.size());
```

**Expected output:**

```text
[Beans, Fish, Mango]
3
```

2. Write a program that (a) stores five scores, (b) inserts a score at index `2`, (c) replaces the last score, (d) removes the first score, then (e) prints every remaining score. **Success criterion:** the printed list has 5 elements and reflects each edit in order. Predict the final list before running.

## Mistake Log

When you miss one, log it to [[Collections Mistake Log]] as: wrong output -> minimal repro -> misconception -> recall-question form -> fix.

## Links
- Contrast: [[05 - LinkedList Fundamentals]] (linked nodes) vs `ArrayList` (backing array); decision guide in [[06 - ArrayList vs LinkedList]]
- Map: [[Collections MOC]]
- Related: [[03 - List Interface and Polymorphism]] · [[04 - Iterator Interface]] · [[Generics in Java]]
- Prerequisites: [[01 - Java Collections Framework]] · [[Arrays in Java]]

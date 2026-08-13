---
tags:
  - java
  - collections
  - active-recall
  - practice
aliases:
  - Day 9 Collections Review
---

# Collections Practice and Review

## Retrieval Practice

Answer without opening the other notes.

1. What is the Java Collections Framework?
2. What is the difference between `Collection` and `Collections`?
3. Is `Map` a subtype of `Collection`?
4. What does `List<E>` guarantee?
5. Is `ArrayList` a class or interface?
6. Why does `ArrayList<int>` fail?
7. What is autoboxing?
8. What is the difference between `add`, `get`, and `set`?
9. What does the left side represent here?

```java
List<String> names = new ArrayList<>();
```

10. What does the right side create?
11. Is `Iterator` a class or interface?
12. How can `iterator()` return an object if `Iterator` is an interface?
13. What is the difference between `hasNext()` and `next()`?
14. When should `iterator.remove()` be used?
15. Why is direct removal inside an enhanced `for` loop unsafe?
16. How is `LinkedList` stored?
17. Why is indexed access slow in a linked list?
18. Which usually uses more memory per element: `ArrayList` or `LinkedList`?
19. Which is the best default general-purpose list?
20. Which structure is commonly preferred for stack/queue behaviour?

---

# Code Tracing

## Trace 1 — ArrayList

Predict the output:

```java
ArrayList<String> names = new ArrayList<>();

names.add("Andrea");
names.add("Malik");
names.add(1, "Jordan");
names.set(0, "Maya");
names.remove(2);

System.out.println(names);
System.out.println(names.size());
```

<details>
<summary>Answer</summary>

```text
[Maya, Jordan]
2
```

</details>

## Trace 2 — Integer Removal

Predict the result:

```java
ArrayList<Integer> numbers = new ArrayList<>();

numbers.add(5);
numbers.add(10);
numbers.add(15);
numbers.add(1);

numbers.remove(1);

System.out.println(numbers);
```

<details>
<summary>Answer</summary>

`remove(1)` selects the `remove(int index)` overload.

```text
[5, 15, 1]
```

To remove the value `1`:

```java
numbers.remove(Integer.valueOf(1));
```

</details>

## Trace 3 — Iterator

Predict the output:

```java
ArrayList<Integer> values = new ArrayList<>();
values.add(3);
values.add(6);
values.add(9);
values.add(12);

Iterator<Integer> iterator = values.iterator();

while (iterator.hasNext()) {
    int value = iterator.next();

    if (value > 8) {
        iterator.remove();
    }
}

System.out.println(values);
```

<details>
<summary>Answer</summary>

```text
[3, 6]
```

</details>

## Trace 4 — LinkedList Ends

```java
LinkedList<String> queue = new LinkedList<>();

queue.addLast("B");
queue.addFirst("A");
queue.addLast("C");
queue.removeFirst();
queue.addFirst("Z");

System.out.println(queue);
```

<details>
<summary>Answer</summary>

```text
[Z, B, C]
```

</details>

---

# Find the Mistake

## Problem 1

```java
ArrayList<int> scores = new ArrayList<>();
```

<details>
<summary>Correction</summary>

```java
ArrayList<Integer> scores = new ArrayList<>();
```

</details>

## Problem 2

```java
List<String> names = new List<>();
```

<details>
<summary>Correction</summary>

```java
List<String> names = new ArrayList<>();
```

`List` is an interface and cannot be instantiated directly.

</details>

## Problem 3

```java
Iterator<String> iterator = new Iterator<>();
```

<details>
<summary>Correction</summary>

```java
Iterator<String> iterator = names.iterator();
```

The collection returns an iterator implementation object.

</details>

## Problem 4

```java
for (String name : names) {
    if (name.isBlank()) {
        names.remove(name);
    }
}
```

<details>
<summary>Correction</summary>

```java
Iterator<String> iterator = names.iterator();

while (iterator.hasNext()) {
    if (iterator.next().isBlank()) {
        iterator.remove();
    }
}
```

Or:

```java
names.removeIf(String::isBlank);
```

</details>

## Problem 5

```java
import java.util.*
```

<details>
<summary>Correction</summary>

```java
import java.util.*;
```

</details>

---

# Worked Challenge

Create a program that manages player names.

Requirements:

1. Declare the variable using `List<String>`.
2. Create an `ArrayList` object.
3. Add at least six names.
4. Insert one name at index `2`.
5. Replace one existing name.
6. Remove one name by value.
7. Use an iterator to remove names shorter than four characters.
8. Print the remaining names and size.

Starter:

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PlayerManager {
    public static void main(String[] args) {
        List<String> players = new ArrayList<>();

        // Add values

        // Insert

        // Replace

        // Remove by value

        Iterator<String> iterator = players.iterator();

        while (iterator.hasNext()) {
            String player = iterator.next();

            // Remove short names
        }

        System.out.println(players);
        System.out.println("Size: " + players.size());
    }
}
```

---

# Explain It Aloud

Give a 30-second explanation for each prompt:

## Prompt 1

```java
List<String> names = new ArrayList<>();
```

A strong answer should mention:

- `List` is the reference type and interface
- `ArrayList` is the concrete class
- `new` creates an object
- the diamond operator infers `String`
- the variable can use the `List` contract

## Prompt 2

```java
Iterator<String> iterator = names.iterator();
```

A strong answer should mention:

- `Iterator` is an interface
- `iterator()` is a method on the collection
- the method creates or returns an implementation object
- the iterator tracks traversal state
- `hasNext` checks and `next` retrieves/advances

## Prompt 3

ArrayList vs LinkedList

A strong answer should mention:

- backing array vs linked nodes
- indexed access
- shifting vs relinking
- node lookup cost
- memory overhead
- `ArrayList` as the normal default

---

# Spaced-Repetition Prompts

Convert these into flashcards.

## Card 1

**Question:** Why can’t Java use `ArrayList<int>`?

**Answer:** Generic type arguments must be reference types. Use the wrapper class `Integer`; Java can autobox `int` values into `Integer` objects.

## Card 2

**Question:** What object exists in `List<String> x = new ArrayList<>();`?

**Answer:** An `ArrayList<String>` object exists. `x` is a `List<String>` reference to it.

## Card 3

**Question:** Why doesn’t `ArrayList` implement `Iterator`?

**Answer:** The collection itself stores data; a separate iterator object tracks one traversal. `ArrayList.iterator()` returns an object whose class implements `Iterator`.

## Card 4

**Question:** What does `Iterator.remove()` remove?

**Answer:** The last element returned by `next()`.

## Card 5

**Question:** Why is `LinkedList.get(index)` slow?

**Answer:** It must traverse node references from the beginning or end until it reaches the requested position.

## Card 6

**Question:** Which list should normally be chosen first?

**Answer:** `ArrayList`, unless a measured or clear use case requires a different structure.

---

# Mistake Log Template

Use this whenever your code fails:

```markdown
## Mistake

### Code
```java
// failing code
```

### Error
Exact compiler or runtime error:

### My Original Belief
What I thought Java would do:

### Correct Rule
What Java actually does:

### Fixed Code
```java
// corrected code
```

### Retrieval Question
What question will help me avoid this next time?
```

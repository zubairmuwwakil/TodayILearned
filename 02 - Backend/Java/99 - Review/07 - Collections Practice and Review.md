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

> [!answer]- Answer
> ```text
> [Maya, Jordan]
> 2
> ```

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

> [!answer]- Answer
> `remove(1)` selects the `remove(int index)` overload.
>
> ```text
> [5, 15, 1]
> ```
>
> To remove the value `1`:
>
> ```java
> numbers.remove(Integer.valueOf(1));
> ```

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

> [!answer]- Answer
> ```text
> [3, 6]
> ```

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

> [!answer]- Answer
> ```text
> [Z, B, C]
> ```

---

# Find the Mistake

## Problem 1

```java
ArrayList<int> scores = new ArrayList<>();
```

> [!answer]- Correction
> ```java
> ArrayList<Integer> scores = new ArrayList<>();
> ```

## Problem 2

```java
List<String> names = new List<>();
```

> [!answer]- Correction
> ```java
> List<String> names = new ArrayList<>();
> ```
>
> `List` is an interface and cannot be instantiated directly.

## Problem 3

```java
Iterator<String> iterator = new Iterator<>();
```

> [!answer]- Correction
> ```java
> Iterator<String> iterator = names.iterator();
> ```
>
> The collection returns an iterator implementation object.

## Problem 4

```java
for (String name : names) {
    if (name.isBlank()) {
        names.remove(name);
    }
}
```

> [!answer]- Correction
> ```java
> Iterator<String> iterator = names.iterator();
>
> while (iterator.hasNext()) {
>     if (iterator.next().isBlank()) {
>         iterator.remove();
>     }
> }
> ```
>
> Or:
>
> ```java
> names.removeIf(String::isBlank);
> ```

## Problem 5

```java
import java.util.*
```

> [!answer]- Correction
> ```java
> import java.util.*;
> ```

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

> [!answer]- A strong answer should mention
> - `List` is the reference type and interface
> - `ArrayList` is the concrete class
> - `new` creates an object
> - the diamond operator infers `String`
> - the variable can use the `List` contract
## Prompt 2

```java
Iterator<String> iterator = names.iterator();
```

> [!answer]- A strong answer should mention
> - `Iterator` is an interface
> - `iterator()` is a method on the collection
> - the method creates or returns an implementation object
> - the iterator tracks traversal state
> - `hasNext` checks and `next` retrieves/advances
## Prompt 3

ArrayList vs LinkedList

> [!answer]- A strong answer should mention
> - backing array vs linked nodes
> - indexed access
> - shifting vs relinking
> - node lookup cost
> - memory overhead
> - `ArrayList` as the normal default
---

# Spaced-Repetition Prompts

%% Deduped 2026-08-14 red-line sweep: 6 draft cards with visible answers removed — they restated Retrieval Practice questions 6, 9/10, 12, 14, 17 and 19 (one question, one home), and their answers live in the owning concept notes (02 - ArrayList Fundamentals, 03 - List Interface and Polymorphism, 04 - Iterator Interface, 05/06 - LinkedList). Full card text preserved in the sweep report. %%

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

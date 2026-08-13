---
type: concept
topic: object-oriented-programming
status: learning
difficulty: medium
tags:
  - java
  - oop
  - inheritance
  - object-class
  - equals
  - hashcode
  - tostring
---
# The `Object` Superclass

## What it is

`java.lang.Object` is the **root of every Java class hierarchy**. A class that has no `extends` clause implicitly extends `Object`, so *every* object — directly or through its parents — inherits `Object`'s methods.

```java
public class Person { }                 // implicitly: class Person extends Object
```

Because `java.lang` is imported automatically, these inherited members are always available:

```java
String toString()          // default: ClassName@hexHashCode
boolean equals(Object obj) // default: reference identity (like ==)
int hashCode()             // default: identity-based hash
Class<?> getClass()        // the object's runtime class
```

## Why it matters

The three you override most — `toString`, `equals`, `hashCode` — decide how your objects **print, compare, and behave inside hash-based collections**. Leave them as `Object`'s defaults and a `Person` prints as `Person@2f92e0f4`, two people with identical fields count as unequal, and duplicates slip into a `HashSet`. Override them and your objects become readable, value-comparable, and safe as `HashMap`/`HashSet` keys.

## Syntax / Pattern

```java
class Person {
    @Override public String toString()  { /* readable state */ }
    @Override public boolean equals(Object obj) { /* value equality */ }
    @Override public int hashCode()     { /* consistent with equals */ }
}
```

The rule that ties them together: **override `equals` and `hashCode` as a pair**, and give `equals` the parameter type `Object` (not your own class) so it *overrides* rather than overloads.

## Worked Example

```java
import java.util.Objects;

class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {   // 1. fields that define identity
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {              // 2. readable state instead of Person@hash
        return "Person{name='" + name + "', age=" + age + "}";
    }

    @Override
    public boolean equals(Object obj) {     // 3. value equality, not reference identity
        if (this == obj) return true;                        // same object shortcut
        if (!(obj instanceof Person other)) return false;    // type check + bind `other`
        return age == other.age && Objects.equals(name, other.name);
    }

    @Override
    public int hashCode() {                 // 4. equal objects MUST share a hash code
        return Objects.hash(name, age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person first  = new Person("Noah", 22);
        Person second = new Person("Noah", 22);

        System.out.println(first);                // 5. toString called implicitly
        System.out.println(first == second);      // 6. reference identity
        System.out.println(first.equals(second)); // 7. value equality
    }
}
```

**Explain in plain English (EiPE):** the overrides make two *distinct* `Person` objects that hold the same data print readably and compare as equal, even though `==` still sees them as different objects.

### `toString()` across an inheritance chain

Each level adds its own fields by wrapping `super.toString()` — no field is repeated in more than one method:

```java
class Student extends Person {
    private final int studentId;

    public Student(String name, int age, int studentId) {
        super(name, age);
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "Student{" + super.toString() + ", studentId=" + studentId + "}";
    }
}

class APStudent extends Student {
    private final int apScore;

    public APStudent(String name, int age, int studentId, int apScore) {
        super(name, age, studentId);
        this.apScore = apScore;
    }

    @Override
    public String toString() {
        return "APStudent{" + super.toString() + ", apScore=" + apScore + "}";
    }
}
```

```java
System.out.println(new APStudent("Noah", 17, 123, 90));
```

**Output:** `APStudent{Student{Person{name='Noah', age=17}, studentId=123}, apScore=90}`

> [!important]
> When overriding `equals`, always override `hashCode` too. The contract requires **equal objects to return equal hash codes** — break it and a `HashMap`/`HashSet` may store an object in one bucket but look for it in another.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `first` | `second` | Output |
|---|---|---|---|---|
| 5 | `System.out.println(first);` | `Person("Noah",22)` | `Person("Noah",22)` | `Person{name='Noah', age=22}` |
| 6 | `System.out.println(first == second);` | object A | object B | `false` |
| 7 | `System.out.println(first.equals(second));` | object A | object B | `true` |

**Actual output:**
```text
Person{name='Noah', age=22}
false
true
```

Inside line 7, `first.equals(second)` runs in order: `this == obj` → `false` (different objects, keep going) → `obj instanceof Person` → `true` (binds `other`) → `22 == 22` → `true` → `Objects.equals("Noah","Noah")` → `true` → returns `true`. Line 6 is `false` because `==` compares references, not fields.

## Faded Practice

Fill the blank so this method **overrides** `Object.equals` instead of quietly overloading it (the load-bearing decision):

```java
@Override
public boolean equals(______ obj) {   // which parameter type makes @Override compile?
    if (this == obj) return true;
    if (!(obj instanceof Person other)) return false;
    return age == other.age && Objects.equals(name, other.name);
}
```

> [!answer]- Answer
> `Object`. The signature must match `Object.equals(Object)` exactly. Writing `equals(Person obj)` creates a *new overload* that hash-based collections (which call `equals(Object)`) never invoke — and here the `@Override` annotation would refuse to compile, catching the mistake for you.

## Common Mistakes

- Writing `equals(Person p)` instead of `equals(Object obj)` → it *overloads*, so `HashSet`/`HashMap` keep calling `Object.equals`. Keep `@Override` so the compiler flags it.
- Overriding `equals` but not `hashCode` → equal objects can hash to different buckets and "vanish" from hash-based collections. Override both together.
- Using `==` to compare object contents → that tests reference identity; use `.equals()` for value equality.
- Claiming the default `toString()` prints a memory address → it prints `ClassName@hexHashCode`; the JVM does not guarantee that is a physical address.
- Forgetting `@Override` → a typo silently becomes a brand-new method instead of an override. Annotate to fail fast.

## Examples and Non-Examples

**Example** — a real override, seen by everyone:
```java
Person a = new Person("Noah", 22);
Person b = new Person("Noah", 22);
System.out.println(a.equals(b));   // true — overridden equals(Object) runs
```

**Non-Example** — the silent overload trap:
```java
// no @Override here, so it compiles fine — but it is an OVERLOAD, not an override
public boolean equals(Person other) {
    return name.equals(other.name);
}
// FALSE BELIEF: "any equals method I write is the one collections will call"
// HashSet/HashMap call equals(Object); this equals(Person) is invisible through an Object reference.
```

Quick reference:

| Goal | Correct approach |
|---|---|
| Check same object (identity) | `first == second` |
| Check logical / value equality | `first.equals(second)` |
| Print useful object state | Override `toString()` |
| Use objects correctly in `HashSet` / `HashMap` | Override **both** `equals()` and `hashCode()` |

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/object-class

Does the default `toString()` return the object's memory address?
?
No. It returns `ClassName` + `@` + the hexadecimal hash code; the JVM does not guarantee this is a physical address.

Why must you override `hashCode()` whenever you override `equals()`?
?
The contract requires equal objects to have equal hash codes; otherwise they get lost across buckets in `HashMap`/`HashSet`.

Why is `boolean equals(Person other)` not a real override of `Object.equals`?
?
Its parameter type is `Person`, not `Object`, so it is an overload; collections call `equals(Object)` and never reach it (and `@Override` would fail to compile).

## Mini Practice

Create a `Book` class with `title`, `author`, and `isbn`, then (predict each result before running):

1. Override `toString()`. **Expected output:** printing a book shows its title, author, and ISBN — not `Book@...`.
2. Override `equals(Object obj)` and `hashCode()` keyed on `isbn`. **Success criterion:** two different `Book` objects with the same ISBN return `true` from `equals` and the same value from `hashCode`.
3. Add both books to a `HashSet<Book>`. **Success criterion:** the set's size is `1` — proof that value equality plus a matching hash code deduplicates correctly.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[Method Overriding]] (a real override of `equals`) vs the silent `equals(Person)` overload trap
- Map: [[Polymorphism MOC]]
- Related: [[Method Overriding]] · [[Polymorphism]] · [[03-Inheritance-and-Constructors]]
- Prerequisites: [[01-The-Super-Keyword]]

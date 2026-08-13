---
type: concept
topic: object-oriented-programming
status: learning
difficulty: easy
tags:
  - java
  - oop
  - inheritance
  - super
---
# The `super` Keyword

## What it is

`super` is a reference to the **superclass portion of the current object**. Every subclass instance carries an inherited "parent slice" alongside its own fields, and `super` is how the subclass reaches into that slice. It has exactly two jobs:

```java
super(arguments);     // call a superclass CONSTRUCTOR (only from a constructor)
super.methodName();   // call the superclass version of an OVERRIDDEN method
```

## Why it matters

A subclass builds on top of its parent rather than replacing it. `super` lets a subclass:

- initialize inherited superclass state through the parent's constructor (instead of duplicating that logic),
- reuse the parent's behaviour and then extend it (run parent code, then add subclass code),
- reach the original implementation of a method it has overridden.

Without `super`, an override would have no way to say "do what the parent did, *plus* this."

## Syntax / Pattern

```java
// In a subclass constructor:
public Subclass(int a, int b) {
    super(a);              // MUST be the first statement
    this.field = b;
}

// In an overriding method:
@Override
public void action() {
    super.action();       // run the parent's version first...
    // ...then add subclass behaviour
}
```

### `super` vs `this`

| Keyword | Refers to | Method resolution |
|---|---|---|
| `this` | the current object / current class members | normal (dynamic) dispatch |
| `super` | the superclass slice of the current object | forces the **superclass** implementation |

`this.action()` resolves through the object's own class; `super.action()` deliberately skips the override and runs the parent's code.

## Worked Example

```java
public class Person {
    private final String name;

    public Person(String name) {           // 1. parent constructor initializes inherited state
        this.name = name;
    }

    public void introduce() {
        System.out.println("My name is " + name);
    }

    @Override
    public String toString() {
        return "name='" + name + "'";
    }
}
```

```java
public class Student extends Person {
    private final int studentId;

    public Student(String name, int studentId) {
        super(name);                       // 2. delegate name-setup to Person FIRST
        this.studentId = studentId;        // 3. then initialize this class's own field
    }

    @Override
    public void introduce() {
        super.introduce();                 // 4. reuse Person's introduce...
        System.out.println("My student ID is " + studentId);  // 5. ...then add to it
    }

    @Override
    public String toString() {
        return "Student{" + super.toString()   // 6. wrap the parent's toString
                + ", studentId=" + studentId + "}";
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Student student = new Student("Amina", 101);
        student.introduce();
        System.out.println(student);
    }
}
```

**Explain in plain English (EiPE):** each `super` call hands work to the `Person` slice of the `Student` object, so the subclass reuses parent construction and behaviour instead of rewriting it.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Line | Statement | `name` | `studentId` | Output |
|---|---|---|---|---|
| 1 | `new Student("Amina", 101)` — enter `Student` ctor | — | — | — |
| 2 | `super(name)` runs `Person("Amina")` | `"Amina"` | — | — |
| 3 | back in `Student` ctor: `this.studentId = 101` | `"Amina"` | `101` | — |
| 4 | `student.introduce()` selects `Student.introduce()` | `"Amina"` | `101` | — |
| 5 | `super.introduce()` runs `Person.introduce()` | `"Amina"` | `101` | `My name is Amina` |
| 6 | subclass line runs | `"Amina"` | `101` | `My student ID is 101` |
| 7 | `println(student)` → `Student.toString()` wraps `super.toString()` | `"Amina"` | `101` | `Student{name='Amina', studentId=101}` |

**Actual output:**
```text
My name is Amina
My student ID is 101
Student{name='Amina', studentId=101}
```
The parent constructor always finishes before the subclass constructor body, and `super.introduce()` runs the parent's version *before* the subclass adds its own line.

## Faded Practice

Fill the blank so `Student` correctly initializes the inherited `name` field (the load-bearing line):

```java
public class Student extends Person {
    private final int studentId;

    public Student(String name, int studentId) {
        ______;                        // let Person set up the inherited state
        this.studentId = studentId;
    }
}
```

> [!answer]- Answer
> `super(name)` — and it **must be the first statement**. Without it, the compiler tries to insert an implicit `super()`, which fails because `Person` has no no-arg constructor.

## Common Mistakes

- Putting any statement before `super(...)` in a constructor → compile error; `super(...)` must be the **first** statement.
- Expecting Java to guess a constructor when the superclass has no no-arg constructor → you must call `super(args)` explicitly, or it won't compile.
- Using `super` inside a `static` method → compile error; `super` needs a current instance, and static methods have none.
- Calling `super.method()` on a method the parent doesn't define (or that's `private`) → won't resolve; `super` only reaches inherited, accessible members.
- Chaining `super.super.method()` to skip two levels → illegal; you can only reach the *immediate* superclass.
- Typing `"n"` instead of `"\n"` in output → prints a literal `n`; use the escape sequence.

## Examples and Non-Examples

**Example:**
```java
public Student(String name, int studentId) {
    super(name);                 // legal: first statement, delegates parent setup
    this.studentId = studentId;
}
```

**Non-Example:**
```java
public Student(String name, int studentId) {
    this.studentId = studentId;
    super(name);                 // compile-time error
    // FALSE BELIEF: "super(...) can appear anywhere in the constructor"
}
```
The `super(...)` call is not an ordinary method call — it is the mandatory first step of construction.

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/super

What are the two distinct jobs of `super`?
?
`super(args)` calls a superclass constructor (only from within a constructor); `super.method()` calls the superclass version of an overridden method.

Where must `super(...)` appear inside a constructor, and why does it matter?
?
It must be the very first statement, so the parent slice of the object is fully constructed before the subclass initializes its own fields.

## Mini Practice

1. Write a `Vehicle` with `start()` that prints `Engine starting`. Add a `Car` that overrides `start()`, calls `super.start()`, then prints `Car ready to drive`. Call `new Car().start()`. **Expected output:** `Engine starting` then `Car ready to drive`, in that order. Predict, then run.
2. Give `Vehicle` a `Vehicle(String brand)` constructor and `Car` a `Car(String brand, int doors)` constructor that delegates with `super(brand)`. **Success criterion:** the `brand` field is initialized by the parent constructor and `doors` by the child — verify by printing both from a `toString()` that wraps `super.toString()`.

## Mistake Log

When you miss one, log it to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links
- Contrast: [[The this Keyword]] (own class) vs `super` (parent slice)
- Map: [[Inheritance MOC]]
- Related: [[20 Areas/Education/Obsidi Academy/Sessions/Java/Day 6 Jul 13/method overriding]] · [[02-Object-Superclass]] · [[Constructors in Java]]
- In practice: [[Polymorphism]]
- Prerequisites: [[Inheritance in Java]]

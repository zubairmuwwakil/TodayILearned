---
type: review
topic: review
tags:
  - java
  - review
---
# OOP Abstraction and Polymorphism Review

## What it is

A retrieval-practice review covering abstraction, abstract classes, interfaces, overriding, overloading, polymorphism, and inherited access methods.

## Why it matters

Testing yourself forces active recall. This produces stronger learning than rereading notes alone.

## Syntax / Pattern

```text
Attempt from memory -> Check answer -> Explain mistake -> Retry later
```

## Worked Example

Predict the output before running the code:

```java
class Animal {
    public void speak() {
        System.out.println("Animal");
    }
}

class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("Dog");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.speak();
    }
}
```

> [!answer]- Answer
> `Dog`, because the runtime object type controls overridden instance-method dispatch.

## Trace

For every code question:

1. Identify the reference type.
2. Identify the runtime object type.
3. Check whether the method is overloaded or overridden.
4. Determine what the compiler permits.
5. Determine which method implementation runs.

## Common Mistakes

- Reading the answer before attempting retrieval.
- Running the code before predicting the output.
- Memorizing definitions without writing code.
- Ignoring compiler errors instead of translating them into rules.

## Examples and Non-Examples

### Effective Review

```text
Predict -> Run -> Compare -> Explain
```

### Ineffective Review

```text
Reread the same paragraph five times.
```

## Recall Questions

1. Why can an abstract class not be instantiated?
2. Name two things an abstract class can contain that an interface cannot use in the same way.
3. What keyword connects a class to an interface?
4. Why must an implementation of an interface method usually be public?
5. How do default and static interface methods differ?
6. What must differ for method overloading?
7. What must match for method overriding?
8. Which type controls compile-time access?
9. Which type controls overridden method execution?
10. Why should superclass fields normally be private?

## Mini Practice

### Exercise 1: Design

Create a `PaymentMethod` interface with `pay(double amount)`. Implement it with `CreditCardPayment` and `CashPayment`.

### Exercise 2: Abstract Class

Create an abstract `Employee` class with shared `name` state, a concrete `clockIn` method, and an abstract `calculatePay` method.

### Exercise 3: Trace

Predict the output:

```java
class A {
    void show() {
        System.out.println("A");
    }
}

class B extends A {
    @Override
    void show() {
        System.out.println("B");
    }
}

A value = new B();
value.show();
```

### Exercise 4: Diagnose

Explain why this does not compile:

```java
int convert(String value) {
    return Integer.parseInt(value);
}

double convert(String value) {
    return Double.parseDouble(value);
}
```

## Links / Related Notes

- [[Abstraction in Java]]
- [[Abstract Classes]]
- [[Interfaces]]
- [[Interface Default and Static Methods]]
- [[Polymorphism]]
- [[Method Overriding]]
- [[Method Overloading]]
- [[Inherited Getters and Setters]]
- [[Abstraction Polymorphism and Methods Mistake Log]]

---
tags:
  - java
  - active-recall
  - practice
  - oop
  - exceptions
---

# OOP and Exception Handling Review

## Rapid Recall

Answer without looking at the notes.

1. Expand the SOLID acronym.
2. Which SOLID principle warns against one oversized interface?
3. Which SOLID principle says subtypes must honour parent expectations?
4. What is the difference between `super()` and `super.method()`?
5. Are constructors inherited?
6. When does Java insert `super()`?
7. What class is at the root of Java's class hierarchy?
8. What does default `Object.equals()` compare?
9. Why should `hashCode()` be overridden with `equals()`?
10. What does `static` mean?
11. Why is `main` static?
12. Can a static method directly use `this`?
13. What happens to a `try` block after an exception is thrown?
14. Why must specific catches precede general catches?
15. How many catch blocks run for one exception?
16. What is the main purpose of `finally`?
17. When is try-with-resources preferred?

## Code Tracing 1 — Constructor Chain

Predict the output:

```java
class A {
    A() {
        System.out.println("A");
    }
}

class B extends A {
    B() {
        System.out.println("B");
    }
}

class C extends B {
    C() {
        System.out.println("C");
    }
}

public class Main {
    public static void main(String[] args) {
        new C();
    }
}
```

<details>
<summary>Answer</summary>

```text
A
B
C
```

The constructor chain reaches the highest superclass first, then returns downward.

</details>

## Code Tracing 2 — `super`

Predict the output:

```java
class Parent {
    void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    void show() {
        super.show();
        System.out.println("Child");
    }
}

public class Main {
    public static void main(String[] args) {
        new Child().show();
    }
}
```

<details>
<summary>Answer</summary>

```text
Parent
Child
```

</details>

## Code Tracing 3 — Static Counter

Predict the output:

```java
class User {
    static int count = 0;

    User() {
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        new User();
        new User();
        new User();

        System.out.println(User.count);
    }
}
```

<details>
<summary>Answer</summary>

```text
3
```

</details>

## Code Tracing 4 — Multiple Catches

Predict the output:

```java
public class Main {
    public static void main(String[] args) {
        try {
            int value = Integer.parseInt("abc");
            System.out.println(10 / value);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number");
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide");
        } finally {
            System.out.println("Finished");
        }
    }
}
```

<details>
<summary>Answer</summary>

```text
Invalid number
Finished
```

`parseInt` fails first, so division is never attempted.

</details>

## Find the Mistake 1

```java
class Employee extends Person {
    Employee(String name) {
        System.out.println("Creating employee");
        super(name);
    }
}
```

<details>
<summary>Answer</summary>

`super(name)` must be the first constructor statement.

</details>

## Find the Mistake 2

```java
try {
    riskyOperation();
} catch (Exception e) {
    System.out.println("General");
} catch (ArithmeticException e) {
    System.out.println("Arithmetic");
}
```

<details>
<summary>Answer</summary>

The `ArithmeticException` catch is unreachable. Put it before `Exception`.

</details>

## Find the Mistake 3

```java
public static void printName() {
    System.out.println(this.name);
}
```

<details>
<summary>Answer</summary>

A static method has no `this`. It needs an object reference or the method should be an instance method.

</details>

## Find the Mistake 4

```java
@Override
public boolean equals(Person other) {
    return name.equals(other.name);
}
```

<details>
<summary>Answer</summary>

This does not override `Object.equals(Object)`. The parameter must be `Object`, and `hashCode()` should also be overridden.

</details>

## Implementation Exercise

Build a small payment system.

### Requirements

1. Create a `PaymentProcessor` interface:

```java
void process(double amount);
```

2. Create:
   - `CreditCardProcessor`
   - `PayPalProcessor`

3. Create a `CheckoutService` that receives a `PaymentProcessor` through its constructor.

4. Reject amounts less than or equal to zero by throwing:

```java
IllegalArgumentException
```

5. In `main`, use try/catch to display a useful message for invalid amounts.

6. Add a static counter tracking successful payments.

### Principles Practised

- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion
- constructor injection
- static state
- exception handling

## Spaced Repetition Prompts

Review these prompts:

- **Tomorrow:** Explain every SOLID principle from memory.
- **In 3 days:** Rebuild the constructor-chain example without notes.
- **In 7 days:** Implement `equals`, `hashCode`, and `toString` for a new class.
- **In 14 days:** Refactor a tightly coupled service to depend on an interface.

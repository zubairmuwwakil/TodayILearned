# Fundamentals of OOP: Polymorphism and Inheritance Teachback

## Goal

Explain inheritance and polymorphism in your own words, show how they work in Java, and explain why they matter when building flexible programs.

Recommended timing: 18 minutes presentation, 7 minutes questions.

## Main Message

Inheritance lets one class reuse and specialize behavior from another class.

Polymorphism lets different objects be treated through the same parent type while still running their own version of behavior.

Short version: inheritance builds the relationship; polymorphism uses that relationship to write flexible code.

## Slide Plan

### Slide 1: Title

**Fundamentals of OOP: Polymorphism and Inheritance**

Speaker note:
Today I am explaining two object-oriented programming ideas that work closely together. Inheritance answers "what kind of thing is this?" Polymorphism answers "can I use different kinds of things through the same type?"

Time: 1 minute

### Slide 2: Why This Matters

Bullets:
- Real programs change over time.
- We want code that can add new types without rewriting every method.
- Inheritance and polymorphism help us model shared behavior and variation.

Speaker note:
As developers, we are not just trying to make code work once. We are trying to make it understandable and easier to extend later. These concepts matter because they let us organize code around common behavior while still allowing each class to have its own details.

Visual:
Show a simple diagram:

```text
One command: send()

Email message  -> sends by email
SMS message    -> sends by text
Push message   -> sends by app notification
```

Time: 2 minutes

### Slide 3: Inheritance

Bullets:
- Inheritance creates an "is-a" relationship.
- A child class can reuse fields and methods from a parent class.
- A child class can also override behavior.

Speaker note:
Inheritance means one class is based on another class. The parent class contains common behavior. The child class inherits that behavior and can add to it or change specific parts. A good test is the "is-a" test. An email notification is a notification. An SMS notification is a notification.

Visual:

```text
Notification
    |
    +-- EmailNotification
    +-- SmsNotification
    +-- PushNotification
```

Time: 3 minutes

### Slide 4: Java Inheritance Code

Code:

```java
class Notification {
    protected String recipient;

    public Notification(String recipient) {
        this.recipient = recipient;
    }

    public void send(String message) {
        System.out.println("Sending notification to " + recipient);
    }
}

class EmailNotification extends Notification {
    public EmailNotification(String recipient) {
        super(recipient);
    }

    @Override
    public void send(String message) {
        System.out.println("Email to " + recipient + ": " + message);
    }
}
```

Speaker note:
The keyword `extends` creates the inheritance relationship. `EmailNotification` is a child of `Notification`. The `super(recipient)` call passes data to the parent constructor. The `@Override` annotation tells Java that this method is replacing a parent method.

Time: 3 minutes

### Slide 5: Polymorphism

Bullets:
- Polymorphism means "many forms."
- A parent type can refer to child objects.
- Java chooses the overridden method at runtime.

Speaker note:
Polymorphism is where inheritance becomes useful. If EmailNotification and SmsNotification are both Notifications, then I can write code that works with Notification objects generally. I do not need separate logic for every specific type.

Visual:

```text
Notification n = new EmailNotification("sam@example.com");
n.send("Your order shipped");

Variable type: Notification
Actual object: EmailNotification
Method that runs: EmailNotification.send()
```

Time: 3 minutes

### Slide 6: Java Polymorphism Demo

Code:

```java
import java.util.ArrayList;
import java.util.List;

class Notification {
    protected String recipient;

    public Notification(String recipient) {
        this.recipient = recipient;
    }

    public void send(String message) {
        System.out.println("Sending notification to " + recipient);
    }
}

class EmailNotification extends Notification {
    public EmailNotification(String recipient) {
        super(recipient);
    }

    @Override
    public void send(String message) {
        System.out.println("Email to " + recipient + ": " + message);
    }
}

class SmsNotification extends Notification {
    public SmsNotification(String recipient) {
        super(recipient);
    }

    @Override
    public void send(String message) {
        System.out.println("SMS to " + recipient + ": " + message);
    }
}

public class Main {
    public static void main(String[] args) {
        List<Notification> notifications = new ArrayList<>();
        notifications.add(new EmailNotification("sam@example.com"));
        notifications.add(new SmsNotification("555-1234"));

        for (Notification notification : notifications) {
            notification.send("Your order shipped.");
        }
    }
}
```

Expected output:

```text
Email to sam@example.com: Your order shipped.
SMS to 555-1234: Your order shipped.
```

Speaker note:
The list stores `Notification` references, but the actual objects are different child classes. The loop does not ask which type each object is. It simply calls `send`. Java uses dynamic dispatch to run the correct overridden method.

Time: 4 minutes

### Slide 7: Additional Research Concept 1 - Dynamic Dispatch

Bullets:
- The method is selected based on the actual object at runtime.
- This applies to overridden instance methods.
- This is why the same `send()` call behaves differently.

Speaker note:
Dynamic dispatch is the technical name for what Java is doing here. Even though the variable type is `Notification`, Java looks at the actual object in memory. If it is an `EmailNotification`, Java runs the email version. If it is an `SmsNotification`, Java runs the SMS version.

Visual:

```text
notification.send(...)
        |
        v
Java checks actual object type
        |
        +-- EmailNotification -> email send()
        +-- SmsNotification   -> SMS send()
```

Time: 2 minutes

### Slide 8: Additional Research Concept 2 - Inheritance vs Composition

Bullets:
- Inheritance is best for true "is-a" relationships.
- Composition is better for "has-a" relationships.
- Bad inheritance can make code rigid.

Speaker note:
Inheritance is powerful, but it should not be used just to reuse code. If the relationship is not truly "is-a," composition may be better. For example, a car has an engine, but a car is not an engine. That should be composition, not inheritance.

Visual:

```text
Good inheritance:
EmailNotification is a Notification

Better composition:
Car has an Engine
Car is not an Engine
```

Time: 2 minutes

### Slide 9: Common Mistakes

Bullets:
- Using inheritance only to avoid copying code.
- Forgetting `@Override`.
- Confusing overloading with overriding.
- Making parent classes too specific.

Speaker note:
One common mistake is forcing inheritance where it does not fit. Another is mixing up overriding and overloading. Overriding means a child replaces a parent method with the same method signature. Overloading means same method name, different parameters.

Time: 2 minutes

### Slide 10: Wrap-Up

Bullets:
- Inheritance models shared identity and behavior.
- Polymorphism lets one piece of code work with many object types.
- Dynamic dispatch is how Java chooses the correct overridden method.
- Use inheritance carefully; composition is sometimes better.

Speaker note:
The key idea is that inheritance gives us the relationship, and polymorphism lets us take advantage of that relationship. Together, they help code become more flexible, but only when the class relationships make sense.

Time: 1 minute

## Live Demo Plan

1. Start with only the `Notification` and `EmailNotification` classes.
2. Run one email notification.
3. Add `SmsNotification`.
4. Store both objects in a `List<Notification>`.
5. Loop through the list and call `send()`.
6. Add a third class, `PushNotification`, without changing the loop.

Key sentence:
"The loop did not change. That is the value of polymorphism."

## Practice Audience Questions

### 1. What is the difference between inheritance and polymorphism?

Inheritance is the relationship between classes, where a child class gets behavior from a parent class. Polymorphism is using that relationship so different child objects can be handled through the same parent type while still behaving in their own way.

### 2. What is the difference between overriding and overloading?

Overriding happens when a child class replaces a parent method with the same name, return type, and parameters. Overloading happens when methods have the same name but different parameter lists, usually inside the same class.

### 3. Why use `@Override`?

`@Override` tells Java that I intend to replace a method from the parent class. If I spell the method wrong or use the wrong parameters, Java gives me an error instead of silently creating a different method.

### 4. Can polymorphism work without inheritance?

In Java, polymorphism usually works through inheritance or interfaces. A class can inherit from a parent class, or multiple classes can implement the same interface. Interfaces are often preferred when the goal is shared behavior without sharing parent implementation.

### 5. When should I avoid inheritance?

Avoid inheritance when the relationship is not truly "is-a," or when the child class would need to ignore or fight against behavior from the parent. In those cases, composition is usually cleaner.

### 6. What does dynamic dispatch mean?

Dynamic dispatch means Java chooses which overridden method to run at runtime based on the actual object, not just the variable type.

### 7. Why does `Notification n = new EmailNotification(...)` work?

It works because an `EmailNotification` is a kind of `Notification`. A parent type variable can hold a child object reference.

### 8. Can a child class access everything in the parent class?

No. It depends on access modifiers. Public members are accessible. Protected members are accessible inside child classes. Private members are not directly accessible and should be accessed through methods if needed.

### 9. Why might interfaces be better than inheritance?

Interfaces let different classes promise the same behavior without forcing them into the same parent class. This is useful when classes are related by capability instead of identity.

### 10. What is one real-world example?

A payment system could have a `PaymentMethod` type with `CreditCardPayment`, `PayPalPayment`, and `GiftCardPayment`. The checkout code can call `pay()` on each payment method without knowing the exact class.

## Final Checklist Against Rubric

- Content in own words: use the notification example and your own explanation.
- Additional research: include dynamic dispatch and inheritance vs composition.
- Visual aids: include diagrams for inheritance, polymorphism, and dispatch.
- Demonstration: run the Java code live or walk through it line by line.
- Questions: prepare at least 10 questions and answer at least 3.
- Presentation timing: aim for 18 minutes plus 7 minutes Q&A.


# Teachback Rubric Evidence Map and Q&A

## Purpose

This document explains how the presentation is designed to meet every 100% row of the rubric. It is also a rehearsal and Q&A guide.

The deck provides the evidence, but two rubric results still depend on delivery:

- The presentation must actually finish after 15:00 and before 25:00.
- At least three audience questions must actually be answered accurately.

## Rubric coverage at the 100% level

| Rubric criterion | Where it is covered | Why it targets the 100% description | What the presenter must do |
|---|---|---|---|
| **Teachback Content — 20%** | Slides 2–12 and their speaker notes | The explanation is rebuilt in original language around the personal `Human` → `Student` / `Teacher` classroom analogy. Slides 2–4 establish class, object, reference, declaration, assignment, initialization, and instantiation. Slides 5–8 distinguish inheritance, overriding, and polymorphism. Slides 9–11 accurately explain compile-time access, runtime dispatch, constructors, fields, and static methods. Slide 12 reconstructs the definition and explains its value to a developer. | Explain the ideas instead of reading the slides. Emphasize the personal learning insight: “I was confusing them because they usually appear together. I now ask two separate questions: what relationship did I declare, and which implementation will run?” |
| **Additional Research — 20%** | Slide 6 and `Java25ConstructorDemo.java`; slide 11 | Research concept 1 is Java 25 flexible constructor bodies: restricted validation and preparation may occur before `super(...)`. Research concept 2 is the boundary of dynamic dispatch: overridden instance methods use runtime selection, while fields, static methods, and constructors use different selection rules. Both go beyond the basic definition of inheritance and polymorphism. | Call both out explicitly as “additional research.” Do not present slide 11 as merely another definition of polymorphism; present it as a comparison of four member-selection mechanisms. |
| **Visual Aids, Demonstrations, and Examples — 20%** | Every content slide; live demo on slide 10 | Every concept has a matching visual, code example, prediction activity, or executable demonstration. The two Java files compile under Java 25 with `javac -Xlint:all` and no warnings. The live-demo slide also contains fallback output if a terminal problem occurs. | Use a pointer or highlighter on the exact code line being discussed. On slides 9 and 10, ask for predictions before revealing or running the result. Run the prepared code rather than typing it live. |
| **Questions and Answers — 20%** | Slide 12 plus the prepared question bank below | The deck deliberately ends with Q&A, and this guide prepares accurate answers for more than the three required topical questions. | Answer at least three audience questions. State the rule first, then connect it to `Human`, `Student`, or `Teacher`. If unsure about an edge case, say what is known and offer to verify rather than guessing. |
| **Presentation — 20%** | Speaker-note timing on all 12 slides | The planned content time is **20:40**, excluding Q&A. That is safely greater than 15 minutes and less than 25 minutes. The timing ranges from 0:30 to 3:00 per slide, giving foundational and live-demo sections more time without creating long dead spots. | Rehearse with a stopwatch at least twice. Finish the takeaway before opening Q&A. Do not let audience questions interrupt the timed content unless the facilitator requires it. |

## Concept-to-visual audit

This mapping supports the requirement for at least one visual example or live demonstration for every concept presented.

| Concept | Visual or demonstration |
|---|---|
| Inheritance versus polymorphism | Slide 2 side-by-side distinction |
| Class, state, and behavior | Slide 3 `Human` class code |
| Object and separate instances | Slide 3 two object panels |
| Reference variable, declaration, assignment, initialization, and instantiation | Slide 4 three-stage timeline |
| Superclass, subclass, `extends`, accessible inherited behavior, and private parent state | Slide 5 hierarchy and member-flow explanation |
| Constructor chain and `super(...)` | Slide 6 flow diagram |
| Java 25 flexible constructor bodies | Slide 6 highlighted code plus `Java25ConstructorDemo.java` |
| Reusing, overriding, and adding methods | Slide 7 three-column comparison |
| How inheritance, overriding, and polymorphism connect | Slide 8 relationship → versions → runtime-use sequence |
| Declared type versus runtime type | Slide 9 compiler/runtime split and prediction activity |
| Runtime polymorphism | Slide 10 `List<Human>` live demonstration and fallback output |
| Dynamic-dispatch boundary | Slide 11 four-part member-selection comparison |
| Final distinction and developer value | Slide 12 synthesis formula |

## Timed presentation plan

| Slide | Focus | Target |
|---:|---|---:|
| 1 | Opening and personal learning problem | 0:30 |
| 2 | Definition and roadmap | 1:15 |
| 3 | Class versus object | 1:35 |
| 4 | Reference versus object | 1:25 |
| 5 | Inheritance hierarchy | 1:45 |
| 6 | Constructor chain and Java 25 research | 2:00 |
| 7 | Reuse, override, and add | 2:00 |
| 8 | Where inheritance ends and polymorphism begins | 1:30 |
| 9 | Compile-time type versus runtime type | 2:10 |
| 10 | Prediction and live demonstration | 3:00 |
| 11 | Dynamic-dispatch boundary | 2:00 |
| 12 | Rebuild the definition and close | 1:30 |
|  | **Total content time** | **20:40** |

Q&A begins only after the 20:40 content portion.

## Live-demo runbook

Before presenting, open a terminal in the deliverables folder and run:

```bash
javac -Xlint:all HumanTeachbackDemo.java Java25ConstructorDemo.java
java HumanTeachbackDemo
```

Optional second research demonstration:

```bash
java Java25ConstructorDemo
```

During slide 10:

1. Show the `List<Human>` and the unchanged `person.communicate(...)` call.
2. Ask the audience to predict the Student output.
3. Ask them to predict the Teacher output.
4. Run `java HumanTeachbackDemo`.
5. Point out that the loop, reference type, method name, and arguments did not change; only the runtime object changed.

If the terminal fails, use the output already shown on slide 10 and continue. Do not troubleshoot in front of the audience.

## Prepared Q&A bank

### 1. What is the shortest distinction between inheritance and polymorphism?

Inheritance creates a subtype relationship and shares accessible members. Runtime polymorphism uses a common supertype reference while selecting an overridden instance method from the runtime object.

### 2. Why is `Human person = new Student("Zub");` legal?

`Student extends Human`, so every `Student` object is also a `Human` object in this model. A reference of a supertype may therefore hold a reference to a subtype object.

### 3. Which type controls whether a call compiles?

The declared, or compile-time, type of the reference. If `person` is declared as `Human`, the compiler checks the `Human` API.

### 4. Which type controls which overridden method runs?

The runtime class of the object. If a `Human` reference points to a `Student`, `Student.communicate(...)` runs.

### 5. Why does `person.raiseHand()` fail when `person` refers to a Student?

The runtime object has the method, but the declared type `Human` does not declare it. The compiler therefore rejects the call.

### 6. What does `@Override` do?

It asks the compiler to verify that the method really overrides an inherited method. It does not change runtime behavior.

### 7. Are constructors inherited or polymorphic?

No. Constructors are neither inherited nor overridden. The class named after `new` selects the constructor explicitly; `super(...)` then initializes the parent portion of that same object.

### 8. Does `super(name)` create a second Human object?

No. It initializes the `Human` portion of the one `Student` or `Teacher` object being constructed.

### 9. Is the private `name` field inherited by Student?

Precisely stated, a private field is not inherited as a member of the subclass. The complete Student object still contains the state declared by its `Human` superclass, and Student accesses it through an accessible method such as `getName()`.

### 10. What changed with constructors in Java 25?

Java 25 permits a restricted constructor prologue before an explicit `super(...)` or `this(...)` call. Parameter validation and local preparation can occur there, but the not-yet-constructed object cannot be used freely.

### 11. Are fields or static methods dynamically dispatched?

No. Fields are selected using the declared or qualifying type. Static methods belong to classes and are hidden rather than overridden. Runtime dynamic dispatch applies to overridable instance methods.

### 12. What is the difference between overriding and overloading?

Overriding supplies a new implementation of an inherited instance-method signature in a subclass. Overloading declares a different parameter list; the compiler selects among overloads at compile time.

### 13. What happens if Student does not override `communicate(...)`?

Student inherits the accessible Human implementation, so a call on a Student object uses `Human.communicate(...)`. Inheritance still exists, but that call does not demonstrate different overridden behavior.

### 14. Can a cast make `raiseHand()` callable?

Only after a safe type check, for example `if (person instanceof Student student) { student.raiseHand(); }`. A cast changes what the compiler permits; it does not change the actual object. An incorrect cast can throw `ClassCastException`.

### 15. Can interfaces also support polymorphism?

Yes. An interface reference can point to objects of implementing classes, and overridden instance methods can be selected at runtime. This presentation uses class inheritance to keep one focused example.

### 16. Is Human → Student/Teacher always the best production design?

No. It is a deliberately simplified analogy for learning an “is-a” subtype relationship. In a real system, student and teacher may be changeable or overlapping roles, in which case composition or role objects may model the domain better.

## Accuracy notes and recommended phrasing

- Say **“private state exists in the complete object but is not inherited as a subclass member”**, not simply “private fields are inherited.”
- Say **“overridden instance methods are dynamically dispatched”**, not “Java decides every member from the runtime type.”
- Say **“the declared type controls which calls compile; the runtime object controls which override runs.”**
- Say **“constructors are not overridden”** and **“`super(...)` initializes the parent portion of the same object.”**
- Because this is Java 25, do not repeat the older blanket rule that `super(...)` must always be the first statement. Java 25 allows a restricted prologue.
- The classroom hierarchy is an analogy, not a claim that inheritance is always the best way to model real people or roles.

## Official research sources

- Java Language Specification, Java SE 25: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-1.html>
- Reference types and objects: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-4.html#jls-4.3.2>
- Class members and inheritance: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.2>
- Overriding and hiding: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.4.8>
- Constructor bodies in Java 25: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-8.html#jls-8.8.7>
- Runtime method selection: <https://docs.oracle.com/javase/specs/jls/se25/html/jls-15.html#jls-15.12.4.4>
- JEP 513, Flexible Constructor Bodies: <https://openjdk.org/jeps/513>


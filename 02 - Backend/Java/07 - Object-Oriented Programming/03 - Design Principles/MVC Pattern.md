---
type: concept
topic: design-principles
status: learning
difficulty: medium
aliases:
  - MVC Pattern
  - MVC
  - Model View Controller
  - Model-View-Controller
tags:
  - java
  - design-principles
  - design-patterns
  - architecture
  - mvc
---

# MVC Pattern

%% Graduated via [[Refiner Spec (Graduate)]] using Java/_refiner.md + [[Java Concept Note]]. This is the PATTERN, framework-independent. Spring's implementation — DispatcherServlet, HandlerMapping, ViewResolver — lives in [[Spring MVC]]. One home each; they link, they don't repeat. %%

## What it is

An architectural pattern that splits the presentation layer into three roles: the **Model** (the data), the **View** (how it's shown), and the **Controller** (what coordinates them). Each has one job and knows as little as possible about the others.

## Why it matters

You can change how something looks without touching what it means, and change what it means without touching how it looks. That separation is what makes a UI testable and lets a designer and a backend developer work on the same feature without colliding.

## Syntax / Pattern

```
request → Controller → (asks a Service for data) → fills Model → picks View → response
```

## Worked Example

```java
// 1. MODEL — data only. It does not print and it does not decide anything.
class Student {
    private String name;
    private String rollNo;
    String getName()            { return name; }
    void   setName(String n)    { this.name = n; }
    String getRollNo()          { return rollNo; }
    void   setRollNo(String r)  { this.rollNo = r; }
}

// 2. VIEW — presentation only. It knows how to display, not what is true.
class StudentView {
    void printStudentDetails(String name, String rollNo) {
        System.out.println("Student: " + name + " (" + rollNo + ")");
    }
}

// 3. CONTROLLER — coordinates the other two and holds no logic of its own.
class StudentController {
    private final Student model;
    private final StudentView view;

    StudentController(Student model, StudentView view) {
        this.model = model;
        this.view = view;
    }

    void setStudentName(String name) { model.setName(name); }
    void updateView() { view.printStudentDetails(model.getName(), model.getRollNo()); }
}
```

**Explain in plain English (EiPE):** the controller is the only piece that knows both the data and the screen; neither of the other two knows the other exists.

## Trace

**Predict the output before reading on:**
```java
Student model = new Student();
model.setRollNo("A-17");
StudentController c = new StudentController(model, new StudentView());
c.setStudentName("Anna");
c.updateView();
```
`___`

| Step | Who acts | Model state | Output |
|---|---|---|---|
| `setRollNo("A-17")` | caller → model | `rollNo=A-17` | — |
| `setStudentName("Anna")` | controller → model | `name=Anna, rollNo=A-17` | — |
| `updateView()` | controller → view | unchanged | `Student: Anna (A-17)` |

**Actual output:** `Student: Anna (A-17)`. Note the View never touched the Model — the Controller read the values and passed them in.

## Faded Practice

Where does a rule like *"a roll number must start with a letter"* belong? Fill the blank with the class name:

```java
class ______ {
    // validation lives here
}
```
> [!answer]- Answer
> **Neither `StudentView` nor `StudentController`.** Simple field validation belongs on the **Model** (`Student`); a real business rule belongs in a **Service** that the Controller calls. Putting it in the Controller is the single most common way MVC rots — see Common Mistakes.

## Common Mistakes

- **Fat controller** → business logic creeps into the Controller because that's where the request arrives. The Controller coordinates; a Service decides.
- **"Model means the database"** → in MVC the Model is just the **data passed to the View**. Persistence is a separate layer that happens to feed it.
- **View reaching into the Model directly** → couples presentation to data structure; the Controller should hand the View what it needs.
- **Assuming one Controller per app** → apps have many, each owning a slice of the routes.

## Examples and Non-Examples

**Example:**
```java
void updateView() { view.printStudentDetails(model.getName(), model.getRollNo()); }
```
**Non-Example:**
```java
void updateView() {
    if (model.getRollNo() == null) { model.setRollNo(generateNewRollNo()); }  // FALSE BELIEF:
    view.printStudentDetails(model.getName(), model.getRollNo());             // "the controller
}                                                                             // can just fix it"
// Business logic in the controller — now it can't be tested or reused without the view.
```

## Recall Questions

#flashcards/java/design-patterns

What are the three MVC roles, in one phrase each?
?
Model = the data; View = how it's presented; Controller = coordinates the two and owns neither.

Why is a "fat controller" the classic MVC failure?
?
Business logic ends up where requests arrive rather than in a service, making it untestable and unreusable — the controller should only coordinate.

In MVC, does "Model" mean the database layer?
?
No — it's the data handed to the View. Persistence is a separate layer that may feed the model but isn't it.

Why shouldn't the View read the Model directly?
?
It couples presentation to the data's structure; the Controller should pass the View exactly what it needs to render.

## Mini Practice

1. Build the `Student` trio from a blank file and make it print `Student: Anna (A-17)`. **Success criterion:** `StudentView` contains no `Student` type anywhere in its source.
2. Add a second View that prints the same data as CSV. **Success criterion:** neither `Student` nor `StudentController` changes except for which View is passed in.

## Correctness Check

Ran the Java checklist from `Java/_refiner.md`:

- ✅ **Compiles** — all three classes are package-private with matching accessors; `StudentController`'s constructor assigns both `final` fields; the traced call sequence type-checks.
- ✅ **Traced output** — `Student: Anna (A-17)`, verified against the format string.
- ➖ **`==` vs `.equals()`** — only a `== null` reference check in the Non-Example. Correct.
- ➖ **Overloading / autobox cache** — N/A.
- ➖ **Deliberate scope split:** the *Service is not part of MVC* point and the full Spring request pipeline are in [[Spring MVC]], not repeated here.

## Mistake Log

Log misses to [[Abstraction Polymorphism and Methods Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Spring's implementation: [[Spring MVC]]
- Composed with: [[Front Controller Pattern]]
- Related: [[01-SOLID-Design-Principles]] — single responsibility, one role per class
- Map: [[Design Principles MOC]]

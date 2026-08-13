---
aliases:
  - Design Principles Mistake Log
type: mistake-log
topic: mistake-log
tags:
  - java
  - mistakes
  - pitfall-prone
---
# Abstraction, Polymorphism, and Methods Mistake Log

## What it is

A mistake log records incorrect rules and replaces them with accurate mental models.

Review this note after coding errors or before an OOP assessment.

## Why it matters

Correcting a mistaken rule is more valuable than repeatedly rereading a correct definition. Retrieval from a mistake log helps prevent the same error from returning.

## Syntax / Pattern

```text
Mistake -> Correct rule -> Tiny example -> Prevention cue
```

## Worked Example

### Mistake 1: Interfaces contain only abstract methods

**Correct rule:** Modern interfaces may contain abstract, default, static, and private methods. Interface fields are constants.

### Mistake 2: Return type can create an overload

**Correct rule:** Return type alone cannot distinguish overloaded methods. The parameter list must differ.

### Mistake 3: A subclass can directly access inherited private fields

**Correct rule:** The object contains superclass state, but subclass code cannot directly access private fields. Use accessible methods.

### Mistake 4: Reference type decides the overridden method

**Correct rule:** The runtime object type decides which overridden instance method runs.

### Mistake 5: Concrete methods in abstract classes cannot be overridden

**Correct rule:** A concrete inherited method may be overridden unless it is `final`, `private`, or otherwise not overridable.

### Mistake 6: Static interface methods are called through objects

**Correct rule:** Call them with the interface name.

```java
Operations.getRandomNumber();
```

## Trace

When an error occurs:

1. Write the code or belief that caused the error.
2. State the corrected Java rule from memory.
3. Write the smallest possible compiling example.
4. Add a prevention cue.
5. Retest the rule after one day and one week.

## Common Mistakes

- Recording only the compiler message without the underlying concept.
- Copying a fix without explaining why it works.
- Writing examples that are too large to isolate the mistake.
- Never reviewing old mistakes.

## Examples and Non-Examples

### Example

```text
Mistake: Tried to overload by return type.
Correct rule: Parameters must differ.
Cue: Calls do not include the expected return type.
```

### Non-Example

```text
It did not work, so I changed some code.
```

This does not identify the incorrect rule.

## Recall Questions

1. Can return type alone distinguish overloads?
2. Can a class implement multiple interfaces?
3. Can a class extend multiple classes?
4. Which type controls overridden method dispatch?
5. Can an abstract class contain implemented methods?
6. How are static interface methods called?
7. Can a child class directly access a private parent field?

## Mini Practice

1. Recreate each corrected rule without looking at the explanations.
2. Write one compiling and one non-compiling example for each mistake.
3. Add new mistakes from Eclipse or compiler feedback as they occur.

## Links / Related Notes

- [[Abstraction in Java]]
- [[Abstract Classes]]
- [[Interfaces]]
- [[Polymorphism]]
- [[Method Overriding]]
- [[Method Overloading]]

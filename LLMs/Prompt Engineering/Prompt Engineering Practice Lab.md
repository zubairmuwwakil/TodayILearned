---
tags:
  - java
  - ai
  - prompt-engineering
  - practice
---

# Prompt Engineering Practice Lab

## Goal

Practice turning vague Java requests into clear, testable prompts.

Do not read the sample answers until you have written your own versions.

---

## Exercise 1: Duplicate Detection

### Weak Prompt

```text
Write a Java method to check for duplicates.
```

### Your Task

Add:

- a generic type
- a required data structure
- complexity expectations
- null behavior
- Javadoc
- an exact output format

> [!question]- Sample Answer
> ```text
> Write a public static generic Java method named containsDuplicate that accepts a List<T> and returns true when at least one duplicate exists.
>
> Requirements:
> - Target Java 21.
> - Use a HashSet.
> - Do not modify the input list.
> - Throw IllegalArgumentException if the list is null.
> - Treat repeated null elements as duplicates.
> - Include complete Javadoc.
>
> Output:
> Return the method in one Java code block, followed by the average time and space complexity in no more than two sentences. Do not include a containing class.
> ```

---

## Exercise 2: Explain an Interface

### Weak Prompt

```text
Explain interfaces.
```

### Your Task

Specify:

- audience
- exact comparison
- analogy
- code example
- length
- recall questions

> [!question]- Sample Answer
> ```text
> Explain Java interfaces to a beginner who understands classes and inheritance.
>
> Compare:
> - an interface
> - an abstract class
> - a concrete class
>
> Include one everyday analogy, one complete Java 21 example, and a comparison table. End with four active-recall questions. Keep the response under 700 words.
> ```

---

## Exercise 3: Code Review

Review this code:

```java
public static boolean hasDuplicate(List<Integer> values) {
    for (int i = 0; i < values.size(); i++) {
        for (int j = 0; j < values.size(); j++) {
            if (values.get(i) == values.get(j)) {
                return true;
            }
        }
    }

    return false;
}
```

### Your Task

Write a prompt that requires the AI to identify:

- the self-comparison bug
- the incorrect use of `==`
- the complexity
- null behavior
- a corrected implementation
- test cases

> [!question]- Sample Answer
> ```text
> Review the Java method enclosed in the code block.
>
> Identify every correctness and performance issue. For each issue, provide:
> 1. the relevant line or expression
> 2. why it is wrong
> 3. the smallest valid correction
>
> Then provide:
> - a corrected Java 21 implementation using HashSet
> - its average time and space complexity
> - JUnit 5 tests for an empty list, one element, distinct values, duplicate values, equal distinct Integer objects, null elements, and a null list
>
> Do not change the method name or return type.
> ```

---

## Exercise 4: Output Evaluation

Suppose two models answer the same prompt.

### Model A

- produces compilable code
- ignores the null requirement
- gives correct complexity

### Model B

- handles null correctly
- uses a nested loop
- incorrectly claims O(n)

### Questions

1. Which answer better satisfies the full prompt?
2. Which defects are correctness defects?
3. Which defects are explanation defects?
4. What tests would reveal the differences?
5. How should the original prompt be improved?

> [!question]- Suggested Evaluation
> Neither answer fully satisfies the prompt. Model A violates required null behavior, while Model B violates the required algorithm and gives an incorrect complexity analysis. The best workflow is to evaluate each requirement separately rather than judging the answer by writing quality alone.

---

## Exercise 5: Prompt Repair

### Original Prompt

```text
Act as an amazing programmer. Explain everything about Java collections in detail, but keep it very short. Use a table and include lots of code. Do not leave anything out.
```

### Problems to Find

Identify at least five defects in the prompt.

> [!question]- Suggested Problems
> - “Amazing programmer” is vague.
> - “Everything” is unbounded.
> - “In detail” conflicts with “very short.”
> - A table is unsuitable for large code examples.
> - “Lots of code” conflicts with the length constraint.
> - The audience is missing.
> - No Java version is specified.
> - No learning objective is defined.
> - No success criteria are provided.

---

## Retrieval Practice

Answer without opening the other notes:

1. What is the difference between a task and a constraint?
2. Why is a role optional?
3. What should you ask for instead of hidden chain-of-thought reasoning?
4. Why is a delimiter not a security boundary?
5. What does a good quality-check section contain?
6. When should few-shot examples be added?
7. Why is “make this professional” weak?
8. How should a previous requirement be replaced clearly?
9. Why can an AI-generated complexity claim be wrong?
10. What must happen before AI-generated code enters production?

---

## Mistake Log

Use this section after each exercise.

| Date | Prompt mistake | Resulting problem | Revised rule |
|---|---|---|---|
|  |  |  |  |

---

## Spaced Review

- **Today:** Complete Exercises 1–3.
- **In 2–3 days:** Answer the retrieval questions from memory.
- **In 1 week:** Redo Exercise 3 without viewing your earlier prompt.
- **In 2–4 weeks:** Create a prompt for one of your actual Java projects and evaluate the result against a checklist.

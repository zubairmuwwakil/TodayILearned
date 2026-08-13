---
tags:
  - java
  - ai
  - prompt-engineering
---

# Four Components of a Strong Prompt

## What They Are

A practical prompt can be built from four main components:

1. **Task**
2. **Context and constraints**
3. **Output format**
4. **Role or perspective**

The task is essential. The other components are added when they improve the result.

> The role is useful in some situations, but it is not magic. A precise task and clear success criteria usually matter more than assigning an impressive persona.

## 1. Task

State the exact action the AI should perform.

### Weak

```text
Give me code.
```

### Strong

```text
Write a Java method that returns true when a List<T> contains at least one duplicate value.
```

### Task Checklist

- What action should be performed?
- What should be returned or produced?
- What is inside and outside the scope?

## 2. Context and Constraints

Provide the background and rules needed to make good decisions.

```text
The method will be used in a Java 21 application.
Use HashSet so the average time complexity is O(n).
Do not modify the input list.
Treat two null elements as duplicates.
```

Useful constraints may include:

- language or framework version
- performance requirements
- allowed or forbidden libraries
- audience knowledge
- length limits
- assumptions
- safety requirements
- edge cases

## 3. Output Format

Describe how the answer should be delivered.

```text
Return only:
1. the complete method in a Java code block
2. a complexity analysis of no more than three sentences
```

Common formats:

- Markdown headings
- bullet list
- table
- JSON
- CSV
- code block
- test cases
- unified diff

A requested format must match the intended use. Tables are good for comparison but poor for long explanations or complex code.

## 4. Role or Perspective

A role can guide vocabulary, priorities, and level of detail.

```text
Act as a Java instructor teaching a beginner.
```

```text
Review this code from the perspective of a backend engineer responsible for reliability.
```

Avoid using a role as a substitute for concrete requirements.

### Weak Role-Only Prompt

```text
Act as the best programmer in the world and fix this.
```

### Better Prompt

```text
Review the method for correctness, readability, null handling, and asymptotic complexity. Identify each defect and provide a corrected Java 21 implementation.
```

## Reusable Prompt Pattern

```text
[Optional role or perspective]

Task:
[State the exact action.]

Context:
[Provide relevant background, source material, assumptions, and audience.]

Constraints:
[List required rules, limits, edge cases, and exclusions.]

Output:
[Define the structure and level of detail.]

Quality checks:
[State how the answer should verify correctness.]
```

## Worked Example: Duplicate Detection

### Weak Prompt

```text
Write a Java method to check for duplicates in a list of integers.
```

### Engineered Prompt

```text
Task:
Write a public static generic Java method named containsDuplicate that checks whether a List<T> contains at least one duplicate and returns a boolean.

Constraints:
- Use a HashSet.
- Target Java 21.
- Do not modify the input list.
- Treat repeated null values as duplicates.
- State the average time and space complexity.
- Throw IllegalArgumentException when the list itself is null.

Output:
Provide the complete method with Javadoc in one Java code block, followed by a two-sentence complexity explanation. Do not include a containing class.
```

## Example Output

```java
/**
 * Returns whether the supplied list contains at least one duplicate element.
 *
 * @param values the list to inspect
 * @param <T> the element type
 * @return {@code true} if a duplicate exists; otherwise {@code false}
 * @throws IllegalArgumentException if {@code values} is {@code null}
 */
public static <T> boolean containsDuplicate(List<T> values) {
    if (values == null) {
        throw new IllegalArgumentException("values must not be null");
    }

    Set<T> seen = new HashSet<>();

    for (T value : values) {
        if (!seen.add(value)) {
            return true;
        }
    }

    return false;
}
```

Average time complexity is O(n), assuming average constant-time `HashSet` operations. Space complexity is O(n) in the worst case.

## Trace

Input:

```text
[4, 7, 2, 7]
```

| Current value | `seen` before insertion | `seen.add(value)` | Result |
|---|---|---:|---|
| 4 | `[]` | `true` | Continue |
| 7 | `[4]` | `true` | Continue |
| 2 | `[4, 7]` | `true` | Continue |
| 7 | `[2, 4, 7]` | `false` | Return `true` |

`HashSet.add()` returns `false` when an equal element is already present.

## Common Mistakes

- Demanding O(n) without defining average-case versus worst-case behavior
- Requiring a `HashSet` but forgetting the necessary imports
- Requesting “only code” while also asking for an explanation
- Leaving null behavior unspecified
- Asking for a generic method but using `List<Integer>`
- Assuming a role automatically creates professional-quality code

## Recall Questions

1. Which prompt component is always essential?
2. When does assigning a role help?
3. Why should null behavior be stated?
4. What conflict exists in “return only code and explain every line”?
5. Why is output format part of correctness for developer tasks?

## Mini Practice

Create a prompt for a Java method that:

- accepts a `List<String>`
- returns the three most frequent non-blank values
- ignores letter case
- does not mutate the list
- uses Java 21
- includes JUnit 5 tests

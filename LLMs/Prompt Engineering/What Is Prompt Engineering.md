---
tags:
  - java
  - ai
  - prompt-engineering
---

# What Is Prompt Engineering?

## What It Is

Prompt engineering is the process of designing an AI request so the system has enough information to produce a relevant, accurate, and usable response.

A prompt may contain:

- a task
- background context
- input data
- constraints
- examples
- output requirements
- evaluation criteria

## Why It Matters

AI systems do not execute natural-language prompts with the exact certainty of Java code. They generate responses based on statistical patterns and the information available in the conversation.

A vague prompt leaves many decisions to the model. A specific prompt reduces ambiguity and makes the result easier to evaluate.

## Mental Model

Think of a prompt as a lightweight specification.

```text
Task + Context + Constraints + Output Requirements + Quality Checks
```

A strong prompt does not guarantee a correct answer. It improves the odds of receiving a useful answer and makes mistakes easier to detect.

## Java Comparison

```java
if (isLoggedIn) {
    showDashboard();
}
```

Given the same program state, this condition follows defined Java semantics.

By contrast:

```text
Explain authentication.
```

This leaves many questions unanswered:

- Who is the audience?
- Which authentication method?
- How detailed should the explanation be?
- Should code be included?
- Which language or framework should be used?

## Worked Example

### Weak Prompt

```text
Explain Java classes.
```

### Improved Prompt

```text
Explain the difference between a Java class and an object to a beginner.

Use:
- one simple analogy
- one complete Java example
- a table comparing class and object
- three recall questions

Keep the explanation under 500 words.
```

### Why the Improved Prompt Is Better

It defines:

- the exact concept
- the audience
- the teaching method
- the expected structure
- the length constraint

## What Prompt Engineering Cannot Do

Prompt engineering cannot guarantee that an AI response is:

- factually correct
- secure
- unbiased
- complete
- appropriate for production use

Important outputs should still be tested, verified, or reviewed.

## Common Mistakes

### Mistake 1: Treating AI like a deterministic compiler

The same prompt may produce different wording or even different conclusions.

### Mistake 2: Assuming confidence means correctness

A polished explanation can still be wrong.

### Mistake 3: Asking for too many unrelated tasks

Large, mixed prompts can make requirements conflict or become easy to overlook.

### Mistake 4: Providing no source material

When accuracy depends on a document, codebase, or dataset, include or reference the actual material.

## Examples and Non-Examples

### Good Use

```text
Review the Java method below for correctness and time complexity.
Identify the exact line causing each issue and provide a corrected version.
```

### Weak Use

```text
Make this better.
```

### Good Use

```text
Summarize the supplied API documentation. Do not add facts that are not present in the documentation.
```

### Risky Use

```text
Tell me everything about this API from memory.
```

## Recall Questions

1. Why is an AI prompt less deterministic than Java code?
2. What five elements can turn a prompt into a lightweight specification?
3. Why does a strong prompt still require verification?
4. What information is missing from the prompt “Explain inheritance”?
5. When should source material be included directly?

## Mini Practice

Improve this prompt:

```text
Write some Java code.
```

Your version should specify:

- the program’s purpose
- the Java version
- required inputs and outputs
- error-handling expectations
- output format

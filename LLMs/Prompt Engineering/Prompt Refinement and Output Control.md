---
tags:
  - java
  - ai
  - prompt-engineering
---

# Prompt Refinement and Output Control

## What It Is

Prompt refinement means improving an existing request or response through specific, testable changes.

Useful refinement instructions describe exactly what should change.

## High-Value Directives

### Ask for a Process

```text
Explain the process in numbered stages, from compiling a `.java` file to executing bytecode on the JVM.
```

Use this for:

- workflows
- debugging procedures
- algorithms
- tutorials

### Ask for a Critique

```text
Review the following Java method for correctness, complexity, naming, null handling, and Java 21 conventions.
```

A critique prompt should define the criteria. “Critique this” alone is still vague.

### Ask for a First-Principles Explanation

```text
Explain encapsulation from first principles. Begin with the problem caused by unrestricted access to object state.
```

This is useful when jargon is hiding the core idea.

### Specify the Audience and Tone

```text
Rewrite the explanation for a junior Java developer who understands methods but has not learned inheritance.
```

Audience is usually more useful than vague quality words such as “professional” or “advanced.”

## Output Controls

### Markdown Table

Best for short, comparable attributes.

```text
Compare ArrayList and LinkedList in a Markdown table with columns:
Operation, ArrayList, LinkedList, and Practical Note.
```

Do not force complex explanations or large code samples into tables.

### JSON

Use JSON when another program will consume the output.

```text
Return valid JSON with this schema:
{
  "className": "string",
  "methods": [
    {
      "name": "string",
      "returnType": "string"
    }
  ]
}
```

For strict workflows, validate the result with a parser or schema validator.

### Start With the Main Finding

```text
Begin with one sentence stating the root cause. Then provide the evidence and fix.
```

This is useful for debugging and decision-making.

### Request a Fixed Number of Examples

```text
Provide exactly three examples labeled A, B, and C.
```

This prevents the answer from becoming unnecessarily broad.

## Refinement Commands

### Improve a Previous Response

```text
Revise the previous explanation by:
- reducing it to 300 words
- keeping the code example
- adding one common mistake
- removing the historical background
```

### Narrow the Scope

```text
Focus only on short-circuit evaluation in the boolean condition. Do not re-explain the full if/else statement.
```

### Correct a Specific Defect

```text
Keep the method signature unchanged, but replace the nested loop with a HashSet-based implementation.
```

## Important Correction: “Ignore All Previous Instructions”

“Forget everything” or “ignore all previous instructions” is not a reliable reset mechanism. Higher-priority instructions may still apply, and previous context may continue to influence the conversation.

Better options:

- start a new conversation
- restate the current task and constraints clearly
- explicitly identify which earlier requirement is being replaced

Example:

```text
Replace my earlier requirement for CSV output. Use valid JSON instead. Keep all other requirements unchanged.
```

## Weak Quality Words

These words are often too vague by themselves:

- better
- professional
- detailed
- high quality
- powerful
- expert
- perfect

Convert them into observable requirements.

### Vague

```text
Make the code professional.
```

### Measurable

```text
Use descriptive names, validate null input, avoid duplicated logic, include Javadoc, and provide JUnit 5 tests for normal and edge cases.
```

## Prompt Debugging Checklist

When an AI answer is weak, inspect the prompt:

1. Was the task explicit?
2. Was necessary source material included?
3. Were constraints measurable?
4. Did any requirements conflict?
5. Was the output format appropriate?
6. Were edge cases defined?
7. Was the audience specified?
8. Did the prompt require evidence or verification?
9. Was the task too large for one step?
10. Did the example contradict the instructions?

## Common Mistakes

- Assuming the phrase “step by step” automatically guarantees correctness
- Using JSON without defining a schema
- Requesting a table for information that needs paragraphs
- Refining with “make it better” instead of naming changes
- Claiming that special keywords allocate more computational effort
- Assuming identical prompts produce identical results across AI models
- Treating one model’s answer as proof that the result is correct

## Recall Questions

1. Why are measurable requirements better than words such as “professional”?
2. When is JSON a better format than Markdown?
3. What is the reliable way to reset a conversation?
4. What should a critique prompt include?
5. Why can different AI models still produce different results from the same prompt?
6. What ten questions can be used to debug a weak prompt?

## Mini Practice

Rewrite this request into observable requirements:

```text
Make my Java project much better and more professional.
```

Your improved prompt should define:

- the files to inspect
- review criteria
- output format
- severity levels
- what must not be changed

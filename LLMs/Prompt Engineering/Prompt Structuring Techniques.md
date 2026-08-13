---
tags:
  - java
  - ai
  - prompt-engineering
---

# Prompt Structuring Techniques

## What They Are

Structuring techniques make complex prompts easier for both the user and the AI to interpret.

High-value techniques include:

- ordered steps
- delimiters
- labeled sections
- examples
- explicit quality checks
- breaking large tasks into stages

## Technique 1: Ordered Decomposition

Ask the model to complete a complex task in a clear sequence.

```text
1. Compare the relevant operations of ArrayList and LinkedList.
2. Recommend the better structure for repeated middle insertions.
3. State the important real-world caveat.
4. Provide a small benchmark example.
```

This is more reliable than asking for “deep reasoning” without defining what should be analyzed.

## Important Correction: Chain of Thought

Some lessons recommend asking an AI to reveal its full “chain of thought.” That is not necessary and should not be treated as a guarantee of accuracy.

A better request is:

```text
Give the answer, then provide a concise rationale using the relevant facts, calculations, assumptions, and verification steps.
```

This produces useful, checkable support without depending on hidden internal reasoning.

## Worked Example

### Weak Prompt

```text
What is the fastest way to add 1,000 items to the middle of an ArrayList?
```

### Better Prompt

```text
Compare ArrayList and LinkedList for inserting 1,000 values near the middle.

Address:
1. the asymptotic insertion cost
2. the cost of locating the middle position
3. memory and cache-locality tradeoffs
4. whether an ArrayDeque or another design would be better

End with a recommendation and a short Java benchmark outline.
```

### Important Technical Caveat

It is incomplete to say that `LinkedList` middle insertion is simply O(1). Inserting through an already-positioned iterator can be O(1), but finding the middle node is O(n). Real performance can also favor `ArrayList` because contiguous arrays often have better cache locality.

## Technique 2: Delimiters

Delimiters separate instructions from the material being processed.

```text
Review the Java code between <code> and </code>.

Check for:
- compilation errors
- logical defects
- unnecessary work

<code>
public static void main(String[] args) {
    int x = 5;

    for (int i = 0; i < 10_000; i++) {
        System.out.println("Hi");
    }
}
</code>
```

Possible delimiters:

- triple backticks
- XML-style tags
- headings
- triple quotes
- `BEGIN INPUT` / `END INPUT`

## Why Delimiters Help

They clarify which text is:

- an instruction
- source code
- source material
- an example
- expected output

Delimiters improve organization, but they are not a complete security boundary. Untrusted content can still contain misleading instructions, so important workflows need validation and access controls.

## Technique 3: Few-Shot Examples

Provide one or more examples of the desired transformation.

```text
Convert each Java term into a beginner-friendly flashcard.

Example:
Input: constructor
Output:
Question: What is a constructor?
Answer: A special member used to initialize a new object.

Now convert:
- inheritance
- interface
- encapsulation
```

Examples are useful when:

- the output style is hard to describe
- labels must be consistent
- a classification rule is subtle
- strict formatting matters

## Technique 4: Quality Checks

Tell the model how to inspect its answer.

```text
Before finalizing:
- verify that the code compiles under Java 21
- check all imports
- test empty, single-element, duplicate, and null cases
- ensure the explanation matches the implementation
```

Do not assume the model’s self-check is sufficient. Run the tests yourself when correctness matters.

## Technique 5: Staged Work

For large tasks, separate analysis from production.

```text
Stage 1:
Identify the requirements and ambiguities.

Stage 2:
Propose the method signature and test cases.

Stage 3:
Write the implementation.

Stage 4:
Review the implementation against the original requirements.
```

This reduces the chance that important constraints disappear inside a long prompt.

## Common Mistakes

### Mistake 1: Asking for hidden reasoning instead of evidence

Ask for assumptions, calculations, sources, or a concise rationale.

### Mistake 2: Treating delimiters as security

They organize text but do not safely isolate untrusted instructions.

### Mistake 3: Over-structuring a simple request

A one-sentence task does not need a 20-section prompt.

### Mistake 4: Giving conflicting directives

```text
Be extremely detailed.
Use no more than 50 words.
```

### Mistake 5: Using examples that contradict the written rule

Models may follow the example more strongly than the description.

## Recall Questions

1. Why is ordered decomposition useful?
2. What should be requested instead of a full hidden chain of thought?
3. Why is “LinkedList insertion is O(1)” incomplete?
4. What do delimiters clarify?
5. Why are few-shot examples useful?
6. Why must self-checking still be verified externally?

## Mini Practice

Write a structured prompt that asks an AI to review a Java `BankAccount` class.

Include:

- code delimiters
- four review criteria
- a required output structure
- a request for corrected code
- a verification checklist

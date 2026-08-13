---
type: concept
topic: fundamentals
status: learning
difficulty: easy
tags:
  - java
  - fundamentals
  - jvm
---
# Java Execution Model - JDK, JRE, JVM

## What it is

Java runs in **two stages**: `javac` compiles human-readable source (`.java`) into portable **bytecode** (`.class`) ahead of time, then the **JVM** loads that bytecode and executes it. The JVM does not read your source — it runs the compiled bytecode.

```text
Hello.java  ──javac──▶  Hello.class  ──java (JVM)──▶  program runs
 (source)              (bytecode)                    (output)
```

The three acronyms are **nested, not interchangeable** — `JDK ⊃ JRE ⊃ JVM`:

| Component | Full name | Contains | You use it to |
|---|---|---|---|
| **JVM** | Java **Virtual Machine** | execution engine (interpreter + JIT), class loader, garbage collector | *run* bytecode |
| **JRE** | Java **Runtime Environment** | JVM **+** core class libraries | *run* Java apps |
| **JDK** | Java **Development Kit** | JRE **+** dev tools (`javac`, `jar`, `javadoc`, `javap`) | *develop and run* Java |

## Why it matters

The same `.class` bytecode runs on any OS or CPU that has a compatible JVM — **write once, run anywhere**. Bytecode is platform-independent; the JVM is the platform-specific piece. It also explains the tooling split: you install a **JDK** to compile code, but a user only needs the **JVM/JRE** to run it.

## Syntax / Pattern

```bash
javac Hello.java   # compile: source -> bytecode (creates Hello.class)
java  Hello        # run: the JVM loads Hello.class and executes main
```

Note the asymmetry: `javac` takes a **file name** (`Hello.java`), but `java` takes a **class name** (`Hello`, no extension).

## Worked Example

```java
// 1. a public top-level class must match its file name -> Hello.java
public class Hello {
    // 2. main is the fixed entry point the JVM looks for and calls first
    public static void main(String[] args) {
        // 3. runs only after the JVM has loaded and started this class
        System.out.println("Hello Java");
    }
}
```

```bash
javac Hello.java   // 4. javac (a JDK tool) produces Hello.class = bytecode
java  Hello        // 5. the java launcher starts the JVM, which runs main
```

**Explain in plain English (EiPE):** `javac` turns source into portable bytecode, and the JVM then loads that bytecode and executes `main` to print the greeting.

## Trace

**Predict the output first (write it before reading on):**  `___`

| Step | Action | Actor | Input | Output |
|---|---|---|---|---|
| 1 | write the source | you | editor | `Hello.java` |
| 2 | `javac Hello.java` | `javac` (JDK) | `Hello.java` | `Hello.class` (bytecode) |
| 3 | `java Hello` | `java` launcher | class name `Hello` | JVM starts |
| 4 | load + verify class | JVM | `Hello.class` | class ready in memory |
| 5 | call `main` | JVM | `main(String[])` | statements execute |
| 6 | `System.out.println(...)` | JVM | `"Hello Java"` | prints `Hello Java` |

**Actual output:** `Hello Java`. Only step 6 produces console output; steps 1–5 are the pipeline that gets you there.

## Faded Practice

Fill the blank to run the program you just compiled (the load-bearing command):

```bash
javac Hello.java     # produces Hello.class
______               # now run the compiled program
```

> [!answer]- Answer
> `java Hello` — the **class name**, no extension. `java Hello.class` fails (the launcher then looks for a class literally named `Hello.class`). `java Hello.java` *would* print output too, but via single-file source mode (JDK 11+): it recompiles from source in memory and ignores the `Hello.class` you built.

## Common Mistakes

- Running `java Hello.class` → the `java` launcher takes a **class name** (`java Hello`), not a file name.
- Public class name not matching the file → a public top-level class `Hello` must live in `Hello.java`, or `javac` errors.
- Treating JDK, JRE, JVM as the same thing → `JDK ⊃ JRE ⊃ JVM`; compile with the JDK, run with just the JVM/JRE.
- Thinking the JVM compiles your source → `javac` compiles source to bytecode *ahead of time*; the JVM executes bytecode (and JIT-compiles hot paths at runtime).
- Assuming bytecode is machine code → bytecode is a portable intermediate format; the JVM (or its JIT) turns it into native CPU instructions.

## Examples and Non-Examples

**Example — the valid develop-then-run workflow:**
```bash
javac Hello.java   # JDK tool compiles source -> bytecode
java  Hello        # JVM executes the bytecode
```

**Non-Example:**
```bash
java Hello.class
# FALSE BELIEF: "you launch a program by naming its .class file"
# the java launcher wants the CLASS name (Hello) and finds Hello.class itself.
```

**Non-Example:**
```text
JDK == JVM
// FALSE BELIEF: "the JDK and the JVM are the same thing"
// the JDK bundles the JVM plus javac and dev tools; the JVM is only the runtime engine.
```

## Recall Questions
%% Review via the Spaced Repetition plugin (Cmd/Ctrl+P > "Review flashcards"), not by rereading. %%
#flashcards/java/execution-model

What is bytecode?
?
A portable intermediate instruction set (stored in `.class` files) that any compatible JVM can execute, regardless of OS or CPU.

How do JDK, JRE, and JVM relate?
?
`JDK ⊃ JRE ⊃ JVM`: the JDK = JRE + dev tools (like `javac`); the JRE = JVM + core libraries; the JVM = the engine that runs bytecode.

## Mini Practice

1. Create, compile, and run `Hello.java`. **Predict the two commands and the output first**, then run. **Expected output:** `Hello Java`.
2. Rename the class to `Welcome`. **Success criterion:** it only compiles when saved as `Welcome.java`, and runs with `java Welcome`.
3. After compiling, run `javap -c Hello`. **Success criterion:** you see bytecode mnemonics (e.g., `getstatic`, `invokevirtual`) — proof the `.class` holds bytecode, not source or native code.

## Mistake Log

When you miss one, add it to [[Java Fundamentals Mistake Log]] as: wrong output → minimal repro → misconception → recall-question form → fix.

## Links

- Contrast: [[Compiled vs Interpreted Languages]] — Java does both (compile to bytecode, then interpret/JIT at runtime)
- Map: [[Java MOC]]
- Related: [[Basic Java Program Structure]] · [[Printing Output]] · [[Bytecode and the JIT Compiler]]
- Prerequisites: [[Installing the JDK]]

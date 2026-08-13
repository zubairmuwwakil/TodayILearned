---
type: concept
topic: maven
status: learning
difficulty: medium
aliases:
  - Apache Maven
  - Maven
  - POM
  - pom.xml
  - Maven Coordinates
  - Maven Repositories
  - Transitive Dependencies
  - Build Lifecycle
tags:
  - maven
  - build-tools
  - dependencies
  - concepts
---

# Apache Maven

%% Graduated via [[Refiner Spec (Graduate)]] using Maven/_refiner.md. Test surface, not a reference. Command recipes for Eclipse stay in [[Maven Commands]] and [[Update Project]] — this note is the transferable why: coordinates, resolution, and lifecycle order. %%

## Worked Example

A `pom.xml`, reduced to the parts that carry meaning:

```xml
<project>
  <!-- 1. THE PARENT supplies versions for every Spring Boot dependency below -->
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.0</version>
  </parent>

  <!-- 2. COORDINATES — groupId:artifactId:version uniquely identify THIS artifact -->
  <groupId>com.bptn</groupId>
  <artifactId>weatherapp</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>jar</packaging>

  <dependencies>
    <!-- 3. No <version> needed — the parent already pinned it.
            One line here pulls dozens of TRANSITIVE dependencies. -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- 4. scope=test keeps this OFF the runtime classpath -->
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

**Explain in plain English (EiPE):** the file names who you are, who your parent is, and what you depend on — and from that alone Maven can fetch every library you need (and every library *they* need) and produce a runnable jar.

## Retrieval Prompts

1. `spring-boot-starter-web` has no `<version>`. Why does the build still work — and what would break if the `<parent>` were removed?
> [!answer]- reveal
> The **parent POM pins the versions** (via its `dependencyManagement`), so children can declare a dependency by `groupId:artifactId` alone and inherit a version known to be mutually compatible. Remove the parent and every dependency needs an explicit `<version>` — and you become responsible for picking a compatible set yourself.

2. Does Maven go to the internet every time you build? Walk the resolution order.
> [!answer]- reveal
> **No.** POM → check the **local** repository (`~/.m2/repository`) → only if the artifact is *absent* does it go to **central/remote** → whatever it downloads is **cached locally** → then it builds. Second build of the same dependency is entirely offline. (This is why a corrupted `~/.m2` entry causes builds that fail "for no reason.")

3. Two of your dependencies each drag in a *different version* of the same library. Which version does Maven use?
> [!answer]- reveal
> **The nearest one in the dependency tree** — fewest hops from your POM — **not the highest version number.** If two candidates sit at equal depth, the **first declared** wins. This is why a dependency conflict is often fixed by declaring the version you want *directly* in your own POM: depth 1 beats everything.

4. Why is it `mvn clean install` and not just `mvn install`? What are those two words, structurally?
> [!answer]- reveal
> They're **two different lifecycles**. `clean` deletes `target/`; `install` is a phase of the **default** lifecycle. And because phases are **cumulative**, `install` alone already runs `validate → compile → test → package → verify → install`. You add `clean` to guarantee you're not packaging stale class files from a previous build.

5. You delete `<scope>test</scope>` from the test starter. Nothing breaks locally. What have you actually done?
> [!answer]- reveal
> Promoted it to the default **`compile`** scope, so the whole test framework is now on the **runtime classpath** and ships inside your artifact — bigger jar, extra libraries in production, and main code that can now `import` test utilities without an error. Silent, not loud.

6. What do the three required coordinates each answer?
> [!answer]- reveal
> **`groupId`** = who owns it (reverse-domain namespace, `com.bptn`); **`artifactId`** = which project (`weatherapp`); **`version`** = which build of it. Together, the **GAV** is the globally unique address of an artifact. `packaging` and `classifier` complete the five elements but aren't required to publish.

## Rebuild Drill

From a blank `pom.xml`, write the coordinate block for a project owned by `com.bptn` called `feedapp` at version `0.0.1-SNAPSHOT` packaged as a jar, plus two dependencies: `org.postgresql:postgresql` (runtime database driver) and `spring-boot-starter-test` restricted so it never reaches production.

**Success criteria:** all three GAV elements present and correctly named; `<packaging>jar</packaging>`; dependencies nested inside a single `<dependencies>` element; the test dependency carries `<scope>test</scope>`. Then state, in one line, where Maven looks *first* for the Postgres driver.

## Correctness Check

Ran the Maven checklist from `Maven/_refiner.md`:

- ✅ **Coordinates** — GAV is the unique identifier; `packaging` + `classifier` complete the five elements; only the three GAV parts are required to publish. Matches the lesson.
- ✅ **Resolution order** — local (`~/.m2/repository`) → central/remote only on a miss → cache locally → build. Matches the lesson's four steps.
- ✅ **Transitive dependencies + mediation** — Maven resolves dependencies-of-dependencies; conflicts go to the **nearest definition**, ties to the **first declared**. (The lesson mentions transitivity but never states the mediation rule — that's the part that actually bites you.)
- ✅ **Lifecycle cumulative and separate `clean`** — `install` implies every earlier default-lifecycle phase; `clean` is its own lifecycle. Consistent with your [[Maven Commands]] note.
- ✅ **Scopes** — `compile` is the default; `test` is excluded from the runtime classpath. Verified.
- ✅ **XML is well-formed** — one root `<project>`, every element closed and properly nested.
- ⚠ **The lesson states something false.** *"Depending on the distribution you download, Maven is written in either C# or Java."* **Maven is written in Java.** There is no C# implementation of Apache Maven. (An old Apache incubator project, NMaven, used Maven to *build* .NET projects — that is not the same claim.) Ignore this sentence.
- ➖ **Also slightly overstated in the lesson:** "It generates source code." Maven can run code-generation *plugins*, but generating source is not something it does on its own.

## Flashcards

#flashcards/maven/fundamentals

Why can a Spring Boot dependency omit its <version> tag?
?
The spring-boot-starter-parent POM pins versions via dependencyManagement, so children inherit a mutually compatible set.

Where does Maven look for a dependency first, and when does it use the network?
?
The local repository (~/.m2/repository) first; it only reaches central/remote if the artifact is absent, then caches it locally.

Two dependencies pull different versions of the same library — which one wins?
?
The nearest definition in the dependency tree (fewest hops), not the highest version number. Equal depth means first declared wins.

Why does `mvn install` also compile and test, and why add `clean`?
?
Lifecycle phases are cumulative, so install runs validate→compile→test→package→verify→install. `clean` is a separate lifecycle that deletes target/ so you don't package stale classes.

What does <scope>test</scope> actually do, and what happens if you drop it?
?
It keeps the dependency off the runtime classpath. Dropping it promotes the dependency to compile scope, so it ships inside your artifact — silently, with no error.

What do groupId, artifactId, and version each identify?
?
Who owns it (reverse-domain namespace), which project, and which build — together the GAV, an artifact's globally unique address.

## TIL candidate

Showable: `mvn dependency:tree` on the Weather App, showing one starter line expanding into dozens of transitive jars. → git TIL *"One dependency, forty jars: reading `mvn dependency:tree`."* Link the output; don't paste it here.

## Links

- Command recipes (doing, not remembering): [[Maven Commands]] · [[Update Project]]
- Related: [[Spring Boot]] — starters are Maven dependencies
- Format: [[XML and JSON]] — the POM is XML
- Forward: [[Maven Lifecycle Phases]] · [[Dependency Scopes]]

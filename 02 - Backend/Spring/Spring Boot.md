---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Spring Boot
  - SpringBootApplication
  - "@SpringBootApplication"
  - Auto-configuration
  - "@EnableAutoConfiguration"
  - "@ComponentScan"
  - Embedded Server
  - Spring Boot Starters
tags:
  - spring
  - spring-boot
  - auto-configuration
  - concepts
---

# Spring Boot

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference. The load-bearing trap is WHERE component scanning starts — regenerate that before anything else. %%

## Worked Example

```java
package com.bptn.weatherapp;   // 1. scanning starts at THIS package and goes DOWN

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 2. one annotation = @SpringBootConfiguration + @EnableAutoConfiguration + @ComponentScan
@SpringBootApplication
public class WeatherAppApplication {

    public static void main(String[] args) {
        // 3. start the IoC container, auto-configure from what's on the classpath,
        //    and launch the embedded Tomcat server
        SpringApplication.run(WeatherAppApplication.class, args);
    }
}
```

**Explain in plain English (EiPE):** this one class is the whole application setup — Spring Boot looks at which libraries you depend on and configures them with sensible defaults, so the enormous XML file the lesson shows never has to be written.

## Retrieval Prompts

1. `@SpringBootApplication` is three annotations in a trench coat. Name them and say what each one contributes.
> [!answer]- reveal
> **`@SpringBootConfiguration`** (a specialization of `@Configuration` — marks this as a source of bean definitions), **`@EnableAutoConfiguration`** (configure things based on what's on the classpath), and **`@ComponentScan`** (discover `@Component`/`@Service`/`@Repository`/`@Controller` classes and register them as beans).

2. Your `@Service` compiles fine but Spring says it can't find the bean to inject. Where do you look *first*, and why?
> [!answer]- reveal
> **Its package.** `@ComponentScan` starts at the package of the `@SpringBootApplication` class and scans **that package and everything below it**. A class in a sibling package — `com.other.MyService` when the app class is in `com.bptn.weatherapp` — is invisible. Put the entry-point class in the **root package**, above everything else.

3. What actually makes auto-configuration "automatic", and why doesn't it trample a bean you defined yourself?
> [!answer]- reveal
> Auto-configuration classes are **conditional** (`@ConditionalOnClass`, `@ConditionalOnMissingBean`, …). They fire only when the relevant library is on the classpath, and they **back off** the moment you define your own bean of that type. Your explicit configuration always wins — auto-config only fills gaps.

4. The lesson shows ~30 lines of XML declaring a `dataSource` bean with a URL, username, and password. In a Boot project, what replaces each of those two things — the *bean declaration* and the *values*?
> [!answer]- reveal
> The **bean declaration** is replaced by **auto-configuration** (the datasource bean is built for you when a JDBC driver is on the classpath). The **values** move to **externalized configuration** — `spring.datasource.*` in `application.yml`, with secrets injected from the environment. See [[Externalized Configuration with YAML]].

5. "Embedded server" — what concretely changes about how you run and ship the app?
> [!answer]- reveal
> Tomcat is a **library inside your jar**, not a server you install and deploy a `.war` into. So `java -jar app.jar` *is* the deployment: `SpringApplication.run` starts the container and the HTTP server together. That's what "stand-alone" means.

6. *Interleaving:* when would you ever write `@Configuration` + `@ComponentScan` separately instead of just `@SpringBootApplication`?
> [!answer]- reveal
> When you need to **scan packages outside your own root** (`@ComponentScan(basePackages = {...})`), or you want configuration **without** auto-configuration — e.g. a plain Spring app, or a test slice that deliberately boots a narrow subset of the context.

## Rebuild Drill

From a blank file, write the complete entry-point class for an application whose code lives under `com.bptn.weatherapp` — package statement, imports, annotation, class, and `main`. Then, without looking, answer: you add `WeatherService` in `com.bptn.weatherapp.service` and `EmailHelper` in `com.bptn.util`. Which one does Spring find, and what are the two ways to fix the other?

**Success criteria:** imports are `org.springframework.boot.SpringApplication` and `org.springframework.boot.autoconfigure.SpringBootApplication`; the annotation is on the class; `main` calls `SpringApplication.run(WeatherAppApplication.class, args)`. Second half: `WeatherService` is found (it's *below* the root package), `EmailHelper` is not; fixes are **move it under `com.bptn.weatherapp`** (preferred) or **widen the scan** with `@ComponentScan(basePackages = {"com.bptn.weatherapp", "com.bptn.util"})`.

## Correctness Check

Ran the Spring checklist from `Spring/_refiner.md`:

- ✅ **Annotation / config, and the component-scan path** — this is the checklist item that matters most here, and it's the note's central trap (prompt 2). Verified: scanning is rooted at the annotated class's package and descends.
- ✅ **`@SpringBootApplication` composition** — verified. Precision note: it is `@SpringBootConfiguration` (which is itself meta-annotated `@Configuration`), plus `@EnableAutoConfiguration` and `@ComponentScan`. The lesson says "`@Configuration`", which is right in spirit and slightly imprecise.
- ✅ **Code compiles** — imports, `SpringApplication.run(Class<?>, String...)` signature, and `main` signature all correct.
- ➖ **Bean scope / `@Transactional` proxy** — N/A to this material.
- ✅ **DI** — beans discovered by component scan are injected per [[IoC and Dependency Injection]]; constructor injection still preferred. No conflict.
- ⚠ **The lesson states something false — do not memorize it.** It says: *"if your Postgres database is on your classpath, but you haven't configured a database connection, Spring Boot will auto-configure an in-memory database for you."* Boot auto-configures an embedded database only when an **embedded** driver (H2, HSQLDB, Derby) is on the classpath. With **only** the PostgreSQL driver and no `spring.datasource.url`, startup **fails** with *"Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured."* You will almost certainly meet this exact error on the Weather App — recognize it as a missing URL, not a Boot bug. (~93% confident; easy to confirm by deleting the datasource block and starting the app.)

## Flashcards

#flashcards/spring/spring-boot

%% Deduped 2026-08-14 red-line sweep: 4 cards restating Retrieval Prompts 1, 2, 3, 5 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

If only the PostgreSQL driver is on the classpath and no datasource URL is set, what does Spring Boot do?
?
It fails to start ("'url' attribute is not specified and no embedded datasource could be configured"). It only auto-configures an in-memory database when an embedded driver like H2 is present.

## TIL candidate

Showable: a runnable jar whose entire configuration is one annotated class. → git TIL *"`@SpringBootApplication`: what the three annotations actually do, and why your `@Service` isn't found."* Link the repo; keep the code there, not here.

## Links

- Config values live here: [[Externalized Configuration with YAML]]
- Related: [[Spring Boot Annotations]] · [[IoC and Dependency Injection]] · [[Framework vs Library]]
- Dependencies/starters come from: [[Apache Maven]]
- Map: [[Spring MOC]]

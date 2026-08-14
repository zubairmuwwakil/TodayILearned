---
type: concept
topic: spring
status: learning
difficulty: medium
aliases:
  - Externalized Configuration with YAML
  - Externalized Configuration
  - Environment Variables
  - Spring Environment Variables
  - application.yml
  - application.properties
  - YAML Configuration
  - server.port
tags:
  - spring
  - configuration
  - yaml
  - security
  - concepts
---

# Externalized Configuration with YAML

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference. The load-bearing idea is ONE artifact, MANY environments — make sure you can regenerate why that forces secrets out of the repo. %%

## Worked Example

```yaml
# 1. Override Tomcat's default port — this is the fix for
#    "APPLICATION FAILED TO START ... Port 8080 was already in use"
server:
  port: 8081

# 2. Describe WHAT the app needs. The secret itself is not written here:
#    ${VAR} is resolved from the environment at startup.
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/weatherapp
    username: ${DB_USER:postgres}    # ":postgres" = dev-only fallback
    password: ${DB_PASSWORD}         # no fallback — absent means fail fast
```

**Explain in plain English (EiPE):** the file declares what the application needs, not what the values are — so the *same built jar* runs against a dev database and a production one, and the production password never exists inside the repository.

## Retrieval Prompts

1. "Don't commit production credentials" is the obvious reason to externalize config. What's the *deployment* reason, which applies even to values that aren't secret at all?
> [!answer]- reveal
> **The artifact you test must be the artifact you ship.** If changing environments means editing a line and rebuilding, you deploy something you never tested. Externalizing config means one immutable jar + different inputs, so the environment is a *parameter*, not a code change.

2. You get `Port 8080 was already in use`. Give the two categorically different fixes.
> [!answer]- reveal
> **Change your app's port** (`server.port: 8081` in `application.yml`, or `--server.port=8081` at launch), **or free the port** by stopping the process already listening on 8080. The error message itself names both.

3. `${DB_PASSWORD}` — what is that syntax, when is it resolved, and what does adding `:postgres` change?
> [!answer]- reveal
> A **property placeholder**, resolved by Spring **at startup** from the environment / system properties / command line. `${DB_USER:postgres}` supplies a **default after the colon** if the variable is absent. With **no** default, a missing value fails startup — which is what you want for a password.

4. You set `server.port: 8081` in `application.yml` *and* launch with `--server.port=9090`. Which wins — and why is that ordering deliberate rather than arbitrary?
> [!answer]- reveal
> **The command line wins** (command-line args > OS environment variables > packaged `application.yml`). Deliberate: the *outermost* source is the most specific to a deployment, so ops can override baked-in config **without a rebuild**. Config precedence runs outside-in.

5. Your server sets an OS environment variable to supply the datasource password. What must it be *named* to bind to `spring.datasource.password`?
> [!answer]- reveal
> **`SPRING_DATASOURCE_PASSWORD`** — Spring Boot's **relaxed binding**: uppercase, and dots/dashes become underscores. This is the bridge between "environment variable" and "property in a yml file" — they are the same namespace.

6. YAML gives you one whitespace character that will break the file outright. Which, and what's the other structural rule the example above depends on?
> [!answer]- reveal
> **Tabs are illegal for indentation in YAML — spaces only.** And **indentation *is* the structure**: `server:` / `  port:` means `server.port`, so a wrong indent silently produces a *different property*, not a syntax error.

## Rebuild Drill

From a blank `application.yml`, write the configuration for an app that: runs on port **8081**; connects to a local Postgres database named `weatherapp`; takes its **username** from the environment with a development fallback of `postgres`; and takes its **password** from the environment with **no** fallback.

**Success criteria:** valid YAML indented with spaces only; `server.port` and `spring.datasource.*` nested correctly (not written as dotted keys); the JDBC URL is `jdbc:postgresql://localhost:5432/weatherapp`; `${DB_USER:postgres}` has a default and `${DB_PASSWORD}` does not; **no literal password anywhere in the file.** Then say in one line which OS environment variable name would supply that password.

## Correctness Check

Ran the Spring checklist from `Spring/_refiner.md`:

- ➖ **Bean scope / DI / `@Transactional` proxy** — N/A to configuration loading; checked and not applicable.
- ✅ **Annotation / config** — relevant and verified: `application.yml` is picked up from the classpath root by Spring Boot's externalized-configuration mechanism; individual properties are injected with `@Value("${...}")` or bound as a group with `@ConfigurationProperties`.
- ✅ **`server.port`** is the correct property, and in YAML it must be **nested** (`server:` then indented `port:`), not written as the dotted key `server.port:` at the top level.
- ✅ **Precedence** — command-line arguments override OS environment variables, which override the packaged `application.yml`. Verified ordering.
- ✅ **Relaxed binding** — `spring.datasource.password` ⇄ `SPRING_DATASOURCE_PASSWORD` (uppercase; dots and dashes → underscores). Verified.
- ✅ **YAML forbids tab characters for indentation** — this is the YAML spec, not a Spring rule.
- ✅ **JDBC URL** `jdbc:postgresql://localhost:5432/weatherapp` — correct driver prefix and default Postgres port.
- ⚠ **Below 90% — spot-check this one.** If **both** `application.properties` and `application.yml` sit in the same location, I believe `.properties` is processed with higher precedence, so a leftover `.properties` file would silently override your `.yml`. Relevant to you because the lesson says to *change the extension* — if you ever **copy** instead of **rename**, you get both. Confirm before relying on it; the safe move is to make sure only one file exists.

## Flashcards

#flashcards/spring/configuration

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 3, 4, 5, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: the same jar launched twice — `--server.port=8081` and `--server.port=9090` — with no rebuild between. → git TIL *"One jar, many environments: Spring Boot config precedence."* Keep the `application.yml` in the project repo; link, don't copy it here.

## Links

- Related: [[Spring Boot]] · [[Spring Boot Annotations]]
- Keep secrets untracked: [[Git Helpful Reminders]]
- Map: [[Spring MOC]]
- Forward: [[Spring Profiles]] · [[ConfigurationProperties]]

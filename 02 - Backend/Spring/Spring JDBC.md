---
type: concept
topic: spring
status: learning
difficulty: hard
aliases:
  - Spring JDBC
  - JdbcTemplate
  - DAO
  - Data Access Object
  - RowMapper
  - DataAccessException
tags:
  - spring
  - jdbc
  - persistence
  - dao
  - concepts
---

# Spring JDBC

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference. The load-bearing trap is calling rs.next() inside mapRow — regenerate why that's wrong before anything else. The Eclipse click-path for generating a mapper stays in [[Row Mapper]]; this note is the transferable why. %%

## Worked Example

```java
// 1. THE MAPPING — one ResultSet ROW becomes one object.
//    The template already advanced the cursor: do NOT call rs.next() in here.
class UserMapper implements RowMapper<UserBean> {
    @Override
    public UserBean mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserBean user = new UserBean();
        user.setUserId(rs.getInt("userId"));
        user.setUsername(rs.getString("username"));
        user.setEmailVerified(rs.getBoolean("emailVerified"));
        return user;
    }
}

// 2. THE DAO — business code talks to this; it never sees a Connection.
@Repository
class UserDao {

    private final JdbcTemplate jdbc;
    UserDao(JdbcTemplate jdbc) { this.jdbc = jdbc; }   // 3. Boot auto-configures the template

    List<UserBean> findAll() {                          // 4. query(..., RowMapper) -> LIST
        return jdbc.query("SELECT * FROM users", new UserMapper());
    }

    int deactivate(int userId) {                        // 5. update(...) -> rows affected
        return jdbc.update("UPDATE users SET active = false WHERE userId = ?", userId);
    }
}
```

**Explain in plain English (EiPE):** you write only the SQL and the row-to-object mapping; Spring opens the connection, runs the statement, walks the rows, closes everything, and converts any database error into an exception you're not forced to catch.

## Retrieval Prompts

1. There is one line a beginner writes inside `mapRow` that silently breaks the results without ever throwing. What is it, and what happens?
> [!answer]- reveal
> **`rs.next()`**. The `JdbcTemplate` already advanced the cursor before calling `mapRow` for that row — calling it again **skips a row per iteration**, so you get roughly half your data back. It compiles, it runs, and it's wrong. `mapRow` reads the *current* row only.

2. Stock JDBC throws checked `SQLException`. Spring throws `DataAccessException`. What kind of exception is that, and what does the change actually buy you?
> [!answer]- reveal
> **Unchecked** (it extends `RuntimeException`), so you are **not forced** to wrap every call in try/catch. It's also a **hierarchy** that translates *vendor-specific* error codes into portable, meaningful types (e.g. `DuplicateKeyException`, `EmptyResultDataAccessException`) — so you can catch the *condition* without knowing whether you're on Postgres or MySQL.

3. You expect exactly one row. Which method, and what happens on zero rows or two?
> [!answer]- reveal
> **`queryForObject(sql, rowMapper, args...)`**. Zero rows → **`EmptyResultDataAccessException`**; more than one → **`IncorrectResultSizeDataAccessException`**. Both are unchecked. `query(...)` would instead hand you an empty or two-element `List`.

4. The DAO isolates the business layer from the persistence layer. Name a concrete consequence of that beyond "tidier code."
> [!answer]- reveal
> **The database can change without the business layer changing.** Swapping the query, the table, or even the engine touches only the DAO. It also makes the business layer **testable with a fake DAO** — no database needed — and it's the Single Responsibility Principle applied at the layer boundary.

5. `jdbc.update(...)` returns an `int`. An `int` of *what* — and why is that return value worth checking?
> [!answer]- reveal
> **The number of rows affected.** Worth checking because an `UPDATE`/`DELETE` that matches nothing is **not an error** — it returns `0` and succeeds silently. If "user not found" should be an error in your app, only that return value tells you.

6. *Interleaving:* `JdbcTemplate` vs `CrudRepository` — which one is Spring JDBC, and which do you reach for when?
> [!answer]- reveal
> **`JdbcTemplate` is Spring JDBC**: you write the SQL, you write the mapping. **`CrudRepository` is Spring Data** (a different module — the lesson blurs these): you declare an interface and the framework generates `save`/`findById`/`findAll`/`delete`/`count` for you. Template = control over the SQL; repository = no boilerplate for ordinary CRUD.

## Rebuild Drill

From a blank file, write (a) a `RowMapper<UserBean>` that maps `userId`, `username`, and `emailVerified`, and (b) a `@Repository` DAO with one method `findByUsername(String username)` that returns a **single** `UserBean`.

**Success criteria:** `mapRow(ResultSet rs, int rowNum) throws SQLException` and it does **not** call `rs.next()`; the DAO takes `JdbcTemplate` by **constructor injection** into a `final` field; `findByUsername` uses **`queryForObject`** (not `query`) with a **`?` placeholder** and the argument passed separately — never string-concatenated into the SQL; and you can state what is thrown when no such user exists.

## Correctness Check

Ran the Spring checklist from `Spring/_refiner.md`, plus the SQL checklist for the query semantics:

- ✅ **DI** — constructor injection into a `final JdbcTemplate` field; Spring Boot auto-configures the `JdbcTemplate` bean when a `DataSource` exists.
- ✅ **Annotation / config** — `@Repository` is a stereotype (so it must be in the component-scan path, see [[Spring Boot]]) *and* it enables persistence-exception translation into `DataAccessException`.
- ✅ **Signatures verified** — `RowMapper<T>.mapRow(ResultSet, int) throws SQLException`; `query(String, RowMapper<T>)` returns **`List<T>`**; `update(String, Object...)` returns **`int`** rows affected.
- ✅ **`DataAccessException` is unchecked** — extends `RuntimeException`. Verified.
- ➖ **Bean scope** — DAOs are singletons; they hold no per-request state here, so no prototype-in-singleton issue.
- ➖ **`@Transactional` proxy** — not used in this note. When you do add it: put it on the **Service**, and remember self-invocation bypasses the proxy.
- ✅ **SQL — sargability / placeholders** — `WHERE userId = ?` is a bound parameter, which is both index-friendly and the defence against SQL injection. Never concatenate user input into the SQL string.
- ⚠ **The lesson contradicts itself on one signature.** Its table correctly lists `public List query(String sql, RowMapper rse)`, but the later "syntax" line says `public T query(String sqlQuery, RowMapper<T> rm)`. **The table is right** — `query` with a `RowMapper` returns `List<T>`. Use `queryForObject` for a single result. (Also, the lesson's "database definition language" should read **data definition language**.)
- ⚠ **Cross-domain trap for your project, worth checking rather than assuming.** Postgres folds **unquoted** identifiers to lowercase, so a column created as `"userId"` (quoted, camelCase) will **not** match unquoted `userId` in a query. Your existing project code uses camelCase column names — if a query mysteriously reports a missing column, this is why. See the Postgres item in `04 - Database/SQL/_refiner.md`.

## Flashcards

#flashcards/spring/jdbc

%% Deduped 2026-08-14 red-line sweep: 6 cards restating Retrieval Prompts 1, 2, 3, 4, 5, 6 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: a DAO + RowMapper replacing hand-rolled JDBC — same query, a fraction of the lines, no `finally` block closing connections. → git TIL *"JdbcTemplate + RowMapper: the boilerplate you stop writing (and the `rs.next()` bug you stop hitting)."* Link the repo.

## Links

- Eclipse how-to (doing, not remembering): [[Row Mapper]] · [[userbean (columns are mapped to attributes)]]
- Related: [[IoC and Dependency Injection]] · [[Spring Boot]] · [[Externalized Configuration with YAML]]
- Contrast: [[JPA and Its Annotations]] — the ORM route to the same problem
- Map: [[Spring MOC]]
- Forward: [[Spring Data JPA]] · [[Three Layer Architecture]] · [[Transactional]]

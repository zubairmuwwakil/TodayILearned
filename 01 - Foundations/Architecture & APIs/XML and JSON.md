---
type: concept
topic: architecture
status: learning
difficulty: easy
aliases:
  - XML and JSON
  - JSON
  - XML
  - Data Interchange Formats
  - JSON vs XML
  - Serialization
tags:
  - architecture
  - json
  - xml
  - apis
  - concepts
---

# XML and JSON

%% Graduated via [[Refiner Spec (Graduate)]] using Architecture & APIs/_refiner.md. Test surface, not a reference. Cross-cutting on purpose: this is the format Spring returns, the format the POM is written in, and the format React will consume — it belongs to no single framework. %%

## Worked Example

The same three employees, in the two formats — note what each one needs that the other doesn't:

```xml
<!-- XML: exactly ONE root element; a "list" is just repeated siblings -->
<employees>
    <employee>
        <firstName>John</firstName>
        <lastName>Doe</lastName>
    </employee>
    <employee>
        <firstName>Anna</firstName>
        <lastName>Smith</lastName>
    </employee>
</employees>
```

```json
{
  "employees": [
    { "firstName": "John", "lastName": "Doe"   },
    { "firstName": "Anna", "lastName": "Smith" }
  ]
}
```

**Explain in plain English (EiPE):** both carry identical information out of a Java `List<Employee>` and into a system that has never heard of Java — XML by nesting named tags, JSON by nesting objects inside a real array.

## Retrieval Prompts

1. The lesson claims the Java list "would look something like this: `employees = [John Doe, Anna Smith, Peter Jones]`". What must be true of `Employee` for that to print, and what do you get otherwise?
> [!answer]- reveal
> `Employee` must **override `toString()`**. Without it you inherit `Object.toString()` and print `[com.bptn.Employee@1b6d3586, ...]` — the class name and a hex identity hash. The lesson quietly assumes an override it never wrote. See [[02-Object-Superclass]].

2. XML **well-formed** vs XML **valid** — these are not synonyms. What does each one mean?
> [!answer]- reveal
> **Well-formed** = syntactically legal: exactly one root element, every tag closed, correctly nested, and `&` `<` `>` escaped. **Valid** = well-formed **and** conforms to a declared schema (DTD/XSD) — right elements, right order, right types. Every valid document is well-formed; the reverse doesn't hold.

3. JSON has exactly six value types. Name them — and name the everyday type that is conspicuously *not* among them.
> [!answer]- reveal
> **string, number, boolean, `null`, object, array.** There is **no date type** — dates travel as strings by convention (ISO-8601: `"2026-08-13T10:30:00Z"`). This is why date handling is a recurring source of API bugs: every consumer must agree on the string format.

4. Name three things that are legal in a JavaScript object literal but will be **rejected** by a strict JSON parser.
> [!answer]- reveal
> **Unquoted keys** (`{firstName: "John"}`), **single quotes** (`{'a': 'b'}`), and **trailing commas** (`{"a": 1,}`). Also **comments** — JSON has none. JSON looks like JavaScript and is much stricter than it.

5. Why does XML *require* a single root element while JSON's top level can be either an object or an array?
> [!answer]- reveal
> XML is a **tree of elements** — a document with two roots has no unambiguous parent to parse from, so the spec forbids it. JSON is a **value** at top level, and both objects and arrays are perfectly good self-delimiting values. It's the same reason XML has no native array type: repetition is expressed by repeating sibling elements, which is why the XML above is longer.

6. *Interleaving:* your project uses XML in one place and JSON in another. Which is which, and why is each the right fit?
> [!answer]- reveal
> **XML for `pom.xml`** — configuration that benefits from schema validation and tooling, written once and read by a build tool ([[Apache Maven]]). **JSON for API responses** — payloads sent thousands of times over a network, where the boilerplate-to-data ratio actually costs bandwidth and parsing time ([[Spring MVC]]).

## Rebuild Drill

From a blank file, write the same two-record dataset — a book with `title` and `year`, twice — once as well-formed XML and once as valid JSON.

**Success criteria:** the XML has **exactly one root element** and every tag closed and nested; the JSON has **every key in double quotes**, **no trailing comma** after the last element, and uses a real **array** for the two records; `year` is a **number** in JSON (no quotes) but is unavoidably text in XML. Then state one thing the JSON version cannot express that the XML version can.

## Correctness Check

Ran the checklist from `Architecture & APIs/_refiner.md`:

- ✅ **JSON strictness** — the example uses double-quoted keys, no trailing commas, no comments. It parses.
- ✅ **JSON's six value types**, and no date type. Verified.
- ✅ **Well-formed vs valid** distinguished, not used interchangeably.
- ✅ **Structural asymmetry** — XML: one root, no native arrays; JSON: object *or* array at top level. Verified against the examples.
- ✅ **XML example is well-formed** — single `<employees>` root, all tags closed and properly nested.
- ➖ **HTTP semantics / media types** — touched only in passing here (`application/json`); belongs to the REST note when that material lands.
- ⚠ **The lesson's comparison table is JavaScript-centric and misleading for you.** It says JSON is *"parsed into JavaScript Objects"* while XML *"requires an extra layer of interpretation."* In a **browser** that's fair (`JSON.parse` is built in). In **Java/Spring both formats need a library** — Jackson for JSON, JAXB for XML. JSON isn't free in Java; it's just that Spring Boot wires Jackson up for you so you never see it.
- ➖ **Minor, in the lesson:** the snippet labelled *"Here's our class"* is a **constructor**, shown with no enclosing class declaration. Read it as a fragment.

## Flashcards

#flashcards/architecture/data-formats

What is the difference between well-formed XML and valid XML?
?
Well-formed = syntactically legal (one root, tags closed and nested, entities escaped). Valid = well-formed AND conforming to a DTD/XSD schema.

What are JSON's six value types, and which everyday type is missing?
?
string, number, boolean, null, object, array. There is no date type — dates travel as strings, conventionally ISO-8601.

Name three things legal in a JavaScript object literal but rejected by a JSON parser.
?
Unquoted keys, single-quoted strings, and trailing commas. (Comments too — JSON has none.)

Why does XML require exactly one root element while JSON does not?
?
XML is a tree, so two roots leave the parser with no unambiguous parent. JSON's top level is just a value, and objects and arrays are both self-delimiting.

Why is XML more verbose than JSON for list data?
?
XML has no native array type — repetition is expressed as repeated sibling elements, each with an opening and closing tag.

Is JSON "free" to parse in Java the way it is in a browser?
?
No. Browsers have JSON.parse built in; Java needs a library (Jackson). Spring Boot just configures Jackson for you so it's invisible.

## TIL candidate

Showable: one Java object returned from a `@RestController` and inspected in Postman as JSON. → git TIL *"POJO to JSON: what Jackson does for you in Spring Boot."* Link the endpoint; keep the payload there.

## Links

- Where JSON is produced: [[Spring MVC]] · [[Spring Boot Annotations]]
- Where XML is consumed: [[Apache Maven]]
- The `toString()` assumption: [[02-Object-Superclass]]
- Forward: [[REST]] · [[HTTP Methods and Status Codes]] · [[Jackson]]

---
type: concept
topic: spring
status: learning
difficulty: hard
aliases:
  - Spring MVC
  - DispatcherServlet
  - HandlerMapping
  - ViewResolver
  - Front Controller in Spring
  - Spring Request Flow
tags:
  - spring
  - spring-mvc
  - web
  - architecture
  - concepts
---

# Spring MVC

%% Graduated via [[Refiner Spec (Graduate)]] using Spring/_refiner.md. Test surface, not a reference. The general pattern lives in [[MVC Pattern]] — this note is Spring's IMPLEMENTATION of it. The lesson's request-flow description contains two errors; see Correctness Check. %%

## Worked Example

The same data, served two ways — the difference is exactly one step of the flow:

```java
@Controller                                    // 1. classic MVC — returns a VIEW NAME
class WeatherPageController {

    private final WeatherService service;
    WeatherPageController(WeatherService service) { this.service = service; }

    @GetMapping("/weather/{city}")
    String show(@PathVariable String city, Model model) {
        model.addAttribute("forecast", service.forecastFor(city));  // 2. fill the MODEL
        return "weather";                      // 3. a NAME, not a page -> ViewResolver
    }
}

@RestController                                // 4. REST — there is no View at all
class WeatherApiController {

    private final WeatherService service;
    WeatherApiController(WeatherService service) { this.service = service; }

    @GetMapping("/api/weather/{city}")
    Forecast get(@PathVariable String city) {
        return service.forecastFor(city);      // 5. object -> JSON, straight into the body
    }
}
```

**Explain in plain English (EiPE):** both controllers ask a service for the same forecast; the first hands back the *name of a template* for Spring to render into HTML, the second hands back an *object* that Spring serializes into JSON.

## Retrieval Prompts

1. Trace a request end to end. Name the four Spring components it passes through, in order — and be precise about **who** consults **HandlerMapping**.
> [!answer]- reveal
> **DispatcherServlet → HandlerMapping → Controller → ViewResolver → View.** The **DispatcherServlet** consults HandlerMapping to choose the handler *before* any controller runs. ⚠ The lesson says the *Controller* calls HandlerMapping to pick its methods — that is wrong; by then the specific handler method has already been selected.

2. The View has rendered. Where does that output go next?
> [!answer]- reveal
> Back through the **DispatcherServlet**, which writes the response to the client. ⚠ The lesson says it goes "back to the original Controller so it can get out to the client" — also wrong. The Controller's involvement ended when it returned the view name. Everything funnels through the DispatcherServlet.

3. Why is the DispatcherServlet described as a **front controller**, and what problem does that solve?
> [!answer]- reveal
> Because **every** HTTP request enters through this one servlet before anything else runs. That single entry point is where cross-cutting concerns — routing, auth, logging, exception handling — can be applied **once** instead of repeated in every controller. See [[Front Controller Pattern]].

4. The lesson insists the Service is **not** part of MVC. So what *is* the Controller's job, and why the "lazy manager" comparison?
> [!answer]- reveal
> The Controller **coordinates**: receive request → call a Service for the business logic → put the result in the Model → name a View. It should hold almost no logic of its own. Business rules belong in the Service layer, which sits *outside* MVC — that's why a fat controller is a design smell.

5. Swap `@Controller` for `@RestController`. Which step of the flow disappears, and what replaces it?
> [!answer]- reveal
> **View resolution disappears** — no ViewResolver, no template. `@RestController` = `@Controller` + `@ResponseBody`, so the returned object goes through an **HttpMessageConverter** (Jackson) and is serialized directly into the response body as JSON. See [[XML and JSON]].

6. What *is* the Model, concretely — and what is it not?
> [!answer]- reveal
> Just a **named bag of data** passed from Controller to View (POJOs, maps, strings, lists). It is **not** the database layer and **not** the business logic — despite "Model" meaning something closer to that in other frameworks.

## Rebuild Drill

From a **blank page**, redraw the Spring MVC request flow: every component, every arrow, and the direction of each arrow — from the browser's request to the bytes it receives back. Label what is passed along each arrow (request / handler / model + view name / rendered view / response).

**Success criteria:** DispatcherServlet is the single entry *and* exit point; HandlerMapping is consulted **by the DispatcherServlet**, not by the Controller; the Controller returns a **view name plus model**, not a rendered page; ViewResolver turns that **name** into a View; the rendered output returns via the **DispatcherServlet**, never back through the Controller. Then add one sentence: which arrow vanishes under `@RestController`, and what does the work instead.

## Correctness Check

Ran the Spring checklist from `Spring/_refiner.md`:

- ✅ **Annotation / config** — `@Controller` (view name) vs `@RestController` (= `@Controller` + `@ResponseBody`, body serialization) used correctly; both are stereotypes, so both must sit inside the component-scan path ([[Spring Boot]]).
- ✅ **DI** — constructor injection of `WeatherService` in both controllers, consistent with [[IoC and Dependency Injection]].
- ✅ **Code compiles** — `Model` is `org.springframework.ui.Model`; a `@Controller` handler returning `String` is interpreted as a view name; a `@RestController` handler returning an object is written by an `HttpMessageConverter`.
- ➖ **Bean scope** — controllers are singletons by default, which is why you must not hold per-request state in a controller field. Noted, not the focus here.
- ➖ **`@Transactional` proxy** — N/A; transactions belong on the Service layer.
- ⚠ **Two errors in the lesson, corrected above.** (1) It has the *Controller* calling HandlerMapping to select methods — the **DispatcherServlet** does that, before the controller is invoked. (2) It has the View's output returning **to the Controller** to be sent to the client — it returns through the **DispatcherServlet**. Both are in prompts 1 and 2 so you regenerate the right version, not the slide's.
- ➖ **Omitted deliberately:** the `HandlerAdapter` step (DispatcherServlet actually invokes the handler *through* an adapter). Correct but one layer below what you need now — noted so you're not surprised when you meet it.

## Flashcards

#flashcards/spring/spring-mvc

What does a @Controller method return, and what does Spring do with it?
?
A view name (a String) plus a populated Model; the ViewResolver turns that name into an actual View, which renders the model.

%% Deduped 2026-08-14 red-line sweep: 5 cards restating Retrieval Prompts 1, 2, 3, 4, 5 removed — one question, one home. Answers live in the prompts' collapsed callouts. %%

## TIL candidate

Showable: the same endpoint exposed twice — one `@Controller` rendering a template, one `@RestController` returning JSON. → git TIL *"`@Controller` vs `@RestController`: the one step that disappears."* Link the repo; don't copy the controllers here.

## Links

- The general pattern: [[MVC Pattern]] · [[Front Controller Pattern]]
- Related: [[Spring Boot Annotations]] · [[IoC and Dependency Injection]] · [[Spring Boot]]
- Response format: [[XML and JSON]]
- Map: [[Spring MOC]]
- Forward: [[Three Layer Architecture]] · [[HttpMessageConverter]]

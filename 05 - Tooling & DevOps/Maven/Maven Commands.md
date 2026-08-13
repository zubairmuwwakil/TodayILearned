

# mvn clean install

## What it does 
clean    deletes the old target/ build folder
install  compiles, runs tests, packages the app, and installs the jar into your local Maven repo

## Todo from eclipse 

1. In the Project Explorer, right-click the project.
2. Choose:  
    `Run As` → `Maven build...`
3. In the `Goals` box, type:

```
clean install
```

8. Click `Run`.
# mvn spring-boot:run

## What it does:

```
1. Compiles the app if needed
2. Starts the Spring Boot application
3. Keeps running until you stop it
```

Stop it in terminal with:

```
Ctrl + C
```

## In Eclipse:

1. Right-click the project.
2. `Run As` → `Maven build...`
3. In `Goals`, type:

```
spring-boot:run
```

4. Click `Run`.

Or if Eclipse recognizes it as a Spring Boot app:

```
Right-click Main.java -> Run As -> Java Application
```
# mvn test

## What it does:

```
1. Compiles src/main/java
2. Compiles src/test/java
3. Runs tests
```

Important: if there are no tests, it can still say `BUILD SUCCESS` because the code compiled successfully.

## In Eclipse:

1. Right-click the project.
2. `Run As` → `Maven build...`
3. In `Goals`, type:

```
test
```

4. Click `Run`.

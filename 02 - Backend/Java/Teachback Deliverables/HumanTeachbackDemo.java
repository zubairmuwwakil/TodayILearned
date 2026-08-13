import java.util.List;

public class HumanTeachbackDemo {
    public static void main(String[] args) {
        Student student = new Student("Zub");
        Teacher teacher = new Teacher("Maya");

        List<Human> classroom = List.of(student, teacher);

        System.out.println("=== Same call, different runtime behavior ===");
        for (Human person : classroom) {
            System.out.printf(
                    "Reference type: Human | Runtime type: %s%n",
                    person.getClass().getSimpleName());
            person.useSenses();
            person.communicate(
                    "How are inheritance and polymorphism different?");
            System.out.println();
        }

        System.out.println("=== Subclass-only behavior ===");
        student.askQuestion("Which communicate method ran?");
        student.shareIdea(
                "Inheritance creates the relationship; polymorphism uses it.");
        teacher.explainConcept("Overriding");
        teacher.answerQuestion("The runtime object's override ran.");

        System.out.println();
        System.out.println("=== Reference type limits available calls ===");
        Human participant = new Student("Ari");
        participant.communicate("May I share an idea?");

        // participant.raiseHand();
        // Does not compile: Human has no raiseHand() method.
    }
}

class Human {
    private final String name;

    Human(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name must not be blank.");
        }
        this.name = name.strip();
    }

    public String getName() {
        return name;
    }

    public void useSenses() {
        System.out.println(
                name + " uses their senses to observe the environment.");
    }

    public void communicate(String message) {
        System.out.println(name + " communicates: " + message);
    }
}

class Student extends Human {
    Student(String name) {
        super(name);
    }

    public void raiseHand() {
        System.out.println(getName() + " raises a hand.");
    }

    public void waitForTurn() {
        System.out.println(getName() + " waits to be called on.");
    }

    public void askQuestion(String question) {
        communicate("Question: " + question);
    }

    public void shareIdea(String idea) {
        communicate("Idea: " + idea);
    }

    @Override
    public void communicate(String message) {
        raiseHand();
        waitForTurn();
        System.out.println(getName() + " communicates: " + message);
    }
}

class Teacher extends Human {
    Teacher(String name) {
        super(name);
    }

    public void explainConcept(String concept) {
        communicate("Explanation: " + concept);
    }

    public void answerQuestion(String answer) {
        communicate("Answer: " + answer);
    }

    @Override
    public void communicate(String message) {
        System.out.println(
                getName() + " communicates directly: " + message);
    }
}

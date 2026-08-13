public class Java25ConstructorDemo {
    public static void main(String[] args) {
        Student student = new Student("  Zub  ");

        System.out.println(student.getName());

        try {
            new Student("   ");
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
        }
    }

    static class Human {
        private final String name;

        Human(String name) {
            this.name = name;
        }

        String getName() {
            return name;
        }
    }

    static final class Student extends Human {
        Student(String name) {
            // Java 25 permits validation before the explicit super(...) call.
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException(
                        "Student name must not be blank.");
            }

            String normalizedName = name.strip();
            super(normalizedName);
        }
    }
}

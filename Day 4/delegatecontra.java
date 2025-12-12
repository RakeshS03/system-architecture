class Animal {}
class Dog extends Animal {}

interface DogHandler {
    void handle(Dog d);
}

public class delegatecontra {
    // Method that accepts a wider type 
    static void handleAnimal(Animal a) {
        System.out.println("Handling: " + a.getClass().getSimpleName());
    }

    public static void main(String[] args) {
        DogHandler handler = Main::handleAnimal;
        handler.handle(new Dog()); // Dog IS-A Animal
    }
}

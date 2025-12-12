class Animal {}
class Dog extends Animal {}

interface AnimalFactory {
    Animal create();
}

public class delegatecovar{
    static Dog createDog() {    // returns a more specific type
        return new Dog();
    }

    public static void main(String[] args) {
        AnimalFactory factory = Main::createDog;  // Covariance
        Animal a = factory.create();
        System.out.println(a.getClass().getSimpleName());
    }
}

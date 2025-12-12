class Animal {}
class Cat extends Animal {}
class Dog extends Animal {}

public class Covariance {
    public static void main(String[] args) {
        // Java arrays are covariant:
        Cat[] cats = new Cat[2];
        
        // Allowed in compile time 
        Animal[] animals = cats;

        try {
            // RUNTIME ERROR: ArrayStoreException
            animals[0] = new Dog();   
        } catch (Exception ex) {
            System.out.println("Runtime Safety Check Failed" + ex);
        }
    }
}

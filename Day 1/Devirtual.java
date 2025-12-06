class Animal {
    public int speak() { return 1; }
}

class Dog extends Animal {
    
    public int speak() { return 42; }
}

public class Devirtual {
    public static void main(String[] args) {
        Animal a = new Dog(); 

        int sum = 0;
        for (int i = 0; i < 10000; i++) {
            sum += a.speak();  // JIT devirtualizes + inlines
        }

        System.out.println("Sum = " + sum);
        System.out.println("Devirtualization");
    }
}
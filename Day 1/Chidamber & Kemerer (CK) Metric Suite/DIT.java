// Root class (DIT = 1)
class Animal {
    public void info() {
        System.out.println("I am an Animal");
    }
}

// Level 2 (DIT = 2)
class Mammal extends Animal {
    
    public void info() {
        System.out.println("I am a Mammal");
    }
}

// Level 3 (DIT = 3)
class Dog extends Mammal {
   
    public void info() {
        System.out.println("I am a Dog");
    }
}

// Level 4 (DIT = 4)
class GermanShepherd extends Dog {
    
    public void info() {
        System.out.println("I am a German Shepherd");
    }
}
// Interface DOES NOT increase DIT
interface Vehicle {
    void info();
}

// DIT = 1 
class Car implements Vehicle {
    public void info() {
        System.out.println("I am a Car");
    }
}

// Another DIT = 1 class
class Bike implements Vehicle {
    public void info() {
        System.out.println("I am a Bike");
    }
}


public class DIT {
    public static void main(String[] args) {

        System.out.println("HIGH DIT");
        GermanShepherd gs = new GermanShepherd();
        gs.info();
        System.out.println("DIT =4 More complex,harder to maintain.\n");

        System.out.println("LOW DIT");
        Car car = new Car();
        car.info();

        Bike bike = new Bike();
        bike.info();

        System.out.println("DIT=1→Simple, easy to maintain.");
    }
}

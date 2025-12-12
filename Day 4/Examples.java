//Covariance

class Animal { 
    void speak(){} 
}
class Cat extends Animal {}

void printAnimals(List<? extends Animal> animals) {
    for (Animal a : animals) {
        a.speak();
    }
}

List<Cat> cats = new ArrayList<>();
printAnimals(cats);  

//contravariance
class Animal {}
class Cat extends Animal {}

void addCats(List<? super Cat> animals) {
    animals.add(new Cat());  
}

List<Animal> a = new ArrayList<>();
List<Object> o = new ArrayList<>();

addCats(a);   
addCats(o);   

//invariance
class Animal {}
class Cat extends Animal {}

class Box<T> {}

Box<Animal> a = new Box<Animal>();
Box<Cat> c = new Box<Cat>();

//this causes error
// Box<Animal> a2 = c; 


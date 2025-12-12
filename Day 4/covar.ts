class Animal {}
class Dog extends Animal {}

type AnimalFactory = () => Animal;

const createDog = (): Dog => new Dog(); // More specific return type

const factory: AnimalFactory = createDog; // Covariance

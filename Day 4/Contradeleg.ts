class Animal { name = "Animal"; }
class Dog extends Animal { bark() {} }

type DogHandler = (d: Dog) => void;

function main() {
    const handleAnimal = (a: Animal) => {
        console.log("Handling " + a.name);
    };

   
    // DogHandler needs a method that accepts Dog
    // I give handleAnimal, which accepts any Animal 
    const handler: DogHandler = handleAnimal;

    handler(new Dog());
}
main();

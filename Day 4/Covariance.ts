class Animal { }
class Cat extends Animal { meow() {} }
class Dog extends Animal { bark() {} }

function main() {
    const cats: Cat[] = [new Cat()];

    // arrays are covariant in TypeScript.
    const animals: Animal[] = cats;

    // UNSAFE: inserting a Dog into a Cat[] via Animal[]
    animals.push(new Dog());

    
    // cats now contains a Dog in position 1.
    console.log("cats array:", cats);

    
    cats[1].meow();
    // It will crash: meow() does not exist on Dog.
}
main();

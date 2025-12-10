function calculateDiscount(age: number, isMember: boolean): string {

    // decision 1
    if (age > 18) {

        // decision 2 (impossible)
        if (age < 10) {  
            return "impossible age";
        }

        // decision 3
        if (isMember) {
            return "discount";
        } else {
            return "no discount";
        }

    } else {
        // decision 4
        if (age < 5) {
            return "child Discount";
        }
        return "no discount";
    }
}
const testValues = [
    { age: 25, member: true },
    { age: 25, member: false },
    { age: 3, member: false }
];

testValues.forEach(t => {
    console.log(`Input(Age=${t.age}, Member=${t.member}) → ${calculateDiscount(t.age, t.member)}`);
});

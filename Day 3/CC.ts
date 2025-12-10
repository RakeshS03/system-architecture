class Validator {

    // Deeply Nested
    checkNested(age: number, hasID: boolean): void {
        if (age > 0) {
            if (age >= 18) {
                if (hasID) {
                    console.log("Access Granted");
                }
            }
        }
    }

    // Flat and Easy to Read
    checkFlat(age: number, hasID: boolean): void {
        if (age <= 0) return;
        if (age < 18) return;
        if (!hasID) return;

        console.log("Access Granted");
    }
}
const v = new Validator();
v.checkNested(20, true);
v.checkFlat(20, true);

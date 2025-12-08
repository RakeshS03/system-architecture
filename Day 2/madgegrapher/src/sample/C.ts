import { aFunc } from "./A"; // Circular dependency introduced

export function cFunc() {
    console.log("C.ts → calling A.ts");
    aFunc();
}

import { aFunc } from "./A"; 

export function cFunc() {
    console.log("C.ts → calling A.ts");
    aFunc();
}

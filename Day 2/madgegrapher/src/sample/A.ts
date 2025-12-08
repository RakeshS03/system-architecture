/*import { bFunc } from "./B";

export function aFunc() {
    console.log("Inside A.ts → Calling B.ts");
    bFunc();
}
*/

import { bFunc } from "./B";

export function aFunc() {
    console.log("A.ts → calling B.ts");
    bFunc();
}

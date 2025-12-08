/*import { cFunc } from "./C";

export function bFunc() {
    console.log("Inside B.ts → Calling C.ts");
    cFunc();
}
*/

import { cFunc } from "./C";

export function bFunc() {
    console.log("B.ts → calling C.ts");
    cFunc();
}

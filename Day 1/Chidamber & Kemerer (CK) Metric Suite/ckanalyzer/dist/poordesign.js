"use strict";
// poordesign.ts
class PoorClass {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    methodA() {
        if (this.x > 0)
            this.methodB();
        for (let i = 0; i < 5; i++)
            this.x++;
    }
    methodB() {
        while (this.y < 10)
            this.y++;
    }
    methodC() {
        this.methodA();
        this.methodB();
        if (this.z < 5)
            this.z++;
    }
}
class AnotherClass extends PoorClass {
    constructor() {
        super(...arguments);
        this.a = 0;
    }
    methodD() {
        this.methodA();
        this.methodC();
    }
    methodE() {
        if (this.a > 0)
            this.methodD();
    }
}

// DIT = 1
class Device {
    info(): void {
        console.log("This is a Device");
    }
}
// DIT = 2
class SmartDevice extends Device {
    info(): void {
        console.log("This is a Smart Device");
    }
}
// DIT = 3
class SmartPhone extends SmartDevice {
    info(): void {
        console.log("This is a Smart Phone");
    }
}
// DIT = 4
class AndroidPhone extends SmartPhone {
    info(): void {
        console.log("This is an Android Phone");
    }
}

interface PaymentMethod {
    pay(amount: number): void;
}

// DIT = 1
class CreditCardPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log("Paid " + amount + " using Credit Card");
    }
}

// DIT = 1
class UpiPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log("Paid " + amount + " using UPI");
    }
}
// Low DIT using class
class Machine {
    info(): void {
        console.log("This is a Machine");
    }
}
// DIT = 2
class WashingMachine extends Machine {
    info(): void {
        console.log("This is a Washing Machine");
    }
}

console.log("HIGH DIT");
const aPhone = new AndroidPhone();
aPhone.info();  
// DIT = 4 → Deep inheritance chain


console.log("\nLOW DIT(Interface)");
const cc = new CreditCardPayment();
cc.pay(500);

const upi = new UpiPayment();
upi.pay(250);


console.log("\nLOW DIT (Shallow Inheritance)");
const wm = new WashingMachine();
wm.info();
// DIT = 2 → Simple and maintainable

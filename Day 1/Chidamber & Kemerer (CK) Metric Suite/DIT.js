var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// DIT = 1
var Device = /** @class */ (function () {
    function Device() {
    }
    Device.prototype.info = function () {
        console.log("This is a Device");
    };
    return Device;
}());
// DIT = 2
var SmartDevice = /** @class */ (function (_super) {
    __extends(SmartDevice, _super);
    function SmartDevice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartDevice.prototype.info = function () {
        console.log("This is a Smart Device");
    };
    return SmartDevice;
}(Device));
// DIT = 3
var SmartPhone = /** @class */ (function (_super) {
    __extends(SmartPhone, _super);
    function SmartPhone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartPhone.prototype.info = function () {
        console.log("This is a Smart Phone");
    };
    return SmartPhone;
}(SmartDevice));
// DIT = 4
var AndroidPhone = /** @class */ (function (_super) {
    __extends(AndroidPhone, _super);
    function AndroidPhone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AndroidPhone.prototype.info = function () {
        console.log("This is an Android Phone");
    };
    return AndroidPhone;
}(SmartPhone));
// DIT = 1
var CreditCardPayment = /** @class */ (function () {
    function CreditCardPayment() {
    }
    CreditCardPayment.prototype.pay = function (amount) {
        console.log("Paid " + amount + " using Credit Card");
    };
    return CreditCardPayment;
}());
// DIT = 1
var UpiPayment = /** @class */ (function () {
    function UpiPayment() {
    }
    UpiPayment.prototype.pay = function (amount) {
        console.log("Paid " + amount + " using UPI");
    };
    return UpiPayment;
}());
// Low DIT using class
var Machine = /** @class */ (function () {
    function Machine() {
    }
    Machine.prototype.info = function () {
        console.log("This is a Machine");
    };
    return Machine;
}());
// DIT = 2
var WashingMachine = /** @class */ (function (_super) {
    __extends(WashingMachine, _super);
    function WashingMachine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WashingMachine.prototype.info = function () {
        console.log("This is a Washing Machine");
    };
    return WashingMachine;
}(Machine));
console.log("HIGH DIT");
var aPhone = new AndroidPhone();
aPhone.info();
// DIT = 4 → Deep inheritance chain
console.log("\nLOW DIT(Interface)");
var cc = new CreditCardPayment();
cc.pay(500);
var upi = new UpiPayment();
upi.pay(250);
console.log("\nLOW DIT (Shallow Inheritance)");
var wm = new WashingMachine();
wm.info();
// DIT = 2 → Simple and maintainable

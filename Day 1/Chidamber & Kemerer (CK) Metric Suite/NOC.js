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
var input = require("prompt-sync")();
var Device = /** @class */ (function () {
    function Device() {
    }
    Device.prototype.info = function () {
        console.log("General device");
    };
    return Device;
}());
function createDeviceClass(type, description) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.info = function () {
            console.log("".concat(type, ": ").concat(description));
        };
        return class_1;
    }(Device));
}
var DynamicTool = /** @class */ (function () {
    function DynamicTool(name, purpose) {
        this.name = name;
        this.purpose = purpose;
    }
    DynamicTool.prototype.use = function () {
        console.log("".concat(this.name, " is used for ").concat(this.purpose));
    };
    return DynamicTool;
}());
console.log("HIGH NOC");
var count = parseInt(input("Enter number of devices to create: "));
var dynamicDevices = [];
for (var i = 0; i < count; i++) {
    var type = input("device type #".concat(i + 1, ": "));
    var desc = input("description for ".concat(type, ": "));
    var DynamicClass = createDeviceClass(type, desc);
    dynamicDevices.push(new DynamicClass());
}
console.log("\nDEVICE DETAILS");
dynamicDevices.forEach(function (d) { return d.info(); });
console.log("\nLOW NOC");
var toolName = input("tool name: ");
var toolPurpose = input("purpose of the tool: ");
var tool = new DynamicTool(toolName, toolPurpose);
console.log("\nTOOL DETAIL");
tool.use();

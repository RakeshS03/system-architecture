const input = require("prompt-sync")();

class Device {
    info(): void {
        console.log("General device");
    }
}
function createDeviceClass(type: string, description: string) {
    return class extends Device {
        info(): void {
            console.log(`${type}: ${description}`);
        }
    };
}
interface Tool {
    use(): void;
}

class DynamicTool implements Tool {
    name: string;
    purpose: string;

    constructor(name: string, purpose: string) {
        this.name = name;
        this.purpose = purpose;
    }

    use(): void {
        console.log(`${this.name} is used for ${this.purpose}`);
    }
}

console.log("HIGH NOC");
const count = parseInt(input("Enter number of devices to create: "));
const dynamicDevices: Device[] = [];
for (let i = 0; i < count; i++) {
    const type = input(`device type #${i + 1}: `);
    const desc = input(`description for ${type}: `);

    const DynamicClass = createDeviceClass(type, desc);
    dynamicDevices.push(new DynamicClass());
}
console.log("\nDEVICE DETAILS");
dynamicDevices.forEach(d => d.info());
console.log("\nLOW NOC");
const toolName = input("tool name: ");
const toolPurpose = input("purpose of the tool: ");
const tool = new DynamicTool(toolName, toolPurpose);
console.log("\nTOOL DETAIL");
tool.use();

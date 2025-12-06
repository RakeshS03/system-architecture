// POOR: High WMC (God Method)
var InventoryProcessor = /** @class */ (function () {
    function InventoryProcessor() {
    }
    InventoryProcessor.prototype.updateInventory = function () {
        console.log("High WMC");
        var itemExists = true;
        var quantity = 10;
        var warehouseAvailable = true;
        if (itemExists) {
            console.log("Item exists");
            if (quantity > 0) {
                console.log("Quantity is valid");
                if (warehouseAvailable) {
                    console.log("Warehouse available");
                    console.log("Checking warehouse space...");
                    console.log("Verifying product codes...");
                    console.log("Inventory updated successfully (High WMC).");
                }
            }
        }
    };
    return InventoryProcessor;
}());
// GOOD: Low WMC (Decomposed)
var CleanInventoryProcessor = /** @class */ (function () {
    function CleanInventoryProcessor() {
    }
    CleanInventoryProcessor.prototype.updateInventory = function () {
        console.log("Low WMC");
        if (!this.itemExists())
            return;
        if (!this.hasQuantity())
            return;
        this.syncWarehouse();
        console.log("Inventory updated");
    };
    CleanInventoryProcessor.prototype.itemExists = function () {
        console.log("Checking if item exists");
        var exists = true;
        if (!exists) {
            console.log("Item does not exist");
        }
        else {
            console.log("Item exists");
        }
        return exists; // CC = 1
    };
    CleanInventoryProcessor.prototype.hasQuantity = function () {
        console.log("Checking quantity");
        var quantity = 10;
        if (quantity > 0) {
            console.log("Quantity is valid");
            return true; // CC = 1
        }
        else {
            console.log("Invalid");
            return false;
        }
    };
    CleanInventoryProcessor.prototype.syncWarehouse = function () {
        console.log("Syncing with warehouse...");
        console.log("Warehouse available");
        console.log("Adjusting stock numbers...");
        console.log("Updating database...");
        console.log("Notifying admin...");
        // CC = 1
    };
    return CleanInventoryProcessor;
}());
// Usage
new InventoryProcessor().updateInventory();
new CleanInventoryProcessor().updateInventory();

// POOR: High WMC (God Method)
class InventoryProcessor {
    updateInventory(): void {

        console.log("High WMC");

        
        const itemExists = true;
        const quantity = 10;
        const warehouseAvailable = true;

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

        
    }
}


// GOOD: Low WMC (Decomposed)
class CleanInventoryProcessor {

    updateInventory(): void {

        console.log("Low WMC");
        if (!this.itemExists()) return;
        if (!this.hasQuantity()) return;
        this.syncWarehouse();

        console.log("Inventory updated");
        
    }

    private itemExists(): boolean {
        console.log("Checking if item exists");
        const exists = true;
        if (!exists) {
            console.log("Item does not exist");
        } else {
            console.log("Item exists");
        }
        return exists;  // CC = 1
    }

    private hasQuantity(): boolean {
        console.log("Checking quantity");
        const quantity = 10;
        if (quantity > 0) {
            console.log("Quantity is valid");
            return true; // CC = 1
        } else {
            console.log("Invalid");
            return false;
        }
    }

    private syncWarehouse(): void {
        console.log("Syncing with warehouse...");
        console.log("Warehouse available");
        console.log("Adjusting stock numbers...");
        console.log("Updating database...");
        console.log("Notifying admin...");
        // CC = 1
    }

    // Total WMC = 1 + 1 + 1 + 1 = 4 (LOW)
}


// Usage
new InventoryProcessor().updateInventory();
new CleanInventoryProcessor().updateInventory();

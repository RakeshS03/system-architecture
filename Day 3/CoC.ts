/*function processOrder(order: any) {
    if (order) {                                   // +1
        if (order.items && order.items.length > 0) { // +1 + nesting penalty
            for (let item of order.items) {        // +1 + nesting penalty
                if (item.price > 0) {              // +1 + deeper nesting penalty
                    if (item.quantity > 0) {       // +1 + deeper nesting penalty
                        if (order.customer) {      // +1 + deeper nesting
                            if (order.customer.isActive) {  // +1
                                console.log("Valid"); 
                            } else {
                                console.log("Inactive");
                            }
                        } else {
                            console.log("Missing");
                        }
                    } else {
                        console.log("Invalid");
                    }
                } else {
                    console.log("Invalid price");
                }
            }
        } else {
            console.log("No item");
        }
    } else {
        console.log("Order not found");
    }
} */

function processOrder(order: any) {
    if (!order) {
        console.log(" no Order ");
        return;
    }

    if (!order.items || order.items.length === 0) {
        console.log("No item");
        return;
    }

    if (!order.customer) {
        console.log("Missing customer");
        return;
    }

    if (!order.customer.isActive) {
        console.log("Inactive customer");
        return;
    }
    for (let item of order.items) {
        if (item.price <= 0) {
            console.log("Invalid price");
            continue;
        }
    if (item.quantity <= 0) {
            console.log("Invalid quantity");
            continue;
        }
    }

    console.log("Valid order");
}

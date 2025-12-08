//High Instability
class PaymentGateway {}
class EmailService {}
class InventoryService {}
class Logger {}

class OrderService {
    private pg = new PaymentGateway();     // Ce +1
    private email = new EmailService();    // Ce +1
    private inv = new InventoryService();  // Ce +1
    private logger = new Logger();         // Ce +1

    placeOrder() {
        this.logger.toString();
        this.pg.toString();
        this.email.toString();
        this.inv.toString();
        console.log("Order");
    }
}

/*interface IPaymentGateway {}
interface IEmailService {}
interface IInventoryService {}
interface ILogger {}


class PaymentGateway implements IPaymentGateway {}
class EmailService implements IEmailService {}
class InventoryService implements IInventoryService {}
class Logger implements ILogger {}


class OrderService {
    constructor(
        private pg: IPaymentGateway,
        private email: IEmailService,
        private inv: IInventoryService,
        private logger: ILogger) {}

    placeOrder() {
        console.log("Order");
    }
}
    */


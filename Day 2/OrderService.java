
//sample empty class for showing the dependency

class PaymentGateway {}
class EmailService {}
class InventoryService {}
class Logger {}

class OrderService {
    PaymentGateway pg = new PaymentGateway();   // Ce +1
    EmailService email = new EmailService();    // Ce +1
    InventoryService inv = new InventoryService(); // Ce +1
    Logger logger = new Logger(); // Ce +1

    void placeOrder() {
        logger.toString();
        pg.toString();
        email.toString();
        inv.toString();
        System.out.println("Order");
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

    private final IPaymentGateway pg;
    private final IEmailService email;
    private final IInventoryService inv;
    private final ILogger logger;
    OrderService(IPaymentGateway pg, IEmailService email,
                 IInventoryService inv, ILogger logger) {
        this.pg = pg;
        this.email = email;
        this.inv = inv;
        this.logger = logger;
    }
    void placeOrder() {
        System.out.println("Order");
    }
}
    */

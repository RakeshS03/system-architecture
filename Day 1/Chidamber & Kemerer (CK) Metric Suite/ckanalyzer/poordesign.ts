// ======= POOR CK METRICS EXAMPLE =======

// HIGH WMC (Too many methods)
class OrderManager {
    items: any[] = [];
    taxRate = 0.18;
    db: any = new Database();
    logger: any = new Logger();
    discountService = new DiscountService();

    constructor() {}

    addItem(x: any) { this.items.push(x); }
    removeItem(i: number) { this.items.splice(i, 1); }
    printItems() { console.log(this.items); }
    calculateTotal() { return this.items.reduce((a, b) => a + b.price, 0); }
    applyDiscount(code: string) { return this.discountService.apply(code); }
    saveOrder() { this.db.save(this.items); }
    logOrder() { this.logger.log("Order Saved"); }
    sendEmail(email: string) { console.log("Email to " + email); }
    cancelOrder() { this.items = []; }
    restoreLast() { console.log("restore not implemented"); } // many unnecessary methods
}

// HIGH DIT (deep inheritance)
class A { a() {} }
class B extends A { b() {} }
class C extends B { c() {} }
class D extends C { d() {} }
class E extends D { e() {} }

// HIGH COUPLING (CBO)
class PaymentService {
    gateway = new Gateway();
    logger = new Logger();
    notifier = new EmailService();

    pay() {
        this.gateway.connect();
        this.logger.log("paid");
        this.notifier.send("Payment completed");
    }
}

// HIGH RFC (calls many methods)
class Dashboard {
    service = new PaymentService();
    db = new Database();
    logger = new Logger();

    refresh() {
        this.service.pay();
        this.db.load();
        this.logger.log("Refresh");
    }
}

// HIGH LCOM (unrelated fields)
class PoorLCOM {
    name = "";
    age = 0;
    salary = 0;

    m1() { console.log(this.name); }
    m2() { console.log(this.age); }
    m3() { console.log(this.salary); }
    m4() { console.log("no field used"); }
}

// Dummy classes
class Database { save(d: any) {} load() {} }
class Logger { log(m: string) {} }
class DiscountService { apply(c: string) {} }
class Gateway { connect() {} }
class EmailService { send(x: string) {} }

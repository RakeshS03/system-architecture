public class PaymentGateway {

    // Method: processPayment
    public boolean processPayment(double amount, String currency) {
        System.out.println("Processing " + amount + " " + currency);
        return true;
    }
}

public class OrderService {
    private PaymentGateway paymentGateway;

    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void checkout(double orderValue) {
        // CoN: Both agree on the name "processPayment"
        boolean success = paymentGateway.processPayment(orderValue, "IND");
        if (success) {
            System.out.println("success");
        }
    }
}


public class User {
    private String id;
    private String email;

    public User(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}



public class UserRepository {
    private Map<String, User> users = new HashMap<>();

    // CoT: Agrees on type User for parameter
    public void saveUser(User user) {
        users.put(user.getId(), user);
    }

    // CoT: Agrees on return type User
    public User findUserById(String id) {
        return users.get(id);
    }
}


// PaymentGateway.java
public class PaymentGateway {
    // CoM: Both classes agree that "IND" means Rupees
    public boolean processPayment(double amount, String currency) {
        if (!currency.equals("IND")) {
            System.out.println("Unsupported" + currency);
            return false;
        }
        System.out.println("Processing " + amount + " " + currency);
        return true;
    }
}

// OrderService.java
public class OrderService {
    private PaymentGateway paymentGateway;

    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void checkout(double orderValue) {
        // CoM: Must use the same meaning of "IND"
        boolean success = paymentGateway.processPayment(orderValue, "IND");
        if (success) {
            System.out.println("success");
        }
    }
}

// PaymentGateway.java
public class PaymentGateway {
    // CoP: The order of parameters matters (amount first, currency second)
    public boolean processPayment(double amount, String currency) {
        System.out.println("Processing " + amount + " " + currency);
        return true;
    }
}

// OrderService.java
public class OrderService {
    private PaymentGateway paymentGateway;

    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void checkout(double orderValue) {
        // CoP: Must pass amount first, then currency
        boolean success = paymentGateway.processPayment(orderValue, "IND");
        if (success) {
            System.out.println("success");
        }
    }
}

public class DiscountCalculator {

    // CoA: This algorithm must match the one in OrderService
    public double calculateDiscount(double orderValue) {
        if (orderValue > 100) {
            return orderValue * 0.10; 
        }
        return 0;
    }
}

public class OrderService {
    private DiscountCalculator discountCalculator;

    public OrderService(DiscountCalculator discountCalculator) {
        this.discountCalculator = discountCalculator;
    }
    public void checkout(double orderValue) {
        // CoA: OrderService must use the same algorithm as DiscountCalculator
        double discount = discountCalculator.calculateDiscount(orderValue);
        double finalAmount = orderValue - discount;

        System.out.println("Original amount" + orderValue);
        System.out.println("Discount:" + discount);
        System.out.println("Final amount:" + finalAmount);
    }
}

// DiscountService.java
public class DiscountService {
    public double calculateDiscount(double orderValue) {
        // CoV: Threshold value 100 is agreed upon
        if (orderValue > 100) {
            return orderValue * 0.10;
        }
        return 0;
    }
}

// OrderService.java
public class OrderService {
    private DiscountService discountService;

    public OrderService(DiscountService discountService) {
        this.discountService = discountService;
    }

    public void checkout(double orderValue) {
        // CoV: Must use the same threshold value as DiscountService
        double discount = discountService.calculateDiscount(orderValue);
        System.out.println("Discount applied:" + discount);
    }
}



// PaymentService.java
public class PaymentService {
    public boolean processPayment(double amount) {
        System.out.println("Processing payment: $" + amount);
        return true;
    }
}

// EmailService.java
public class EmailService {
    public void sendConfirmation(String email) {
        System.out.println("email sent to" + email);
    }
}

// OrderService.java
public class OrderService {
    private PaymentService paymentService;
    private EmailService emailService;

    public OrderService(PaymentService paymentService, EmailService emailService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
    }

    public void checkout(double amount, String email) {
        // CoTim: Payment must be processed before sending email
        if (paymentService.processPayment(amount)) {
            emailService.sendConfirmation(email);
        }
    }
}




// TransactionService.java
public class TransactionService {
    public void performTransaction(String user, double amount) {
        System.out.println("transaction for " + user + " " + amount);
        // CoE: Logging must happen during execution of transaction
        Logger.logTransaction(user, amount);
    }
}

// Logger.java
public class Logger {
    public static void logTransaction(String user, double amount) {
        System.out.println("Logging transaction" + user " " + amount);
    }
}

public class Connasance {
    public static void main(String[] args) {
        TransactionService transactionService = new TransactionService();
        transactionService.performTransaction("user123", 250.0);
    }
}
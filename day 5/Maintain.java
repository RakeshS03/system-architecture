//bad example

class A {
    public static void main(String[] args) {
        int x = 1;
        int y = 2;

        if (x == 1) {
            System.out.println("Paid using Cash");
        } else if (x == 2) {
            System.out.println("Paid using Card");
        } else if (x == 3) {
            System.out.println("Paid using UPI");
        }
    }
}

//good example
enum PaymentMode {
    CASH, CARD, UPI
}

class PaymentService {

    public void processPayment(PaymentMode mode) {
        switch (mode) {
            case CASH:
                System.out.println("Paid using Cash");
                break;
            case CARD:
                System.out.println("Paid using Card");
                break;
            case UPI:
                System.out.println("Paid using UPI");
                break;
        }
    }
}

class Maintain{
    public static void main(String[] args) {
        PaymentService service = new PaymentService();
        service.processPayment(PaymentMode.UPI);
    }
}

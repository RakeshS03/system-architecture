class Discount {

    
    static void verboseDiscount() {
        // Operators: if, >, =, +, -, *, ;
        // Operands: price, discount, finalPrice, 100
        double price = 1500.0;

        double discount;
        if (price > 1000) {
            discount = price * 0.10;
        } else {
            discount = price * 0.05;
        }

        double finalPrice = price - discount;
        System.out.println(finalPrice);
    }

    
    static void conciseDiscount() {
        // Few operators & operands Lower Halstead Volume
        double finalPrice = 1500.0 - (1500.0 > 1000 ? 1500.0 * 0.10 : 1500.0 * 0.05);
        System.out.println(finalPrice);
    }

    public static void main(String[] args) {
        verboseDiscount();
        conciseDiscount();
    }
}

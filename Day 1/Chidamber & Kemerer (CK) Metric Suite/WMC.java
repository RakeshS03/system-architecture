
class OrderManager {
    public void handleOrder() {

        if (true) {
            if (true) {
                if (true) {
                    System.out.println("order success");
                }
            }
        }
    }
}


class CleanOrderManager {

    public void handleOrder() {

       
        if (!verifyCustomer()) return;
        if (!checkStock()) return;
        processShipping();
    }

    private boolean verifyCustomer() {
        return true;    // CC = 1
    }

    private boolean checkStock() {
        return true;    // CC = 1
    }

    private void processShipping() {
        System.out.println("shipping");// CC = 1
        
    }

    
}

public class WMC {
    public static void main(String[] args) {
        new OrderManager().handleOrder();
        new CleanOrderManager().handleOrder();
    }
}

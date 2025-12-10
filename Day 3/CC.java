class Validator {

    //Deep Nesting means high cyclometric complexity
    // cyclomatic Complexity = 4
    public void checkNested(int age, boolean hasID) {
        if (age > 0) {
            if (age >= 18) {
                if (hasID) {
                    System.out.println("Access Granted");
                }
            }
        }
    }

    //flat - low cyclometric complexity
    // CC is still 4, but readability is much better.
    public void checkFlat(int age, boolean hasID) {
        if (age <= 0) return;
        if (age < 18) return;
        if (!hasID) return;

        System.out.println("Access Granted");
    }
}

public class CC {
    public static void main(String[] args) {
        Validator v = new Validator();
        v.checkNested(20, true);
        v.checkFlat(20, true);
    }
}

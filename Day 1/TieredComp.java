public class TieredComp {

    public static void main(String[] args) {
        // Warm-up calls executed by C1 compiler
        for (int i = 0; i < 5000; i++) {
            foo();
        }

        System.out.println("Warm-up done");

        long start = System.currentTimeMillis();

        // Hot code region -> optimized by C2
        for (int i = 0; i < 30000000; i++) {
            foo();
        }

        long end = System.currentTimeMillis();
        System.out.println("Finished in: " + (end - start) + " ms");
    }

    public static int foo() {
        return 10;
    }
}

public class pathsensitization {

    public static String checkValue(int x) {

        if (x > 5) {                                     // decision 1
            if (x < 3) {                                //decision 2(Impossible branch)
                return "Impossible branch";    //dead Logic
            }
            return "Valid:x>5";                      // Executable path A
        } else {
            return "Valid:x<=5";                     // Executable path B
        }
    }

    public static void main(String[] args) {

        int[] testValues = {2, 6};

        for (int v : testValues) {
            System.out.println("Input: " + v +"Output:" + checkValue(v));
        }
    }
}

class TaskManager {
    public void start() {
        System.out.println("Start Task");
        helper1();
        helper2();
        //_logger.log();      // external call
        //_db.save();         
        //_email.send();      
    }

    void helper1() { System.out.println("Helper 1 working"); }
    void helper2() { System.out.println("Helper 2 working"); }
}

//2 internal+1 external method call so RFC 3)
class CleanTaskManager {
    public void start() {
        System.out.println("Start Task");
        helper1();
        helper2();
       // _facade.handle();  
    }

    void helper1() { System.out.println("Helper 1 working"); }
    void helper2() { System.out.println("Helper 2 working"); }
}

class RFC {
    public static void main(String[] args) {
        new TaskManager().start();
        new CleanTaskManager().start();
    }
}
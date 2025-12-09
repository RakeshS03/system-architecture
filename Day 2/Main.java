/*class TaskRunner {
    // The subclass depends on executeStep called once.
    public void runTask() {
        System.out.println("Task Started");
        executeStep();    
        System.out.println("Task Finished");
    }

    public void executeStep() {
        System.out.println("Executing");
    }
}
// Subclass relies on the parent calling executeStep() once.
class LoggedTaskRunner extends TaskRunner {
    public int stepCount = 0;
    public void executeStep() {
        stepCount++;
        System.out.println("Logged" + stepCount);
        super.executeStep();
    }
}
public class Main {
    public static void main(String[] args) {
        LoggedTaskRunner runner = new LoggedTaskRunner();
        runner.runTask();

        System.out.println("Totalsteps" + runner.stepCount);
    }
}
*/

interface StepExecutor {
    void executeStep();
}
class DefaultStepExecutor implements StepExecutor {
    public void executeStep() {
        System.out.println("Executing");
    }
}

class CountingStepExecutor implements StepExecutor {
    private int stepCount = 0;
    public void executeStep() {
        stepCount++;
        System.out.println("Logged step " + stepCount);
    }
public int getStepCount() {
        return stepCount;
    }

class TaskRunner {
    private final StepExecutor executor;

    public TaskRunner(StepExecutor executor) {
        this.executor = executor;
    }

    public void runTask() {
        System.out.println("Task Started");
        executor.executeStep();
        System.out.println("Task Finished");
    }
}

public class Main {
    public static void main(String[] args) {
        CountingStepExecutor executor = new CountingStepExecutor();
        TaskRunner runner = new TaskRunner(executor);

        runner.runTask();
        System.out.println("Total" + executor.getStepCount());
    }
}
}

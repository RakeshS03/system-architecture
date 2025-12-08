
function log(msg: string){ 
    console.log("LOG:", msg); 
}
function save() { 
    console.log("Saved to DB"); 
}
function notify() { 
    console.log("User notified"); 
}
function audit() { 
    console.log("Audit completed"); 
}

class TaskManager {
    startTask() {
        log("Task started");
        save();
        notify();
    }

    finishTask() {
        log("Task finished");
        audit();
        save();
        notify();
    }
}

class TaskFacade {
    handleStart() {
        console.log("Start Task");
    }

    handleFinish() {
        console.log("Finish Task");
    }
}

class CleanTaskManager {
    private facade = new TaskFacade();

    startTask() {
        this.facade.handleStart();   
    }

    finishTask() {
        this.facade.handleFinish();  
    }
}
console.log("\nPOOR RFC");
const poor = new TaskManager();
poor.startTask();
poor.finishTask();

console.log("\nGOOD RFC");
const good = new CleanTaskManager();
good.startTask();
good.finishTask();

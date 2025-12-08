function log(msg) {
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
var TaskManager = /** @class */ (function () {
    function TaskManager() {
    }
    TaskManager.prototype.startTask = function () {
        log("Task started");
        save();
        notify();
    };
    TaskManager.prototype.finishTask = function () {
        log("Task finished");
        audit();
        save();
        notify();
    };
    return TaskManager;
}());
var TaskFacade = /** @class */ (function () {
    function TaskFacade() {
    }
    TaskFacade.prototype.handleStart = function () {
        console.log("Start Task");
    };
    TaskFacade.prototype.handleFinish = function () {
        console.log("Finish Task");
    };
    return TaskFacade;
}());
var CleanTaskManager = /** @class */ (function () {
    function CleanTaskManager() {
        this.facade = new TaskFacade();
    }
    CleanTaskManager.prototype.startTask = function () {
        this.facade.handleStart();
    };
    CleanTaskManager.prototype.finishTask = function () {
        this.facade.handleFinish();
    };
    return CleanTaskManager;
}());
console.log("\nPOOR RFC");
var poor = new TaskManager();
poor.startTask();
poor.finishTask();
console.log("\nGOOD RFC");
var good = new CleanTaskManager();
good.startTask();
good.finishTask();

var TaskManagerTS = /** @class */ (function () {
    function TaskManagerTS() {
    }
    TaskManagerTS.prototype.start = function () {
        console.log("Start Task");
        this.helper1();
        this.helper2();
        //logger.log();
        // db.save();
        //email.send();
    };
    TaskManagerTS.prototype.helper1 = function () { console.log("Helper 1 working"); };
    TaskManagerTS.prototype.helper2 = function () { console.log("Helper 2 working"); };
    return TaskManagerTS;
}());
// Low RFC
var CleanTaskManagerTS = /** @class */ (function () {
    function CleanTaskManagerTS() {
    }
    CleanTaskManagerTS.prototype.start = function () {
        console.log("Start Task");
        this.helper1();
        this.helper2();
        //facade.handle();
    };
    CleanTaskManagerTS.prototype.helper1 = function () {
        console.log("Helper 1 working");
    };
    CleanTaskManagerTS.prototype.helper2 = function () {
        console.log("Helper 2 working");
    };
    return CleanTaskManagerTS;
}());
new TaskManagerTS().start();
new CleanTaskManagerTS().start();

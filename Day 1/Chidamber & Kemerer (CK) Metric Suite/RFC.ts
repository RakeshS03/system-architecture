class TaskManagerTS {
    start() {
        console.log("Start Task");
        this.helper1();
        this.helper2();
        //logger.log();
       // db.save();
        //email.send();
    }

    helper1() { console.log("Helper 1 working"); }
    helper2() { console.log("Helper 2 working"); }
}

// Low RFC
class CleanTaskManagerTS {
    start() {
        console.log("Start Task");
        this.helper1();
        this.helper2();
        //facade.handle();
    }

    helper1() { 
        console.log("Helper 1 working"); 
    }
    helper2() { 
        console.log("Helper 2 working"); 
    }
}

new TaskManagerTS().start();
new CleanTaskManagerTS().start();
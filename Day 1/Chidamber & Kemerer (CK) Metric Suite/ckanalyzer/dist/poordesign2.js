"use strict";
class UserManager {
    constructor() {
        this.name = "";
        this.email = "";
        this.dbConfig = "Db=app;";
    }
    printName() {
        console.log("Name:", this.name);
    }
    printEmail() {
        console.log("Email:", this.email);
    }
    connect() {
        console.log("Connecting", this.dbConfig);
    }
    disconnect() {
        console.log("Disconnecting");
    }
    saveToDB() {
        this.connect();
        console.log("Saving", this.name, this.email);
        this.disconnect();
    }
    validate() {
        if (this.name === "" || this.email === "") {
            console.log("Invalid");
        }
        else {
            console.log("valid");
        }
    }
    logAction(action) {
        console.log("Logging", action);
    }
}
class AdminManager extends UserManager {
    constructor() {
        super(...arguments);
        this.adminLevel = 0;
    }
    promote(user) {
        console.log("Promoting user:", user.name);
        user.logAction("promoted");
    }
    demote(user) {
        console.log("Demoting user:", user.name);
        user.logAction("demoted");
    }
    audit(user) {
        console.log("Auditing user:", user.name);
        user.saveToDB();
    }
}
class SuperAdmin extends AdminManager {
    constructor() {
        super(...arguments);
        this.superPower = true;
    }
    audit(user) {
        console.log("Super auditing user:", user.name);
        user.saveToDB();
        this.logAction("super audited");
    }
    grantAllAccess(users) {
        users.forEach(u => {
            u.logAction("granted all access");
        });
    }
}

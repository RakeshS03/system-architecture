
class UserManager {
    name: string = "";
    email: string = "";
    dbConfig: string = "Db=app;";

    printName() {
        console.log("Name:",this.name);
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
        } else {
            console.log("valid");
        }
    }

    logAction(action: string) {
        console.log("Logging", action);
    }
}


class AdminManager extends UserManager {
    adminLevel: number = 0;

    promote(user: UserManager) {
        console.log("Promoting user:", user.name);
        user.logAction("promoted");
    }

    demote(user: UserManager) {
        console.log("Demoting user:", user.name);
        user.logAction("demoted");
    }

    audit(user: UserManager) {
        console.log("Auditing user:", user.name);
        user.saveToDB();
    }
}

class SuperAdmin extends AdminManager {
    superPower: boolean = true;

    override audit(user: UserManager) {
        console.log("Super auditing user:", user.name);
        user.saveToDB();
        this.logAction("super audited");
    }

    grantAllAccess(users: UserManager[]) {
        users.forEach(u => {
            u.logAction("granted all access");
        });
    }
}

"use strict";
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    printInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}
class UserRepository {
    save(user) {
        console.log(`Saving${user.name}`);
    }
    delete(user) {
        console.log(`Deleting ${user.name}`);
    }
}
class NotificationService {
    notify(user, message) {
        console.log(`Notifying ${user.name}: ${message}`);
    }
}
const user = new User("rakesh", "practice");
user.printInfo();
const repo = new UserRepository();
repo.save(user);
const notifier = new NotificationService();
notifier.notify(user, "Welcome");

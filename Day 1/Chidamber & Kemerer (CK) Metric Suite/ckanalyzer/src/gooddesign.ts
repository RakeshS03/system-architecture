
class User {
    constructor(public name: string, public email: string) {}

    printInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}


class UserRepository {
    save(user: User) {
        console.log(`Saving${user.name}`);
    }

    delete(user: User) {
        console.log(`Deleting ${user.name}`);
    }
}


class NotificationService {
    notify(user: User, message: string) {
        console.log(`Notifying ${user.name}: ${message}`);
    }
}

const user = new User("rakesh", "practice");
user.printInfo();

const repo = new UserRepository();
repo.save(user);

const notifier = new NotificationService();
notifier.notify(user, "Welcome");

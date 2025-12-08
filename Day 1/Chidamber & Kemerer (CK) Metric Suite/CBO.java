class NotificationService {
    public void sendWelcome() {
        EmailSender email = new EmailSender(); 
        SmsSender sms = new SmsSender();        

        email.send("Welcome User");
        sms.send("Hello");
    }
}


abstract class MessageSender {
    abstract void send(String message);
}

class CleanNotificationService {
    private final MessageSender primarySender;
    private final MessageSender backupSender;

    public CleanNotificationService(MessageSender primarySender, MessageSender backupSender) {
        this.primarySender = primarySender;
        this.backupSender = backupSender;
    }

    public void sendWelcome() {
        primarySender.send("Welcome User");
        backupSender.send("Backup");
    }
}

class EmailSender extends MessageSender {
    
    void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsSender extends MessageSender {
   
    void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class CBO {
    public static void main(String[] args) {
        new NotificationService().sendWelcome();

        new CleanNotificationService(
            new EmailSender(),
            new SmsSender()
        ).sendWelcome();
    }
}

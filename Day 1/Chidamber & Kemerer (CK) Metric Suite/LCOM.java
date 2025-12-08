
// Graph: [sendEmail]->[sendSms]
// LCOM4 = 2
class NotificationManager {
    String emailAddress = "rakesh@mail.com";
    String phoneNumber = "9080426805";

    void sendEmail() {
        System.out.println("Send Email:" + emailAddress);
    }
    void sendSms() {
        System.out.println("Send SMS: " + phoneNumber);
    }
}

//Seperated responsibility
class EmailSender {
    String emailAddress = "rakesh@mail.com";

    void sendEmail() {
        System.out.println("Send Email:" + emailAddress);
    }
}

class SmsSender {
    String phoneNumber = "9080426805";

    void sendSms() {
        System.out.println("Send SMS: " + phoneNumber);
    }
}

class LCOM {
    public static void main(String[] args) {
        // Poor usage: One class doing two unrelated tasks
        NotificationManager nm = new NotificationManager();
        nm.sendEmail();
        nm.sendSms();

        // Good usage: Separate classes = Low LCOM
        EmailSender es = new EmailSender();
        es.sendEmail();

        SmsSender ss = new SmsSender();
        ss.sendSms();
    }
}

class SmartHomeDevice {
    public void status() {
        System.out.println("Smart Home Device Status");
    }
}

// SmartHomeDevice has 3 subclasses so NOC = 3
class SmartLight extends SmartHomeDevice {
    public void status() {
        System.out.println("Smart Light: ON");
    }
}

class SmartSpeaker extends SmartHomeDevice {
    public void status() {
        System.out.println("Smart Speaker");
    }
}

class SmartThermostat extends SmartHomeDevice {
    public void status() {
        System.out.println("Smart Thermostat");
    }
}

// Interface does NOT increase NOC
interface Notifier {
    void send(String message);
}

// Concrete classes implement interface so NOC remains 0
class EmailNotifier implements Notifier {
    public void send(String message) {
        System.out.println("[Email] " + message);
    }
}

class SmsNotifier implements Notifier {
    public void send(String message) {
        System.out.println("[SMS] " + message);
    }
}
public class NOC {
    public static void main(String[] args) {

        System.out.println("HIGH NOC");
        SmartLight light = new SmartLight();
        SmartSpeaker speaker = new SmartSpeaker();
        SmartThermostat thermo = new SmartThermostat();

        light.status();
        speaker.status();
        thermo.status();


        System.out.println("\nLOW NOC");
        Notifier email = new EmailNotifier();
        Notifier sms = new SmsNotifier();

        email.send("System Update Available");
        sms.send("Temperature Alert!");
    }
}

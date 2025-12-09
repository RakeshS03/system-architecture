/*class MessageFormatter {
    format(message: string) {
        // Subclass depends on these two virtual calls.
        this.beforeFormat(message);
        console.log(`Message: ${message}`);
        this.afterFormat(message);
    }

    protected beforeFormat(message: string) {
        console.log("Preparing format");
    }

    protected afterFormat(message: string) {
        console.log("Formatting done.");
    }
}

class TimestampFormatter extends MessageFormatter {
    count = 0;

    protected override beforeFormat(message: string) {
        this.count++;
        console.log(`Timestamp #${this.count}: ${Date.now()}`);
        super.beforeFormat(message);
    }
}
const fm = new TimestampFormatter();
fm.format("Hello World");
console.log("Total timestamps:", fm.count);
*/


interface FormatterHooks {
    before(message: string): void;
    after(message: string): void;
}

class DefaultHooks implements FormatterHooks {
    before(message: string) {
        console.log("Preparing");
    }
    after(message: string) {
        console.log("Formatting done.");
    }
}

class TimestampHooks implements FormatterHooks {
    count = 0;
    before(message: string) {
        this.count++;
        console.log(`Timestamp #${this.count}: ${Date.now()}`);
    }

    after(message: string) {}
}

class MessageFormatter {
    constructor(private hooks: FormatterHooks) {}

    format(message: string) {
        this.hooks.before(message);
        console.log(`Message: ${message}`);
        this.hooks.after(message);
    }
}
const hooks = new TimestampHooks();
const fmt = new MessageFormatter(hooks);
fmt.format("Hello World");
console.log("Total timestamps:", hooks.count);

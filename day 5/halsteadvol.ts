// High Volume
function verboseValidate(): void {
    const email = "user@example.com";

    const hasAt = email.includes("@");
    const hasDot = email.includes(".");
    const longEnough = email.length > 5;

    if (hasAt && hasDot && longEnough) {
        console.log("Valid Email");
    }
}

//  Low Volume
function conciseValidate(): void {
    // Fewer tokens so lower Halstead Volume
    if ("rakesh@example.com".includes("@") &&
        "rakesh1@example.com".includes(".") &&
        "example@example.com".length > 5) {
        console.log("Valid Email");
    }
}

// Usage
verboseValidate();
conciseValidate();

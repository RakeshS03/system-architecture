class fileprocess {

    // POOR: Low MI
    checkBad(file: FileData | null): void {
        if (file) {
            if (file.size > 0) {
                if (file.size < 1048576) {
                    if (file.type === "PDF") {
                        console.log("Valid File");
                    }
                }
            }
        }
    }

    // GOOD: High MI
    checkGood(file: FileData | null): void {
        if (!file) return;
        if (file.size <= 0 || file.size >= 1048576) return;
        if (file.type === "PDF") {
            console.log("Valid File");
        }
    }
}

interface FileData {
    size: number;
    type: string;
}

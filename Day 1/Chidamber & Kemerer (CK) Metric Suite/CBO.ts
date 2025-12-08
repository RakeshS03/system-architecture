
class ReportService {
    generate(): void {
        const pdf = new PdfGenerator();       
        const excel = new ExcelGenerator();   

        pdf.generateReport("Annual Report");
        excel.generateReport("Annual Report");
    }
}


abstract class ReportGenerator {
    abstract generateReport(data: string): void;
}

class CleanReportService {
    constructor(
        private primaryGenerator: ReportGenerator,
        private backupGenerator: ReportGenerator
    ) {}

    generate(): void {
        this.primaryGenerator.generateReport("Annual Report");
        this.backupGenerator.generateReport("Backup Report");
    }
}


class PdfGenerator extends ReportGenerator {
    generateReport(data: string): void {
        console.log("PDF Report", data);
    }
}

class ExcelGenerator extends ReportGenerator {
    generateReport(data: string): void {
        console.log("Excel Report", data);
    }
}


new ReportService().generate();

new CleanReportService(new PdfGenerator(),new ExcelGenerator()).generate();

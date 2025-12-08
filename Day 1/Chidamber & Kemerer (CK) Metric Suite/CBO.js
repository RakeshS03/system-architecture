var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ReportService = /** @class */ (function () {
    function ReportService() {
    }
    ReportService.prototype.generate = function () {
        var pdf = new PdfGenerator();
        var excel = new ExcelGenerator();
        pdf.generateReport("Annual Report");
        excel.generateReport("Annual Report");
    };
    return ReportService;
}());
var ReportGenerator = /** @class */ (function () {
    function ReportGenerator() {
    }
    return ReportGenerator;
}());
var CleanReportService = /** @class */ (function () {
    function CleanReportService(primaryGenerator, backupGenerator) {
        this.primaryGenerator = primaryGenerator;
        this.backupGenerator = backupGenerator;
    }
    CleanReportService.prototype.generate = function () {
        this.primaryGenerator.generateReport("Annual Report");
        this.backupGenerator.generateReport("Backup Report");
    };
    return CleanReportService;
}());
var PdfGenerator = /** @class */ (function (_super) {
    __extends(PdfGenerator, _super);
    function PdfGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PdfGenerator.prototype.generateReport = function (data) {
        console.log("PDF Report", data);
    };
    return PdfGenerator;
}(ReportGenerator));
var ExcelGenerator = /** @class */ (function (_super) {
    __extends(ExcelGenerator, _super);
    function ExcelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExcelGenerator.prototype.generateReport = function (data) {
        console.log("Excel Report", data);
    };
    return ExcelGenerator;
}(ReportGenerator));
new ReportService().generate();
new CleanReportService(new PdfGenerator(), new ExcelGenerator()).generate();

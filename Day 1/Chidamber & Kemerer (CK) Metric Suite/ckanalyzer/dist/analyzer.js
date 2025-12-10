"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// -------------------- INPUT --------------------
if (process.argv.length < 3) {
    console.error("Usage: node dist/analyzer.js <path-to-file-or-folder>");
    process.exit(1);
}
const targetPath = process.argv[2];
// -------------------- PROJECT SETUP --------------------
const project = new ts_morph_1.Project({
    compilerOptions: { target: 3, module: 1 }, // ES2017 + CommonJS
    skipAddingFilesFromTsConfig: true
});
// Add files depending on input type
if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.isFile())
        project.addSourceFileAtPath(targetPath);
    else if (stats.isDirectory()) {
        project.addSourceFilesAtPaths(path.join(targetPath, "**/*.ts"));
        project.addSourceFilesAtPaths(path.join(targetPath, "**/*.tsx"));
    }
}
else {
    console.error("Path does not exist:", targetPath);
    process.exit(1);
}
const sourceFiles = project.getSourceFiles();
// -------------------- CK METRICS -------------------- //
// WMC: Weighted Methods per Class
function calculateWMC(methods) {
    const tokens = ["if(", "for(", "while(", "case ", "catch(", "&&", "||", "?:"];
    let wmc = 0;
    for (const m of methods) {
        let score = 1;
        const text = m.getText();
        for (const t of tokens) {
            let idx = text.indexOf(t);
            while (idx !== -1) {
                score++;
                idx = text.indexOf(t, idx + t.length);
            }
        }
        wmc += score;
    }
    return wmc;
}
// DIT: Depth of Inheritance Tree
function calculateDIT(cls) {
    var _a, _b;
    let depth = 0;
    let current = cls;
    while (current.getExtends()) {
        depth++;
        const base = (_b = (_a = current.getExtends()) === null || _a === void 0 ? void 0 : _a.getExpression().getType().getSymbol()) === null || _b === void 0 ? void 0 : _b.getDeclarations()[0];
        if (base && ts_morph_1.ClassDeclaration.isClassDeclaration(base))
            current = base;
        else
            break;
    }
    return depth;
}
// NOC: Number of Children
function calculateNOC(cls, allClasses) {
    const name = cls.getName();
    if (!name)
        return 0;
    return allClasses.filter(c => { var _a; return ((_a = c.getExtends()) === null || _a === void 0 ? void 0 : _a.getExpression().getText()) === name; }).length;
}
// CBO: Coupling Between Objects
function calculateCBO(cls) {
    const identifiers = cls.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier).map(id => id.getText());
    const unique = new Set();
    identifiers.forEach(i => {
        if (i[0] >= "A" && i[0] <= "Z")
            unique.add(i);
    });
    return unique.size;
}
// RFC: Response For a Class
function calculateRFC(cls, methods) {
    const ownMethods = new Set(methods.map(m => m.getName()).filter(Boolean));
    const calledMethods = new Set();
    for (const m of methods) {
        const calls = m.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
        calls.forEach(c => {
            const call = c;
            const expr = call.getExpression();
            const text = expr.getText();
            if (!ownMethods.has(text))
                calledMethods.add(text);
        });
    }
    return ownMethods.size + calledMethods.size;
}
// LCOM: Lack of Cohesion in Methods
function calculateLCOM(cls, methods) {
    if (methods.length <= 1)
        return 0;
    const fieldSets = methods.map(m => {
        const used = new Set();
        const pas = m.getDescendantsOfKind(ts_morph_1.SyntaxKind.PropertyAccessExpression);
        pas.forEach(pa => {
            if (pa.getExpression().getText() === "this")
                used.add(pa.getName());
        });
        return used;
    });
    let P = 0, Q = 0;
    for (let i = 0; i < methods.length; i++) {
        for (let j = i + 1; j < methods.length; j++) {
            const intersect = Array.from(fieldSets[i]).filter(x => fieldSets[j].has(x));
            if (intersect.length === 0)
                P++;
            else
                Q++;
        }
    }
    return Math.max(0, P - Q);
}
// -------------------- MAIN -------------------- //
const allClasses = sourceFiles.flatMap((sf) => sf.getClasses());
const results = allClasses.map((cls) => {
    const methods = cls.getMethods().filter((m) => !m.isStatic());
    return {
        className: cls.getName() || "<anonymous>",
        WMC: calculateWMC(methods),
        DIT: calculateDIT(cls),
        NOC: calculateNOC(cls, allClasses),
        CBO: calculateCBO(cls),
        RFC: calculateRFC(cls, methods),
        LCOM: calculateLCOM(cls, methods)
    };
});
// Print JSON results
console.log(JSON.stringify(results, null, 2));

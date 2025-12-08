"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var path = require("path");
if (process.argv.length < 3) {
    console.error("Usage: ts-node analyzer.ts <path-to-project>");
    process.exit(1);
}
var targetPath = process.argv[2];
var project = new ts_morph_1.Project({
    tsConfigFilePath: undefined,
    skipAddingFilesFromTsConfig: true,
});
project.addSourceFilesAtPaths(path.join(targetPath, "**/*.ts"));
project.addSourceFilesAtPaths(path.join(targetPath, "**/*.tsx"));
var sourceFiles = project.getSourceFiles();
// Weighted Methods per Class
function calculateWMC(methods) {
    var tokens = ["if(", "for(", "while(", "case ", "catch(", "&&", "||", "?:"];
    var wmc = 0;
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var m = methods_1[_i];
        var score = 1;
        var text = m.getText();
        for (var _a = 0, tokens_1 = tokens; _a < tokens_1.length; _a++) {
            var t = tokens_1[_a];
            var idx = text.indexOf(t);
            while (idx !== -1) {
                score++;
                idx = text.indexOf(t, idx + t.length);
            }
        }
        wmc += score;
    }
    return wmc;
}
// Depth of Inheritance Tree
function calculateDIT(cls) {
    var _a, _b;
    var depth = 0;
    var current = cls;
    while (current.getExtends()) {
        depth++;
        var base = (_b = (_a = current.getExtends()) === null || _a === void 0 ? void 0 : _a.getExpression().getType().getSymbol()) === null || _b === void 0 ? void 0 : _b.getDeclarations()[0];
        if (base && ts_morph_1.ClassDeclaration.isClassDeclaration(base)) {
            current = base;
        }
        else
            break;
    }
    return depth;
}
// Number of Children
function calculateNOC(cls, allClasses) {
    var name = cls.getName();
    if (!name)
        return 0;
    return allClasses.filter(function (c) { var _a; return ((_a = c.getExtends()) === null || _a === void 0 ? void 0 : _a.getExpression().getText()) === name; }).length;
}
// Coupling Between Objects
function calculateCBO(cls) {
    var identifiers = cls.getDescendantsOfKind(ts_morph_1.SyntaxKind.Identifier).map(function (id) { return id.getText(); });
    var unique = new Set();
    identifiers.forEach(function (i) {
        if (i[0] >= "A" && i[0] <= "Z")
            unique.add(i);
    });
    return unique.size;
}
// Response For a Class
function calculateRFC(cls, methods) {
    var ownMethods = new Set(methods.map(function (m) { return m.getName(); }).filter(Boolean));
    var calledMethods = new Set();
    for (var _i = 0, methods_2 = methods; _i < methods_2.length; _i++) {
        var m = methods_2[_i];
        var calls = m.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
        for (var _a = 0, calls_1 = calls; _a < calls_1.length; _a++) {
            var c = calls_1[_a];
            var t = c.getExpression().getText();
            if (!ownMethods.has(t))
                calledMethods.add(t);
        }
    }
    return ownMethods.size + calledMethods.size;
}
// Lack of Cohesion in Methods
function calculateLCOM(cls, methods) {
    if (methods.length <= 1)
        return 0;
    var fieldSets = methods.map(function (m) {
        var used = new Set();
        var pas = m.getDescendantsOfKind(ts_morph_1.SyntaxKind.PropertyAccessExpression);
        pas.forEach(function (pa) {
            if (pa.getExpression().getText() === "this")
                used.add(pa.getName());
        });
        return used;
    });
    var P = 0, Q = 0;
    for (var i = 0; i < methods.length; i++) {
        var _loop_1 = function (j) {
            var intersect = __spreadArray([], fieldSets[i], true).filter(function (x) { return fieldSets[j].has(x); });
            if (intersect.length === 0)
                P++;
            else
                Q++;
        };
        for (var j = i + 1; j < methods.length; j++) {
            _loop_1(j);
        }
    }
    return Math.max(0, P - Q);
}
// Main
var allClasses = sourceFiles.flatMap(function (sf) { return sf.getClasses(); });
var results = allClasses.map(function (cls) {
    var methods = cls.getMethods().filter(function (m) { return !m.isStatic(); });
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
// Output results as simple JSON
console.log(JSON.stringify(results, null, 2));

import { Project, ClassDeclaration, MethodDeclaration, SyntaxKind, CallExpression } from "ts-morph";
import * as path from "path";
import * as fs from "fs";

// -------------------- INPUT --------------------
if (process.argv.length < 3) {
  console.error("Usage: node dist/analyzer.js <path-to-file-or-folder>");
  process.exit(1);
}

const targetPath = process.argv[2];

// -------------------- PROJECT SETUP --------------------
const project = new Project({
  compilerOptions: { target: 3, module: 1 }, // ES2017 + CommonJS
  skipAddingFilesFromTsConfig: true
});

// Add files depending on input type
if (fs.existsSync(targetPath)) {
  const stats = fs.statSync(targetPath);
  if (stats.isFile()) project.addSourceFileAtPath(targetPath);
  else if (stats.isDirectory()) {
    project.addSourceFilesAtPaths(path.join(targetPath, "**/*.ts"));
    project.addSourceFilesAtPaths(path.join(targetPath, "**/*.tsx"));
  }
} else {
  console.error("Path does not exist:", targetPath);
  process.exit(1);
}

const sourceFiles = project.getSourceFiles();

type CKMetrics = {
  className: string;
  WMC: number;
  DIT: number;
  NOC: number;
  CBO: number;
  RFC: number;
  LCOM: number;
};

// -------------------- CK METRICS -------------------- //

// WMC: Weighted Methods per Class
function calculateWMC(methods: MethodDeclaration[]): number {
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
function calculateDIT(cls: ClassDeclaration): number {
  let depth = 0;
  let current = cls;
  while (current.getExtends()) {
    depth++;
    const base = current.getExtends()?.getExpression().getType().getSymbol()?.getDeclarations()[0];
    if (base && ClassDeclaration.isClassDeclaration(base)) current = base as ClassDeclaration;
    else break;
  }
  return depth;
}

// NOC: Number of Children
function calculateNOC(cls: ClassDeclaration, allClasses: ClassDeclaration[]): number {
  const name = cls.getName();
  if (!name) return 0;
  return allClasses.filter(c => c.getExtends()?.getExpression().getText() === name).length;
}

// CBO: Coupling Between Objects
function calculateCBO(cls: ClassDeclaration): number {
  const identifiers = cls.getDescendantsOfKind(SyntaxKind.Identifier).map(id => id.getText());
  const unique = new Set<string>();
  identifiers.forEach(i => {
    if (i[0] >= "A" && i[0] <= "Z") unique.add(i);
  });
  return unique.size;
}

// RFC: Response For a Class
function calculateRFC(cls: ClassDeclaration, methods: MethodDeclaration[]): number {
  const ownMethods = new Set(methods.map(m => m.getName()).filter(Boolean));
  const calledMethods = new Set<string>();
  for (const m of methods) {
    const calls = m.getDescendantsOfKind(SyntaxKind.CallExpression);
    calls.forEach(c => {
      const call = c as CallExpression;
      const expr = call.getExpression();
      const text = expr.getText();
      if (!ownMethods.has(text)) calledMethods.add(text);
    });
  }
  return ownMethods.size + calledMethods.size;
}

// LCOM: Lack of Cohesion in Methods
function calculateLCOM(cls: ClassDeclaration, methods: MethodDeclaration[]): number {
  if (methods.length <= 1) return 0;
  const fieldSets = methods.map(m => {
    const used = new Set<string>();
    const pas = m.getDescendantsOfKind(SyntaxKind.PropertyAccessExpression);
    pas.forEach(pa => {
      if (pa.getExpression().getText() === "this") used.add(pa.getName());
    });
    return used;
  });

  let P = 0, Q = 0;
  for (let i = 0; i < methods.length; i++) {
    for (let j = i + 1; j < methods.length; j++) {
      const intersect = Array.from(fieldSets[i]).filter(x => fieldSets[j].has(x));
      if (intersect.length === 0) P++;
      else Q++;
    }
  }
  return Math.max(0, P - Q);
}

// -------------------- MAIN -------------------- //
const allClasses: ClassDeclaration[] = sourceFiles.flatMap((sf: any) => sf.getClasses());

const results: CKMetrics[] = allClasses.map((cls: ClassDeclaration) => {
  const methods: MethodDeclaration[] = cls.getMethods().filter((m: MethodDeclaration) => !m.isStatic());
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

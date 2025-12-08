import madge from "madge";
import path from "path";
import fs from "fs";

async function main() {
    console.log("Dependency Grapher with Madge\n");

    
    const samplePath = path.join(__dirname, "sample");
    console.log(fs.readdirSync(samplePath));

    const result = await madge(samplePath, {
        baseDir: samplePath,
        fileExtensions: ["ts"],includeNpm: false,detectiveOptions: {
            es6: { mixedImports: true }}});

    
    console.log("DEPENDENCY GRAPH");
    

    const graph = result.obj();
    console.log(graph);

    
    console.log("CIRCULAR DEPENDENCIES");
    

    const circular = result.circular();
    if (circular.length === 0) {
        console.log("No circular dependencies");
    } else {
        console.log(circular);
    }

    // OUTPUT FILE
    await result.image("dependency-graph.png").catch(() => {
        console.log("\nGraphviz not installed");
    });
}

main();

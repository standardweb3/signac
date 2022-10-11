"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProjectGraph = void 0;
const devkit_1 = require("@nrwl/devkit");
const cp = require("child_process");
const util = require("util");
const chalk = require("chalk");
function processProjectGraph(graph, ctx) {
    let metadata = cp.execSync("cargo metadata --format-version=1", {
        encoding: "utf8",
    });
    let { packages, workspace_members } = JSON.parse(metadata);
    let builder = new devkit_1.ProjectGraphBuilder(graph);
    workspace_members
        .map(id => packages.find(pkg => pkg.id === id))
        .filter(pkg => Object.keys(ctx.fileMap).includes(pkg.name))
        .forEach(pkg => {
        pkg.dependencies.forEach(dep => {
            let depName = dep.source == null ? dep.name : `cargo:${dep.name}`;
            if (!Object.keys(graph.nodes).includes(depName)) {
                let depPkg = packages.find(pkg => pkg.source.startsWith(dep.source));
                if (!depPkg) {
                    console.log(`${chalk.yellowBright.bold.inverse(" WARN ")} Failed to find package for dependency:`);
                    console.log(util.inspect(dep));
                    return;
                }
                builder.addNode({
                    name: depName,
                    type: "cargo",
                    data: {
                        version: depPkg.version,
                        packageName: depPkg.name,
                        files: [],
                    },
                });
            }
            builder.addImplicitDependency(pkg.name, depName);
        });
    });
    return builder.getUpdatedProjectGraph();
}
exports.processProjectGraph = processProjectGraph;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCargo = exports.runCargoContract = exports.parseCargoArgs = exports.updateWorkspaceMembers = exports.normalizeGeneratorOptions = exports.cargoNames = void 0;
const nrwl = require("@nrwl/devkit");
const chalk = require("chalk");
const cp = require("child_process");
function cargoNames(name) {
    let result = nrwl.names(name);
    result.snakeName = result.constantName.toLowerCase();
    return result;
}
exports.cargoNames = cargoNames;
function normalizeGeneratorOptions(projectType, host, opts) {
    var _a, _b, _c;
    let layout = nrwl.getWorkspaceLayout(host);
    let names = cargoNames(opts.name);
    // let fileName = names.fileName;
    let moduleName = names.snakeName;
    // Only convert project/file name casing if it's invalid
    let projectName = /^[-_a-zA-Z0-9]+$/.test(opts.name)
        ? opts.name
        : names.snakeName;
    let fileName = /^[-_a-zA-Z0-9]+$/.test(opts.name)
        ? opts.name
        : names.fileName;
    let rootDir = {
        application: layout.appsDir,
        library: layout.libsDir,
        contract: "contracts",
        package: layout.libsDir
    }[projectType];
    let projectDirectory = opts.directory
        ? `${nrwl.names(opts.directory).fileName}/${fileName}`
        : fileName;
    let projectRoot = `${rootDir}/${projectDirectory}`;
    let parsedTags = (_b = (_a = opts.tags) === null || _a === void 0 ? void 0 : _a.split(",").map(s => s.trim())) !== null && _b !== void 0 ? _b : [];
    let edition = (_c = opts.edition) !== null && _c !== void 0 ? _c : 2021;
    return Object.assign(Object.assign({}, opts), { projectName,
        moduleName,
        projectRoot,
        projectDirectory,
        parsedTags,
        edition });
}
exports.normalizeGeneratorOptions = normalizeGeneratorOptions;
function updateWorkspaceMembers(host, opts) {
    let updated = host
        .read("Cargo.toml")
        .toString()
        .split("\n")
        .reduce((accum, line) => {
        let trimmed = line.trim();
        let match;
        if ((match = trimmed.match(/^members\s*=\s*\[(.*)\]$/))) {
            let members = match[1]
                .split(",")
                .map(m => m.trim())
                .filter(Boolean);
            members.push(`"${opts.projectRoot}"`);
            accum.push(`members = [`, ...members.map(m => "    " + m), `]`);
        }
        else if ((match = trimmed.match(/^members\s*=\s*\[$/))) {
            accum.push(line, `    "${opts.projectRoot}",`);
        }
        else {
            accum.push(line);
        }
        return accum;
    }, [])
        .join("\n");
    host.write("Cargo.toml", updated);
}
exports.updateWorkspaceMembers = updateWorkspaceMembers;
function parseCargoArgs(opts, ctx) {
    let args = [];
    if (opts.toolchain) {
        args.push(`+${opts.toolchain}`);
    }
    // since nxink is using cargo-contract as default, inlcude contract here
    args.push("contract");
    // prettier-ignore
    switch (ctx.targetName) {
        case "build":
            args.push("build");
            break;
        case "ci":
            args.push("check");
            break;
        case "test":
            args.push("test");
            break;
        default: {
            if (ctx.targetName == null) {
                throw new Error("Expected target name to be non-null");
            }
            else {
                throw new Error(`Target '${ctx.targetName}' is invalid or not yet implemented`);
            }
        }
    }
    if (!ctx.projectName) {
        throw new Error("Expected project name to be non-null");
    }
    if (ctx.targetName === "build" &&
        ctx.workspace.projects[ctx.projectName].projectType === "application") {
        args.push("--bin");
    }
    // args.push(ctx.projectName);
    if (opts.features) {
        if (opts.features === "all") {
            args.push("--all-features");
        }
        else {
            args.push("--features", opts.features);
        }
    }
    if (opts.verbose)
        args.push("--verbose");
    if (opts.offline)
        args.push("--offline");
    if (opts.release)
        args.push("--release");
    if (opts['output-json'])
        args.push("--output-json");
    if (opts.quiet)
        args.push("--quiet");
    if (opts['skip-linting'])
        args.push("--skip-linting");
    if (opts.generate)
        args.push("--generate", opts.generate);
    return args;
}
exports.parseCargoArgs = parseCargoArgs;
function runCargoContract(args, ctx) {
    console.log(chalk.dim(`> cargo ${args.join(" ")}`));
    return new Promise((resolve, reject) => {
        cp.spawn("cargo", args, {
            cwd: `./contracts/${ctx.projectName}`,
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
exports.runCargoContract = runCargoContract;
function runCargo(args, ctx) {
    console.log(chalk.dim(`> cargo ${args.join(" ")}`));
    return new Promise((resolve, reject) => {
        cp.spawn("cargo", args, {
            cwd: ctx.root,
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
exports.runCargo = runCargo;
//# sourceMappingURL=index.js.map
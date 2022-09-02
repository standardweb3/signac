"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCargo = exports.parseCargoArgs = exports.updateWorkspaceMembers = exports.normalizeGeneratorOptions = exports.cargoNames = void 0;
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
        case "test":
            args.push("test");
            break;
        case "upload":
            args.push("upload");
            break;
        case "subquery": {
            args.pop();
            args.push("subquery");
            break;
        }
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
    else {
        args.push("-p");
    }
    args.push(ctx.projectName);
    if (opts.features) {
        if (opts.features === "all") {
            args.push("--all-features");
        }
        else {
            args.push("--features", opts.features);
        }
    }
    if (opts.noDefaultFeatures)
        args.push("--no-default-features");
    if (opts.target)
        args.push("--target", opts.target);
    if (opts.release)
        args.push("--release");
    if (opts.targetDir)
        args.push("--target-dir", opts.targetDir);
    if (opts.outDir) {
        if (args[0] !== "+nightly") {
            if (args[0].startsWith("+")) {
                let label = chalk.bold.yellowBright.inverse(" WARNING ");
                let original = args[0].replace(/^\+/, "");
                let message = `'outDir' option can only be used with 'nightly' toolchain, ` +
                    `but toolchain '${original}' was already specified. ` +
                    `Overriding '${original}' => 'nightly'.`;
                console.log(`${label} ${message}`);
                args[0] = "+nightly";
            }
            else {
                args.unshift("+nightly");
            }
        }
        args.push("-Z", "unstable-options", "--out-dir", opts.outDir);
    }
    if (opts.verbose)
        args.push("-v");
    if (opts.veryVerbose)
        args.push("-vv");
    if (opts.quiet)
        args.push("-q");
    if (opts.messageFormat)
        args.push("--message-format", opts.messageFormat);
    if (opts.locked)
        args.push("--locked");
    if (opts.frozen)
        args.push("--frozen");
    if (opts.offline)
        args.push("--offline");
    return args;
}
exports.parseCargoArgs = parseCargoArgs;
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
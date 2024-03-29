"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = void 0;
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const common_1 = require("@signac/common");
const error_1 = tslib_1.__importDefault(require("@signac/error"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const runCommand = async (contract, options) => {
    let contracts = getContracts("./contracts");
    let args = [];
    if (options.features) {
        if (options.features === "all") {
            args.push("--all-features");
        }
        else {
            args.push("--features", options.features);
        }
    }
    if (options.verbose)
        args.push("--verbose");
    if (options.offline)
        args.push("--offline");
    if (options.release)
        args.push("--release");
    if (options.outputJson)
        args.push("--output-json");
    if (options.quiet)
        args.push("--quiet");
    if (options.skipLinting)
        args.push("--skip-linting");
    if (options.generate)
        args.push("--generate", options.generate);
    if (contract === undefined) {
        inquirer_1.default
            .prompt([
            {
                type: "list",
                name: "intent",
                message: "📦 Which contract cargo are you compiling with?",
                choices: contracts,
            },
        ])
            .then(async (answer) => {
            await buildContract(answer.intent, args);
        });
    }
    else if (contracts.includes(contract)) {
        await buildContract(contract, args);
    }
    else {
        common_1.suggestCommand(contract, contracts);
    }
};
function buildContract(contract, options) {
    let cwd = common_1.getRootDir();
    return new Promise((resolve, reject) => {
        cp.spawn(`nx build ${contract}`, options, {
            cwd,
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", () => {
            resolve();
        });
    });
}
exports.default = runCommand;
function getContracts(dir) {
    try {
        return fs_1.default.readdirSync(dir, { withFileTypes: false });
    }
    catch (err) {
        throw new error_1.default(chalk_1.default.red(`Contract directory is not detected at current working directory. \n`), -2);
    }
}
exports.getContracts = getContracts;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContracts = void 0;
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const common_1 = require("@signac/common");
const error_1 = tslib_1.__importDefault(require("@signac/error"));
const runCommand = async (project) => {
    let contracts = getContracts("./contracts");
    if (project === undefined) {
        inquirer_1.default
            .prompt([
            {
                type: "list",
                name: "choose-contract-cargo",
                message: "📦 What contract cargo are you compiling with?",
                choices: contracts,
            },
        ])
            .then(async (answers) => {
            await buildContract(contracts[answers]);
        });
    }
    else if (contracts.includes(project)) {
        await buildContract(project);
    }
    else {
        common_1.suggestCommand(project, contracts);
    }
};
function buildContract(project) {
    return new Promise((resolve, reject) => {
        cp.spawn(`nx build ${project}`, {
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
exports.default = runCommand;
function getContracts(dir) {
    try {
        return fs_1.default.readdirSync(dir, { withFileTypes: false });
    }
    catch (err) {
        throw new error_1.default(`Contract directory is not detected. \n ${err}`, 404);
    }
}
exports.getContracts = getContracts;
//# sourceMappingURL=index.js.map
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
const runCommand = async (project) => {
    let contracts = getContracts("./contracts");
    if (project === undefined) {
        inquirer_1.default
            .prompt([
            {
                type: "list",
                name: "intent",
                message: "📦 Which contract cargo are you testing with?",
                choices: contracts,
            },
        ])
            .then(async (answer) => {
            await testContract(answer.intent);
        });
    }
    else if (contracts.includes(project)) {
        await testContract(project);
    }
    else {
        common_1.suggestCommand(project, contracts);
    }
};
function testContract(project) {
    return new Promise((resolve, reject) => {
        cp.spawn(`nx test ${project}`, {
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
        throw new error_1.default(chalk_1.default.red(`Contract directory is not detected at current working directory. \n`), -2);
    }
}
exports.getContracts = getContracts;
//# sourceMappingURL=index.js.map
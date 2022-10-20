"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootDir = exports.suggestCommand = exports.getContracts = exports.runNx = void 0;
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const similiarity = tslib_1.__importStar(require("string-similarity"));
const kleur_1 = require("kleur");
const find_up_1 = tslib_1.__importDefault(require("find-up"));
const error_1 = tslib_1.__importDefault(require("@signac/error"));
function runNx(args, ctx) {
    console.log(chalk_1.default.dim(`> nx ${args.join(" ")}`));
    return new Promise((resolve, reject) => {
        cp.spawn("nx", args, {
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`process failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
exports.runNx = runNx;
function getContracts(dir) {
    return fs_1.default.readdirSync(dir, { withFileTypes: false });
}
exports.getContracts = getContracts;
const suggestCommand = (cmd, cmds) => {
    let matches = similiarity.findBestMatch(cmd, cmds);
    console.log(kleur_1.yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`));
};
exports.suggestCommand = suggestCommand;
const getRootDir = () => {
    const path = find_up_1.default.sync("signac.config.js");
    if (path) {
        console.log(path);
        return path.replace("signac.config.js", "");
    }
    else {
        throw new error_1.default("This task should be run inside Signac workspace", 404);
    }
};
exports.getRootDir = getRootDir;
//# sourceMappingURL=index.js.map
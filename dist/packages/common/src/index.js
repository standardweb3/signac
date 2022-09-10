"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestCommand = exports.getContracts = exports.runNx = void 0;
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const similiarity = tslib_1.__importStar(require("string-similarity"));
const kleur_1 = require("kleur");
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
//# sourceMappingURL=index.js.map
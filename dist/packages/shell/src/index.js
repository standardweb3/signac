"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNx = void 0;
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
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
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const runCommand = async (project) => {
    await addContract(project);
};
function addContract(project) {
    return new Promise((resolve, reject) => {
        cp.spawn(`nx generate nxink:ink ${project}`, {
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
//# sourceMappingURL=index.js.map
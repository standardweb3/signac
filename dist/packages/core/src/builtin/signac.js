"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signac = void 0;
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const program = new commander_1.default.Command();
const logger_util_1 = require("../utils/logger.util");
const pjson = tslib_1.__importStar(require("../../package.json"));
exports.signac = program
    .version(pjson.version)
    .description("a nascent smart contract framework for unstoppable app developers")
    .name("signac")
    .usage("<command> [arguments]")
    .command("init [options]", "initializes Signac contract workspace", {
    executableFile: "./builtin/signac-init",
})
    .command("build [options]", "compiles a smart contract inside Signac workspace", {
    executableFile: "./builtin/signac-build",
})
    .command("test [options]", "tests a smart contract inside Signac workspace", {
    executableFile: "./builtin/signac-test",
})
    .command("add [arguments]", "add a smart contract inside Signac workspace", {
    executableFile: "./builtin/signac-add",
})
    .on("command:*", function (operands) {
    logger_util_1.showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program.commands.map((cmd) => cmd.name());
    logger_util_1.suggestCommand(operands[0], availableCommands.push("task"));
    process.exitCode = 1;
});
//# sourceMappingURL=signac.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signac = void 0;
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const program = new commander_1.default.Command();
const logger_util_1 = require("../utils/logger.util");
exports.signac = program
    .version("0.0.0")
    .description("Wasm smart contract framework")
    .name("signac")
    .usage("<command> [arguments]")
    .command("init [options]", "run signac oracle provider", {
    executableFile: "./commands/signac-init",
})
    .command("add [options]", "run signac liquidation hunter", {
    executableFile: "./commands/signac-new",
})
    .on("command:*", function (operands) {
    logger_util_1.showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program.commands.map((cmd) => cmd.name());
    logger_util_1.suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
});
//# sourceMappingURL=signac.js.map
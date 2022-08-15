"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lumen = void 0;
const commander = require("commander");
const program = new commander.Command();
const logger_util_1 = require("../utils/logger.util");
exports.lumen = program
    .version("0.0.4")
    .description("A chain agnostic oracle client")
    .name("lumen")
    .usage("<command> [arguments]")
    .command("run [options]", "run lumen oracle provider", {
    executableFile: "./commands/lumen-run",
})
    .command("hunt [options]", "run lumen liquidation hunter", {
    executableFile: "./commands/lumen-hunt",
})
    .on("command:*", function (operands) {
    logger_util_1.showError(`error: unknown command '${operands[0]}'`);
    const availableCommands = program.commands.map((cmd) => cmd.name());
    logger_util_1.suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
});

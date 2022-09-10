#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const logger_util_1 = require("../utils/logger.util");
const program = new commander_1.default.Command();
program
    .name("add")
    .description("adds new projects in the workspace")
    .usage("<command> [options]")
    .command("contract [options]", "add a smart contract inside Signac workspace", {
    executableFile: "./commands/add/signac-add-contract",
})["on"]("command:*", function (operands) {
    logger_util_1.showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program["commands"].map((cmd) => cmd.name());
    logger_util_1.suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
});
//# sourceMappingURL=signac-add.js.map
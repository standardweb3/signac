#!/usr/bin/env node
import commander from "commander";
import { showError, suggestCommand } from "../utils/logger.util";
const program = new commander.Command();

const mock = () => {}

program
  .name("add")
  .description("adds new projects in the workspace")
  .usage("<command> [options]")
  .command("contract [options]", "add a smart contract inside Signac workspace", {
    executableFile: "./add/signac-add-contract",
  })["on"]("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program["commands"].map((cmd: { name: () => any }) =>
      cmd.name(),
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });


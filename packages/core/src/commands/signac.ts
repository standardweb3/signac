import commander from "commander";
const program = new commander.Command();
import { showError, suggestCommand } from "../utils/logger.util";

import * as pjson from "../../package.json"

export const signac = program
  .version(pjson.version)
  .description(
    "a nascent Ink! smart contract framework for rust developers",
  )
  .name("signac")
  .usage("<command> [arguments]")
  .command("init [options]", "initializes Signac contract workspace", {
    executableFile: "./commands/signac-init",
  })
  .command("compile [options]", "compiles a smart contract inside Signac workspace", {
    executableFile: "./commands/signac-compile",
  })
  .command("test [options]", "tests a smart contract inside Signac workspace", {
    executableFile: "./commands/signac-test",
  })
  .command("add [options]", "add a smart contract inside Signac workspace", {
    executableFile: "./commands/signac-add",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name(),
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });

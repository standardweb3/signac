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
  // built-in commands
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
  // other commands
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name()
    );
    suggestCommand(operands[0], availableCommands.push("task"));
    process.exitCode = 1;
  });

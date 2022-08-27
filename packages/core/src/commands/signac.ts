import commander from "commander";
const program = new commander.Command();
import { showError, suggestCommand } from "../utils/logger.util";

export const signac = program
  .version("0.0.0")
  .description(
    "Wasm smart contract framework",
  )
  .name("signac")
  .usage("<command> [arguments]")
  .command("init [options]", "run lumen oracle provider", {
    executableFile: "./commands/signac-init",
  })
  .command("add [options]", "run lumen liquidation hunter", {
    executableFile: "./commands/signac-new",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    let availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name(),
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });

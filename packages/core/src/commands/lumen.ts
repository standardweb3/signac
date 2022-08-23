import commander from "commander";
const program = new commander.Command();
import { showError, suggestCommand } from "../utils/logger.util";

export const lumen = program
  .version("0.0.4")
  .description(
    "A chain agnostic oracle client",
  )
  .name("lumen")
  .usage("<command> [arguments]")
  .command("run [options]", "run lumen oracle provider", {
    executableFile: "./commands/lumen-run",
  })
  .command("hunt [options]", "run lumen liquidation hunter", {
    executableFile: "./commands/lumen-hunt",
  })
  .on("command:*", function(operands: string[]) {
    showError(`error: unknown command '${operands[0]}'`);
    const availableCommands = program.commands.map((cmd: { name: () => any }) =>
      cmd.name(),
    );
    suggestCommand(operands[0], availableCommands);
    process.exitCode = 1;
  });

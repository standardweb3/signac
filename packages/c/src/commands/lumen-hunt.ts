#!/usr/bin/env node
import runHunter from "@digitalnative/lumen-hunt";
const commander = require("commander");
const program = new commander.Command();

program
  .command("<dir> [options]")
  .name("hunt")
  .usage("[options]")
  .option("--factory", "Vault factory address to track liquidation")
  .description("run a liquidation hunter")
  .action(runHunter)
  .parse(process.argv);

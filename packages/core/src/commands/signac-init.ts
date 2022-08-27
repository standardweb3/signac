#!/usr/bin/env node
import runHunter from "@digitalnative/lumen-hunt";
import commander from "commander";
const program = new commander.Command();

program
  .command("<dir> [options]")
  .name("init")
  .usage("[options]")
  .description("Initialize workspace for ")
  .action(runHunter)
  .parse(process.argv);

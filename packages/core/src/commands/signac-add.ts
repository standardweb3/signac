#!/usr/bin/env node
import runClient from "@digitalnative/lumen-client";
import commander from "commander";
const program = new commander.Command();

program
  .command("<dir> [options]")
  .name("add")
  .usage("[options]")
  .option("-c", "--contract", "add a new contract in the workspace")
  .option("-i", "--indexer", "add a new indexer in the workspace")
  .option("-ui", "--user-interface", "add a new user interface in the contract workspace")
  .description("adds new components in the workspace")
  .action(runClient)
  .parse(process.argv);

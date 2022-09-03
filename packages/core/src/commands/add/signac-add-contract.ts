#!/usr/bin/env node
import runCommand from "@signac/add-contract";
import commander from "commander";
const program = new commander.Command();

program
  .command("<project> [options]")
  .name("contract")
  .usage("[options]")
  .description("Add a Ink! smart contract in the workspace")
  .action(runCommand)
  .parse(process.argv);

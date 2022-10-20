#!/usr/bin/env node
import runCommand from "@signac/init";
import commander from "commander";
const program = new commander.Command();

program
  .command("<project> [options]")
  .name("init")
  .usage("[options]")
  .description("Initialize Signac smart contract workspace")
  .action(runCommand)
  .parse(process.argv);

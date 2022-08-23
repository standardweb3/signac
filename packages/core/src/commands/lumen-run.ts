#!/usr/bin/env node
import runClient from "@digitalnative/lumen-client";
import commander from "commander";
const program = new commander.Command();

program
  .command("<dir> [options]")
  .name("run")
  .usage("[options]")
  .option("--mock", "run an oracle with mock data")
  .description("run a oracle client")
  .action(runClient)
  .parse(process.argv);

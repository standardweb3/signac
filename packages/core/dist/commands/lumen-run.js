#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lumen_client_1 = tslib_1.__importDefault(require("@digitalnative/lumen-client"));
const commander = require("commander");
const program = new commander.Command();
program
    .command("<dir> [options]")
    .name("run")
    .usage("[options]")
    .option("--mock", "run an oracle with mock data")
    .description("run a oracle client")
    .action(lumen_client_1.default)
    .parse(process.argv);

#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lumen_hunt_1 = tslib_1.__importDefault(require("@digitalnative/lumen-hunt"));
const commander = require("commander");
const program = new commander.Command();
program
    .command("<dir> [options]")
    .name("hunt")
    .usage("[options]")
    .option("--factory", "Vault factory address to track liquidation")
    .description("run a liquidation hunter")
    .action(lumen_hunt_1.default)
    .parse(process.argv);

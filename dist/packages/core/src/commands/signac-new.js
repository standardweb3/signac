#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const program = new commander_1.default.Command();
const mock = () => { };
program
    .command("<dir> [options]")
    .name("add")
    .usage("[options]")
    .option("-c", "--contract", "add a new contract in the workspace")
    .option("-i", "--indexer", "add a new indexer in the workspace")
    .option("-ui", "--user-interface", "add a new user interface in the contract workspace")
    .description("adds new components in the workspace")
    .action(mock)
    .parse(process.argv);
//# sourceMappingURL=signac-new.js.map
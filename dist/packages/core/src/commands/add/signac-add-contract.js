#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const add_contract_1 = tslib_1.__importDefault(require("@signac/add-contract"));
const commander_1 = tslib_1.__importDefault(require("commander"));
const program = new commander_1.default.Command();
program
    .command("<project> [options]")
    .name("contract")
    .usage("[options]")
    .description("Add a Ink! smart contract in the workspace")
    .action(add_contract_1.default)
    .parse(process.argv);
//# sourceMappingURL=signac-add-contract.js.map
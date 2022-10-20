#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const init_1 = tslib_1.__importDefault(require("@signac/init"));
const commander_1 = tslib_1.__importDefault(require("commander"));
const program = new commander_1.default.Command();
program
    .command("<project> [options]")
    .name("init")
    .usage("[options]")
    .description("Initialize Signac smart contract workspace")
    .action(init_1.default)
    .parse(process.argv);
//# sourceMappingURL=signac-init.js.map
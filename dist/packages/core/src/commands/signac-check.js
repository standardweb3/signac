#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const check_1 = tslib_1.__importDefault(require("@signac/check"));
const program = new commander_1.default.Command();
program
    .command("<contract> [options]")
    .name("build")
    .usage("[options]")
    .option("--verbose", "Use verbose output")
    .description("checks a contract code builds as a Wasm contract in the workspace")
    .action(check_1.default)
    .parse(process.argv);
//# sourceMappingURL=signac-check.js.map
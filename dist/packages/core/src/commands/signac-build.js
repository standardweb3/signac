#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const build_1 = tslib_1.__importDefault(require("@signac/build"));
const program = new commander_1.default.Command();
program
    .command("<contract> [options]")
    .name("build")
    .usage("[options]")
    .option("--features <features>", "Space or comma separated list of features to activate, or \"all\".")
    .option("--generate <artifacts>", "\nWhich build artifacts to generate. \n- `all`: Generate the Wasm, the metadata and a bundled `<name>.contract` file. \n\n- `code-only`: Only the Wasm is created, generation of metadata and a bundled\n`<name>.contract` file is skipped.\n\n- `check-only`: No artifacts produced: runs the `cargo check` command for the Wasm\ntarget, only checks for compilation errors.\n\n[default: all]\n[possible values: all, code-only, check-only]")
    .option("--release", "By default the contract is compiled with debug functionality included. \n This enables the contract to output debug messages, but increases the contract size and the amount of gas used", 'boolean option')
    .option("--keep-debug-symbols", "Do not remove symbols (Wasm name section) when optimizing.\n\nThis is useful if one wants to analyze or debug the optimized binary.", 'boolean option')
    .option("--offline", "Build offline", 'boolean option')
    .option("--output-json", "Export the build output in JSON format")
    .option("--verbose", "Use verbose output")
    .option("--skip-linting", "Skips linting checks during the build process")
    .description("compiles a contract in the workspace")
    .action(build_1.default)
    .parse(process.argv);
//# sourceMappingURL=signac-build.js.map
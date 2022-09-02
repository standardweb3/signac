#!/usr/bin/env node
//import runCommand from "@signac/new";
import commander from "commander";
const program = new commander.Command();

const mock = () => {
  
}

program
  .command("<contract> [options]")
  .name("compile")
  .usage("[options]")
  .option("--features", "Space or comma separated list of features to activate, or \"all\".")
  .option("--generate", "\nWhich build artifacts to generate. \n- `all`: Generate the Wasm, the metadata and a bundled `<name>.contract` file. \n\n- `code-only`: Only the Wasm is created, generation of metadata and a bundled\n`<name>.contract` file is skipped.\n\n- `check-only`: No artifacts produced: runs the `cargo check` command for the Wasm\ntarget, only checks for compilation errors.\n\n[default: all]\n[possible values: all, code-only, check-only]")
  .option("keep-debug-symbols", "Do not remove symbols (Wasm name section) when optimizing.\n\nThis is useful if one wants to analyze or debug the optimized binary.")
  .option("manifest-path", "Path to the `Cargo.toml` of the contract to build")
  .option("offline", "Build offline")
  .option("output-json", "Export the build output in JSON format")
  .option("verbose", "Use verbose output")
  .description("compiles a contract in the workspace")
  .action(mock)
  .parse(process.argv);

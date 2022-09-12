import * as cp from "child_process";
import inquirer from "inquirer";
import fs from "fs"; 
import {suggestCommand} from "@signac/common"
import SignacError from "@signac/error";
import chalk from "chalk";

const runCommand = async (contract: any, options: any) => {
	// get contract list
	let contracts = getContracts("./contracts");
	let args: string[] = []
	if (options.features) {
		if (options.features === "all") {
			args.push("--all-features");
		} else {
			args.push("--features", options.features);
		}
	}
	if (options.verbose) args.push("--verbose");
	if (options.offline) args.push("--offline");
	if (options.release) args.push("--release");
	if (options['output-json']) args.push("--output-json")
	if (options.quiet) args.push("--quiet")
	if (options['skip-linting']) args.push("--skip-linting")
	if (options.generate) args.push("--generate", options.generate)

	// check if contract is null
	if (contract === undefined) {
		// ask for contract
		inquirer
			.prompt([
				{
					type: "list",
					name: "intent",
					message: "📦 What contract cargo are you compiling with?",
					choices: contracts,
				},
			])
			.then(async (answer: any) => {
				await buildContract(answer.intent, args);
			});
	} // check input if it matches a contract
	else if (contracts.includes(contract)) {
		await buildContract(contract, args);
	} else {
		suggestCommand(contract, contracts);
	}
};

function buildContract(contract: any, options: any) {
	// TODO: Add multiple generators to choose with compiler
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`nx build ${contract}`, options,{
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", () => {
				resolve();
			});
	});
}

export default runCommand;

export function getContracts(dir: string) {
	// get listdir in the dir
	try {
		return fs.readdirSync(dir, { withFileTypes: false });
	} catch(err) {
		throw new SignacError(chalk.red(`Contract directory is not detected at current working directory. \n`), -2)
	}
}
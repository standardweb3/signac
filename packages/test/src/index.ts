import * as cp from "child_process";
import inquirer from "inquirer";
import fs from "fs"; 
import {suggestCommand} from "@signac/common"
import SignacError from "@signac/error";
import chalk from "chalk";

const runCommand = async (project: any) => {
	// get contract list
	let contracts = getContracts("./contracts");
	// check if project is null
	if (project === undefined) {
		// ask for project
		inquirer
			.prompt([
				{
					type: "list",
					name: "intent",
					message: "📦 Which contract cargo are you testing with?",
					choices: contracts,
				},
			])
			.then(async (answer: any) => {
				await testContract(answer.intent);
			});
	} // check input if it matches a contract
	else if (contracts.includes(project)) {
		await testContract(project);
	} else {
		suggestCommand(project, contracts);
	}
};

function testContract(project: any) {
	// TODO: Add multiple generators to choose with compiler
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`nx test ${project}`, {
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`Cargo failed with exit code ${code}`));
				else resolve();
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
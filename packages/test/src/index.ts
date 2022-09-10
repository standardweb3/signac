import * as cp from "child_process";
import inquirer from "inquirer";
import fs from "fs"; 
import {suggestCommand} from "@signac/common"
import SignacError from "@signac/error";

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
					name: "choose-contract-cargo",
					message: "📦 What contract cargo are you testing with?",
					choices: contracts,
				},
			])
			.then(async (answers: any) => {
				await testContract(contracts[answers]);
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
		throw new SignacError(`Contract directory is not detected. \n ${err}`, 404)
	}
}
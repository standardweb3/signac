import * as cp from "child_process";
import inquirer from "inquirer";
import fs from "fs"; 
import {suggestCommand} from "@signac/common"

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
					message: "📦 What contract cargo are you compiling with?",
					choices: contracts,
				},
			])
			.then(async (answers: any) => {
				await buildContract(contracts[answers]);
			});
	} // check input if it matches a contract
	else if (contracts.includes(project)) {
		await buildContract(project);
	} else {
		suggestCommand(project, contracts);
	}
};

function buildContract(project: any) {
	// TODO: Add multiple generators to choose with compiler
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`nx build ${project}`, {
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
	return fs.readdirSync(dir, { withFileTypes: false });
}
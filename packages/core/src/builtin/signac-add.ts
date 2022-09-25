#!/usr/bin/env node
//import runCommand from "@signac/new";
import commander from "commander";
import runCommand from "@signac/add-contract";
import inquirer from "inquirer";
const program = new commander.Command();

type Projects = {
    [key: string]: string
}
// project classfication array
const projects: Projects = {
	'contract': "Add a smart contract",
	"contract-ui": "Add a contract portal",
};

program
	.command("<project> [name] [options]")
	.name("add")
	.usage("[options]")
	.description("adds a component in the workspace")
	.action(async (project: string, name) => {
		if (Object.keys(projects).includes(project)) {
			await addProject(projects[project], name);
		} else {
			inquirer
				.prompt([
					{
						type: "list",
						name: "intent",
						message: "What do you want to add in your workspace?",
						choices: ["Add a smart contract", "Add a contract portal"],
					},
				])
				.then(async (answers: any) => {
					await addProject(answers.intent, name);
				});
		}
	})
	.parse(process.argv);

async function addProject(input: any, name: any) {
	switch (input) {
		case "Add a smart contract": {
			await runCommand(name);
			break;
		}
		case "Add a contract portal": {
			// TODO: add generator in nxink for contract-ui
			break;
		}
		default:
			break;
	}
}

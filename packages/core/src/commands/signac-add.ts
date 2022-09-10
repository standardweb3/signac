#!/usr/bin/env node
//import runCommand from "@signac/new";
import commander from "commander";
import runCommand from "@signac/add-contract";
import inquirer from "inquirer";
const program = new commander.Command();

// project classfication array
const projects = ["contract", "contract-ui"];

program
	.command("<project> [name] [options]")
	.name("add")
	.usage("[options]")
	.description("adds a component in the workspace")
	.action(async (project, name) => {
		if (projects.includes(project)) {
			await addProject(projects.indexOf(project), name);
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
		case 0: {
			await runCommand(name);
			break;
		}
		case 1: {
			break;
		}
	}
}

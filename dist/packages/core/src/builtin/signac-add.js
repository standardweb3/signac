#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
const add_contract_1 = tslib_1.__importDefault(require("@signac/add-contract"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const program = new commander_1.default.Command();
const projects = {
    'contract': "Add a smart contract",
    "contract-ui": "Add a contract portal",
};
program
    .command("<project> [name] [options]")
    .name("add")
    .usage("[options]")
    .description("adds a component in the workspace")
    .action(async (project, name) => {
    if (Object.keys(projects).includes(project)) {
        await addProject(projects[project], name);
    }
    else {
        inquirer_1.default
            .prompt([
            {
                type: "list",
                name: "intent",
                message: "What do you want to add in your workspace?",
                choices: ["Add a smart contract", "Add a contract portal"],
            },
        ])
            .then(async (answers) => {
            await addProject(answers.intent, name);
        });
    }
})
    .parse(process.argv);
async function addProject(input, name) {
    switch (input) {
        case "Add a smart contract": {
            await add_contract_1.default(name);
            break;
        }
        case "Add a contract portal": {
            break;
        }
        default:
            break;
    }
}
//# sourceMappingURL=signac-add.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const color = "#1890FF";
const runCommand = async (project) => {
    console.log(chalk_1.default.hex(color)(`
	███████╗██╗ ██████╗ ███╗   ██╗ █████╗  ██████╗
	██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗██╔════╝
	███████╗██║██║  ███╗██╔██╗ ██║███████║██║     
	╚════██║██║██║   ██║██║╚██╗██║██╔══██║██║     
	███████║██║╚██████╔╝██║ ╚████║██║  ██║╚██████╗
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝                                            
	`));
    console.log(chalk_1.default.cyan(`🖼  Welcome to Signac v0.0.0 🎨`));
    inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'intent',
            message: 'What do you want to do?',
            choices: ['Create a ink! project', 'Create an empty workspace', 'Quit'],
        },
    ])
        .then(async (answers) => {
        switch (answers.intent) {
            case 0: {
                await runNx(project);
                await addContract(project);
                break;
            }
            case 1: {
                await runNx(project);
                break;
            }
            case 2: {
                break;
            }
            default: {
                break;
            }
        }
    });
};
function runNx(project) {
    return new Promise((resolve, reject) => {
        cp.spawn(`npx create-nx-workspace ${project} --preset=nxink`, {
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
function addContract(project) {
    return new Promise((resolve, reject) => {
        cp.spawn("nx generate nxink:ink my-ink-contract", {
            cwd: `./${project}`,
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
exports.default = runCommand;
//# sourceMappingURL=index.js.map
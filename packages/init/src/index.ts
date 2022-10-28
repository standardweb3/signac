import * as cp from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";
import open from "open";

const color = "#1890FF";

const workspaceName = { workspaceName: "" };

// Setup each command as variable to prevent mismatch in parsing choices
const CREATE_WORKSPACE = "Create a workspace with an ink! contract";
const CREATE_EMPTY = "Create an empty workspace with signac.config.js";
const LAUNCH_CONTRACT_PORTAL =
	"Launch the contract portal to deploy smart contracts";
const QUIT = "Quit";

const runCommand = async (project: any) => {
	console.log(
		chalk.hex(color)(`
	███████╗██╗ ██████╗ ███╗   ██╗ █████╗  ██████╗
	██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗██╔════╝
	███████╗██║██║  ███╗██╔██╗ ██║███████║██║     
	╚════██║██║██║   ██║██║╚██╗██║██╔══██║██║     
	███████║██║╚██████╔╝██║ ╚████║██║  ██║╚██████╗
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝                                            
	`)
	);
	const version = await execute(
		`curl -s \"https://registry.npmjs.org/signac\" | \ python3 -c \"import sys, json; print(json.load(sys.stdin)['dist-tags']['latest'])\"`
	);
	console.log(
		chalk.cyan(`🖼  Welcome to Signac v${version.replace(/[\r\n]/gm, "")} 🎨`)
	);
	inquirer
		.prompt([
			{
				type: "list",
				name: "intent",
				message: "What do you want to do?",
				choices: [CREATE_WORKSPACE, CREATE_EMPTY, LAUNCH_CONTRACT_PORTAL, QUIT],
			},
		])
		.then(async (answers: any) => {
			switch (answers.intent) {
				case CREATE_WORKSPACE: {
					await askName(project);
					await runNx(workspaceName["workspaceName"]);
					await addContract(workspaceName["workspaceName"]);
					await removeDefaultDirs(workspaceName["workspaceName"]);
					break;
				}
				case CREATE_EMPTY: {
					await askName(project);
					await runNx(workspaceName["workspaceName"]);
					await removeDefaultDirs(workspaceName["workspaceName"]);
					break;
				}
				case LAUNCH_CONTRACT_PORTAL: {
					await open("https://contract.standard.tech");
					break;
				}
				case QUIT: {
					break;
				}
				default: {
					break;
				}
			}
		});
};

function askName(project: string | undefined) {
	return new Promise<void>(resolve => {
		if (project !== undefined) {
			workspaceName["workspaceName"] = project;
		}
		inquirer
			.prompt([
				{
					name: "workspaceName",
					message: "What name would you like to use for your workspace?",
				},
			])
			.then((answers: { workspaceName: string }) => {
				workspaceName["workspaceName"] = answers.workspaceName;
				resolve();
			});
	});
}

function runNx(project: string) {
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`npx create-nx-workspace ${project} --preset=nxink`, {
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

function addContract(project: string) {
	const result = project === undefined ? "" : project;
	return new Promise<void>((resolve, reject) => {
		cp.spawn("nx generate nxink:ink flipper", {
			cwd: `./${result}`,
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

function removeDefaultDirs(project: string) {
	return new Promise<void>((resolve, reject) => {
		cp.spawn("rm -rf libs && rm -rf apps", {
			cwd: `./${project}`,
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

const execute = async (command: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const exec = require("child_process").exec;
		exec(
			command,
			function (error: Error, stdout: string | Buffer, stderr: string | Buffer) {
				if (error) {
					reject(error);
					return;
				}
				if (stderr) {
					reject(stderr);
					return;
				} else {
					resolve(stdout);
				}
			}
		);
	});
};

export default runCommand;

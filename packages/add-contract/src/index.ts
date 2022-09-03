import * as cp from "child_process";
import chalk from "chalk";
import inquirer from "inquirer"

const color = "#1890FF"

const runCommand = async (project: string) => {
	await addContract(project)
};

function addContract(project: string) {
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`nx generate nxink:ink ${project}`, {
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

export default runCommand;


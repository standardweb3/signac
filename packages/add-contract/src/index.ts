import * as cp from "child_process";

const runCommand = async (project: string) => {
	await addContract(project)
};

function addContract(project: string) {
	// TODO: Add multiple generators to choose with inquirer
	return new Promise<void>((resolve, reject) => {
		cp.spawn(`nx generate nxink:ink ${project}`, {
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


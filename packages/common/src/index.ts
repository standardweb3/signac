import * as cp from "child_process";
import chalk from "chalk";
import fs from "fs";
import * as similiarity from "string-similarity";
import { yellow } from "kleur";
import findUp from "find-up";
import SignacError from "@signac/error";

export function runNx(args: string[], ctx: any) {
	console.log(chalk.dim(`> nx ${args.join(" ")}`));

	return new Promise<void>((resolve, reject) => {
		cp.spawn("nx", args, {
			shell: true,
			stdio: "inherit",
		})
			.on("error", reject)
			.on("close", code => {
				if (code) reject(new Error(`process failed with exit code ${code}`));
				else resolve();
			});
	});
}

export function getContracts(dir: string) {
	// get listdir in the dir
	return fs.readdirSync(dir, { withFileTypes: false });
}

export const suggestCommand = (cmd: string, cmds: any) => {
	let matches = similiarity.findBestMatch(cmd, cmds);
	console.log(yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`));
};

export const getRootDir = () => {
	const path = findUp.sync("signac.config.js");
	if (path) {
		console.log(path);
		return path.replace("signac.config.js", "");		
	} else {
		throw new SignacError(
			"This task should be run inside Signac workspace",
			404
		);
	}
};

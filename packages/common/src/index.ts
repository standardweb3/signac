import * as cp from "child_process";
import chalk from "chalk";
import fs from "fs"
import * as similiarity from "string-similarity";
import { red, green, cyan, yellow } from "kleur";

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
	return fs.readdirSync(dir, {withFileTypes: false})
}

export const suggestCommand = (cmd: string, cmds: any) => {
	let matches = similiarity.findBestMatch(cmd, cmds);
	console.log(
	  yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`),
	);
  };

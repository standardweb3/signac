import * as cp from "child_process";
import chalk from "chalk";
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


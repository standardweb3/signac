import { ExecutorContext } from "@nrwl/devkit";

import { parseCargoArgs, runCargoContract } from "../../common";
import CLIOptions from "./schema";

export default async function (opts: CLIOptions, ctx: ExecutorContext) {
	try {
		let args = parseCargoArgs(opts, ctx);
		await runCargoContract(args, ctx);

		return { success: true };
	} catch (err) {
		return {
			success: false,
			reason: err?.message,
		};
	}
}

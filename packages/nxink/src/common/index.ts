import * as nrwl from "@nrwl/devkit";
import { ExecutorContext, Tree } from "@nrwl/devkit";
import * as chalk from "chalk";
import * as cp from "child_process";

import {
	CompilationOptions,
	DisplayOptions,
	FeatureSelection,
	ManifestOptions,
	OutputOptions,
} from "./schema";

export interface GeneratorOptions {
	projectName: string;
	moduleName: string;
	projectRoot: string;
	projectDirectory: string;
	parsedTags: string[];
	edition: number;
}

// prettier-ignore
export type CargoOptions = Partial<
	& FeatureSelection
	& CompilationOptions
	& OutputOptions
	& DisplayOptions
	& ManifestOptions
> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

interface GeneratorCLIOptions {
	name: string;
	directory?: string;
	tags?: string;
	edition?: number;
}

interface Names {
	name: string;
	className: string;
	propertyName: string;
	constantName: string;
	fileName: string;
	snakeName: string;
}

export function cargoNames(name: string): Names {
	let result = nrwl.names(name) as Names;
	result.snakeName = result.constantName.toLowerCase();

	return result;
}

export function normalizeGeneratorOptions<T extends GeneratorCLIOptions>(
	projectType: "application" | "library" | "contract" | "package",
	host: Tree,
	opts: T
): T & GeneratorOptions {
	let layout = nrwl.getWorkspaceLayout(host);
	let names = cargoNames(opts.name);
	// let fileName = names.fileName;
	let moduleName = names.snakeName;

	// Only convert project/file name casing if it's invalid
	let projectName = /^[-_a-zA-Z0-9]+$/.test(opts.name)
		? opts.name
		: names.snakeName;

	let fileName = /^[-_a-zA-Z0-9]+$/.test(opts.name)
		? opts.name
		: names.fileName;

	let rootDir = {
		application: layout.appsDir,
		library: layout.libsDir,
		contract: "contracts",
		package: layout.libsDir
	}[projectType];

	let projectDirectory = opts.directory
		? `${nrwl.names(opts.directory).fileName}/${fileName}`
		: fileName;

	let projectRoot = `${rootDir}/${projectDirectory}`;
	let parsedTags = opts.tags?.split(",").map(s => s.trim()) ?? [];
	let edition = opts.edition ?? 2021;

	return {
		...opts,
		projectName,
		moduleName,
		projectRoot,
		projectDirectory,
		parsedTags,
		edition,
	};
}

export function updateWorkspaceMembers(host: Tree, opts: GeneratorOptions) {
	let updated = host
		.read("Cargo.toml")!
		.toString()
		.split("\n")
		.reduce((accum, line) => {
			let trimmed = line.trim();
			let match: RegExpMatchArray | null;

			if ((match = trimmed.match(/^members\s*=\s*\[(.*)\]$/))) {
				let members = match[1]
					.split(",")
					.map(m => m.trim())
					.filter(Boolean);

				members.push(`"${opts.projectRoot}"`);
				accum.push(`members = [`, ...members.map(m => "    " + m), `]`);
			} else if ((match = trimmed.match(/^members\s*=\s*\[$/))) {
				accum.push(line, `    "${opts.projectRoot}",`);
			} else {
				accum.push(line);
			}

			return accum;
		}, [] as string[])
		.join("\n");

	host.write("Cargo.toml", updated);
}

export function parseCargoArgs(opts: CargoOptions, ctx: ExecutorContext): string[] {
	let args = [] as string[];

	if (opts.toolchain) {
		args.push(`+${opts.toolchain}`);
	}
	// since nxink is using cargo-contract as default, inlcude contract here
	args.push("contract")

	// prettier-ignore
	switch (ctx.targetName) {
		case "build": args.push("build"); break;
		case "test":  args.push("test");  break;
		default: {
			if (ctx.targetName == null) {
				throw new Error("Expected target name to be non-null");
			} else {
				throw new Error(`Target '${ctx.targetName}' is invalid or not yet implemented`);
			}
		}
	}

	if (!ctx.projectName) {
		throw new Error("Expected project name to be non-null");
	}
	if (
		ctx.targetName === "build" &&
		ctx.workspace.projects[ctx.projectName].projectType === "application"
	) {
		args.push("--bin");
	} 

	// args.push(ctx.projectName);

	if (opts.features) {
		if (opts.features === "all") {
			args.push("--all-features");
		} else {
			args.push("--features", opts.features);
		}
	}
	if (opts.verbose) args.push("--verbose");
	if (opts.offline) args.push("--offline");
	if (opts.release) args.push("--release");
	if (opts['output-json']) args.push("--output-json")
	if (opts.quiet) args.push("--quiet")
	if (opts['skip-linting']) args.push("--skip-linting")
	if (opts.generate) args.push("--generate", opts.generate)

	return args;
}

export function runCargoContract(args: string[], ctx: ExecutorContext) {
	console.log(chalk.dim(`> cargo ${args.join(" ")}`));

	return new Promise<void>((resolve, reject) => {
		cp.spawn("cargo", args, {
			cwd: `./contracts/${ctx.projectName}`,
			shell: true,
			stdio: "inherit",
		})
			.on("error", err => {
				reject(new Error(err))
			})
			.on("close", code => {
				if (code) reject(new Error(`Cargo failed with exit code ${code}`));
				else resolve();
			});
	});
}

export function runCargo(args: string[], ctx: ExecutorContext) {
	console.log(chalk.dim(`> cargo ${args.join(" ")}`));

	return new Promise<void>((resolve, reject) => {
		cp.spawn("cargo", args, {
			cwd: ctx.root,
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
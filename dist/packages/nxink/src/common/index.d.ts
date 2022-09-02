import { ExecutorContext, Tree } from "@nrwl/devkit";
import { CompilationOptions, DisplayOptions, FeatureSelection, ManifestOptions, OutputOptions } from "./schema";
export interface GeneratorOptions {
    projectName: string;
    moduleName: string;
    projectRoot: string;
    projectDirectory: string;
    parsedTags: string[];
    edition: number;
}
export declare type CargoOptions = Partial<FeatureSelection & CompilationOptions & OutputOptions & DisplayOptions & ManifestOptions> & {
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
export declare function cargoNames(name: string): Names;
export declare function normalizeGeneratorOptions<T extends GeneratorCLIOptions>(projectType: "application" | "library" | "contract" | "package", host: Tree, opts: T): T & GeneratorOptions;
export declare function updateWorkspaceMembers(host: Tree, opts: GeneratorOptions): void;
export declare function parseCargoArgs(opts: CargoOptions, ctx: ExecutorContext): string[];
export declare function runCargo(args: string[], ctx: ExecutorContext): Promise<void>;
export {};

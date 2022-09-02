import { ExecutorContext } from "@nrwl/devkit";
import CLIOptions from "./schema";
export default function (opts: CLIOptions, ctx: ExecutorContext): Promise<{
    success: boolean;
    reason?: undefined;
} | {
    success: boolean;
    reason: any;
}>;

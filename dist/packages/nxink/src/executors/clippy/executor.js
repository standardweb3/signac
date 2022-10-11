"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("../../common");
function default_1(opts, ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let args = parseArgs(opts, ctx);
            yield common_1.runCargo(args, ctx);
            return { success: true };
        }
        catch (err) {
            return {
                success: false,
                reason: err === null || err === void 0 ? void 0 : err.message,
            };
        }
    });
}
exports.default = default_1;
function parseArgs(opts, ctx) {
    let args = ["clippy"];
    if (!ctx.projectName) {
        throw new Error("Expected project name to be non-null");
    }
    args.push("-p", ctx.projectName);
    args.push("--");
    if (opts.failOnWarnings || opts.failOnWarnings == null) {
        args.push("-D", "warnings");
    }
    if (opts.noDeps || opts.noDeps == null) {
        args.push("--no-deps");
    }
    if (opts.fix)
        args.push("--fix");
    return args;
}
//# sourceMappingURL=executor.js.map
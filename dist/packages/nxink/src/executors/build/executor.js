"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("../../common");
function default_1(opts, ctx) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let args = common_1.parseCargoArgs(opts, ctx);
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
//# sourceMappingURL=executor.js.map
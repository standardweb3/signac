"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const extendable_error_1 = tslib_1.__importDefault(require("extendable-error"));
class SignacError extends extendable_error_1.default {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = SignacError;
//# sourceMappingURL=index.js.map
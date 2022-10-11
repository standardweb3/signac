"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = tslib_1.__importDefault(require("commander"));
class SignacTask extends commander_1.default.Command {
    constructor() {
        super();
    }
    static default() {
        return new SignacTask();
    }
}
exports.default = SignacTask;
//# sourceMappingURL=task.js.map
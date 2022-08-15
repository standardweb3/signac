"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cross_fetch_1 = __importDefault(require("cross-fetch"));
exports.fetchJSON = function (path, options) {
    return cross_fetch_1.default(path, options)
        .then(function (res) {
        if (!res.ok) {
            throw res;
        }
        return res;
    })
        .then(function (res) { return res.json(); });
};
//# sourceMappingURL=fetch.js.map
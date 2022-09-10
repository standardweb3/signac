"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nrwl = require("@nrwl/devkit");
const path = require("path");
function default_1(host, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let options = normalizeOptions(host, opts);
        addFiles(host, options);
        addPlugin(host, options);
        yield nrwl.formatFiles(host);
    });
}
exports.default = default_1;
function normalizeOptions(_, options) {
    var _a;
    let toolchain = (_a = options.toolchain) !== null && _a !== void 0 ? _a : "nightly";
    return { toolchain };
}
function addFiles(host, options) {
    var _a, _b;
    let templateOptions = {
        toolchain: options.toolchain,
        template: "",
    };
    nrwl.generateFiles(host, path.join(__dirname, "files"), ".", templateOptions);
    let gitignore = (_b = (_a = host.read(".gitignore")) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
    gitignore += "/target";
    host.write(".gitignore", gitignore);
}
function addPlugin(host, _) {
    let config = nrwl.readWorkspaceConfiguration(host);
    let plugins = config.plugins
        ? config.plugins.concat("nxink")
        : ["nxink"];
    nrwl.updateWorkspaceConfiguration(host, Object.assign(Object.assign({}, config), { plugins }));
}
//# sourceMappingURL=generator.js.map
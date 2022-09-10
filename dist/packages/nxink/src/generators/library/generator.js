"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nrwl = require("@nrwl/devkit");
const path = require("path");
const common_1 = require("../../common");
const generator_1 = require("../init/generator");
function default_1(host, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let options = common_1.normalizeGeneratorOptions("library", host, opts);
        nrwl.addProjectConfiguration(host, options.projectName, {
            root: options.projectRoot,
            projectType: "library",
            sourceRoot: `${options.projectRoot}/src`,
            targets: {
                test: {
                    executor: "nxink:test",
                    options: {},
                },
                lint: {
                    executor: "nxink:clippy",
                    options: {
                        fix: false,
                        failOnWarnings: true,
                        noDeps: true,
                    },
                },
            },
            tags: options.parsedTags,
        });
        yield addFiles(host, options);
        common_1.updateWorkspaceMembers(host, options);
        yield nrwl.formatFiles(host);
    });
}
exports.default = default_1;
function addFiles(host, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!host.exists("Cargo.toml")) {
            yield generator_1.default(host, {});
        }
        let substitutions = {
            projectName: opts.projectName,
            moduleName: opts.moduleName,
            edition: opts.edition,
            template: "",
        };
        nrwl.generateFiles(host, path.join(__dirname, "files"), opts.projectRoot, substitutions);
    });
}
//# sourceMappingURL=generator.js.map
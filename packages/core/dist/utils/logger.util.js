"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestCommand = exports.showUpdate = exports.showCreate = exports.showGenerate = exports.showInfo = exports.showSuccess = exports.showError = exports.ConsoleMessage = void 0;
const tslib_1 = require("tslib");
const kleur_1 = require("kleur");
const similiarity = tslib_1.__importStar(require("string-similarity"));
var ConsoleMessage;
(function (ConsoleMessage) {
    ConsoleMessage["TITLE"] = "Lumen";
    ConsoleMessage["BANNER"] = "A chain agnostic oracle client";
    ConsoleMessage["ERROR"] = "ERROR: ";
    ConsoleMessage["SUCCESS"] = "SUCCESS: ";
    ConsoleMessage["INFO"] = "INFO: ";
    ConsoleMessage["GENERATE"] = "GENERATE: ";
    ConsoleMessage["CREATE"] = "CREATE: ";
    ConsoleMessage["UPDATE"] = "UPDATE: ";
    ConsoleMessage["START_GENERATING"] = "";
})(ConsoleMessage = exports.ConsoleMessage || (exports.ConsoleMessage = {}));
const newLine = "\n";
const showError = (message) => {
    console.error(kleur_1.red(ConsoleMessage.ERROR) + message);
};
exports.showError = showError;
const showSuccess = (message) => {
    console.log(kleur_1.green(ConsoleMessage.SUCCESS) + message + newLine);
};
exports.showSuccess = showSuccess;
const showInfo = (message) => {
    console.info(kleur_1.cyan(ConsoleMessage.INFO) + message + newLine);
};
exports.showInfo = showInfo;
const showGenerate = (fileName) => {
    console.log(kleur_1.cyan(ConsoleMessage.GENERATE) + `${fileName}...`);
};
exports.showGenerate = showGenerate;
const showCreate = (fileName, filePath) => {
    filePath
        ? console.log(kleur_1.green(ConsoleMessage.CREATE) + `${fileName} in ${filePath}`)
        : console.log(kleur_1.green(ConsoleMessage.CREATE) + `${fileName}`);
};
exports.showCreate = showCreate;
const showUpdate = (fileName, filePath) => {
    filePath
        ? console.log(kleur_1.green(ConsoleMessage.UPDATE) + `${fileName} in ${filePath}`)
        : console.log(kleur_1.green(ConsoleMessage.UPDATE) + `${fileName}`);
};
exports.showUpdate = showUpdate;
const suggestCommand = (cmd, cmds) => {
    const matches = similiarity.findBestMatch(cmd, cmds);
    console.log(kleur_1.yellow(`Invalid command. Did you mean ${matches.bestMatch.target}?`));
};
exports.suggestCommand = suggestCommand;

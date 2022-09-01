"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("source-map-support/register");
const events_1 = require("@signac/events");
const error_1 = tslib_1.__importDefault(require("@signac/error"));
const validate_js_1 = tslib_1.__importDefault(require("validate.js"));
const fs = require("fs");
var keyConstraints = {
    rust: {
        presence: false,
    },
    networks: {
        presence: {
            allowEmpty: false,
        },
    },
};
var networkConstraints = {
    url: {
        presence: {
            allowEmpty: false,
        },
        url: true,
    },
    typedef: {
        presence: false,
    },
    accounts: {
        presence: {
            allowEmpty: false,
        },
    },
};
const checkValid = (data, constraints) => {
    let result = validate_js_1.default(data, constraints);
    if (result !== undefined) {
        throw new Error(`Configuration Error: ${JSON.stringify(result, null, 2)}`);
    }
};
const validateConifg = (config) => {
    validate_js_1.default.validators.presence.options = { message: "can't be empty" };
    checkValid(config, keyConstraints);
    Object.keys(config["networks"]).every(k => {
        let network = config["networks"][k];
        checkValid(network, networkConstraints);
        Object.keys(network["accounts"]).every(a => {
            checkValid(a, {
                presence: true,
                format: {
                    pattern: "^[a-zA-Zs-]+$",
                    message: function (value) {
                        return validate_js_1.default.format("a mnemonic or private key ^%{key} must be only letters, spaces, or dashes", {
                            key: value,
                        });
                    },
                },
            });
        });
    });
};
class SignacConfig {
    constructor({ dir = "./signac-config.js" }) {
        const eventsOptions = this.eventManagerOptions(this);
        this["events"] = new events_1.EventManager(eventsOptions);
        if (fs.existsSync(dir)) {
            const config = require(dir);
            for (const [key, value] of Object.entries(config)) {
                this[key] = value;
            }
            validateConifg(this);
        }
        else {
            throw new error_1.default("signac-config.js does not exist in current working directory", 404);
        }
    }
    eventManagerOptions(config) {
        let muteLogging;
        const { quiet, logger, subscribers } = config;
        if (quiet)
            muteLogging = true;
        return { logger, muteLogging, subscribers };
    }
    static default(dir) {
        return new SignacConfig(dir);
    }
}
exports.default = SignacConfig;
//# sourceMappingURL=index.js.map
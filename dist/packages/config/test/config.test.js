"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config = require("./signac-config.js");
var validate = require("validate.js");
const { check } = require("prettier");
const index_1 = tslib_1.__importDefault(require("../src/index"));
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
    let result = validate(data, constraints);
    if (result !== undefined) {
        throw new Error(`Configuration Error: ${JSON.stringify(result, null, 2)}`);
    }
};
describe("validate configuratiion file", () => {
    test("tests a function with an error return", () => {
        let config = {
            rust: {
                compilers: [
                    {
                        version: "0.5.16",
                    },
                ],
            },
        };
        expect(checkValid(config, keyConstraints)).toThrow();
    });
    test("loads SignacConfig", () => {
        const a = new index_1.default({ dir: "./signac-config.js" });
    });
    test("rust should not be necessary for config", () => {
        validate.validators.presence.options = { message: "can't be empty" };
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
                            return validate.format("a mnemonic or private key ^%{key} must be only letters, spaces, or dashes", {
                                key: value,
                            });
                        },
                    },
                });
            });
        });
    });
});
//# sourceMappingURL=config.test.js.map
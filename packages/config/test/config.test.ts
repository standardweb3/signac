const config = require("./signac-config.js");
var validate = require("validate.js");
const { check } = require("prettier");
import SignacConfig from "../src/index"

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

const checkValid = (data: any, constraints: any) => {
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
		expect(checkValid(config, keyConstraints)).toThrow()
	});
    test("loads SignacConfig", () => {
        const a = new SignacConfig({dir: "./signac-config.js"});
    })
	test("rust should not be necessary for config", () => {
		validate.validators.presence.options = { message: "can't be empty" };
		// validate whether key exists
		checkValid(config, keyConstraints);
		// validate each network
		Object.keys(config["networks"]).every(k => {
			let network = config["networks"][k];
			// validate each network schema constraints
			checkValid(network, networkConstraints);
			// validate each network keys in accounts
			Object.keys(network["accounts"]).every(a => {
				checkValid(a, {
					presence: true,
					format: {
						// Must be numbers followed by a name
						pattern: "^[a-zA-Zs-]+$",
						message: function (value: any) {
							return validate.format(
								"a mnemonic or private key ^%{key} must be only letters, spaces, or dashes",
								{
									key: value,
								}
							);
						},
					},
				});
			});
		});
	});
});

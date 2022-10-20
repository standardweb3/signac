const config = require("./signac.config.js");
var validate = require("validate.js");
const { check } = require("prettier");
import SignacConfig from "../src/index";

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
	rpc: {
		presence: {
			allowEmpty: false,
		}, 
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

describe("validate configuration file", () => {
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
		expect(() => {
			checkValid(config, keyConstraints);
		}).toThrow();
	});
	test("loads SignacConfig", () => {
		const a = new SignacConfig({ dir: "./packages/config/test/signac.config.js" });
	});
	test("validate configuration file", () => {
		validate.validators.presence.options = { message: "can't be empty" };
		// validate whether key exists
		checkValid(config, keyConstraints);
		// validate each network
		Object.keys(config["networks"]).every(k => {
			let network = config["networks"][k];
			// validate each network schema constraints
			checkValid(network, networkConstraints);
			// validate each network keys in accounts
			Object.keys(network["accounts"]).every(i => {
				checkValid(
					{ account: network["accounts"][i] },
					{
						account: {
							presence: true,
							format: {
								// Must be numbers followed by a name
								pattern: /[a-z -0-9]+/,
								message: function (value: any) {
									return validate.format(
										": A mnemonic or a private key %{key} must be only letters, spaces, numbers, or dashes",
										{
											value,
										}
									);
								},
							},
						},
					}
				);
			});
		});
	});
});

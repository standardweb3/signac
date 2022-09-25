import "source-map-support/register";
import { EventManager } from "@signac/events";
import SignacError from "@signac/error";
import validate from "validate.js";
import findUp from "find-up";
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

const checkValid = (data: any, constraints: any) => {
	let result = validate(data, constraints);
	if (result !== undefined) {
		throw new SignacError(
			`Configuration Error: ${JSON.stringify(result, null, 2)}`,
			400
		);
	}
};

const validateConifg = (config: any) => {
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
};

class SignacConfig {
	[key: string]: any;

	constructor({ dir = "./signac-config.js" }) {
		const eventsOptions = this.eventManagerOptions(this);
		this["events"] = new EventManager(eventsOptions);

		if (fs.existsSync(dir)) {
			//file exists
			// load config file
			const config = require(dir);
			validateConifg(this)
			for (const [key, value] of Object.entries(config)) {
				this[key] = value;
			}
		} else {
			// Find the closest signac.config.js file
			const path = findUp.sync("signac.config.js");
			if (path) {
				const config = require(dir);
				validateConifg(this);
				for (const [key, value] of Object.entries(config)) {
					this[key] = value;
				}
			} else {
				throw new SignacError(
					"signac-config.js does not exist in your current working directory",
					404
				);
			}
		}
	}

	public eventManagerOptions(config: SignacConfig): any {
		let muteLogging;
		const { quiet, logger, subscribers } = config;

		if (quiet) muteLogging = true;
		return { logger, muteLogging, subscribers };
	}

	public static default(dir: any): SignacConfig {
		return new SignacConfig(dir);
	}
}

export default SignacConfig;

const config = require("./signac-config.js");
var validate = require("validate.js");


var keyConstraints = {
	rust: {
		presence: false,
	},
	networks: {
		presence: {
			allowEmpty: false
			}
	},
};

var networkConstraints = {
	url: {
		presence: {
			allowEmpty: false
			},
		url: true
	},
	typedef: {
		presence: false,
	},
	accounts: {
		presence: {
		allowEmpty: false
		}
	},
};

validateConfig = (config) => {
	validate.validators.presence.options = { message: "can't be empty" };
	if(validate(config, keyConstraints) !== undefined) {
		return Error("")
	}
}

check = (result) => {
	if (result !== undefined) {
		
	}
}

describe("validate configuratiion file", () => {
	test("rust should not be necessary for config", () => {
		validate.validators.presence.options = { message: "can't be empty" };
		// validate whether key exists
		validate(config, keyConstraints)
		// validate each network
		Object.keys(config["networks"]).every(k => {
			let network = config["networks"][k];
			// validate each network schema constraints
			validate(network, networkConstraints);
			// validate each network keys in accounts
			Object.keys(network["accounts"]).every(a => {
				validate.single(a, {
					presence: true,
					format: {
						// Must be numbers followed by a name
						pattern: "^[a-zA-Zs-]+$",
						message: function (value) {
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

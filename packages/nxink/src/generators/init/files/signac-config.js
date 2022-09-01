import 'dotenv/config'

module.exports = {
	rust: {
		compilers: [],
	},
	networks: {
		local: {
      // RPC url address
			url: "wss://localhost:9650",
      // Type definitions to import
			typedef: undefined,
			// List of private key seeds, Recommended: use dotenv to bring the keys. Never expose this in public
			accounts: [
				"0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
			],
		},
		mainnet: {
			url: "wss://localhost:9650",
			typedef: undefined,
			accounts: [],
		},
	},
};

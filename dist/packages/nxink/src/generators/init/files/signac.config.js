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
				"0x0000000000000000000000000000000000000000000000000000000000000000"
			],
		},
		mainnet: {
			url: "wss://localhost:9650",
			typedef: undefined,
			accounts: [],
		},
	},
};

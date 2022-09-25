import 'dotenv/config'

const TEST = "TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST"

module.exports = {
	rust: {
		compilers: [],
	},
	networks: {
		local: {
      // RPC url address
			url: "wss://localhost:9945",
      // Type definitions to import
			typedef: undefined,
			// List of private key seeds, Recommended: use dotenv to bring the keys. Never expose this in public
			accounts: [
				TEST
			],
		},
		mainnet: {
			url: "wss://localhost:9945",
			typedef: undefined,
			accounts: [],
		},
	},
};

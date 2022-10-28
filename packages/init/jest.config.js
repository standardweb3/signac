module.exports = {
	displayName: "init",
	preset: 'ts-jest',
    testEnvironmentOptions: {
		NODE_OPTIONS: '--experimental-vm-modules',
	},
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.spec.json",
		},
	},
	transform: {
		"^.+\\.[tj]s$": "ts-jest",
	},
	moduleFileExtensions: ["ts", "js", "html"],
};

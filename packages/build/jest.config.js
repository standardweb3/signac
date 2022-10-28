module.exports = {
	displayName: "build",
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

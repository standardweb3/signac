import "source-map-support/register";
import { EventManager } from "@digitalnative/lumen-events";
const prompt = require("prompt");
const fs = require("fs");

const properties = [
	{
		name: "nomics",
		validator: /^[a-zA-Z\s\-]+$/,
		warning: "API key must be only letters, spaces, or dashes",
	},
	{
		name: "finnhub",
		validator: /^[a-zA-Z\s\-]+$/,
		warning: "API key must be only letters, spaces, or dashes",
	},
];

class SignacConfig {
	[key: string]: any;

	constructor({ dir = "./signac-config.ts" }) {
		const eventsOptions = this.eventManagerOptions(this);
		this["events"] = new EventManager(eventsOptions);

		if (fs.existsSync(dir)) {
			//file exists
			// load config file
			const config = require(dir);
			for (const [key, value] of Object.entries(config)) {
				this[key] = value;
			}
		} else {
			throw new SignacError(
				"signac-config.ts does not exist in current working directory"
			);
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

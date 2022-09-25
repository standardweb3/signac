import commander from "commander";

export interface TaskDefinition extends ConfigurableTaskDefinition {
    readonly name: string;
    readonly description?: string;
    readonly action: ActionType<TaskArguments>;
}
  

class SignacTask {

    constructor(name: string, description: string) {
        let task = new commander.Command();

        return task;
    }
	

    public setParam() {}

    public setOptionalParam() {}

    public execute(){}

	public setAction(config: SignacConfig): any {
		let muteLogging;
		const { quiet, logger, subscribers } = config;

		if (quiet) muteLogging = true;
		return { logger, muteLogging, subscribers };
	}

	public static default(dir: any): SignacConfig {
		return new SignacConfig(dir);
	}
}

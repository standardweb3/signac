import commander from "commander";


export default class SignacTask extends commander.Command {
    constructor() {
        super();
    }
    public static default(): SignacTask {
        return new SignacTask();
    }
}

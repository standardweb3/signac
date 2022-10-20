import commander from "commander";
import {getRootDir} from "@signac/common"


export default class SignacTask extends commander.Command {
    constructor() {
        super();   
        getRootDir();
    }
    public static default(): SignacTask {
        return new SignacTask();
    }
}

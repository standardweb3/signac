#!/usr/bin/env node
import { signac } from "./builtin/signac";

if (process.argv.length == 2) {
    process.argv.push('init')
    signac.parse(process.argv)
} else if (process.argv.includes('task')) {
    try {
        let [task, subtask] = process.argv[3].split(":")
                // import task file 
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        let taskFile = require(`./tasks/${task}`)

        // parse task program within the file
        taskFile[subtask].parse([subtask, ...process.argv.slice(4)])
    } catch (e) {
        console.log("Command of the task should be `signac task <task-file>:<task-name> <task-args>`")
        process.exit(1)
    }
} else {
    signac.parse(process.argv);
}

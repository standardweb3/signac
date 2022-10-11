#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signac_1 = require("./builtin/signac");
if (process.argv.length == 2) {
    process.argv.push('init');
    signac_1.signac.parse(process.argv);
}
else if (process.argv.includes('task')) {
    try {
        let [task, subtask] = process.argv[3].split(":");
        let taskFile = require(`./tasks/${task}`);
        taskFile[subtask].parse([subtask, ...process.argv.slice(4)]);
    }
    catch (e) {
        console.log("Command of the task should be `signac task <task-file>:<task-name> <task-args>`");
        process.exit(1);
    }
}
else {
    signac_1.signac.parse(process.argv);
}
//# sourceMappingURL=index.js.map
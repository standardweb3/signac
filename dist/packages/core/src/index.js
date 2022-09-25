#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signac_1 = require("./commands/signac");
if (process.argv.length == 2) {
    process.argv.push('init');
    signac_1.signac.parse(process.argv);
}
else {
    signac_1.signac.parse(process.argv);
}
//# sourceMappingURL=index.js.map
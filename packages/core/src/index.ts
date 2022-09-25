#!/usr/bin/env node
import { signac } from "./commands/signac";

if (process.argv.length == 2) {
    process.argv.push('init')
    signac.parse(process.argv)
} else if (process.argv.includes('task')) {
    signac.parse(process.argv);
} else {
    signac.parse(process.argv);
}

#!/usr/bin/env node
import { signac } from "./commands/signac";

signac.parse(process.argv);

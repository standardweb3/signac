/// <reference types="node" />
declare const runCommand: (project: any) => Promise<void>;
export default runCommand;
export declare function getContracts(dir: string): string[] | Buffer[];

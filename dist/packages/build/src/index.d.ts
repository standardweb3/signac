/// <reference types="node" />
declare const runCommand: (contract: any, options: any) => Promise<void>;
export default runCommand;
export declare function getContracts(dir: string): string[] | Buffer[];

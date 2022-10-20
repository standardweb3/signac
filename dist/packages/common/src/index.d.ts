/// <reference types="node" />
export declare function runNx(args: string[], ctx: any): Promise<void>;
export declare function getContracts(dir: string): string[] | Buffer[];
export declare const suggestCommand: (cmd: string, cmds: any) => void;
export declare const getRootDir: () => string;

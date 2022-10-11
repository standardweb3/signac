export declare enum ConsoleMessage {
    TITLE = "Signac",
    BANNER = "A chain agnostic oracle client",
    ERROR = "ERROR: ",
    SUCCESS = "SUCCESS: ",
    INFO = "INFO: ",
    GENERATE = "GENERATE: ",
    CREATE = "CREATE: ",
    UPDATE = "UPDATE: ",
    START_GENERATING = ""
}
export declare const showError: (message: string | Error) => void;
export declare const showSuccess: (message: string) => void;
export declare const showInfo: (message: string) => void;
export declare const showGenerate: (fileName: string) => void;
export declare const showCreate: (fileName: string, filePath: string) => void;
export declare const showUpdate: (fileName: string, filePath: string) => void;
export declare const suggestCommand: (cmd: string, cmds: any) => void;

export interface IOptions {
    handlers: Object;
    initialization: Function;
}
export declare const validateOptions: (options: IOptions) => void;
export declare const createLookupTable: (handlerNames: Array<string>) => {};
export declare const sortHandlers: (handlers: any) => {
    nonGlobbedHandlers: {};
    globbedHandlers: {};
};

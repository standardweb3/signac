import Emittery from "emittery";
export default class Subscriber {
    emitter: Emittery;
    unsubscribeListeners: Object;
    logger: any;
    globbedHandlers: any;
    globbedHandlerLookupTable: any;
    constructor({ emitter, options, logger }: {
        emitter: any;
        options: any;
        logger: any;
    });
    handleEvent(eventName: any, data: any): Promise<any[]>;
    removeListener(name: any): void;
    setUpGlobbedListeners(handlers: any): void;
    setUpListeners(handlers: any): void;
    updateOptions(newOptions: any): void;
}

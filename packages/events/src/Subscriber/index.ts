import Emittery from "emittery";

const helpers = require("./helpers");
const { createLookupTable, sortHandlers, validateOptions } = helpers;

export default class Subscriber {
  emitter: Emittery;
  unsubscribeListeners: Object;
  logger: any;
  globbedHandlers: any;
  globbedHandlerLookupTable: any;

  constructor({ emitter, options, logger }) {
    validateOptions(options);
    const { initialization, handlers } = options;

    this.emitter = emitter;
    // Object for storing unsubscribe methods for non-globbed listeners
    this.unsubscribeListeners = {};

    if (logger) this.logger = logger;
    if (initialization) initialization.bind(this)();

    const { globbedHandlers, nonGlobbedHandlers } = sortHandlers(handlers);

    if (nonGlobbedHandlers) this.setUpListeners(nonGlobbedHandlers);

    if (globbedHandlers) {
      this.globbedHandlers = globbedHandlers;
      this.setUpGlobbedListeners(globbedHandlers);
    }
  }

  handleEvent(eventName, data) {
    let promises: any[] = [];
    for (let handlerName in this.globbedHandlerLookupTable) {
      if (this.globbedHandlerLookupTable[handlerName].test(eventName)) {
        this.globbedHandlers[handlerName].forEach((handler: any) => {
          promises.push(handler.bind(this)(data, eventName));
        });
      }
    }
    return Promise.all(promises);
  }

  removeListener(name) {
    if (this.unsubscribeListeners.hasOwnProperty(name)) {
      this.unsubscribeListeners[name]();
    }
    if (this.globbedHandlerLookupTable[name]) {
      delete this.globbedHandlerLookupTable[name];
    }
  }

  setUpGlobbedListeners(handlers) {
    const handlerNames = Object.keys(handlers);
    this.globbedHandlerLookupTable = createLookupTable(handlerNames);
    this.emitter.onAny(this.handleEvent.bind(this));
  }

  setUpListeners(handlers) {
    for (let handlerName in handlers) {
      handlers[handlerName].forEach((handler) => {
        this.unsubscribeListeners[handlerName] = this.emitter.on(
          handlerName,
          handler.bind(this)
        );
      });
    }
  }

  updateOptions(newOptions) {
    const { logger } = newOptions;
    if (logger) this.logger = logger;
  }
}

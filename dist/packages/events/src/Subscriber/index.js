"use strict";
exports.__esModule = true;
var helpers = require("./helpers");
var createLookupTable = helpers.createLookupTable, sortHandlers = helpers.sortHandlers, validateOptions = helpers.validateOptions;
var Subscriber = (function () {
    function Subscriber(_a) {
        var emitter = _a.emitter, options = _a.options, logger = _a.logger;
        validateOptions(options);
        var initialization = options.initialization, handlers = options.handlers;
        this.emitter = emitter;
        this.unsubscribeListeners = {};
        if (logger)
            this.logger = logger;
        if (initialization)
            initialization.bind(this)();
        var _b = sortHandlers(handlers), globbedHandlers = _b.globbedHandlers, nonGlobbedHandlers = _b.nonGlobbedHandlers;
        if (nonGlobbedHandlers)
            this.setUpListeners(nonGlobbedHandlers);
        if (globbedHandlers) {
            this.globbedHandlers = globbedHandlers;
            this.setUpGlobbedListeners(globbedHandlers);
        }
    }
    Subscriber.prototype.handleEvent = function (eventName, data) {
        var _this = this;
        var promises = [];
        for (var handlerName in this.globbedHandlerLookupTable) {
            if (this.globbedHandlerLookupTable[handlerName].test(eventName)) {
                this.globbedHandlers[handlerName].forEach(function (handler) {
                    promises.push(handler.bind(_this)(data, eventName));
                });
            }
        }
        return Promise.all(promises);
    };
    Subscriber.prototype.removeListener = function (name) {
        if (this.unsubscribeListeners.hasOwnProperty(name)) {
            this.unsubscribeListeners[name]();
        }
        if (this.globbedHandlerLookupTable[name]) {
            delete this.globbedHandlerLookupTable[name];
        }
    };
    Subscriber.prototype.setUpGlobbedListeners = function (handlers) {
        var handlerNames = Object.keys(handlers);
        this.globbedHandlerLookupTable = createLookupTable(handlerNames);
        this.emitter.onAny(this.handleEvent.bind(this));
    };
    Subscriber.prototype.setUpListeners = function (handlers) {
        var _this = this;
        var _loop_1 = function (handlerName) {
            handlers[handlerName].forEach(function (handler) {
                _this.unsubscribeListeners[handlerName] = _this.emitter.on(handlerName, handler.bind(_this));
            });
        };
        for (var handlerName in handlers) {
            _loop_1(handlerName);
        }
    };
    Subscriber.prototype.updateOptions = function (newOptions) {
        var logger = newOptions.logger;
        if (logger)
            this.logger = logger;
    };
    return Subscriber;
}());
exports["default"] = Subscriber;
//# sourceMappingURL=index.js.map
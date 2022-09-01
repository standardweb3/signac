"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var SubscriberAggregator_1 = tslib_1.__importDefault(require("./SubscriberAggregator"));
var emittery_1 = tslib_1.__importDefault(require("emittery"));
var defaultSubscribers_1 = tslib_1.__importDefault(require("./defaultSubscribers"));
var EventManager = (function () {
    function EventManager(eventManagerOptions) {
        var logger = eventManagerOptions.logger, muteLogging = eventManagerOptions.muteLogging, subscribers = eventManagerOptions.subscribers;
        this.emitter = new emittery_1["default"]();
        this.subscriberAggregators = [];
        this.initializationOptions = {
            emitter: this.emitter,
            logger: logger,
            muteLogging: muteLogging,
            subscribers: subscribers
        };
        this.initializeDefaultSubscribers(this.initializationOptions);
    }
    EventManager.prototype.emit = function (event, data) {
        return this.emitter.emit(event, data);
    };
    EventManager.prototype.initializeDefaultSubscribers = function (initializationOptions) {
        var aggregatorOptions = Object.assign({}, initializationOptions, {
            subscribers: defaultSubscribers_1["default"]
        });
        this.subscriberAggregators.push(new SubscriberAggregator_1["default"](aggregatorOptions));
    };
    EventManager.prototype.initializeUserSubscribers = function (initializationOptions) {
        var subscribers = initializationOptions.subscribers;
        if (subscribers && Object.keys(subscribers).length > 0) {
            var aggregatorOptions = Object.assign({}, initializationOptions, {
                emitter: this.emitter
            });
            this.subscriberAggregators.push(new SubscriberAggregator_1["default"](aggregatorOptions));
        }
    };
    EventManager.prototype.updateSubscriberOptions = function (newOptions) {
        this.subscriberAggregators.forEach(function (aggregator) {
            aggregator.updateSubscriberOptions(newOptions);
        });
    };
    return EventManager;
}());
exports["default"] = EventManager;
//# sourceMappingURL=EventManager.js.map
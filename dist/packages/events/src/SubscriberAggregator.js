"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var Subscriber_1 = tslib_1.__importDefault(require("./Subscriber"));
var SubscriberAggregator = (function () {
    function SubscriberAggregator(initializationOptions) {
        this.subscribers = [];
        this.initializeSubscribers(initializationOptions);
    }
    SubscriberAggregator.prototype.initializeSubscribers = function (initializationOptions) {
        var emitter = initializationOptions.emitter, logger = initializationOptions.logger, muteLogging = initializationOptions.muteLogging, subscribers = initializationOptions.subscribers;
        if (muteLogging)
            logger = function () { };
        for (var name_1 in subscribers) {
            this.subscribers.push(new Subscriber_1["default"]({
                options: subscribers[name_1],
                emitter: emitter,
                logger: logger
            }));
        }
    };
    SubscriberAggregator.prototype.updateSubscriberOptions = function (newOptions) {
        var logger = newOptions.logger, muteLogging = newOptions.muteLogging;
        if (muteLogging) {
            logger = { log: function () { } };
        }
        this.subscribers.forEach(function (subscriber) {
            subscriber.updateOptions({
                logger: logger
            });
        });
    };
    return SubscriberAggregator;
}());
exports["default"] = SubscriberAggregator;
//# sourceMappingURL=SubscriberAggregator.js.map
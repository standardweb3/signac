"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
var constants_1 = require("../constants");
var fetch_1 = require("../utils/fetch");
var url_1 = require("../utils/url");
var EXCHANGES_TICKER_PATH = "/v1/exchange-markets/ticker";
var exchangeMarketsTicker = function (key, options, fetchOptions) {
    if (options === void 0) { options = {}; }
    var convert = options.convert, currency = options.currency, exchange = options.exchange, interval = options.interval;
    var objParams = {
        convert: convert,
        currency: currency && currency.join(","),
        exchange: exchange && exchange.join(","),
        interval: interval && interval.join(","),
        key: key
    };
    return fetch_1.fetchJSON("" + __1.default.NOMICS_API_BASE + EXCHANGES_TICKER_PATH + "?" + url_1.objToUrlParams(objParams), fetchOptions);
};
exports.default = exchangeMarketsTicker;
//# sourceMappingURL=exchange_markets_ticker.js.map
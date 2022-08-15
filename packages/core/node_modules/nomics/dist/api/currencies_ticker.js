"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
var constants_1 = require("../constants");
var fetch_1 = require("../utils/fetch");
var url_1 = require("../utils/url");
var CURRENCIES_TICKER_PATH = "/v1/currencies/ticker";
var currenciesTicker = function (key, options, fetchOptions) {
    if (options === void 0) { options = {}; }
    var convert = options.convert, ids = options.ids, interval = options.interval, quoteCurrency = options.quoteCurrency, includeTransparency = options.includeTransparency;
    var objParams = {
        convert: convert,
        ids: ids && ids.join(","),
        "include-transparency": includeTransparency,
        interval: interval && interval.join(","),
        key: key,
        "quote-currency": quoteCurrency
    };
    return fetch_1.fetchJSON("" + __1.default.NOMICS_API_BASE + CURRENCIES_TICKER_PATH + "?" + url_1.objToUrlParams(objParams), fetchOptions);
};
exports.default = currenciesTicker;
//# sourceMappingURL=currencies_ticker.js.map
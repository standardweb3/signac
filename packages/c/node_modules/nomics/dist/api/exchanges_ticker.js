"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
var constants_1 = require("../constants");
var fetch_1 = require("../utils/fetch");
var url_1 = require("../utils/url");
var EXCHANGES_TICKER_PATH = "/v1/exchanges/ticker";
var exchangesTicker = function (key, options, fetchOptions) {
    if (options === void 0) { options = {}; }
    var convert = options.convert, ids = options.ids, interval = options.interval;
    var objParams = {
        convert: convert,
        ids: ids && ids.join(","),
        interval: interval && interval.join(","),
        key: key
    };
    return fetch_1.fetchJSON("" + __1.default.NOMICS_API_BASE + EXCHANGES_TICKER_PATH + "?" + url_1.objToUrlParams(objParams), fetchOptions);
};
exports.default = exchangesTicker;
//# sourceMappingURL=exchanges_ticker.js.map
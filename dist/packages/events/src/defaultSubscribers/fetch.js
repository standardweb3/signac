"use strict";
exports.__esModule = true;
var OS = require("os");
exports["default"] = {
    initialization: function () {
        require("console-stamp")(console, {
            format: ":date(yyyy/mm/dd HH:MM:ss.l)"
        });
        this.logger = console;
    },
    handlers: {
        "fetch:start": [
            function (_a) {
                var symbol = _a.symbol;
                this.logger.log("[fetch] \uD83D\uDCF0 \uD83D\uDC15  fetching " + symbol + "...");
            },
        ],
        "fetch:succeed": [
            function (_a) {
                var symbol = _a.symbol, price = _a.price;
                this.logger.log("[fetch] \uD83D\uDDDE\uD83D\uDC36 Successfully fetched the info: " + symbol + " at \uD83D\uDDDE $" + price);
            },
        ],
        "fetch:fail": [
            function (_a) {
                var symbol = _a.symbol, why = _a.why;
                this.logger.log("[fetch] \u274C\uD83D\uDC36 Failed to fetch " + symbol + ": " + OS.EOL + " " + why);
            },
        ]
    }
};
//# sourceMappingURL=fetch.js.map
"use strict";
exports.__esModule = true;
var OS = require("os");
exports["default"] = {
    initialization: function () {
        require("console-stamp")(console, {
            format: ":date(yyyy:mm:dd HH:MM:ss.l)"
        });
        this.logger = console;
    },
    handlers: {
        "submit:ready": [
            function (_a) {
                var assetName = _a.assetName, price = _a.price;
                this.logger.log("[submit] \uD83D\uDCED Transaction ready to submit " + assetName + " at \uD83D\uDCB5 " + price);
            },
        ],
        "submit:inBlock": [
            function (_a) {
                var blockHash = _a.blockHash, assetName = _a.assetName, price = _a.price;
                this.logger.log("[submit] \uD83D\uDCEC Transaction in block " + blockHash + " with " + assetName + " at \uD83D\uDCB5 " + price);
            },
        ],
        "submit:success": [
            function (_a) {
                var blockHash = _a.blockHash, assetName = _a.assetName, price = _a.price;
                this.logger.log("[submit] \uD83D\uDCEA Finalized transaction info in block " + blockHash + " with " + assetName + " at \uD83D\uDCB5 " + price);
            },
        ],
        "submit:fail": [
            function (_a) {
                var blockHash = _a.blockHash, assetName = _a.assetName, price = _a.price, error = _a.error;
                this.logger.log("[submit] \u2753 Failed to submit transaction in block " + blockHash + " with " + assetName + " at \uD83D\uDCB5 " + price + "\n          " + error);
            },
        ]
    }
};
//# sourceMappingURL=submit.js.map
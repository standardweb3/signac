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
        "client:start": [
            function () {
                this.logger.log("[client] \uD83D\uDD0D starting the oracle client...");
            },
        ],
        "client:init": [
            function () {
                this.logger.log("[client] \uD83D\uDD52 Initiated cron job to submit data from the oracle! Waiting for the first iteration...");
            },
        ],
        "client:next": [
            function () {
                this.logger.log("[client] \uD83D\uDD52 starting the iteration...");
            },
        ],
        "client:wait": [
            function () {
                this.logger.log("[cleint] \uD83D\uDD54 Waiting for the next submission...");
            },
        ],
        "client:fail": [
            function (_a) {
                var error = _a.error;
                this.logger.log("[client] \uD83C\uDF2A Something went wrong while running the oracle!");
                this.logger.log("" + error);
            },
        ]
    }
};
//# sourceMappingURL=client.js.map
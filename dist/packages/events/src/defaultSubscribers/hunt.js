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
        "hunt:start": [
            function () {
                this.logger.log("[hunt] \uD83C\uDFF9 starting liquidation hunter...");
            },
        ],
        "hunt:init": [
            function () {
                this.logger.log("[hunt] \uD83D\uDD52 Initiated cron job to hunt for vault liquidation...");
            },
        ],
        "hunt:next": [
            function () {
                this.logger.log("[hunt] \uD83D\uDC07 hunting for liquidations...");
            },
        ],
        "hunt:scan": [
            function (_a) {
                var vaults = _a.vaults;
                this.logger.log("[hunt] \uD83D\uDD75\uFE0F\u200D\u2640\uFE0F Number of vaults to be investigated: " + vaults);
            },
        ],
        "hunt:vault": [
            function (_a) {
                var i = _a.i, vaultAddr = _a.vaultAddr, collateral = _a.collateral, debt = _a.debt, cAmount = _a.cAmount, dAmount = _a.dAmount, mcr = _a.mcr, lfr = _a.lfr, sfr = _a.sfr, on = _a.on, status = _a.status, HP = _a.HP;
                console.log("\n \t\uD83D\uDDC3  Vault #" + i + " : " + vaultAddr + "  \n\n            --- \uD83D\uDCCA Balances \uD83D\uDCCA --- \n\n            collateral: " + collateral + " \n\n            debt: " + debt + " \n\n            collateral amount: " + cAmount + " \n\n            debt amount: " + dAmount + " \n\n            ==\uD83E\uDDEE CDP setting \uD83E\uDDEE== \n\n            Minimal Collateralization Ratio(MCR): " + mcr / 100000 + "% \n\n            Liquidation Fee Ratio(LFR): " + lfr / 100000 + "% \n\n            Stability Fee(SFR): " + sfr / 100000 + "% \n\n            Asset currently open for borrow: " + on + "  \n\n            +\uD83C\uDFE5  Health \uD83C\uDFE5+ \n\n            " + status + " HP: " + HP + " \n\n            ");
            },
        ],
        "hunt:vaultSafe": [
            function () {
                this.logger.log("[hunt] \u2705 Vault is safe for liquidation. moving to the next one...");
            },
        ],
        "hunt:vaultLiquidated": [
            function () {
                this.logger.log("[hunt] \u274E Vault is already liquidated. moving to the next one...");
            },
        ],
        "hunt:vaultFail": [
            function () {
                this.logger.log("[hunt] \uD83D\uDC80 Vault is now vulnerable to liquidation. initiating liquidation request...");
            },
        ],
        "hunt:liquidateSuccess": [
            function () {
                this.logger.log("[hunt] \u2728 Liquidation has been succesfully finalized by the hunter in the blockchain! Now bounty is sent to the hunter account.");
            },
        ],
        "hunt:fail": [
            function (_a) {
                var error = _a.error;
                this.logger.log("[hunt] \uD83C\uDF2A Something went wrong while running the hunter!");
                this.logger.log("" + error);
            },
        ],
        "hunt:networkChange": [
            function (_a) {
                var link = _a.link;
                this.logger.log("[hunt] \uD83D\uDD17  Connecting to " + link);
            }
        ]
    }
};
//# sourceMappingURL=hunt.js.map
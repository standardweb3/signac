const OS = require("os");

export default {
  initialization: function() {
    require("console-stamp")(console, {
      format: ":date(yyyy/mm/dd HH:MM:ss.l)",
    });
    this.logger = console;
  },
  handlers: {
    "hunt:start": [
      function() {
        this.logger.log(`[hunt] 🏹 starting liquidation hunter...`);
      },
    ],
    "hunt:init": [
      function() {
        this.logger.log(
          `[hunt] 🕒 Initiated cron job to hunt for vault liquidation...`
        );
      },
    ],
    "hunt:next": [
      function() {
        this.logger.log(`[hunt] 🐇 hunting for liquidations...`);
      },
    ],
    "hunt:scan": [
      function({ vaults }) {
        this.logger.log(
          `[hunt] 🕵️‍♀️ Number of vaults to be investigated: ${vaults}`
        );
      },
    ],
    "hunt:vault": [
      function({
        i,
        vaultAddr,
        collateral,
        debt,
        cAmount,
        dAmount,
        mcr,
        lfr,
        sfr,
        on,
        status,
        HP,
      }) {
        console.log(
          `\n \t🗃  Vault #${i} : ${vaultAddr}  \n
            --- 📊 Balances 📊 --- \n
            collateral: ${collateral} \n
            debt: ${debt} \n
            collateral amount: ${cAmount} \n
            debt amount: ${dAmount} \n
            ==🧮 CDP setting 🧮== \n
            Minimal Collateralization Ratio(MCR): ${mcr / 100000}% \n
            Liquidation Fee Ratio(LFR): ${lfr / 100000}% \n
            Stability Fee(SFR): ${sfr / 100000}% \n
            Asset currently open for borrow: ${on}  \n
            +🏥  Health 🏥+ \n
            ${status} HP: ${HP} \n
            `
        );
      },
    ],
    "hunt:vaultSafe": [
      function() {
        this.logger.log(
          `[hunt] ✅ Vault is safe for liquidation. moving to the next one...`
        );
      },
    ],
    "hunt:vaultLiquidated": [
      function() {
        this.logger.log(
          `[hunt] ❎ Vault is already liquidated. moving to the next one...`
        );
      },
    ],
    "hunt:vaultFail": [
      function() {
        this.logger.log(
          `[hunt] 💀 Vault is now vulnerable to liquidation. initiating liquidation request...`
        );
      },
    ],
    "hunt:liquidateSuccess": [
      function() {
        this.logger.log(
          `[hunt] ✨ Liquidation has been succesfully finalized by the hunter in the blockchain! Now bounty is sent to the hunter account.`
        );
      },
    ],
    "hunt:fail": [
      function({ error }) {
        this.logger.log(
          `[hunt] 🌪 Something went wrong while running the hunter!`
        );
        this.logger.log(`${error}`);
      },
    ],
    "hunt:networkChange": [
      function({link}) {
        this.logger.log(
          `[hunt] 🔗  Connecting to ${link}`
        );
      }
    ],
  },
};

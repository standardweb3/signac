const OS = require("os");

export default {
  initialization: function() {
    require("console-stamp")(console, {
      format: ":date(yyyy/mm/dd HH:MM:ss.l)",
    });
    this.logger = console;
  },
  handlers: {
    "fetch:start": [
      function({ symbol }) {
        this.logger.log(`[fetch] 📰 🐕  fetching ${symbol}...`);
      },
    ],
    "fetch:succeed": [
      function({ symbol, price }) {
        this.logger.log(
          `[fetch] 🗞🐶 Successfully fetched the info: ${symbol} at 🗞 $${price}`
        );
      },
    ],
    "fetch:fail": [
      function({ symbol, why }) {
        this.logger.log(
          `[fetch] ❌🐶 Failed to fetch ${symbol}: ${OS.EOL} ${why}`
        );
      },
    ],
  },
};

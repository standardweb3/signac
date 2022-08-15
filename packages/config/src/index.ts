import "source-map-support/register";
import { EventManager } from "@digitalnative/lumen-events";
const prompt = require("prompt");
import { mnemonicGenerate } from "@polkadot/util-crypto";
const fs = require("fs");

const properties = [
  {
    name: "nomics",
    validator: /^[a-zA-Z\s\-]+$/,
    warning: "API key must be only letters, spaces, or dashes",
  },
  {
    name: "finnhub",
    validator: /^[a-zA-Z\s\-]+$/,
    warning: "API key must be only letters, spaces, or dashes",
  },
];

function onErr(err) {
  console.log(err);
  return 1;
}

class LumenConfig {
  [key: string]: any;

  constructor({ dir = "./lumen-config.json" }) {
    const eventsOptions = this.eventManagerOptions(this);
    this.events = new EventManager(eventsOptions);

    if (fs.existsSync(dir)) {
      //file exists
      // load config file
      const config = JSON.parse(fs.readFileSync(dir, "utf8"));
      for (const [key, value] of Object.entries(config)) {
        this[key] = value;
      }
      //this.nomics = config.nomics;
      //this.finnhub = config.finnhub;
      //this.mnemonic = config.mnemonic;
      //this.rpc = config.rpc;
    }
  }

  public eventManagerOptions(config: LumenConfig): any {
    let muteLogging;
    const { quiet, logger, subscribers } = config;

    if (quiet) muteLogging = true;
    return { logger, muteLogging, subscribers };
  }

  public static default(dir): LumenConfig {
    return new LumenConfig(dir);
  }
}

export default LumenConfig;

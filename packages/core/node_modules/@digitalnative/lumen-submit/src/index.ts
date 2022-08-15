import LumenConfig from "@digitalnative/lumen-config";
import { Keyring } from "@polkadot/keyring";
import { ApiPromise } from "@polkadot/api";
import { table } from "@digitalnative/lumen-targets";
import { resolve } from "path";

const submitData = async (
  data: { [key: string]: string },
  config: LumenConfig,
  api: ApiPromise
) => {
  // Generate keyring from mnemonics in config file
  // create a keyring with some non-default values specified
  //console.log(data);
  const keyring = new Keyring();
  const pair = keyring.addFromUri(
    config.mnemonic,
    { name: "oracle pair" },
    "sr25519"
  );

  for (const [key, value] of Object.entries(data)) {
    try {
      await report(key, value, api, pair, config);
    } catch (error) {
      config.events.emit("submit:fail", {
        assetName: key,
        price: value,
        error,
      });
    }
  }
  /*
  // traverse from the data dict and submit each price
  for (const [key, value] of Object.entries(data)) {
    console.log(key)
    const api = await polkadotApi(config);
    await report(key, value, api, pair)
  }
  */
};

export default submitData;

const report = async (
  key: string,
  value: string,
  api: ApiPromise,
  pair: any,
  config: LumenConfig
) => {
  const unsub = await api.tx.oracle
    .report(parseInt(config.socket), parseInt(key), parseInt(value))
    .signAndSend(pair, (result) => {
      if (result.isReady) {
        config.events.emit("submit:ready", {
          blockHash: result.status.asInBlock,
          assetName: table[key],
          price: value,
        });
      }
      if (result.status.isInBlock) {
        config.events.emit("submit:inBlock", {
          blockHash: result.status.asInBlock,
          assetName: table[key],
          price: value,
        });
      } else if (result.status.isFinalized) {
        config.events.emit("submit:success", {
          blockHash: result.status.asFinalized,
          assetName: table[key],
          price: value,
        });
        unsub();
        resolve();
      }
    });
  await timer(6000);
};

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

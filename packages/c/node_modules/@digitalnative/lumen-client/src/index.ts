import LumenConfig from "@digitalnative/lumen-config";
import fetchData from "@digitalnative/lumen-fetch";
import submitData from "@digitalnative/lumen-submit";
import { ApiPromise, WsProvider } from "@polkadot/api";

const runClient = async (dir) => {
  const config = LumenConfig.default({ dir });
  const { events } = config;
  events.emit("client:start");
  const api = await polkadotApi(config);
  // register setTimeout to execute in every minute
  await loop(api, config);
  events.emit("client:init");
};

async function loop(api, config) {
    setTimeout(async function() {
    config.events.emit("client:next");
    // fetch data
    const data = await fetchData(false, config);
    await submitData(data, config, api);
    loop(api, config);
  }, 10);
}

export default runClient;

async function polkadotApi(config: LumenConfig) {
  const provider = new WsProvider(config.rpc);
  const definitions = require("@digitalnative/type-definitions/opportunity");
  let types = definitions.types[0].types;
  const api = await new ApiPromise({
    provider,
    types,
  });
  await api.isReady;
  return api;
}

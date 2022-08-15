import LumenConfig from "@digitalnative/lumen-config";
import { Contract, ethers, Wallet } from "ethers";
import { ApiPromise, WsProvider } from "@polkadot/api";


export async function ethersApi(ethProvider, privateKey) {
    let provider = new ethers.providers.JsonRpcProvider(ethProvider);
    let walletWithProvider = new Wallet(privateKey, provider);
    return walletWithProvider;
  }
  
export async function polkadotApi(config: LumenConfig) {
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
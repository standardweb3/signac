import LumenConfig from "@digitalnative/lumen-config";
import { Contract, ethers, Wallet } from "ethers";
import { vaultFactoryABI } from "./abis/vaultFactory";
import { vaultManagerABI } from "./abis/vaultManager";
import { vaultABI } from "./abis/vault";
import { erc20ABI } from "./abis/erc20";
import { ethersApi, polkadotApi } from "./api";

const runHunter = async (dir) => {
  const config = LumenConfig.default({ dir });
  const { events } = config;
  events.emit("hunt:start");
  // register setTimeout to execute in every minute
  await loop(config, events);
  events.emit("hunt:init");
};

export default runHunter;

async function loop(config, events) {
    setTimeout(async function() {
    events.emit("hunt:next");
    await hunt(config, events);
    loop(config, events);
    }, 
    1000);
}


async function hunt(config: LumenConfig, events) {
    for (let i = 0; i < config.ethRpc.length; i++) {
      const link = config.ethRpc[i] 
      events.emit("hunt:networkChange", { link });
      const api = await ethersApi(link, config.private);
      await huntNetwork(api, config.factory[i], events);
    }
}

async function huntNetwork(api, factory, events) {
  const vaultFactory = new Contract(factory, vaultFactoryABI, api);
  // get total number of vaults
  const vaults = await vaultFactory.allVaultsLength();
  const vaultManagerAddr = await vaultFactory.manager();
  const vaultManager = new Contract(vaultManagerAddr, vaultManagerABI, api);
  events.emit("hunt:scan", { vaults });
  const serial = Array.from({ length: vaults.toNumber() }, (v, i) => i).reverse();
  for (let i of serial) {
    try {
      await investigate(i, vaultManager, vaultFactory, api, events);
    } catch (e) {
      console.log(e);
    }
  }
  //events("hunt:results"); 
}

async function investigate(i, vaultManager, vaultFactory, api, events) {
  // get vault address from factory
  let vaultAddr = await vaultFactory.getVault(i);
  // check if the contract has been self destruct
  const selfDestruct = await api.provider.getCode(vaultAddr)
  if (selfDestruct === "0x") {
      return;
  }
  const vault = new Contract(vaultAddr, vaultABI, api);
  // get info from vault
  let collateral = await vault.collateral();
  let debt = await vault.debt();
  const erc20_1 = new Contract(collateral, erc20ABI, api);
  let [mcr, lfr, sfr, cDecimals, on] = await vaultManager.getCDPConfig(
    collateral
  );
  let cAmount = await erc20_1.attach(collateral).balanceOf(vaultAddr);
  let dAmount = await vault.borrow();
  // get whether the position is valid
  const isValidCDP = await vaultManager.isValidCDP(
    collateral,
    debt,
    cAmount,
    dAmount
  );

  // Get health check 
  const HP = await getHealthCheck(collateral, debt, cAmount, dAmount, vaultManager, mcr)
  const status = getHPStatus(HP)
  // emit each vault status
  events.emit("hunt:vault", {
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
    isValidCDP,
    status,
    HP
  });

  
  // check vault health and react
  if (isValidCDP) {
    events.emit("hunt:vaultSafe");
  } else if (cAmount == 0) {
    events.emit("hunt:vaultLiquidated")
  } else {
    events.emit("hunt:vaultFail");
    // initiate liquidation tx
    try {
      events.emit("hunt:liquidate");      
      let liquidate = await vault.liquidate();
      await liquidate.wait();
      events.emit("hunt:liquidateSuccess", {});
    } catch (e) {
      events.emit("hunt:fail", { e });
    }   
  }
}

async function getHealthCheck(collateral, debt, cAmount, dAmount, vaultManager, mcr) {
    const cPrice = await vaultManager.getAssetPrice(collateral)
    const dPrice = await vaultManager.getAssetPrice(debt)
    const dValue = dPrice.mul(dAmount).gt(0) ? dPrice.mul(dAmount) : 1   
    const cdpRatioPercent = cPrice.mul(cAmount).div(dValue) * 100
    // HP = (MCR + 50%) - (cdpRatio in percentage - mcr)
    const HP = 100 * (cdpRatioPercent - (mcr/100000)) / 50
    return HP;
}

function getHPStatus(HP) {
    if (HP <= 0) { return '💀'; } else
    if (HP <= 30) { return '🚑' } else
    if (HP <= 50) { return '🖤'} else
    if (HP <= 80) { return '💛'} else
    if (HP <= 100) { return '💖'} else
    if (HP > 100) { return '💎' }
}
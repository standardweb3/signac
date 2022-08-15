/// Table for locating asset_id in STND with the ticker
/// Initial dataset are from https://wsb.gold/ top 10 ticker mentions list
/// Prices are represented in 15 decimals (e.g. one = 1e15)
export const table = {
  0: "STND", // Governance token
  1: "MTR", // Stablecoin
  2: "AMC",
  3: "APHA",
  4: "TLRY",
  5: "SPY",
  6: "SNDL",
  7: "BB",
  8: "TWTR",
  9: "PLTR",
};

export enum Sources {
  UNISWAP,
  PANCAKESWAP,
  BINANCE,
  HUOBI,
  FINNHUB,
  NOMICS,
  MISC,
}

export const sources = {
  0: Sources.NOMICS, // Governance token
  1: Sources.MISC, // Stablecoin TODO: wait until we list stablecoin on exchanges
  2: Sources.FINNHUB,
  3: Sources.FINNHUB,
  4: Sources.FINNHUB,
  5: Sources.FINNHUB,
  6: Sources.FINNHUB,
  7: Sources.FINNHUB,
  8: Sources.FINNHUB,
  9: Sources.FINNHUB,
};

import mockUp from "./mock";
import { Sources, sources, table } from "@digitalnative/lumen-targets";
import LumenConfig from "@digitalnative/lumen-config";
import axios from "axios";
import padTokenInput from "./decimals";

const fetchStockData = async (symbol, config) => {
  try {
    config.events.emit("fetch:start", { symbol });
    const { data } = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${config.finnhub}`
    );
    const price = data.c;
    // add error for finnhub price data showing 0$ for APHA
    config.events.emit("fetch:succeed", { symbol, price });
    return padTokenInput(String(price), 8);
  } catch (err) {
    console.log(err);
    const why = `failed to fetch stock data on: ${symbol}\nstatus: ${err.response &&
      err.response.status}\nmessage: ${err.response && err.response.message}`;
    config.events.emit("fetch:fail", { why });
  }
};

const fetchNomicsData = async (symbol, config) => {
  try {
    config.events.emit("fetch:start", { symbol });
    const { data } = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${
        config.nomics
      }&ids=${symbol}&intervdal=1d,30d&convert=USD&per-page=100&page=1&sort=rank`
    );
    const price = data[0].price;
    config.events.emit("fetch:succeed", { symbol, price });
    return padTokenInput(price, 8);
  } catch (err) {
    const why = `failed to fetch coin data on :${symbol}\nstatus: ${err.response &&
      err.response.status}\nmessage: ${err.response && err.response.message}`;
    config.events.emit("fetch:fail", { why });
  }
};

const fetchData = async (isMock: boolean, config: LumenConfig) => {
  // Check mock option
  if (isMock) {
    return mockUp;
  } else {
    // Get assets to fetch prices
    const data = {};
    // traverse from the table dict and get price for each
    for (const [key, value] of Object.entries(table)) {
      const result = await (async () => {
        switch (sources[key]) {
          // finnhub for stocks
          case Sources.FINNHUB:
            return await fetchStockData(value, config);
          // nomics for crypto
          case Sources.NOMICS:
            return await fetchNomicsData(value, config);
          default:
            return (1e8).toString();
        }
      })();
      data[key] = result;
    }

    return data;
  }
};

export default fetchData;

import { IntervalEnum } from "../constants";
export interface IExchangeMarketsTickerOptions {
    convert?: string;
    interval?: string[];
    currency?: string[];
    exchange?: string[];
}
export declare type ExchangeMarketTickerInterval = {
    volume: string;
    volume_base: string;
    volume_base_change: string;
    volume_change: string;
    price_change: string;
    price_quote_change: string;
    trades: string;
    trades_change: string;
};
export interface IRawExchangeMarketTicker {
    exchange: string;
    market: string;
    type: string;
    price_exclude: boolean;
    volume_exclude: boolean;
    aggregated: boolean;
    base: string;
    quote: string;
    base_symbol: string;
    quote_symbol: string;
    price: string;
    price_quote: string;
    last_updated: string;
    [IntervalEnum.Day]?: ExchangeMarketTickerInterval;
    [IntervalEnum.Week]?: ExchangeMarketTickerInterval;
    [IntervalEnum.Month]?: ExchangeMarketTickerInterval;
    [IntervalEnum.YearToDate]?: ExchangeMarketTickerInterval;
    [IntervalEnum.Year]?: ExchangeMarketTickerInterval;
}
declare const exchangeMarketsTicker: (key: string, options?: IExchangeMarketsTickerOptions, fetchOptions?: RequestInit | undefined) => Promise<IRawExchangeMarketTicker[]>;
export default exchangeMarketsTicker;

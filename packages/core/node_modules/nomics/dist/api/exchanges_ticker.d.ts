import { IntervalEnum } from "../constants";
export interface IExchangesTickerOptions {
    convert?: string;
    interval?: string[];
    ids?: string[];
}
export declare type ExchangeTickerInterval = {
    volume: string;
    volume_change: string;
    volume_change_pct: string;
    trades: string;
    trades_change: string;
    trades_change_pct: string;
};
export interface IRawExchangeTicker {
    id: string;
    name?: string;
    logo_url?: string;
    transparency_grade?: string;
    coverage_type: string;
    order_books: boolean;
    first_trade: string;
    first_candle: string;
    first_order_book: string;
    last_updated: string;
    fiat_currencies: string[];
    num_pairs: string;
    [IntervalEnum.Day]?: ExchangeTickerInterval;
    [IntervalEnum.Week]?: ExchangeTickerInterval;
    [IntervalEnum.Month]?: ExchangeTickerInterval;
    [IntervalEnum.YearToDate]?: ExchangeTickerInterval;
    [IntervalEnum.Year]?: ExchangeTickerInterval;
}
declare const exchangesTicker: (key: string, options?: IExchangesTickerOptions, fetchOptions?: RequestInit | undefined) => Promise<IRawExchangeTicker[]>;
export default exchangesTicker;

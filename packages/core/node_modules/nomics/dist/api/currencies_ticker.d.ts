import { IntervalEnum } from "../constants";
export interface ICurrenciesTickerOptions {
    interval?: string[];
    ids?: string[];
    quoteCurrency?: string;
    convert?: string;
    includeTransparency?: boolean;
}
export declare type CurrencyTickerInterval = {
    volume: string;
    price_change: string;
    price_change_pct: string;
    volume_change: string;
    volume_change_pct: string;
    market_cap_change?: string;
    market_cap_change_pct?: string;
    transparent_market_cap_change?: string;
    transparent_market_cap_change_pct?: string;
    volume_transparency?: VolumeTransparency[];
    volume_transparency_grade?: string;
};
export declare type VolumeTransparency = {
    grade: string;
    volume: string;
    volume_change: string;
    volume_change_pct: string;
};
export interface IRawCurrencyTicker {
    id: string;
    currency: string;
    symbol: string;
    name?: string;
    logo_url?: string;
    price: string;
    price_date: string;
    price_timestamp: string;
    circulating_supply?: string;
    max_supply?: string;
    market_cap?: string;
    transparent_market_cap?: string;
    rank?: string;
    high?: string;
    high_timestamp?: string;
    [IntervalEnum.Day]?: CurrencyTickerInterval;
    [IntervalEnum.Week]?: CurrencyTickerInterval;
    [IntervalEnum.Month]?: CurrencyTickerInterval;
    [IntervalEnum.YearToDate]?: CurrencyTickerInterval;
    [IntervalEnum.Year]?: CurrencyTickerInterval;
    sort?: {
        volume: number;
        market_cap: number;
        price: number;
    };
}
declare const currenciesTicker: (key: string, options?: ICurrenciesTickerOptions, fetchOptions?: RequestInit | undefined) => Promise<IRawCurrencyTicker[]>;
export default currenciesTicker;

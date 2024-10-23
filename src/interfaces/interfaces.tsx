export interface DataProps{
    data: CoinProps[];
}

export interface CoinProps{
    id: string;
    name: string;
    symbol: string;
    priceUsd: string;
    changePercent24Hr: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    supply: string;
    maxSupply: string;
    rank: string;
    vwap24Hr: string;
    explorer: string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
}
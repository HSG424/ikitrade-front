export interface tickData {
  x: string;
  y: number;
}

interface Data {
  data: tickData[];
  id: string;
}

export type DataArr = Data[];

export type Intervals = "6D" | "1M" | "6M" | "1Y" | "5Y";

export interface APIresponse {
  adjClose: number;
  adjHigh: number;
  adjLow: number;
  adjOpen: number;
  adjVolume: number;
  close: number;
  date: string;
  divCash: number;
  high: number;
  low: number;
  open: number;
  splitFactor: number;
  volume: number;
}

interface Result {
  desc: string;
  symbol: string;
}

export type Results = Result[] | [];

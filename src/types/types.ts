interface Data {
  data: {
    x: string;
    y: number;
  }[];
  id: string;
}

export type DataArr = Data[];

export type Intervals = "5D" | "1M";

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

import { DatumValue } from "@nivo/line";
import { DataArr, Intervals } from "../types/types";
import { monthNames } from "./date";

export const firstAndLastStr = (data: DataArr): [string, string] => {
  const arr = data[0].data;
  const firstStr = arr[0].x;
  const lastStr = arr[arr.length - 1].x;
  return [firstStr, lastStr];
};

export const tickValues = (data: DataArr, interval: Intervals) => {
  const ticks = data[0].data;

  if (interval === "6D") return ticks.map((el) => el.x);

  const intervals = Math.ceil(ticks.length / 5);
  const ticksFilter = ticks.filter(
    (_, i) => i !== 0 && (i + 1) % intervals === 0
  );
  return ticksFilter.map((el) => el.x);
};

export const theme = {
  background: "#202124",
  text: {
    fontSize: 15,
    fill: "#999999",
  },
  grid: {
    line: {
      stroke: "#404040",
      strokeWidth: 2,
    },
  },
};

export const dateMonth = (val: string | DatumValue) => {
  const dateStr = val.toString().split("-");
  const dateNum = dateStr.map((str) => parseInt(str));
  const month = monthNames[dateNum[1] - 1];
  return [dateNum, month];
};

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

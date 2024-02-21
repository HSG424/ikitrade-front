import { DatumValue } from "@nivo/line";
import { DataArr, Intervals, tickData } from "../types/types";
import { monthNames } from "./date";

export const firstAndLastStr = (data: DataArr): [string, string] => {
  const arr = data[0].data;
  const firstStr = arr[0].x;
  const lastStr = arr[arr.length - 1].x;
  return [firstStr, lastStr];
};

const xValues = (ticksSelected: number[], ticks: tickData[]) => {
  if (ticksSelected.length > 0) return ticksSelected.map((el) => ticks[el].x);
  return ticks.map((el) => el.x);
};

export const tickValues = (data: DataArr, interval: Intervals) => {
  const ticks = data[0].data;
  switch (interval) {
    case "6D":
      return xValues([], ticks);
    case "1M":
      return xValues([3, 8, 13, 18], ticks);
    case "6M":
      return xValues([21, 49, 77, 104], ticks);
    case "1Y":
      return xValues([39, 90, 147, 205], ticks);
    case "5Y":
      return xValues([40, 97, 156, 218], ticks);
  }
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

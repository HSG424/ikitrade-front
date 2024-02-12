import { DatumValue } from "@nivo/line";
import { DataArr, Intervals } from "../types/types";

export const firstAndLastStr = (data: DataArr): [string, string] => {
  const arr = data[0].data;
  const firstStr = arr[0].x;
  const lastStr = arr[arr.length - 1].x;
  return [firstStr, lastStr];
};

export const tickValues = (data: DataArr, interval: Intervals) => {
  switch (interval) {
    case "5D":
      return data[0].data.map((el) => el.x);
    case "1M":
      return [3, 8, 13, 18].map((el) => data[0].data[el].x);
    default:
      return [];
  }
};

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

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

export const formatXaxis = (val: string) => {
  const date = new Date(val);
  return `${monthNames[date.getMonth()]} ${date.getDate() + 1}`;
};

export const formatTooltip = (val: DatumValue) => {
  const date = new Date(val);
  return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
};

import { Intervals, APIresponse, tickData } from "../types/types";
import { numberWithCommas } from "./line-chart";

export const processChartData = (json: string, interval: Intervals) => {
  const respObj: APIresponse[] = JSON.parse(json);

  const respObjFinal = interval === "6D" ? respObj.slice(-6) : respObj;

  const data = respObjFinal.map((obj: APIresponse) => {
    return {
      x: obj.date.slice(0, 10),
      y: obj.close,
    };
  });

  return [
    {
      data,
      id: "1a",
    },
  ];
};

export const closePriceCalc = (respObj: tickData[]) => {
  return `$${numberWithCommas(respObj.slice(-1)[0].y)}`;
};

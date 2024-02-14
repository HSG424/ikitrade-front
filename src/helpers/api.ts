import { Intervals, APIresponse } from "../types/types";

export const processChartData = (json: string, interval: Intervals) => {
  const respObj: APIresponse[] = JSON.parse(json);

  const respObjFinal = interval === "5D" ? respObj.slice(-5) : respObj;

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

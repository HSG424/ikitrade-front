import { APIresponse } from "../types/types";

const date = new Date();
date.setDate(date.getDate() - 10);
/** DATE LOGIC CODE ABOVE */

const jsonStr =
  '[{"date":"2024-01-02T00:00:00.000Z","close":311.64,"high":314.48,"low":310.54,"open":312.36,"volume":800172,"adjClose":311.64,"adjHigh":314.48,"adjLow":310.54,"adjOpen":312.36,"adjVolume":800172,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-03T00:00:00.000Z","close":312.0,"high":314.235,"low":310.53,"open":312.96,"volume":720206,"adjClose":312.0,"adjHigh":314.235,"adjLow":310.53,"adjOpen":312.96,"adjVolume":720206,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-04T00:00:00.000Z","close":311.75,"high":314.29,"low":311.71,"open":313.09,"volume":739152,"adjClose":311.75,"adjHigh":314.29,"adjLow":311.71,"adjOpen":313.09,"adjVolume":739152,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-05T00:00:00.000Z","close":309.16,"high":312.185,"low":307.31,"open":311.71,"volume":492790,"adjClose":309.16,"adjHigh":312.185,"adjLow":307.31,"adjOpen":311.71,"adjVolume":492790,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-08T00:00:00.000Z","close":312.86,"high":313.02,"low":308.61,"open":310.36,"volume":525368,"adjClose":312.86,"adjHigh":313.02,"adjLow":308.61,"adjOpen":310.36,"adjVolume":525368,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-09T00:00:00.000Z","close":312.01,"high":312.8533,"low":309.435,"open":311.7,"volume":629607,"adjClose":312.01,"adjHigh":312.8533,"adjLow":309.435,"adjOpen":311.7,"adjVolume":629607,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-10T00:00:00.000Z","close":315.04,"high":315.115,"low":312.02,"open":312.46,"volume":418656,"adjClose":315.04,"adjHigh":315.115,"adjLow":312.02,"adjOpen":312.46,"adjVolume":418656,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-11T00:00:00.000Z","close":314.28,"high":316.03,"low":312.73,"open":315.47,"volume":624892,"adjClose":314.28,"adjHigh":316.03,"adjLow":312.73,"adjOpen":315.47,"adjVolume":624892,"divCash":0.0,"splitFactor":1.0},{"date":"2024-01-12T00:00:00.000Z","close":316.31,"high":316.34,"low":313.67,"open":315.29,"volume":692334,"adjClose":316.31,"adjHigh":316.34,"adjLow":313.67,"adjOpen":315.29,"adjVolume":692334,"divCash":0.0,"splitFactor":1.0}]';

const jsonObj = JSON.parse(jsonStr);

console.log("jsonObj", jsonObj);

const jsonObjSlice = jsonObj.slice(-5);

const map = jsonObjSlice.map((obj: APIresponse) => {
  return {
    x: obj.date.slice(0, 10),
    y: obj.close,
  };
});

const mockData2 = [
  {
    data: map,
    id: "fake corp. A",
  },
];

export default mockData2;

import { useState, useEffect, useCallback } from "react";
import LineChart from "./components/LineChart";
import Input from "./components/Input.tsx";
import { DataArr, Intervals } from "./types/types";
import "./App.css";
import logo from "/iki-logo.png";
import { startEndDateCalc } from "./helpers/date";
import { processChartData } from "./helpers/api";
import {
  API_DOMAIN,
  API_DAILY,
  DEFAULT_INTERVAL,
  DEFAULT_COMPANY,
  BUTTON_INTERVALS,
} from "./config";

function App() {
  const [data, setData] = useState<DataArr>([]);
  const [interval, setInterval] = useState<Intervals>(DEFAULT_INTERVAL);

  const clickIntervalHandler = (length: Intervals) => {
    if (length === interval) return;
    console.log("passed the if guard clause");
    setData([]);
    setInterval(length);
  };

  const fetchChartDataHandler = useCallback(async () => {
    const [startDate, endDate] = startEndDateCalc(interval);
    const resampleFreq = interval === "5Y" ? "weekly" : "daily";
    const symbol = DEFAULT_COMPANY;

    const resource = `${API_DAILY}/${symbol}`;
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&resampleFreq=${resampleFreq}&sort=date`;

    try {
      const response = await fetch(`${API_DOMAIN}${resource}${queryParams}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setData(processChartData(data, interval));
    } catch (error) {
      console.log("error: ", error);
    }
  }, [interval]);

  useEffect(() => {
    fetchChartDataHandler();
  }, [fetchChartDataHandler, interval]);

  return (
    <>
      <div className="top-flex">
        <div>
          <a href="https://developerhan.com" target="_blank">
            <img src={logo} alt="" />
          </a>
        </div>

        <Input />
      </div>
      <div className="intervals">
        {BUTTON_INTERVALS.map((interval, i) => (
          <button onClick={clickIntervalHandler.bind(null, interval)} key={i}>
            {interval}
          </button>
        ))}
      </div>
      <div className="line-chart">
        {data.length > 0 && <LineChart data={data} interval={interval} />}
      </div>
    </>
  );
}

export default App;

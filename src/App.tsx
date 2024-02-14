import { useState, useEffect, useCallback } from "react";
import LineChart from "./components/LineChart";
import Input from "./components/Input.tsx";
import { DataArr, Intervals } from "./types/types";
import "./App.css";
import logo from "/iki-logo.png";
import { startEndDateCalc } from "./helpers/date";
import { processChartData } from "./helpers/api";

function App() {
  const [data, setData] = useState<DataArr>([]);
  const [interval, setInterval] = useState<Intervals>("5D");

  const clickIntervalHandler = (length: Intervals) => {
    if (length === interval) return;
    console.log("passed the if guard clause");
    setData([]);
    setInterval(length);
  };

  const fetchChartDataHandler = useCallback(async () => {
    const [startDate, endDate] = startEndDateCalc(interval);

    console.log("endDate", endDate);
    console.log("startDate", startDate);

    const symbol = "MSI";
    // const startDate = "2024-1-2";
    // const endDate = "2024-1-12";
    const resampleFreq = "daily";
    const sort = "date";

    console.log(
      "the url: ",
      `/api/daily/${symbol}?startDate=${startDate}&endDate=${endDate}&resampleFreq=${resampleFreq}&sort=${sort}`
    );

    const url = "https://champagne-basket-clam-garb.cyclic.app/";
    const endpoint = `/api/daily/${symbol}?startDate=${startDate}&endDate=${endDate}&resampleFreq=${resampleFreq}&sort=${sort}`;

    try {
      const response = await fetch(`${url}${endpoint}`);
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
        <button onClick={clickIntervalHandler.bind(null, "5D")}>5D</button>
        <button onClick={clickIntervalHandler.bind(null, "1M")}>1M</button>
      </div>
      <div className="line-chart">
        {data.length > 0 && <LineChart data={data} interval={interval} />}
      </div>
    </>
  );
}

export default App;

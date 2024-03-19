import { useState, useEffect, useCallback } from "react";
import LineChart from "./components/LineChart";
import Search from "./components/Search";
import Loading from "./components/Loading";
import SelectedCompany from "./components/SelectedCompany";
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
  const [error, setError] = useState("");

  const [selectedCompany, setSelectedCompany] = useState(DEFAULT_COMPANY);

  const selectCompanyHandler = (symbol: string, desc: string) => {
    setSelectedCompany({
      symbol,
      desc,
    });
  };

  const clickIntervalHandler = (length: Intervals) => {
    if (length === interval) return;
    console.log("passed the if guard clause");
    setInterval(length);
  };

  const fetchChartDataHandler = useCallback(async () => {
    setData([]);
    setError("");

    const [startDate, endDate] = startEndDateCalc(interval);
    const resampleFreq = interval === "5Y" ? "weekly" : "daily";
    const symbol = selectedCompany.symbol;

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
      setError(error instanceof Error ? error.message : String(error));
    }
  }, [interval, selectedCompany]);

  useEffect(() => {
    fetchChartDataHandler();
  }, [fetchChartDataHandler, interval]);

  let content = <Loading />;
  if (data.length > 0) {
    content = <LineChart data={data} interval={interval} />;
  }
  if (error) {
    content = <p className="error">{error}</p>;
  }

  return (
    <>
      <div className="top-flex">
        <div>
          <a href="#" target="_blank">
            <img src={logo} alt="" />
          </a>
        </div>

        <Search onSelectCompany={selectCompanyHandler} />
      </div>
      <SelectedCompany selectedCompany={selectedCompany} />
      <div className="intervals">
        {BUTTON_INTERVALS.map((interval, i) => (
          <button onClick={clickIntervalHandler.bind(null, interval)} key={i}>
            {interval}
          </button>
        ))}
      </div>
      <div className="line-chart">{content}</div>
    </>
  );
}

export default App;

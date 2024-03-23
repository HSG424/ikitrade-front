import { useState, useEffect, useCallback, MouseEvent } from "react";
import LineChart from "./components/LineChart";
import Search from "./components/Search";
import Loading from "./components/Loading";
import SelectedCompany from "./components/SelectedCompany";
import { DataArr, Intervals } from "./types/types";
import "./App.css";
import logo from "/iki-logo.png";
import { startEndDateCalc } from "./helpers/date";
import { processChartData, closePriceCalc } from "./helpers/api";
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
  const [loading, setLoading] = useState(true);
  const [hideSearchResults, setHideSearchResults] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(DEFAULT_COMPANY);

  const selectCompanyHandler = (symbol: string, desc: string) => {
    setHideSearchResults(true);
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
    setLoading(true);
    setData([]);
    setError("");

    const [startDate, endDate] = startEndDateCalc(interval);
    const resampleFreq = interval === "5Y" ? "weekly" : "daily";
    const symbol = selectedCompany.symbol;

    const resource = `${API_DAILY}/${symbol}`;
    const queryParams = `?startDate=${startDate}&endDate=${endDate}&resampleFreq=${resampleFreq}&sort=date`;

    try {
      const response = await fetch(`${API_DOMAIN}${resource}${queryParams}`);

      /*
      console.log("response", response);
      console.log("status", typeof response.status, response.status);
      console.log("headers", response.headers);
      */

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();

      const dataParsed = JSON.parse(data);

      // console.log("dataParsed", dataParsed);

      if (dataParsed.length === 0) throw new Error("No Data.");

      if (dataParsed.detail?.search("request allocation") > 0)
        throw new Error("API LIMIT REACHED.");

      setData(processChartData(data, interval));
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
    setLoading(false);
  }, [interval, selectedCompany]);

  useEffect(() => {
    fetchChartDataHandler();
  }, [fetchChartDataHandler, interval]);

  let content = <div></div>;

  if (loading) {
    content = <Loading className="chart-loading" />;
  }

  if (data.length > 0) {
    content = <LineChart data={data} interval={interval} />;
  }
  if (error) {
    content = <p className="error">{error}</p>;
  }

  const onClickHandler = (event: MouseEvent<HTMLElement>) => {
    const className = (event.target as Element).className;

    const searchInput = className.search("search-input");
    const searchResult = className.search("search-result");

    if (!hideSearchResults && searchInput && searchResult === -1)
      setHideSearchResults(true);
    else if (hideSearchResults && searchInput >= 0) setHideSearchResults(false);
  };

  const closePrice = data[0]?.data ? closePriceCalc(data[0].data) : "";

  return (
    <div onClick={onClickHandler}>
      <div className="outer-cont font-a">
        <header>
          <a href="https://ikitrade-front.web.app">
            <img src={logo} alt="logo" />
          </a>
        </header>
        <main>
          <Search
            hideSearchResults={hideSearchResults}
            onSelectCompany={selectCompanyHandler}
          />

          <div className="intervals-selected-company">
            <SelectedCompany
              selectedCompany={selectedCompany}
              closePrice={closePrice}
            />

            <div className="intervals-cont">
              <div className="intervals">
                {BUTTON_INTERVALS.map((intervalMap, i) => (
                  <button
                    type="button"
                    className={`font-b ${
                      intervalMap === interval ? "active" : ""
                    }`}
                    onClick={clickIntervalHandler.bind(null, intervalMap)}
                    key={i}
                    disabled={loading}
                  >
                    {intervalMap}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="line-chart">{content}</div>
        </main>
      </div>
    </div>
  );
}

export default App;

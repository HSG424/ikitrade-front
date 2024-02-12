import { useState } from "react";
import LineChart from "./components/LineChart";
import mockData from "./test-data/mockData.ts";
import mockData2 from "./test-data/mockData2.ts";
import Input from "./components/Input.tsx";
import { DataArr, Intervals } from "./types/types";
import "./App.css";
import logo from "/iki-logo.png";

const mainData: {
  "5D": DataArr;
  "1M": DataArr;
} = {
  "5D": mockData2,
  "1M": mockData,
};

function App() {
  const [data, setData] = useState<DataArr>(mockData2);
  const [interval, setInterval] = useState<Intervals>("5D");

  const clickIntervalHandler = (length: Intervals) => {
    if (length === interval) return;

    console.log("passed the if guard clause");

    setInterval(length);
    setData(mainData[length]);
  };

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
        <LineChart data={data} interval={interval} />
      </div>
    </>
  );
}

export default App;

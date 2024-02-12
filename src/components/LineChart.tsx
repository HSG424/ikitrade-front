import { ResponsiveLine } from "@nivo/line";
import { DataArr, Intervals } from "../types/types";
import {
  tickValues,
  firstAndLastStr,
  monthNames,
  theme,
} from "../helpers/line-chart.ts";
import Tooltip from "./Tooltip";

const LineChart = ({
  data,
  interval,
}: {
  data: DataArr;
  interval: Intervals;
}) => (
  <ResponsiveLine
    data={data}
    tooltip={(data) => {
      const { xFormatted, yFormatted } = data.point.data;
      return <Tooltip x={xFormatted} y={yFormatted} />;
    }}
    lineWidth={3}
    margin={{ top: 16, right: 42, bottom: 40, left: 65 }}
    xScale={{ type: "point" }}
    axisBottom={{
      tickValues: tickValues(data, interval),
      format: (val) => {
        const date = new Date(val);
        return `${monthNames[date.getMonth()]} ${date.getDate() + 1}`;
      },
    }}
    xFormat={(val) => {
      const date = new Date(val);
      return `${date.getMonth() + 1}/${
        date.getDate() + 1
      }/${date.getFullYear()}`;
    }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    }}
    gridXValues={firstAndLastStr(data)}
    colors={["#80c894"]}
    enablePoints={false}
    pointSize={10}
    pointColor="#971c1c"
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
    theme={theme}
  />
);

export default LineChart;

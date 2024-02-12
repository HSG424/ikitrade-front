import { ResponsiveLine } from "@nivo/line";
import { DataArr, Intervals } from "../types/types";
import {
  tickValues,
  firstAndLastStr,
  theme,
  formatXaxis,
  formatTooltip,
} from "../helpers/line-chart.ts";
import Tooltip from "./Tooltip";

interface LineChartProps {
  data: DataArr;
  interval: Intervals;
}

const LineChart = ({ data, interval }: LineChartProps) => (
  <ResponsiveLine
    data={data}
    theme={theme}
    tooltip={(data) => {
      const { xFormatted, yFormatted } = data.point.data;
      return <Tooltip x={xFormatted} y={yFormatted} />;
    }}
    lineWidth={3}
    margin={{ top: 16, right: 42, bottom: 40, left: 62 }}
    xScale={{ type: "point" }}
    axisBottom={{
      tickSize: 7,
      tickPadding: 2,
      tickRotation: 0,
      tickValues: tickValues(data, interval),
      format: formatXaxis,
    }}
    xFormat={formatTooltip}
    gridXValues={firstAndLastStr(data)}
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
      tickSize: 0,
      tickPadding: 6,
      tickRotation: 0,
    }}
    colors={["#80c894"]}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[]}
  />
);

export default LineChart;

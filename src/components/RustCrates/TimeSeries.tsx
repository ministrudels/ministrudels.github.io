import { Card, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ScaleOrdinal } from "d3";
import moment from "moment";
import { useCratesDownloadsChart } from "./hooks";

export const TimeSeries = ({
  crates,
  colourScale,
}: {
  crates: string[];
  colourScale: ScaleOrdinal<string, string, never>;
}) => {
  const { data } = useCratesDownloadsChart(crates);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Total Downloads</Typography>
      <ResponsiveContainer width={"99%"} height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10 }}
            tickFormatter={(value: string) => moment(value).format("MMM Do")}
          />
          <YAxis style={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          {crates.map((crate) => (
            <Line
              key={crate}
              type="monotone"
              dataKey={crate}
              stroke={colourScale(crate)}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

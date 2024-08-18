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

import moment from "moment";
import { getColourScale } from "../../utils";
import { useGetDownloadTimeSeries } from "./utils";

export const TimeSeries = ({ crates }: { crates: string[] }) => {
  const { data } = useGetDownloadTimeSeries(crates);

  const colourScale = getColourScale(crates.length);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Total Downloads</Typography>
      <ResponsiveContainer width={"99%"} height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
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
          {crates.map((crate, index) => (
            <Line
              key={crate}
              type="monotone"
              dataKey={crate}
              stroke={colourScale(index)}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

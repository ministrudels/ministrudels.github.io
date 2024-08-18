import { Card, Typography } from "@mui/material";
import moment from "moment";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getColourScale } from "../../utils";
import { useGetReleases } from "./utils";

export const VersionTimeline = ({ crates }: { crates: string[] }) => {
  const now = moment();
  const oneYearAgo = now.clone().subtract(1, "year");
  const { data } = useGetReleases(crates, oneYearAgo);
  // const timelineData = Object.values(data).flatMap((releases) => releases);
  const colourScale = getColourScale(crates.length);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Version Releases</Typography>
      <ResponsiveContainer width="100%" height={100}>
        <ScatterChart
          margin={{
            top: 10,
          }}
        >
          <XAxis
            type="number"
            dataKey="date"
            // interval={0}
            ticks={[oneYearAgo.valueOf(), now.valueOf()]}
            domain={[oneYearAgo.valueOf(), now.valueOf()]}
            tick={{ fontSize: 10 }}
            tickFormatter={(value: string) => moment(value).format("YY MMM D")}
            scale={"time"}
          />
          <YAxis
            type="number"
            dataKey="value"
            tick={false}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={({ active, payload, label }) => {
              // console.log(a);
              console.log(active, payload, label);
              return <div>{"hello"}</div>;
            }}
          />
          {Object.entries(data).map(([crate, releases], index) => (
            <Scatter
              key={crate}
              name={crate}
              data={releases}
              fill={colourScale(index)}
            />
          ))}
          <Tooltip />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

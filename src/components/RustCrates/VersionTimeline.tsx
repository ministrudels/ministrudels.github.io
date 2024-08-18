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
import { useGetReleases } from "./utils";

export const VersionTimeline = ({ crates }: { crates: string[] }) => {
  const { data } = useGetReleases(crates);
  const data01 = [
    { date: "2022-01-14", index: 1, value: 1 },
    { date: "2022-01-16", index: 1, value: 10 },
    { date: "2022-01-20", index: 1, value: 170 },
  ].map((entry) => ({
    ...entry,
    date: moment(entry.date).valueOf(),
  }));

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Version Releases</Typography>
      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            // type="number"
            dataKey="date"
            // interval={0}
            // tick={{ fontSize: 0 }}
            // tickLine={{ transform: "translate(0, -6)" }}
            scale={"time"}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="sunday"
            // height={10}
            // width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
          />
          {/* <ZAxis type="number" dataKey="value" domain={domain} range={range} /> */}
          {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} /> */}
          <Scatter data={data01} fill="#8884d8" />
          <Tooltip />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

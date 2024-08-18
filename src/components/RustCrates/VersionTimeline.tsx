import { Card, Typography } from "@mui/material";
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
  const { data } = useGetReleases(crates);
  const colourScale = getColourScale(crates.length);

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
            dataKey="value"
            tick={false}
            tickLine={false}
            axisLine={false}
          />
          {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={this.renderTooltip} /> */}
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

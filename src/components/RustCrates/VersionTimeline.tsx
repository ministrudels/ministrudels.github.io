import { Card, Typography } from "@mui/material";
import { ScaleOrdinal } from "d3";
import moment from "moment";
import {
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetReleases } from "./utils";

export const VersionTimeline = ({
  crates,
  colourScale,
}: {
  crates: string[];
  colourScale: ScaleOrdinal<string, string, never>;
}) => {
  const now = moment();
  const oneYearAgo = now.clone().subtract(1, "year");
  const { data } = useGetReleases(crates, oneYearAgo);

  // merge all the releases into one array
  const releases = Object.values(data).flatMap((releases) => releases);
  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Typography variant="body1">Version Releases</Typography>
      <ResponsiveContainer width="100%" height={100}>
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
          }}
        >
          <XAxis
            type="number"
            dataKey="date"
            ticks={[
              oneYearAgo.valueOf(),
              now.clone().subtract(9, "month").valueOf(),
              now.clone().subtract(6, "month").valueOf(),
              now.clone().subtract(3, "month").valueOf(),
              now.valueOf(),
            ]}
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
            content={({ payload }) => {
              const packageName = payload?.[0]?.payload.package as string;
              const date = moment(payload?.[0]?.payload.date).format(
                "YY MMM D"
              );
              return (
                <Card
                  sx={{
                    padding: 1,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span style={{ color: colourScale(packageName) }}>
                    {packageName}
                  </span>{" "}
                  released on {date}
                </Card>
              );
            }}
          />
          <Scatter name={"some name"} data={releases}>
            {releases.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colourScale(entry.package as string)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

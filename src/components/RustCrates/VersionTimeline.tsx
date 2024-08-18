import { Card, Typography } from "@mui/material";
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
import { getColourScale } from "../../utils";
import { useGetReleases } from "./utils";

interface CustomShapeProps {
  cx?: number;
  cy?: number;
  // payload?: Release;
}

// const CustomShape: React.FC<CustomShapeProps> = ({ cx, cy, payload }) => {

// };

export const VersionTimeline = ({ crates }: { crates: string[] }) => {
  const now = moment();
  const oneYearAgo = now.clone().subtract(1, "year");
  const { data } = useGetReleases(crates, oneYearAgo);
  // const timelineData = Object.values(data).flatMap((releases) => releases);
  const colourScale = getColourScale(crates.length);
  // console.log(data);
  // merge all the releases into one array
  const releases = Object.values(data).flatMap((releases) => releases);
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
              const packageName = payload?.[0]?.payload.package as string;
              const date = moment(payload?.[0]?.payload.date).format(
                "YY MMM D"
              );
              const value = payload?.[0]?.payload.value;
              return (
                <Card
                  sx={{
                    padding: 1,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span style={{ color: colourScale(value) }}>
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
                fill={colourScale(entry.value as number)}
              />
            ))}
          </Scatter>

          <Tooltip />
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

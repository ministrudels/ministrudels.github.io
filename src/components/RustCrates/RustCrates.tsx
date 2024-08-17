import { Grid, Typography } from "@mui/material";

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
import ExampleContainer from "../ExampleContainer";
import { useGetDownloadTimeSeries } from "./utils";

export default function RustCrates() {
  const { data, isLoading } = useGetDownloadTimeSeries("sqlx");

  // // convert to chart data
  // const chartData = data?.map((d) => ({
  //   name: d.date,
  //   pv: d.downloads,
  //   uv: 2400,
  // }));

  const chartData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <ExampleContainer
      title="Rust Crates"
      date={new Date("8 17 2024")}
      tags={["Rust", "visualization"]}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">
            It can be difficult to appraise crates in the Rust ecosystem. There
            are many. This is a simple component to compare downloads.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <Typography variant="body1">
            {isLoading ? "Loading..." : "Loaded!"}
          </Typography>
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

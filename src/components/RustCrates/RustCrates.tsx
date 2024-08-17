import { Divider, Grid, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExampleContainer from "../ExampleContainer";

import { useState } from "react";
import { InputCrate } from "./InputCrate";
import { useGetDownloadTimeSeries } from "./utils";

export default function RustCrates() {
  const [crates, setCrates] = useState<string[]>([]);
  const { data, isLoading } = useGetDownloadTimeSeries("sqlx");

  const handleDataFromChild = (data: string[]) => {
    setCrates(data);
  };

  const chartData = data?.map((d) => ({
    name: d.date,
    pv: d.downloads,
  }));

  return (
    <ExampleContainer title="Rust Crates" date={new Date("8 17 2024")}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">
            It can be difficult to appraise crates in the Rust ecosystem. There
            are many. This is a component to compare key metrics when appraising
            a crate.
          </Typography>
          <Divider />
        </Grid>
        <Grid item>
          {Array.from(crates).map((c) => (
            <Typography variant={"h1"} key={c}>
              {c}
            </Typography>
          ))}
          <InputCrate onCrateChange={handleDataFromChild} />
        </Grid>
        <Grid item xs={12}>
          <LineChart
            width={800}
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
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

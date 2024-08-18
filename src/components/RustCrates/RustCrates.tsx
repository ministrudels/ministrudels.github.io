import { Box, Divider, Grid, Typography } from "@mui/material";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExampleContainer from "../ExampleContainer";

import { useState } from "react";
import { getColourScale } from "../../utils";
import CrateLogo from "./cargo.png";
import { InputCrate } from "./InputCrate";
import { useGetDownloadTimeSeries } from "./utils";

export default function RustCrates() {
  const [crates, setCrates] = useState<string[]>([]);
  const { data, isLoading } = useGetDownloadTimeSeries(crates);

  const handleDataFromChild = (data: string[]) => {
    setCrates(data);
  };
  const colourScale = getColourScale(crates.length);

  return (
    <ExampleContainer title="Rust Crates" date={new Date("8 17 2024")}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">
            It can be difficult to appraise crates{" "}
            <span>
              <Box
                component="img"
                sx={{
                  height: 15,
                  width: 15,
                }}
                src={CrateLogo}
              />
            </span>{" "}
            in the Rust ecosystem. There are many. This is a component to
            compare key metrics when appraising a crate.
          </Typography>
          <Divider />
        </Grid>
        <Grid item>
          <InputCrate onCrateChange={handleDataFromChild} />
        </Grid>
        <Grid item xs={12}>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: "middle" }}
              >
                Total Downloads
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            {crates.map((crate, index) => (
              <Line
                key={crate}
                type="monotone"
                dataKey={crate}
                // stroke="#8884d8"
                stroke={colourScale(index)}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

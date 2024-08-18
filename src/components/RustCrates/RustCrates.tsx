import { Box, Card, Grid, Typography } from "@mui/material";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ExampleContainer from "../ExampleContainer";

import moment from "moment";
import { useState } from "react";
import { getColourScale } from "../../utils";
import CrateLogo from "./cargo.png";
import { InputCrate } from "./InputCrate";
import { useGetDownloadTimeSeries } from "./utils";

const TimeSeries = ({ crates }: { crates: string[] }) => {
  const { data } = useGetDownloadTimeSeries(crates);

  const colourScale = getColourScale(crates.length);

  return (
    <Card variant="outlined" sx={{ width: "100%", padding: 2 }}>
      {/* <ResponsiveContainer width="100%"> */}
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
          <YAxis style={{ fontSize: 10 }}>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
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
              stroke={colourScale(index)}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default function RustCrates() {
  const [crates, setCrates] = useState<string[]>([]);

  const handleDataFromChild = (data: string[]) => {
    setCrates(data);
  };

  return (
    <ExampleContainer
      title="Rust Crates"
      date={new Date("8 17 2024")}
      tags={["recharts", "custom hooks", "rust"]}
    >
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
        </Grid>
        <Grid
          item
          container
          alignItems={"flex-start"}
          sx={{
            width: "100%",
          }}
        >
          <Grid item xs={2}>
            <InputCrate onCrateChange={handleDataFromChild} />
          </Grid>
          <Grid
            item
            sx={{
              flexGrow: 1, // allows the item to grow and fill available space
            }}
          >
            <TimeSeries crates={crates} />
          </Grid>
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

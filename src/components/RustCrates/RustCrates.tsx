import { Box, Grid, Typography } from "@mui/material";
import ExampleContainer from "../ExampleContainer";

import { useState } from "react";
import { getOrdinalColourScale } from "../../utils";
import CrateLogo from "./cargo.png";
import { InputCrate } from "./InputCrate";
import { LatestVersions } from "./LatestVersions";
import { TimeSeries } from "./TimeSeries";
import { VersionTimeline } from "./VersionTimeline";

export default function RustCrates() {
  const [crates, setCrates] = useState<string[]>([]);

  const colourScale = getOrdinalColourScale(crates);
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
            container
            spacing={0.2}
            xs={10}
            sx={{
              flexGrow: 1, // allows the item to grow and fill available space
            }}
          >
            <Grid item xs={12}>
              <TimeSeries crates={crates} colourScale={colourScale} />
            </Grid>
            <Grid item xs={12}>
              <VersionTimeline crates={crates} colourScale={colourScale} />
            </Grid>
            <Grid item xs={4}>
              <LatestVersions crates={crates} colourScale={colourScale} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

import { Grid } from "@mui/material";

import D3andCanvas from "../D3andCanvas";
import DeltaIndicatorStorybook from "../DeltaIndicator/DeltaIndicatorStorybook";
import MalaysiasCovidVaccination from "../MalaysiasCovidVaccination";
import RustCrates from "../RustCrates";
import SliderAndBall from "../SliderAndBall";

export default function Studio() {
  return (
    <Grid container spacing={4} direction="column">
      <Grid item />

      <Grid item>
        <RustCrates />
      </Grid>

      <Grid item>
        <DeltaIndicatorStorybook />
      </Grid>

      <Grid item>
        <D3andCanvas />
      </Grid>

      <Grid item>
        <MalaysiasCovidVaccination />
      </Grid>

      <Grid item>
        <SliderAndBall />
      </Grid>
    </Grid>
  );
}

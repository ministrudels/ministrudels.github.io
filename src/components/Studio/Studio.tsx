import { Grid, Typography } from "@mui/material";

import D3andCanvas from "../D3andCanvas";
import MalaysiasCovidVaccination from "../MalaysiasCovidVaccination";
import SliderAndBall from "../SliderAndBall";

export default function Studio() {
  return (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Typography variant="body1" gutterBottom>
          Below are some sandbox experiments to play around with some front-end concepts.
        </Typography>
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

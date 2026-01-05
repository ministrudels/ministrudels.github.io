import { Grid, Typography } from "@mui/material";

import Studio from "../Studio";

function Intro() {
  return (
    <Grid item>
      <Typography align="justify" variant="body1">
        Hi, my name is Huan Min. I'm a software engineer based in London
        currently working at Wayve. I graduated from Imperial College London
        with an MSc in Computing and University College London with an MEng
        Mechanical Engineering.
      </Typography>
    </Grid>
  );
}

export default function Home() {
  return (
    <Grid container justifyContent="left" textAlign="left">
      <Grid item container spacing={10}>
        <Grid item></Grid>
        <Intro />
        <Grid />
        <Grid item container justifyContent={"center"}>
          <Studio />
        </Grid>
      </Grid>
    </Grid>
  );
}

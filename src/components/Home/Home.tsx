import { Button, Grid, Link, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import MenuBook from "@mui/icons-material/MenuBook";
import Studio from "../Studio";

const hoverColor = "#00bcd4";

function Intro() {
  return (
    <Grid item>
      <Typography align="justify" variant="body1">
        Hi, my name is Huan Min and I'm a software engineer based in London with
        an interest in data visualisation, data engineering and infrastructure
        technology. I graduated from Imperial College London with a Distinction
        in MSc Computing Science in 2019, and from University College London
        with a 1st class honours in MEng Mechanical Engineering in 2018.
      </Typography>
    </Grid>
  );
}
function Projects() {
  return (
    <Grid item>
      <ul>
        <li>
          <Typography>
            Object detection on TfL traffic cameras
            <Link href="http://doi.org/10.1016/j.eswa.2021.115154"></Link>
            <Button href="https://github.com/ministrudels/JamCam-Detector">
              <MenuBook
                color="action"
                sx={{
                  ":hover": {
                    color: hoverColor,
                  },
                }}
              />
            </Button>
            <Button href="https://github.com/ministrudels/JamCam-Detector">
              <GitHubIcon
                color="action"
                sx={{
                  ":hover": {
                    color: hoverColor,
                  },
                }}
              />
            </Button>
          </Typography>
        </li>
        <li>
          <Typography>
            Generating travel history from Google Maps location data
            <Button href="https://github.com/ministrudels/my-travel-history">
              <GitHubIcon
                color="action"
                sx={{
                  ":hover": {
                    color: hoverColor,
                  },
                }}
              />
            </Button>
          </Typography>
        </li>
        <li>
          <Typography>
            Find study rooms near you in UCL.
            <Button href="https://github.com/checo193/FloppyDons">
              <GitHubIcon
                color="action"
                sx={{
                  ":hover": {
                    color: hoverColor,
                  },
                }}
              />
            </Button>
          </Typography>
        </li>
      </ul>
    </Grid>
  );
}

export default function Home() {
  return (
    <Grid container justifyContent="left" textAlign="left">
      <Grid item container spacing={10}>
        <Grid item></Grid>
        <Intro />
        <Projects />
        <Grid />
        <Grid item container justifyContent={"center"}>
          <Studio />
        </Grid>
      </Grid>
    </Grid>
  );
}

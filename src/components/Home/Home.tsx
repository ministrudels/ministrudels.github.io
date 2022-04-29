import { Button, ButtonGroup, Divider, Grid, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ObservableIcon from "../../assets/observablehq-logo.svg";
import React from "react";
import Studio from "../Studio";

export default function Home() {
  return (
    <Grid container spacing={8}>
      <Grid item></Grid>
      <Grid item>
        <Typography align="justify" variant="body1">
          Hi, my name is Huan Min and I'm a software engineer based in London with an interest in data visualisation,
          data engineering and infrastructure technology. I graduated from Imperial College London with a Distinction in
          MSc Computing Science in 2019, and from University College London with a 1st class honours in MEng Mechanical
          Engineering in 2018.
        </Typography>
      </Grid>

      <Grid item container justifyContent="center">
        <ButtonGroup variant="text">
          <Button href="https://observablehq.com/@minimumness">
            <img
              style={{
                width: 100,
              }}
              src={ObservableIcon}
              alt=""
            />
          </Button>
          <Button href="https://github.com/ministrudels">
            <GitHubIcon
              style={{
                fontSize: 100,
              }}
            />
          </Button>
          <Button href="https://www.linkedin.com/in/huanmingan/">
            <LinkedInIcon
              style={{
                fontSize: 100,
              }}
            />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography align="justify" variant="h6">
          Other Projects
        </Typography>
        <Divider />
        <Typography align="justify" variant="subtitle2">
          Some cool things I've done!
        </Typography>
        <Typography variant="body1">
          <ul>
            <li>
              <a href="https://github.com/ministrudels/JamCam-Detector">JamCam Detector</a>: A scalable object detection
              system applied to London's traffic camera network.{" "}
              <a href="http://doi.org/10.1016/j.eswa.2021.115154">Publication</a>
            </li>
            <li>
              <a href="https://github.com/ministrudels/my-travel-history">My travel history</a>: A simple tool to
              extract your travel history using Google Map's location history.
            </li>
            <li>
              <a href="https://github.com/checo193/FloppyDons">UCL Room finder</a>: Find unbooked rooms near you in UCL.
            </li>
          </ul>
        </Typography>
      </Grid>
      <Grid item>
        <Studio />
      </Grid>
    </Grid>
  );
}

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
// import Ball from '../Ball';

export default function Sandbox() {

  return (
    <Grid container spacing={1} direction='column'>
      <Grid item>
        <Typography variant='body1' gutterBottom>
          Below are some sandbox examples to demonstrate some front-end concepts. Each example is tagged with a technology/concept it demonstrates.
        </Typography>
      </Grid>
      <Grid item>
        {/* <Ball /> */}
      </Grid>

      {/* Other ideas
      Moving chart according to time series - tags - d3, d3.transition
      Traffic patterns in London - tags - geospatial, tags - d3, d3.transition, observable
      HTML5 canvas and d3 - tags - canvas, d3
      Websocket app
       */}
    </Grid>
  );
}


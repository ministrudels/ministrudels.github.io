import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Ball from '../Ball';
import MalaysiasCovidVaccination from '../MalaysiasCovidVaccination'
export default function Studio() {

  return (
    <Grid container spacing={4} direction='column'>
      
      <Grid item>
        <Typography variant='body1' gutterBottom>
          Below are some sandbox examples to demonstrate some front-end concepts. Each example is tagged with a technology/concept it demonstrates.
        </Typography>
      </Grid>

      <Grid item>
        <MalaysiasCovidVaccination />
      </Grid>
      
      <Grid item>
        <Ball />
      </Grid>
    
    </Grid>
  );
}


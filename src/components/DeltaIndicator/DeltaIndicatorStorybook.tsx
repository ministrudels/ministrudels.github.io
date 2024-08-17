import { Divider, Grid, Typography } from "@mui/material";

import { useState } from "react";
import DeltaIndicator from ".";
import ExampleContainer from "../ExampleContainer";

const randomizedValues = () => {
  return Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ]);
};

export default function DeltaIndicatorStorybook() {
  const [previous, setPrevious] = useState(10);
  const [next, setNext] = useState(50);
  const [randomValues, setRandomValues] = useState<number[][]>(
    randomizedValues()
  );

  return (
    <ExampleContainer title="Delta Indicator" date={new Date("1 23 2024")}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">Controlled</Typography>
          <Divider />
          <br />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Previous</Typography>
          <input
            type="number"
            value={previous}
            onChange={(e) => setPrevious(+e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1">Next</Typography>
          <input
            type="number"
            value={next}
            onChange={(e) => setNext(+e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <DeltaIndicator previous={previous} next={next} />
        </Grid>

        <Grid item xs={12}>
          <br />
          <Typography variant="h6">Randomized values</Typography>
          <Divider />
          <br />
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setRandomValues(randomizedValues())}>
              Randomize
            </button>
          </div>
          <br />
          <Grid container direction={"column"} spacing={5}>
            {randomValues.map(([previous, next], i) => (
              <Grid item key={i}>
                <DeltaIndicator previous={previous} next={next} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ExampleContainer>
  );
}

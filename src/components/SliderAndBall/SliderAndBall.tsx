import * as d3 from "d3";

import { Grid, IconButton, Slider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getColourScale } from "../../utils";
import ExampleContainer from "../ExampleContainer";

const margin = 10;
const height = 200;
const width = 200;
const min = 0;
const maxX = width - 2 * margin;
const maxY = height - 2 * margin;
const maxDistance = Math.sqrt(maxX * maxX + maxY * maxY); // Pythagoras
const colourScale = getColourScale(maxDistance);

export default function Ball() {
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [shuffleXInterval, setShuffleXInterval] = useState<null | number>(null);
  const [shuffleYInterval, setShuffleYInterval] = useState<null | number>(null);
  const svgRefElement = useRef(null);

  // Parameter typing
  const handleXChange = (e: Event, value: number | number[]) => {
    if (shuffleXInterval) {
      clearInterval(shuffleXInterval);
      setShuffleXInterval(null);
    }
    setx(value as number);
  };

  const handleYChange = (e: Event, value: number | number[]) => {
    if (shuffleYInterval) {
      clearInterval(shuffleYInterval);
      setShuffleXInterval(null);
    }
    sety(value as number);
  };

  // Function typing
  const handleShuffleClickX: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (shuffleXInterval) {
      clearInterval(shuffleXInterval);
      setShuffleXInterval(null);
    } else {
      setShuffleXInterval(
        window.setInterval(
          () => setx(Math.random() * (width - 2 * margin + 1)),
          2000
        )
      );
    }
  };

  const handleShuffleClickY: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    if (shuffleYInterval) {
      clearInterval(shuffleYInterval);
      setShuffleYInterval(null);
    } else {
      setShuffleYInterval(
        window.setInterval(
          () => sety(Math.random() * (height - 2 * margin + 1)),
          2000
        )
      );
    }
  };

  const updateCircle = () => {
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    d3.select(svgRefElement.current)
      .selectAll("circle")
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("cx", x)
      .attr("cy", y)
      .style("fill", colourScale(distance));
  };

  const draw = () => {
    const rootSVG = d3
      .select(svgRefElement.current)
      .attr("viewBox", `${[0, 0, width, height]}`);
    const g = rootSVG
      .append("g")
      .attr("transform", `translate(${margin},${margin})`);
    g.append("circle").attr("r", margin);
  };

  useEffect(draw, []);
  useEffect(updateCircle, [x, y]);

  return (
    <ExampleContainer
      title="Slider and Ball"
      date={new Date("6 28 2021")}
      tags={["d3", "d3-transition", "setInterval"]}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">X Pos</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleShuffleClickX}>
            {shuffleXInterval ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            track={false}
            value={x}
            min={min}
            max={maxX}
            onChange={handleXChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="body1">Y Pos</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleShuffleClickY}>
            {shuffleYInterval ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Grid>

        <Grid item xs>
          <Slider
            track={false}
            value={y}
            min={min}
            max={maxY}
            onChange={handleYChange}
          />
        </Grid>
      </Grid>

      <div
        style={{
          height: height,
          width: width,
          border: "solid",
          borderRadius: 2,
          borderWidth: 1,
          borderColor: "gray",
          display: "block",
          margin: "auto",
        }}
      >
        <svg width="100%" height="100%" ref={svgRefElement} />
      </div>
    </ExampleContainer>
  );
}

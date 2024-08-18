import * as d3 from "d3";

import {
  Divider,
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { RefObject, useEffect, useRef, useState } from "react";

import { getColourScale } from "../../utils";
import ExampleContainer from "../ExampleContainer";

const MAX_CELLS = 100000;

const width = Math.min(Math.max(window.innerWidth - 400, 400), 600);
const layout = {
  cellSpacing: 1,
  cellSize: 1,
};
const cellsPerRow = width / (layout.cellSize + layout.cellSpacing);
const height =
  (MAX_CELLS / cellsPerRow) * (layout.cellSize + layout.cellSpacing);

type GraphicsElement = "canvas" | "svg";

export default function D3andCanvas() {
  const [graphicsElement, setGraphicsElement] =
    useState<GraphicsElement>("svg");
  const [squareCount, setSquareCount] = useState(12000);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const svgRef: RefObject<SVGSVGElement> = useRef(null);

  const redraw = () => {
    const colourScale = getColourScale(squareCount);
    const redrawCanvas = () => {
      // First we bind the new data to our custom DOM element
      d3.select(`custom`)
        .selectAll(".rect")
        .data(d3.range(squareCount), (d) => `${d}`)
        .join(
          (enter) =>
            enter
              .append("custom")
              .attr("class", "rect")
              .attr(
                "x",
                (d, i) =>
                  (i % cellsPerRow) * (layout.cellSize + layout.cellSpacing)
              )
              .attr(
                "y",
                (d, i) =>
                  Math.floor(i / cellsPerRow) *
                  (layout.cellSize + layout.cellSpacing)
              )
              .attr("width", (d, i) => layout.cellSize)
              .attr("height", (d, i) => layout.cellSize)
              .attr("fillStyle", (d) => colourScale(d)),
          (update) => update.attr("fillStyle", (d) => colourScale(d))
        );

      const context = canvasRef.current?.getContext("2d")!;
      const elements = d3.selectAll("custom.rect");
      context.canvas.width = Math.min(600, window.innerWidth - 400);
      context.canvas.height =
        (MAX_CELLS / cellsPerRow) * (layout.cellSize + layout.cellSpacing);
      context.clearRect(0, 0, width, height);
      elements.each(function (d, i) {
        // This is each individual element in the loop.
        let node = d3.select(this);
        context.fillStyle = node.attr("fillStyle");
        context.fillRect(
          +node.attr("x"),
          +node.attr("y"),
          +node.attr("width"),
          +node.attr("height")
        );
      });
    };

    const redrawSVG = () => {
      d3.select(svgRef.current).attr("viewBox", `${[0, 0, width, height]}`);
      d3.select(svgRef.current)
        .selectAll(".rect")
        .data(d3.range(squareCount), (d) => `${d}`)
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("class", "rect")
              .attr(
                "x",
                (_, i) =>
                  (i % cellsPerRow) * (layout.cellSize + layout.cellSpacing)
              )
              .attr(
                "y",
                (_, i) =>
                  Math.floor(i / cellsPerRow) *
                  (layout.cellSize + layout.cellSpacing)
              )
              .attr("width", (_, i) => layout.cellSize)
              .attr("height", (_, i) => layout.cellSize)
              .style("fill", (_, i) => colourScale(i)),
          (update) => update.style("fill", (_, i) => colourScale(i))
        );
    };

    if (graphicsElement === "canvas") {
      d3.select(svgRef.current).style("display", "none");
      redrawCanvas();
    }
    if (graphicsElement === "svg") {
      const context = canvasRef.current?.getContext("2d")!;
      context.clearRect(0, 0, width, height);
      d3.select(svgRef.current).style("display", "block");
      redrawSVG();
    }
  };

  const handleChange = (e: Event, value: number | number[]) => {
    setSquareCount(+value);
  };

  const initialiseCustom = () => {
    /**Create a custom element to bind data to before drawing on the canvas */
    d3.select("#drawingContainer").append("custom");
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  };

  useEffect(initialiseCustom, []);
  useEffect(redraw);

  return (
    <ExampleContainer
      title="D3 and Canvas"
      date={new Date("7 21 2021")}
      tags={["d3", "svg", "canvas"]}
    >
      <Typography variant="body1" align="justify">
        There are situations in data visualisation where we need to visualise a
        large amount of data. There is only so many datapoints which can be
        displayed on a screen until it is considered information overload for
        the user. In most cases, we would consider applying additional filters
        to simply reduce the number of datapoints and inevitably, elements to
        render.
        <br />
        <br />
        But what if there is a visualisation which shouldnt be limited by the
        number of its datapoints? HTML5 Canvas is more performant medium but has
        a less mature API.
        <br />
        <br />
        This studio example experiments with D3's data bind paradigm to drive
        visualisations onto HTML5's performant canvas element.
      </Typography>
      <Divider />
      <br />
      <Grid container spacing={2} alignItems="center">
        <Grid item lg={9}>
          <Typography>{squareCount} squares</Typography>
          <Slider
            value={squareCount}
            min={0}
            max={MAX_CELLS}
            onChange={handleChange}
          ></Slider>
        </Grid>
        <Grid item lg={3}>
          <ToggleButtonGroup
            exclusive
            value={graphicsElement}
            onChange={(e, value) => setGraphicsElement(value)}
            aria-label="text alignment"
          >
            <ToggleButton value="svg">svg</ToggleButton>
            <ToggleButton value="canvas">canvas</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>

      <div
        style={{
          height: height,
          width: width + 1,
          borderRadius: 2,
          borderWidth: 1,
          display: "block",
          margin: "10px auto",
        }}
        id="drawingContainer"
      >
        <svg width="100%" height="100%" ref={svgRef} />
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={canvasRef}
        ></canvas>
      </div>
    </ExampleContainer>
  );
}

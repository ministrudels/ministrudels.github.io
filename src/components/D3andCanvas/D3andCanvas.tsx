import React, { useState, useEffect, useRef, RefObject } from "react";
import ExampleContainer from "../ExampleContainer";
import * as d3 from "d3";
import { Divider, Input, InputBase, Slider, TextField, Typography } from "@material-ui/core";

const height = 400;
const width = 600;
const layout = {
  cellSpacing: 1,
  cellSize: 3,
};
const cellsPerRow = width / (layout.cellSize + layout.cellSpacing)

export default function D3andCanvasl() {
  const [number, setNumber] = useState(12000);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  const redrawCanvas = () => {
    const data = d3.range(number);
    const colourScale = d3.scaleSequential(d3.extent(data) as [number, number], d3.interpolateSpectral)
    // First we bind the new data to our custom DOM element
    d3.select(`custom`)
      .selectAll(".rect")
      .data(data, (d) => `${d}`)
      .join((enter) =>
        enter
          .append("custom")
          .attr("class", "rect")
          .attr(
            "x",
            (d, i) => (i % cellsPerRow) * (layout.cellSize + layout.cellSpacing)
          )
          .attr(
            "y",
            (d, i) =>
              Math.floor(i / cellsPerRow) * (layout.cellSize + layout.cellSpacing)
          )
          .attr("width", (d, i) => layout.cellSize)
          .attr("height", (d, i) => layout.cellSize)
          .attr("fillStyle", (d) => colourScale(d)),
        (update) => update.attr("fillStyle", (d) => colourScale(d)),
      );

    const context = canvasRef.current?.getContext("2d")!;
    const elements = d3.selectAll("custom.rect");
    context.clearRect(0, 0, width, height)
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

  const initialiseCustom = () => {
    d3.select('#canvasContainer').append("custom")
  };

  const handleChange = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    setNumber(+value);
  };

  useEffect(initialiseCustom, []);
  useEffect(redrawCanvas, [number]);

  return (
    <ExampleContainer
      title="D3 and Canvas"
      date={new Date()}
      tags={["d3", "canvas"]}
    >
      <Typography variant="body1" align="justify">
        I've been using d3 and SVG for about a year and a half now to facilitate
        data exploration. Data exploration in essence is about uncover patterns,
        characteristics, and points of interest in a given dataset. This process
        helps create a broad picture of important trends and major points to
        study in greater detail. In order to facilitate greater user driven
        exploration of a given data set, interactive elements are then provided
        to users to "slice and dice" the data down to a smaller subset, and
        render a visualisation off of it.
        <br />
        <br />
        In most cases, a subset which is large enough to affect browser
        performance using svgs is also information overload for the user. But
        what if it isnt? What if one day, there is an awesome visualisation of a
        huge dataset which is logical for a user to view, yet svgs just cant
        keep up?
        <br />
        <br />
        This studio example is uses D3's data bind model to drive visualisations
        onto HTML5's performant canvas element.
      </Typography>
      {/* <TextField
        label="Number"
        type="number"
        variant='outlined'
        disabled
        value={number}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
       */}
      <Divider />
      <br />
      <InputBase
        value={number}
        disabled
      />
      <Slider
        value={number}
        min={0}
        max={15000}
        onChange={handleChange}
      />
      <div style={{
        height: height,
        width: width + 1,
        border: 'solid',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'gray',
        display: 'block',
        margin: '10px auto',
      }} id="canvasContainer">
        <canvas width={width} height={height} ref={canvasRef}></canvas>
      </div>
    </ExampleContainer>
  );
}

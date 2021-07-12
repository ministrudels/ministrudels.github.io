import React, { useState, useEffect, useRef, RefObject } from "react";
import ExampleContainer from "../ExampleContainer";
import * as d3 from "d3";
import { Input, TextField, Typography } from "@material-ui/core";

const margin = 10;
const height = 200;
const width = 500;
const customBaseId = "customElement";
const layout = {
  cellSpacing: 2,
  cellSize: 3,
};

export default function D3andCanvasl() {
  const [number, setNumber] = useState(50);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  const redrawCanvas = () => {
    console.log("redrawing...");
    const data = d3.range(number);
    const colourScale = d3.scaleSequential(d3.interpolateSpectral).domain(data);
    // First we bind the new data to our custom DOM element
    d3.select(`#${customBaseId}`)
      .selectAll(".rect")
      .data(data, (d) => `${d}`)
      .join((enter) =>
        enter
          .append("custom")
          .attr("class", "rect")
          .attr(
            "x",
            (d, i) => (i % 100) * (layout.cellSize + layout.cellSpacing)
          )
          .attr(
            "y",
            (d, i) =>
              Math.floor(i / 100) * (layout.cellSize + layout.cellSpacing)
          )
          .attr("width", (d, i) => layout.cellSize)
          .attr("height", (d, i) => layout.cellSize)
          .attr("fillStyle", (d) => colourScale(d))
      );

    const context = canvasRef.current?.getContext("2d")!;
    context.fillRect(0, 0, 50, 50)
    // Select the canvas's context
    // const t = d3.timer(function (elapsed) {
    //   const context = canvasRef.current?.getContext("2d")!;
    //   context.clearRect(0, 0, width, height);
    //   const elements = d3.selectAll("customElement.rect");
    //   elements.each(function (d, i) {
    //     // This is each individual element in the loop.
    //     let node = d3.select(this);
    //     context.fillStyle = node.attr("fillStyle");
    //     context.fillRect(
    //       +node.attr("x"),
    //       +node.attr("y"),
    //       +node.attr("width"),
    //       +node.attr("height")
    //     );
    //   });
    //   if (elapsed > 1000) t.stop();
    // }); // Timer running the draw function repeatedly for 300 ms.
  };

  const initialiseCustom = () => {
    document.createElement("custom").setAttribute("id", customBaseId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(+e.target.value);
  };

  useEffect(redrawCanvas, [number]);
  useEffect(initialiseCustom, []);

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
      <TextField
        id="standard-number"
        label="Number"
        type="number"
        value={number}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <div id="canvasContainer">
        <canvas ref={canvasRef}></canvas>
      </div>
    </ExampleContainer>
  );
}

import { Box } from "@mui/material";
import * as d3 from "d3";
import React from "react";

const NEUTRAL = d3.interpolateCool(0.3);
const INCREASE = d3.interpolateCool(0.8);
const DECREASE = d3.interpolateWarm(0.4);

const BarCSS: React.CSSProperties = {
  height: "20px",
  position: "absolute",
  borderRadius: "5px",
};

const containerStyle: React.CSSProperties = {
  position: "relative", // Parent container must be relative
  width: "100%", // Set the desired width for the container
  height: "5px", // Ensure the container has the same height as the bars
};

/**
 *
 * @param previous - previous value between 0 and 100
 * @param next - next value between 0 and 100
 * @returns
 */
export default function Delta({
  previous,
  next,
}: {
  previous: number;
  next: number;
}) {
  const isIncrease = next > previous;
  const isDecrease = next < previous;
  const diff = Math.abs(next - previous);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "left" }}>{`${previous} → ${next}`}</Box>
        <Box sx={{ textAlign: "right" }}>
          {isIncrease && `+`}
          {isDecrease && `-`}
          {diff}
        </Box>
      </Box>
      <div style={containerStyle}>
        <div
          style={{ ...BarCSS, width: "100%", backgroundColor: "lightgray" }}
        />
        {isIncrease && (
          <>
            <div
              style={{
                ...BarCSS,
                width: `${next}%`,
                backgroundColor: INCREASE,
              }}
            />
            <div
              style={{
                ...BarCSS,
                width: `${previous}%`,
                backgroundColor: NEUTRAL,
              }}
            />
          </>
        )}
        {isDecrease && (
          <>
            <div
              style={{
                ...BarCSS,
                width: `${previous}%`,
                backgroundColor: NEUTRAL,
              }}
            />
            <div
              style={{
                ...BarCSS,
                left: `${next}%`,
                width: `${diff}%`,
                backgroundColor: DECREASE,
              }}
            />
          </>
        )}
        {!isIncrease && !isDecrease && (
          <div
            style={{
              ...BarCSS,
              width: `${previous}%`,
              backgroundColor: NEUTRAL,
            }}
          />
        )}
      </div>
    </div>
  );
}

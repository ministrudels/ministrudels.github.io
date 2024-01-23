import React from "react";

const BarCSS: React.CSSProperties = {
  height: "10px",
  position: "absolute",
};

const containerStyle: React.CSSProperties = {
  position: "relative", // Parent container must be relative
  width: "100%", // Set the desired width for the container
  height: "10px", // Ensure the container has the same height as the bars
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
    <>
      <div style={{ textAlign: "right" }}>
        {isIncrease && `+`}
        {isDecrease && `-`}
        {diff}
      </div>
      <div style={containerStyle}>
        <div style={{ ...BarCSS, width: "100%", backgroundColor: "grey" }} />
        <div
          style={{ ...BarCSS, width: `${next}%`, backgroundColor: "blue" }}
        />
        {isIncrease && (
          <div
            style={{
              ...BarCSS,
              left: `${previous}%`,
              width: `${diff}%`,
              backgroundColor: "green",
            }}
          />
        )}
        {isDecrease && (
          <div
            style={{
              ...BarCSS,
              left: `${next}%`,
              width: `${diff}%`,
              backgroundColor: "red",
            }}
          />
        )}
      </div>
    </>
  );
}

import * as d3 from "d3";

/** Given a number, return a d3 rainbow colour scale ranging from 0 - number */
export const getColourScale = (number: number) => {
  return d3.scaleSequential([0, number], d3.interpolateRainbow);
};

/** Given an array, return a n ordinal colour scale */
export const getOrdinalColourScale = (array: string[]) => {
  return d3.scaleOrdinal(d3.schemeCategory10).domain(array);
};

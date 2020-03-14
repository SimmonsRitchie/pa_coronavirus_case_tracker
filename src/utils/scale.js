/* Set your chart color scale here */

import { scaleOrdinal } from "d3-scale";

// COLORS
const yes = "#A1DBF4"
const yesSub = "#D9ECF4"
const no = "#FFD4BF"
const na = lightGray

export const domain = ["Yes", "Yes - partial", "No","N/A"]

export const colorFillScale = scaleOrdinal()
  .domain(domain)
  .range([yes, yesSub, no, na])
  .unknown(lightGray);

export const colorTextScale = scaleOrdinal()
  .domain(domain)
  .range([fontGray])
  .unknown(fontGray)

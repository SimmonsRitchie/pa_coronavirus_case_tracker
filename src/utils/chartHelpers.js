import { format } from "d3-format";

export const xTickCalc = (screenWidth) => {
  if (screenWidth < 550) {
    return 3;
  } else {
    return 5;
  }
};

// Formats thousands, 1000 becomes 1k, etc.
export const formatK = format("~s");

// Formats commas, 1000 becomes 1,000
export const formatComma = format(",");


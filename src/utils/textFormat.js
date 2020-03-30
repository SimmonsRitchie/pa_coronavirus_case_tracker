import { format } from "d3-format";
import React from "react";
import { B } from "../components/Formatters";
export const genTestsDescrip = data => {
  const formatPercent = format(".1%");
  const formatComma = format(",");
  const tests = data.paTests;
  const { mostRecentDate } = tests.meta;
  const formatMostRecentDate = mostRecentDate.format("MMM D");
  const percentPositive = formatPercent(
    tests.testData.find(item => item.category === "percent_positive").total
  );
  const totalTested = formatComma(
    tests.testData.find(item => item.category === "total").total
  );
  console.log(percentPositive);
  console.log(totalTested);
  console.log(tests);
  console.log(formatMostRecentDate);
  const descrip = (
    <span>
      <B>{percentPositive}</B> of <B>{totalTested}</B> Pennsylvanians have
      tested positive for the Coronavirus. The chart shows a running total of
      positive vs negative results.
    </span>
  );
  return descrip;
};

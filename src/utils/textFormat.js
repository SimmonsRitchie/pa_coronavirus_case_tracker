import { format } from "d3-format";
import React from "react";
import { B, Color } from "../components/Formatters";
export const genTestsDescrip = data => {
  const formatPercent = format(".1%");
  const formatComma = format(",");
  const tests = data.paTests;
  const { mostRecentDate } = tests.meta;
  const formatMostRecentDate = mostRecentDate.format("MMM D");
  const positiveTests = tests.testData.find(item => item.category === "positive").total
  const totalTested = tests.testData.find(item => item.category === "total").total
  const cleanPercPos = formatPercent(positiveTests / totalTested)
  const cleanTotalTested = formatComma(totalTested)

  const descrip = (
    <span>
      <B>{cleanPercPos}</B> of <B>{cleanTotalTested}</B> Pennsylvanians have
      tested positive for the Coronavirus as of <B>{formatMostRecentDate}</B>. The chart shows a running total
       of <Color series={1}>positive</Color> vs <Color series={2}>negative</Color> results.
    </span>
  );
  return descrip;
};

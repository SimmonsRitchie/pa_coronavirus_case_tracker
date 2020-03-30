import { format } from "d3-format";
import React from "react";
import { B, LegText } from "../components/Formatters";
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
       of <LegText series={2}>positive</LegText> and <LegText series={1}>negative</LegText> results.
    </span>
  );
  return descrip;
};

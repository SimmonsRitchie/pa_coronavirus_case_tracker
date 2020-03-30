import React from 'react';
import { format } from 'd3-format'

const CrosshairData = ({values}) => {
  const formatComma = format(",")
  const positiveTests = values[0].y
  const negativeTests = values[1].y
  const percentPos = positiveTests / ( positiveTests + negativeTests)
  const formatPercent = format(".1%")

  return (
    <div className="tests-chart__crosshair-container">
    <div className="tests-chart__crosshair-label">
      {values[0].x.format("MMM D")}
    </div>
    <div>{formatComma(positiveTests)} positive</div>
    <div>{formatComma(negativeTests)} negative</div>
    <div>{formatPercent(percentPos)} positive</div>
  </div>
  )
}

export default CrosshairData;
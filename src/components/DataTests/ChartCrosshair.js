import React from 'react';
import { format } from 'd3-format'

const ChartCrosshair = ({values}) => {
  const formatComma = format(",")
  const positiveTests = values[0].y
  const negativeTests = values[1].y
  const totalTests = positiveTests + negativeTests
  const percentPos = positiveTests / ( positiveTests + negativeTests)
  const formatPercent = format(".1%")

  return (
    <div className="data-tests-crosshair__container">
    <div className="data-tests-crosshair__label">
      {values[0].x.format("MMM D")}
    </div>
    <div>Positive tests: {formatPercent(percentPos)}</div>
    <div>Total tests: {formatComma(totalTests)}</div>
  </div>
  )
}

export default ChartCrosshair;
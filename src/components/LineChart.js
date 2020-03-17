import React from 'react';
import {FlexibleXYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis} from "react-vis";

const LineChart = () => {
  return (
  <div className="line-chart__container">
    <FlexibleXYPlot
      // height={300}
      // width={700}
      colorType="category"
      colorDomain={[0, 1, 2]}
      colorRange={myPalette}
    >
      <LineSeries data={series1} color={0} />
      <LineSeries data={series2} color={1} />
      <LineSeries data={series3} color={2} />
    <HorizontalGridLines />
      <XAxis />
      <YAxis />
    </FlexibleXYPlot>
  </div> );
}
 
export default LineChart;
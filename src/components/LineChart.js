import React, {useContext} from "react";
import {
  FlexibleXYPlot,
  XYPlot,
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";


const LineChart = ({size}) => {


  const series1 = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  const myPalette = ["red", "green", "blue"];
  const dynamicWidth = size.width
  const dynamicHeight = size.width * 0.6

  return (
      <div style={{
        width:"100%",
        height: dynamicHeight
      }}>
        <FlexibleXYPlot        >
        <HorizontalGridLines />

          <LineSeries data={series1} />
          <XAxis />
          <YAxis />
        </FlexibleXYPlot>
      </div>
  );
};

export default LineChart;

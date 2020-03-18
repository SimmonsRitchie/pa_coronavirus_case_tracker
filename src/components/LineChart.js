import React, { useContext, useState } from "react";
import {
  FlexibleXYPlot,
  XYPlot,
  FlexibleWidthXYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint,
  Crosshair
} from "react-vis";
import moment from "moment";
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse";
import { xTickCalc } from "~/utils/chartHelpers";

const LineChart = ({ size }) => {
  const [crosshairValues, setCrosshairValues] = useState();
  const screenWidth = window.innerWidth;
  const { data } = useContext(DataContext);
  const casesTotalRow = getRowByName(data.paCases, "county", "total");
  const xYPoints = casesTotalRow.dates.map(item => {
    return {
      x: item.date,
      y: +item.count
    };
  });
  const dynamicHeight = size.width * 0.6;
  const xTickTotal = xTickCalc(screenWidth);

  const _onMouseLeave = () => {
    setCrosshairValues(null);
  };

  const _onNearestX = (value, {index}) => {
    //const val = DATA.map(d => d[index])
    const val = [xYPoints[index]]
    // const val = DATA[0][index]
    console.log("data", DATA)
    console.log("recieved value",value)
    console.log("recieved index",index)
    console.log("processed val", val)
    setCrosshairValues(val);
  };

  const DATA = [
    [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}],
    [{x: 1, y: 20}, {x: 2, y: 5}, {x: 3, y: 15}]
  ];

  return (
    <div className="line-chart__container">
      <div
        style={{
          width: "100%",
          height: dynamicHeight
        }}
      >
        <FlexibleXYPlot margin={{ right: 20 }} xType={"time"} yType={"linear"} onMouseLeave={_onMouseLeave}>
          <HorizontalGridLines tickTotal={5} />
          <XAxis
            className={"line-chart__x-axis"}
            tickTotal={xTickTotal}
            tickFormat={val => {
              val = moment(val);
              return val.format("MMM D");
            }}
          />
          <YAxis className={"line-chart__y-axis"} tickTotal={5} />
          <LineSeries
            data={xYPoints}
            onNearestX={_onNearestX}
          />
          {crosshairValues && <Crosshair values={crosshairValues}>
            <div className="line-chart__crosshair-container">
              <div className="line-chart__crosshair-label">{crosshairValues[0].y} cases</div>
            </div>
          </Crosshair>}
        </FlexibleXYPlot>
      </div>
    </div>
  );
};

export default LineChart;
//hintVal ? <Hint value={hintVal} /> : null

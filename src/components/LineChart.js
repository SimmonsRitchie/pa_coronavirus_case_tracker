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
import moment from 'moment';
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse"
import { xTickCalc} from "~/utils/chartHelpers"

const LineChart = ({size}) => {
  const screenWidth = window.innerWidth
  const { data } = useContext(DataContext);
  const casesTotalRow = getRowByName(data.paCases, "county","total")
  const xYPoints = casesTotalRow.dates.map( item => {
    return {
      x: item.date,
      y: +item.count
    }
  })
  console.log(xYPoints)
  const dynamicHeight = size.width * 0.6
  const xTickTotal = xTickCalc(screenWidth)


  return (
      <div className="line-chart__container">
        <div style={{
          width:"100%",
          height: dynamicHeight
        }}>
          <FlexibleXYPlot
          margin={{right: 20}}        
          xType={'time'}
          yType={'linear'}
          >
          <HorizontalGridLines tickTotal={5}/>
            <LineSeries data={xYPoints}/>
            <XAxis
              className={"line-chart__x-axis"}
              tickTotal={xTickTotal}
              tickFormat={(val) => {
                val = moment(val)
                return val.format("MMM D")
              }}/>
            <YAxis
              className={"line-chart__y-axis"}
              tickTotal={5}
            />
          </FlexibleXYPlot>
        </div>
      </div>
  );
};

export default LineChart;

import React, { useContext, useState } from "react";
import {
  FlexibleXYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair
} from "react-vis";
import moment from "moment";
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse";
import { xTickCalc } from "~/utils/chartHelpers";
import LineChartButtons from "./LineChartButtons";
import LineChartDisplay from "./LineChartDisplay";


const CHART_TYPES = [
  {
    "id": "semi-log",
    "title": "Trend",
    "yAxisType": "log",
    "buttonText": "Trend",
    "yAxisTickTotal": 2,
    "desc": "This graph is adjusted for exponential growth. A shallower curve means new cases are slowing.",
  },
  {
    "id": "linear",
    "title": "Total cases",
    "buttonText": "Totals",
    "yAxisType": "linear",
    "yAxisTickTotal": 5,
    "desc": "This graph shows a running total of cases.",
  },
]


const LineChart = ({ size, heightRatio, margin }) => {
  const [crosshairValues, setCrosshairValues] = useState();
  const [chartType, changeChartType] = useState(CHART_TYPES[0].id);
  const [yAxisType, changeYAxisType] = useState(CHART_TYPES[0].yAxisType);
  const [yAxisTickTotal, changeYAxisTickTotal] = useState(CHART_TYPES[0].yAxisTickTotal);
  const [chartTitle, changeChartTitle] = useState(CHART_TYPES[0].title);
  const [chartDesc, changeChartDesc] = useState(CHART_TYPES[0].desc);
  const screenWidth = window.innerWidth;
  const { data } = useContext(DataContext);
  const casesTotalRow = getRowByName(
    data.paCases.countyData,
    "county",
    "total"
  );
  const xYPoints = casesTotalRow.dates.map(item => {
    return {
      x: item.date,
      y: +item.count
    };
  });
  const specialMargin = 0.2
  const dynamicHeight = size.width * (heightRatio - (margin + specialMargin));
  const dynamicMargin = size.width < 550 ? 50 : size.width * 0.08;
  const xTickTotal = xTickCalc(screenWidth);

  const _onMouseLeave = () => {
    setCrosshairValues(null);
  };

  const _onNearestX = (value, { index }) => {
    const val = [xYPoints[index]];
    setCrosshairValues(val);
  };

const handleButtonClick = (value) => {
    let chartInfo
    if (value === 'semi-log') {
      chartInfo = CHART_TYPES[0]
    } else {
      chartInfo = CHART_TYPES[1]
    }
  changeChartType(value)
  changeYAxisType(chartInfo.yAxisType)
  changeYAxisTickTotal(chartInfo.yAxisTickTotal)
  changeChartDesc(chartInfo.desc)
  changeChartTitle(chartInfo.title)
}

  return (
    <div className="line-chart__container">
      <div className="line-chart__summary-container">
        <LineChartButtons buttons={CHART_TYPES} selected={chartType} handleButtonClick={handleButtonClick} /> 
        <LineChartDisplay title={chartTitle} desc={chartDesc}/>
      </div>
      <div
        style={{
          width: "100%",
          height: dynamicHeight
        }}
      >
        <FlexibleXYPlot
          margin={{ right: dynamicMargin, left: dynamicMargin }}
          xType={"time"}
          yType={yAxisType}
          onMouseLeave={_onMouseLeave}
        >
          <HorizontalGridLines />
          <XAxis
            className={"line-chart__x-axis"}
            tickTotal={xTickTotal}
            tickFormat={val => {
              val = moment(val);
              return val.format("MMM D");
            }}
          />
          <YAxis
            className={"line-chart__y-axis"}
            tickTotal={yAxisTickTotal}
            tickFormat={(value) => {
              // To stop log scale from changing format into scientific notation
              return +value;
            }}
          />
          <LineSeries
            className={"line-chart__line-series-1"}
            data={xYPoints}
            onNearestX={_onNearestX}
          />
          {crosshairValues && (
            <Crosshair values={crosshairValues}>
              <div className="line-chart__crosshair-container">
                <div className="line-chart__crosshair-label">
                  {crosshairValues[0].x.format("MMM D")}
                </div>
                <div>{crosshairValues[0].y} cases</div>
              </div>
            </Crosshair>
          )}
        </FlexibleXYPlot>
      </div>
    </div>
  );
};

export default LineChart;
//hintVal ? <Hint value={hintVal} /> : null

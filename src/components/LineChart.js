import React, { Component, useContext, useState } from "react";
import { throttle } from "throttle-debounce"
import {
  FlexibleXYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  XYPlot
} from "react-vis";
import moment from "moment";
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse";
import { xTickCalc } from "~/utils/chartHelpers";
import LineChartButtons from "./LineChartButtons";
import LineChartDisplay from "./LineChartDisplay";

const CHART_TYPES = [
  {
    chartType: "semi-log",
    title: "Trend",
    yAxisType: "log",
    buttonText: "Trend",
    yAxisTickTotal: 2,
    chartDesc:
      "This graph is adjusted for exponential growth. A shallower curve means the rate of new cases is slowing."
  },
  {
    chartType: "linear",
    title: "Total cases",
    buttonText: "Total",
    yAxisType: "linear",
    yAxisTickTotal: 5,
    chartDesc: "This graph shows a running total of cases."
  }
];

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef()
    this.state = {
      ...CHART_TYPES[0],
      crosshairValues: null,
      xYPoints: null,
      dynamicChartHeight: 0,
      dynamicChartWidth: 0
    };
    this.resizeChart = this.resizeChart.bind(this);
    this.throttledHandleWindowResize = throttle(300, this.resizeChart);
  }

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
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
    this.resizeChart()
    window.addEventListener("resize", this.throttledHandleWindowResize);
    this.setState({
      xYPoints
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttledHandleWindowResize);
  }

  resizeChart() {
    // react-vis's graphs aren't responsive, so we resize the chart ourselves
    const chartContainerHeight = this.chartContainer.current.offsetHeight
    const chartContainerWidth = this.chartContainer.current.offsetWidth
    this.setState({
      dynamicChartHeight: chartContainerHeight,
      dynamicChartWidth: chartContainerWidth,
    })
  }

  onMouseLeave = () => {
    this.setState({
      crosshairValues: null
    });
  };

  onNearestX = (value, { index }) => {
    const val = [this.state.xYPoints[index]];
    this.setState({
      crosshairValues: val
    });
  };

  handleButtonClick = value => {
    if (value === "semi-log") {
      this.setState({
        ...CHART_TYPES[0]
      });
    } else {
      this.setState({
        ...CHART_TYPES[1]
      });
    }
  };

  render() {
    // GET PROPS + STATE
    const { size, margin, heightRatio } = this.props
    const {
      crosshairValues,
      chartType,
      chartTitle,
      chartDesc,
      yAxisTickTotal,
      yAxisType,
      xYPoints,
      dynamicChartHeight,
      dynamicChartWidth
    } = this.state;

    // HANDLE SIZING
    const screenWidth = window.innerWidth;
    const dynamicMargin = size.width < 550 ? 50 : size.width * 0.08;
    const xTickTotal = xTickCalc(screenWidth);

    return (
      <div className="line-chart__container" 
      style={{
        width: "100%",
        height: size.width * heightRatio
      }}>
        <div className="line-chart__summary-container" >
          <LineChartButtons
            buttons={CHART_TYPES}
            selected={chartType}
            handleButtonClick={this.handleButtonClick}
          />
          <LineChartDisplay title={chartTitle} desc={chartDesc} />
        </div>
        <div className="line-chart__chart-outer-container" ref={this.chartContainer}
        >
            <XYPlot
              height={dynamicChartHeight}
              width={dynamicChartWidth}
              margin={{ right: dynamicMargin, left: dynamicMargin }}
              xType={"time"}
              yType={yAxisType}
              onMouseLeave={this.onMouseLeave}
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
                tickFormat={value => {
                  // To stop log scale from changing format into scientific notation
                  return +value;
                }}
              />
              <LineSeries
                className={"line-chart__line-series-1"}
                data={xYPoints}
                onNearestX={this.onNearestX}
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
            </XYPlot>
          </div>
      </div>
    );
  }
}

export default LineChart;

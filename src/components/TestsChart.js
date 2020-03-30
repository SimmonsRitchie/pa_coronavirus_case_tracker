import React, { Component } from "react";
import withResponsiveContainer from "./hoc/withResponsiveContainer";
import {
  AreaSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  XYPlot
} from "react-vis";
import moment from "moment";

class TestsChart extends Component {
  state = {
    crosshairValues: []
  };

  onMouseLeave = () => {
    this.setState({
      crosshairValues: []
    });
  };

  onNearestX = (value, { index }) => {
    /**
     * Event handler for onNearestX.
     * @param {Object} value Selected value.
     * @param {index} index Index of the value in the data array.
     */
    const data = this.props.data;
    const crosshairValues = data.map(d => d[index]);
    this.setState({ crosshairValues });
  };

  render() {
    const {
      height,
      width,
      data,
      yAxisType,
      xTickTotal,
      yAxisTickTotal
    } = this.props;
    const { crosshairValues } = this.state;
    const dynamicMargin = width < 550 ? 50 : width * 0.08;

    return (
      <XYPlot
        height={height}
        width={width}
        margin={{ right: dynamicMargin, left: dynamicMargin }}
        xType={"time"}
        yType={yAxisType}
        onMouseLeave={this.onMouseLeave}
      >
        <HorizontalGridLines />
        <XAxis
          className={"tests-chart__x-axis"}
          tickTotal={xTickTotal}
          tickFormat={val => {
            val = moment(val);
            return val.format("MMM D");
          }}
        />
        <YAxis
          className={"tests-chart__y-axis"}
          tickTotal={yAxisTickTotal}
          tickFormat={value => {
            // To stop log scale from changing format into scientific notation
            return +value;
          }}
        />
        <AreaSeries className={"tests-chart__area-series-1"} data={data[1]} />
        <AreaSeries
          className={"tests-chart__area-series-1"}
          data={data[0]}
          onNearestX={this.onNearestX}
        />
        {crosshairValues[0] && (
          <Crosshair values={crosshairValues}>
            <div className="tests-chart__crosshair-container">
            {console.log(crosshairValues)}
              <div className="tests-chart__crosshair-label">
                {crosshairValues[0].x.format("MMM D")}
              </div>
              <div>{crosshairValues[0].y} positive</div>
              <div>{crosshairValues[1].y} negative</div>
            </div>
            ;
          </Crosshair>
        )}
      </XYPlot>
    );
  }
}

const ResponsiveChart = withResponsiveContainer(TestsChart);

export default ResponsiveChart;

import React, { Component } from "react";
import withResponsiveContainer from "./hoc/withResponsiveContainer";
import CrosshairData from "./CrosshairData"
import {
  AreaSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  XYPlot
} from "react-vis";
import moment from "moment";
import { format } from "d3-format"

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
    const formatK = format("~s")

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
          tickFormat={(value) => {
            return formatK(value)
          }}
        />
        <AreaSeries className={"tests-chart__area-series-1"} data={data[1]} />
        <AreaSeries
          className={"tests-chart__area-series-2"}
          data={data[0]}
          onNearestX={this.onNearestX}
        />
        {crosshairValues[0] && (
          <Crosshair values={crosshairValues}>
            <CrosshairData values={crosshairValues}/>
          </Crosshair>
        )}
      </XYPlot>
    );
  }
}




const ResponsiveChart = withResponsiveContainer(TestsChart);

export default ResponsiveChart;

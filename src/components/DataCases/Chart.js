import React, {Component} from "react";
import {
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  XYPlot
} from "react-vis";
import moment from "moment";
import withResponsiveContainer from "../../hoc/withResponsiveContainer";
import {format} from 'd3-format'

class Chart extends Component {
  state = {
    crosshairValues: null
  };

  onMouseLeave = () => {
    this.setState({
      crosshairValues: null
    });
  };

  onNearestX = (value, { index }) => {
    /**
     * Event handler for onNearestX.
     * @param {Object} value Selected value.
     * @param {index} index Index of the value in the data array.
     */
    const val = [this.props.xYPoints[index]];
    this.setState({
      crosshairValues: val
    });
  };

  render() {
    const {
      height,
      width,
      xYPoints,
      yAxisType,
      xTickTotal,
      yAxisTickTotal,
    } = this.props;
    const { crosshairValues} = this.state
    const dynamicMargin = width < 550 ? 50 : width * 0.08;
    const formatComma = format(',')
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
          className={"data-cases-chart__x-axis"}
          tickTotal={xTickTotal}
          tickFormat={val => {
            val = moment(val);
            return val.format("MMM D");
          }}
        />
        <YAxis
          className={"data-cases-chart__y-axis"}
          tickTotal={yAxisTickTotal}
          tickFormat={value => {
            // To stop log scale from changing format into scientific notation
            return +value;
          }}
        />
        <LineSeries
          className={"data-cases-chart__line-series-1"}
          data={xYPoints}
          onNearestX={this.onNearestX}
        />
        {crosshairValues && (
          <Crosshair values={crosshairValues}>
            <div className="data-cases-chart__crosshair-container">
              <div className="data-cases-chart__crosshair-label">
                {crosshairValues[0].x.format("MMM D")}
              </div>
              <div>{formatComma(crosshairValues[0].y)} cases</div>
            </div>
          </Crosshair>
        )}
      </XYPlot>
    );
  }
}

const ResponsiveChartLine = withResponsiveContainer(Chart);

export default ResponsiveChartLine;

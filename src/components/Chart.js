import React, { Component } from "react";
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse";
import { xTickCalc } from "~/utils/chartHelpers";
import ChartButtons from "./ChartButtons";
import ChartDisplay from "./ChartDisplay";
import ChartLine from "./ChartLine";

const CHART_TYPES = [
  {
    chartType: "semi-log",
    yAxisType: "log",
    buttonText: "Growth-adjusted",
    yAxisTickTotal: 2,
    chartDesc:
      "This chart shows cases per day adjusted for exponential growth. A shallower curve means the rate of new cases is slowing."
  },
  {
    chartType: "linear",
    buttonText: "Total",
    yAxisType: "linear",
    yAxisTickTotal: 5,
    chartDesc: "This chart shows a running total of cases per day."
  }
];

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chartContainer = React.createRef();
    this.state = {
      ...CHART_TYPES[0],
      xYPoints: null
    };
  }

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
    // GET CASES
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
    // SET DATA
    this.setState({
      xYPoints
    });
  }

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
    const { size, heightRatio } = this.props;
    const {
      chartType,
      chartDesc,
      yAxisTickTotal,
      yAxisType,
      xYPoints
    } = this.state;

    // HANDLE SIZING
    const screenWidth = window.innerWidth;
    const dynamicMargin = size.width < 550 ? 50 : size.width * 0.08;
    const xTickTotal = xTickCalc(screenWidth);

    return (
      <div
        className="chart__container"
        style={{
          width: "100%",
          height: size.width * heightRatio
        }}
      >
        <div className="chart__summary-container">
          <ChartButtons
            buttons={CHART_TYPES}
            selected={chartType}
            handleButtonClick={this.handleButtonClick}
          />
          <ChartDisplay desc={chartDesc} />

        </div>
        <ChartLine 
        xYPoints={xYPoints}
        yAxisType={yAxisType}
        xTickTotal={xTickTotal}
        yAxisTickTotal={yAxisTickTotal}
        dynamicMargin={dynamicMargin}
      />
      </div>
    );
  }
}

export default Chart;

import React, { Component } from "react";
import { DataContext } from "~/context/DataContext";
import { getRowByName } from "~/utils/parse";
import { xTickCalc } from "~/utils/chartHelpers";
import ChartButtons from "./DataDisplayToggles";
import ChartDisplay from "./ChartDisplay";
import ChartLine from "./ChartLine";

const CHART_TYPES = [
  {
    type: "semi-log",
    yAxisType: "log",
    buttonText: "Adjusted",
    yAxisTickTotal: 2,
    chartDesc:
      "This chart shows cases per day adjusted for exponential growth to make it easier to see the overall trend. A flatter curve means the rate of new cases is slowing."
  },
  {
    type: "linear",
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
        y: +item.value
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
      type,
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
            selected={type}
            handleButtonClick={this.handleButtonClick}
          />
          <ChartDisplay desc={chartDesc} />

        </div>
        <div className="chart__chart-container">
          <ChartLine 
          xYPoints={xYPoints}
          yAxisType={yAxisType}
          xTickTotal={xTickTotal}
          yAxisTickTotal={yAxisTickTotal}
          dynamicMargin={dynamicMargin}
        />
        </div>
      </div>
    );
  }
}

export default Chart;

import React from "react";
import { DataContext } from "~/context/DataContext";
import DataDisplayContainer from "./DataDisplayContainer";
import DataDisplayDesc from "./DataDisplayDesc";
import DataDisplayTitle from "./DataDisplayTitle";
import DataDisplaySubContainer from "./DataDisplaySubContainer";
import DataDisplayVizContainer from "./DataDisplayVizContainer";
import { createXYPoints } from "../utils/parse";
import TestsChart from "./TestsChart";

const TESTS_DISPLAY = {
  title: "Testing data",
  desc:
    "This chart represents positive and negative tests in Pennsylvania for the coronavirus"
};

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posPoints: [],
      negPoints: []
    };
  }

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
    // GET TESTS
    const tests = data.paTests.testData;
    const posTests = tests.filter(item => item.category === "positive")[0];
    const negTests = tests.filter(item => item.category === "negative")[0];
    const posPoints = createXYPoints(posTests);
    const negPoints = createXYPoints(negTests);
    this.setState({
      posPoints,
      negPoints
    });
  }

  render() {
    const {posPoints} = this.state
    return (
      <DataDisplayContainer>
        <DataDisplaySubContainer>
          <DataDisplayTitle title={TESTS_DISPLAY.title} />
          <DataDisplayDesc desc={TESTS_DISPLAY.desc} />
        </DataDisplaySubContainer>
        <DataDisplayVizContainer>
          <TestsChart 
          xYPoints={posPoints}
          yAxisType={"linear"}
          xTickTotal={5}
          yAxisTickTotal={5}
          />
        </DataDisplayVizContainer>
      </DataDisplayContainer>
    );
  }
}

export default Tests;

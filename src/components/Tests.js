import React from "react";
import { DataContext } from "~/context/DataContext";
import DataDisplayContainer from "./DataDisplayContainer";
import DataDisplayDesc from "./DataDisplayDesc";
import DataDisplaySubContainer from "./DataDisplaySubContainer";
import DataDisplayVizContainer from "./DataDisplayVizContainer";
import { createXYPoints } from "../utils/parse";
import TestsChart from "./TestsChart";
import { genTestsDescrip } from "../utils/textFormat";
import { xTickCalc} from "../utils/chartHelpers"
import DataDisplayToggles from "./DataDisplayToggles";


class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xYPointsArr: []
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
    const xYPointsArr = [posPoints, negPoints];
    this.setState({
      xYPointsArr
    });
  }

  render() {
    const { xYPointsArr } = this.state;
    const { data } = this.context;
    const TESTS = [{
      type: "tests",
      yAxisTickTotal: 5,
      buttonText: "Positive tests",
      desc: genTestsDescrip(data)
    }];
    const screenWidth = window.innerWidth;
    const xTickTotal = xTickCalc(screenWidth);

    return (
      <DataDisplayContainer>
        <DataDisplaySubContainer>
          <DataDisplayToggles buttons={TESTS} />
          <DataDisplayDesc desc={TESTS[0].desc} />
        </DataDisplaySubContainer>
        <DataDisplayVizContainer>
          <TestsChart
            data={xYPointsArr}
            yAxisType={"linear"}
            xTickTotal={xTickTotal}
            yAxisTickTotal={TESTS[0].yAxisTickTotal}
          />
        </DataDisplayVizContainer>
      </DataDisplayContainer>
    );
  }
}

export default Tests;

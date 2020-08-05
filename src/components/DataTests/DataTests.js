import React from "react";
import { DataContext } from "../../context/DataContext";
import DataDisplayContainer from "../DataDisplayContainer";
import DataDisplayDesc from "../DataDisplayDesc";
import DataDisplaySubContainer from "../DataDisplaySubContainer";
import DataDisplayVizContainer from "../DataDisplayVizContainer";
import { genTestsDescrip } from "../../utils/textFormat";
import convertDatesToUnix from "../../utils/convertDatesToUnix";
import _ from "lodash"
import filterCommonDates from "../../utils/filterCommonDates";
import ChartCumulative from "../ChartCumulative";
import CustomLegend from '../Legend';

class DataTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
    // GET TESTS
    const tests = data.paTests.testData;
    let posTests = tests.filter((item) => item.category === "positive")[0].dates;
    posTests = posTests.map((item) => {
      const {value, ...otherProps } = item
      return {...otherProps, posRunningTotal: value}
      })
    let totalTests = tests.filter((item) => item.category === "total")[0].dates;
    totalTests = totalTests.map((item) => {
      const {value, ...otherProps } = item
      return {...otherProps, testsRunningTotal: value}
      })
    let [clnPosTests, clnTotalTests] = filterCommonDates([posTests, totalTests])
    let mergedData = _.merge(clnPosTests, clnTotalTests);
    mergedData = convertDatesToUnix(mergedData)
    console.log(mergedData);
    this.setState({
      chartData: mergedData
    })
  }

  render() {
    const { data } = this.context;
    const { chartData } = this.state
    const TESTS = [
      {
        type: "tests",
        yAxisTickTotal: 5,
        buttonText: "Tests",
        desc: genTestsDescrip(data),
      },
    ];
    const cumulativeLegend = <CustomLegend label1="Positive" label2="Total" />;


    return (
      <DataDisplayContainer>
        <DataDisplaySubContainer>
          <DataDisplayDesc desc={TESTS[0].desc} />
        </DataDisplaySubContainer>
        <DataDisplayVizContainer>
          <ChartCumulative 
            data={chartData} 
            customLegend={cumulativeLegend} 
            posTotalKey="posRunningTotal" 
            testsTotalKey="testsRunningTotal"
            />
        </DataDisplayVizContainer>
      </DataDisplayContainer>
    );
  }
}

export default DataTests;

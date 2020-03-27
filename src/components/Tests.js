import React from "react";
import DataDisplayContainer from "./DataDisplayContainer";
import DataDisplayDesc from "./DataDisplayDesc";
import DataDisplayTitle from "./DataDisplayTitle";
import DataDisplaySubContainer from "./DataDisplaySubContainer";

const TESTS_DISPLAY = {
  title: "Testing data",
  desc:
    "This chart represents positive and negative tests in Pennsylvania for the coronavirus"
};

class Tests extends React.Component {
  render() {
    return (
      <DataDisplayContainer>
        <DataDisplaySubContainer>
          <DataDisplayTitle title={TESTS_DISPLAY.title} />
          <DataDisplayDesc desc={TESTS_DISPLAY.desc} />
        </DataDisplaySubContainer>
      </DataDisplayContainer>
    );
  }
}

export default Tests;

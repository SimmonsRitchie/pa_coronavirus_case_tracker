import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import DataContextProvider from "../context/DataContext";
import { pymSendHeight } from "../utils/handlePym";
import Stats from "./Stats";
import DataDisplay from "./DataDisplay";
import Container from "./Container";

class Main extends React.Component {
  componentDidMount() {
    // This is intended to fix bug where app is clipped at bottom
    // on initial load.
    pymSendHeight({ timeout: 500 });
    pymSendHeight({ timeout: 1000 });
  }

  componentDidUpdate() {
    // Because our app changes height based on displayed content, we
    // update the iframe height after DOM elements have been updated.
    pymSendHeight();
  }

  render() {
    const getTotalRow = arrayOfRows =>
      arrayOfRows.filter(item => item.county.toLowerCase() === "total")[0];
    // Get most recent date by selecting second to last item in row array
    const getMostRecentDate = rowObj => Object.keys(rowObj).slice(-2,-1)[0]; 
    // cases data
    const arrCases = this.props.data.paCases;
    const objTotalCasesPerDay = getTotalRow(arrCases);
    const mostRecentDateCases = getMostRecentDate(objTotalCasesPerDay);
    const paTotalCases = objTotalCasesPerDay["total"];
    // deaths data
    const arrDeaths = this.props.data.paDeaths;
    const objTotalDeathsPerDay = getTotalRow(arrDeaths);
    const mostRecentDateDeaths = getMostRecentDate(objTotalDeathsPerDay);
    const paTotalDeaths = objTotalDeathsPerDay["total"];

    return (
      <Container>
        <DataContextProvider data={this.props.data}>
          <Header />
          <Body>
            <Stats cases={paTotalCases} deaths={paTotalDeaths} />
            <DataDisplay />
          </Body>
          <Footer lastUpdated={mostRecentDateCases} />
        </DataContextProvider>
      </Container>
    );
  }
}

export default Main;

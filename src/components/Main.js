import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import {pymSendHeight} from '../utils/handlePym'
import Stats from "./Stats";

class Main extends React.Component {

  componentDidMount() {
    // This is intended to fix bug where app is clipped at bottom
    // on initial load.
    pymSendHeight({timeout: 500})
    pymSendHeight({timeout: 1000})
  }

  componentDidUpdate() {
    // Because our app changes height based on displayed content, we 
    // update the iframe height after DOM elements have been updated.
    pymSendHeight()
  }

  render() {
    const getTotalRow = (arrayOfRows) => arrayOfRows.filter(item => item.county.toLowerCase() === 'total')[0]
    const getMostRecentDate = (rowObj) => Object.keys(rowObj).slice(-1)[0]
    // cases data
    const arrCases = this.props.data.paCases
    const objTotalCasesPerDay = getTotalRow(arrCases)
    const mostRecentDateCases = getMostRecentDate(objTotalCasesPerDay)
    const paTotalCases = objTotalCasesPerDay[mostRecentDateCases]
    // deaths data
    const arrDeaths = this.props.data.paDeaths
    const objTotalDeathsPerDay = getTotalRow(arrDeaths)
    const mostRecentDateDeaths = getMostRecentDate(objTotalDeathsPerDay)
    const paTotalDeaths = objTotalDeathsPerDay[mostRecentDateDeaths]

    return (
      <div className="container__outer">
        <div className="container__inner">
          <Header/>
          <Body>
            <Stats cases={paTotalCases} deaths={paTotalDeaths}/>
          </Body>
          <Footer lastUpdated={mostRecentDateCases}/>
        </div>
      </div>
    );
  }
}

export default Main;

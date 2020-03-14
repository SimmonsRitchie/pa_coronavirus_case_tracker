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
    const paCases = this.props.data.paCases
    const paTotalCasesPerDay = paCases.filter(item => item.county.toLowerCase() === 'total')
    console.log(paCases)
    console.log(paTotalCasesPerDay)

    const mostRecentDate = Object.keys(paTotalCasesPerDay[0]).slice(-1)[0]
    const paTotalCases = paTotalCasesPerDay[mostRecentDate]
    // const totalCases = paCases[mostRecentDate]
    // console.log(mostRecentDate)

    const totalCases =0
    const deaths =0

    return (
      <div className="container__outer">
        <div className="container__inner">
          <Header/>
          <Body>
            <Stats confirmedCases={totalCases} deaths={deaths}/>
          </Body>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;

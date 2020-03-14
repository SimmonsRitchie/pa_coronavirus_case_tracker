import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

import {pymSendHeight} from '../utils/handlePym'

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
    return (
      <div className="container__outer">
        <div className="container__inner">
          <Header />
          <Body data={this.props.data}/>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Main;

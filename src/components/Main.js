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
    return (
      <Container>
        <DataContextProvider data={this.props.data}>
          <Header />
          <Body>
            <Stats />
            <DataDisplay />
          </Body>
          <Footer />
        </DataContextProvider>
      </Container>
    );
  }
}

export default Main;

import React from "react";
import { DataContext } from "../../context/DataContext"
import Search from "./Search";
import TableInner from "./Table";
import { applySearchTerm } from "../../utils/search";
import DataDisplayContainer from "../DataDisplayContainer";

class Table extends React.Component {
  state = {
    countyTotals: [],
    filteredResults: [],
    searchText: ""
  };

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
    const countyTotals = data.countyTotals;

    // SET DATA
    this.setState({
      countyTotals,
      filteredResults: countyTotals
    });
  }

  handleSearch = e => {
    const searchText = e.target.value;
    const filteredResults = applySearchTerm({
      searchText,
      searchData: this.state.countyTotals,
      searchDataKey: "county"
    });
    this.setState({
      searchText,
      filteredResults
    });
  };

  clearResults = () => {
    this.setState({
      searchText: "",
      filteredResults: this.state.countyTotals
    });
  };

  render() {
    const { filteredResults, searchText } = this.state;
    return (
      <DataDisplayContainer>
        <Search
          inputText={searchText}
          handleTextChange={this.handleSearch}
          clearResults={this.clearResults}
        />
        <TableInner data={filteredResults} />
      </DataDisplayContainer>
    );
  }
}

export default Table;

import React from "react";
import { DataContext } from "~/context/DataContext";
import Search from "./Search";
import TableInner from "./TableInner";
import {applySearchTerm} from "../utils/search"

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

  handleSearch = (e) => {
    const searchText = e.target.value
    const filteredResults = applySearchTerm({
      searchText, 
      searchData:this.state.countyTotals, 
      searchDataKey: "county"
    })
    this.setState({
      searchText,
      filteredResults
    })
    //pass
  };

  clearResults = () => {
    this.setState({
      searchText: '',
      filteredResults: this.state.countyTotals
    })
  };

  render() {
    const { filteredResults, searchText } = this.state;
    return (
      <div className="table__container-outer">
        <div>
          <Search
            inputText={searchText}
            handleTextChange={this.handleSearch}
            clearResults={this.clearResults}
          />
        </div>
        <TableInner countyTotals={filteredResults} />
      </div>
    );
  }
}

export default Table;

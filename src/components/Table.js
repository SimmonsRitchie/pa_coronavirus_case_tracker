import React from "react";
import { DataContext } from "~/context/DataContext";
import Search from "./Search";
import TableInner from "./TableInner";
import {applySearchTerm} from "../utils/search"
import TableTest from "./TableTest"


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
  };

  clearResults = () => {
    this.setState({
      searchText: '',
      filteredResults: this.state.countyTotals
    })
  };

  handleSort = (e) => {
    const sortId = e.target.id
    console.log(sortId)
  }

  render() {
    const { filteredResults, searchText } = this.state;
    return (
      <div className="table__container-outer">
        <Search
          inputText={searchText}
          handleTextChange={this.handleSearch}
          clearResults={this.clearResults}
        />
        <TableTest data={filteredResults}/>
      </div>
    );
  }
}

export default Table;

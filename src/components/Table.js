import React from "react";
import { DataContext } from "~/context/DataContext";
import Search from "./Search";
import TableInner from "./TableInner";

class Table extends React.Component {
  state = {
    countyTotals: [],
    searchText: ''
  }

  static contextType = DataContext;

  componentDidMount() {
    const { data } = this.context;
    const countyTotals = data.countyTotals;

    // SET DATA
    this.setState({
      countyTotals
    });
  }

  handleSearch = () => {
    //pass
  }

  clearResults = () => {
    // pass
  }


  render() {
    const {countyTotals, searchText} = this.state
    return (
      <div className="table__container-outer">
      <div>
        <Search inputText={searchText} handleSearch={this.handleSearch} clearResults={this.clearResults}/>
      </div>
        <TableInner countyTotals={countyTotals}/>
    </div>
    )
  }
}



export default Table;

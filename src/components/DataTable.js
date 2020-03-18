import React, { useContext } from "react";
import { DataContext } from "~/context/DataContext";

const DataTable = ({size}) => {
  const { data } = useContext(DataContext);
  const countyTotals = data.countyTotals;
  const dynamicHeight = size.width * 0.6;
  console.log(countyTotals);

  return (
    <div className="data-table__container-outer">
      <div className="data-table__container" style={{height: dynamicHeight}}>
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>County </th>
              <th>Deaths</th>
              <th>Cases</th>
            </tr>
          </thead>
          <tbody>
          {countyTotals.map((row, idx) => <DataTableRow key={idx} {...row}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DataTableRow = ({county, deathsTotal, casesTotal}) => {
  return ( 
    <React.Fragment>
      <tr>
        <td>{county}</td>
        <td>{deathsTotal}</td>
        <td>{casesTotal}</td>
      </tr>
    </React.Fragment>
  );
}


export default DataTable;

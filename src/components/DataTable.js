import React, { useContext } from "react";
import { DataContext } from "~/context/DataContext";

const DataTable = () => {
  const { data } = useContext(DataContext);
  const countyTotals = data.countyTotals;
  console.log(countyTotals);

  return (
    <div className="data-table__container">
      <table className="table">
        <thead>
          <tr>
            <th>County </th>
            <th>Cases</th>
            <th>Deaths</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default DataTable;

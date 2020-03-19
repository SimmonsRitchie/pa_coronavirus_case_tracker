import React, { useContext, useRef, useEffect, useState } from "react";
import { DataContext } from "~/context/DataContext";

 
const DataTable = ({size, heightRatio, margin}) => {
  const { data } = useContext(DataContext);
  const [bodyHeight, setBodyHeight] = useState(0)
  const countyTotals = data.countyTotals;
  const elHead = useRef(null)
  const dynamicHeight = size.width * (heightRatio - margin);
  useEffect(() => {
    // We need to set height of table body so that scroll bar on tbody works correctly
    // We derive the height by subtracting the thead height.
    const theadHeight = elHead.current.getBoundingClientRect().height
    const dynamicBodyHeight = dynamicHeight - theadHeight;
    setBodyHeight(dynamicBodyHeight)
  })
  return (
    <div className="data-table__container-outer">
      <div className="data-table__container-inner">
        <div className="data-table__table-container" style={{height: dynamicHeight}}>
          <table className="table is-hoverable is-fullwidth">
            <thead ref={elHead}>
              <tr>
                <th>County </th>
                <th>Deaths</th>
                <th>Cases</th>
              </tr>
            </thead>
            <tbody className="data-table__body" style={{height: bodyHeight}}>
            {countyTotals.map((row, idx) => <DataTableRow key={idx} {...row}/>)}
            </tbody>
          </table>
        </div>
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

import React, { useRef, useState, useEffect } from "react";
import withResponsiveContainer from "./hoc/withResponsiveContainer";

const TableInner = ({ countyTotals, width, height }) => {
  const [bodyHeight, setBodyHeight] = useState(0);
  const elHead = useRef(null);
  useEffect(() => {
    // We need to set height of table body so that scroll bar on tbody works correctly
    // We derive the height by subtracting the thead height.
    const theadHeight = elHead.current.offsetHeight;
    const dynamicBodyHeight = height - theadHeight;
    setBodyHeight(dynamicBodyHeight);
  });

  return (
    <div className="table-inner__container">
      <div className="table-inner__table-container" style={{ height: height }}>
        <table className="table is-hoverable is-fullwidth">
          <thead ref={elHead}>
            <tr>
              <th>County </th>
              <th>Deaths</th>
              <th>Cases</th>
            </tr>
          </thead>
          <tbody style={{ height: bodyHeight }}>
            {countyTotals.length > 0 ? (
              countyTotals.map((row, idx) => (
                <TableInnerRow key={idx} {...row} />
              ))
            ) : (
              <NoDataRow colSpan={3} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableInnerRow = ({ county, deathsTotal, casesTotal }) => {
  return (
    <React.Fragment>
      <tr>
        <td>{county}</td>
        <td>{deathsTotal}</td>
        <td>{casesTotal}</td>
      </tr>
    </React.Fragment>
  );
};

const NoDataRow = ({ colSpan }) => {
  return (
    <tr className="table-inner__no-data-row">
      <td colSpan={colSpan}>No search results</td>
    </tr>
  );
};


const ResponsiveChart = withResponsiveContainer(TableInner);

export default ResponsiveChart;

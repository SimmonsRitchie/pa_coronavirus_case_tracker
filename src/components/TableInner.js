import React, { useRef, useState, useEffect } from "react";
import withResponsiveContainer from "./hoc/withResponsiveContainer";

const TableInner = ({ countyTotals, handleSort, width, height }) => {
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
          <TableInnerHead  ref={elHead} handleSort={handleSort}/>
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

const TableInnerHead = React.forwardRef(({handleSort}, ref) => (
    <thead ref={ref}>
      <tr>
        <th>County 
        <button id="county" onClick={handleSort}>X</button>
        </th>
        <th>Deaths</th>
        <th>Cases</th>
      </tr>
    </thead>
  )
);


const NoDataRow = ({ colSpan }) => {
  return (
    <tr className="table-inner__no-data-row">
      <td colSpan={colSpan}>No search results</td>
    </tr>
  );
};

const ResponsiveChart = withResponsiveContainer(TableInner);

export default ResponsiveChart;

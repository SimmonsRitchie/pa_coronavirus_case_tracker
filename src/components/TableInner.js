import React, { useMemo} from "react";
import { useTable, useSortBy } from "react-table";
import withResponsiveContainer from "./hoc/withResponsiveContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faSort } from "@fortawesome/free-solid-svg-icons";

const TableInner = ({ data, height }) => {
  const columns = useMemo(
    () => [
      {
        Header: "County",
        accessor: "county"
      },
      {
        Header: "Cases",
        accessor: "casesTotal"
      },
      {
        Header: "Deaths",
        accessor: "deathsTotal"
      }
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: {sortBy: [{id: "casesTotal", desc: true}]}

    },
    useSortBy,
  );

  return (
    <div className="table-inner__container">
      <div className="table-inner__table-container" style={{ height: height }}>
        <table {...getTableProps()} className="table is-hoverable is-fullwidth">
          <TableInnerHead headerGroups={headerGroups} />
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 ?
              <TableInnerRows rows={rows} prepareRow={prepareRow}/> :
            <NoDataRow colSpan={3} />
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


const TableInnerHead = React.forwardRef(({headerGroups}, ref) => (
  <thead >
  {headerGroups.map(headerGroup => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        // Add the sorting props to control sorting. For this example
        // we can add them into the header props
        <th {...column.getHeaderProps(column.getSortByToggleProps())} >
          {column.render("Header")}
          
          {/* Add a sort direction indicator */}
          <span>
            {column.isSorted
              ? column.isSortedDesc
                ? <SortIcon sort={'asc'}/>
                : <SortIcon sort={'desc'} />
              : // Include hidden sort icon to take up space
              <SortIcon />}
          </span>
        </th>
      ))}
    </tr>
  ))}
  </thead>
)
);

const SortIcon = ({sort="default", hide=false}) => {
  // Creates sort icon, defaults to asc (eg. chevron pointing down)
  const faIcon = {
    "asc": faCaretUp,
    "desc": faCaretDown,
    "default": faSort
  }
  const hideClass = hide ? "table-inner__hide" : ""
  return ( 
    <span className={`table-inner__sort-icon ${hideClass}`}><FontAwesomeIcon  icon={faIcon[sort]} /></span>
  );
}


const TableInnerRows = ({rows, prepareRow}) => (
  <React.Fragment>
  {rows.map((row, i) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map(cell => {
          return (
            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
          );
        })}
      </tr>
    );
  })}
</React.Fragment>
)

const NoDataRow = ({ colSpan }) => {
  return (
    <tr className="table-inner__no-data-row">
      <td colSpan={colSpan}>No search results</td>
    </tr>
  );
};

const ResponsiveChart = withResponsiveContainer(TableInner);

export default ResponsiveChart;
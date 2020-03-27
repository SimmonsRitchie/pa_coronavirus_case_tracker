import React, { useMemo} from "react";
import { useTable, useSortBy } from "react-table";
import withResponsiveContainer from "./hoc/withResponsiveContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const TableTest = ({ data, width, height }) => {
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
      data
    },
    useSortBy
  );

  return (
    <div className="table-inner__container">
      <div className="table-inner__table-container" style={{ height: height }}>
        <table {...getTableProps()} className="table is-hoverable is-fullwidth">
          <TableTestHead headerGroups={headerGroups} />
          <tbody {...getTableBodyProps()}>
            {rows.length > 0 ?
              <TableTestRows rows={rows} prepareRow={prepareRow}/> :
            <NoDataRow colSpan={3} />
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


const TableTestHead = React.forwardRef(({headerGroups}, ref) => (
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
                ? <button><FontAwesomeIcon icon={faChevronDown} /></button>
                : <button><FontAwesomeIcon icon={faChevronUp} /></button>
              : ""}
          </span>
        </th>
      ))}
    </tr>
  ))}
  </thead>
)
);

const TableTestRows = ({rows, prepareRow}) => (
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

const ResponsiveChart = withResponsiveContainer(TableTest);

export default ResponsiveChart;
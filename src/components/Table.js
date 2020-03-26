import React, { useContext, useRef, useEffect, useState } from "react";
import { DataContext } from "~/context/DataContext";
import Search from "./Search";
import TableInner from "./TableInner";

const Table = ({ size, heightRatio, margin }) => {
  const { data } = useContext(DataContext);
  const countyTotals = data.countyTotals;

  return (
    <div className="table__container-outer">
      <div>
        <Search />
      </div>
        <TableInner countyTotals={countyTotals}/>
    </div>
  );
};


export default Table;

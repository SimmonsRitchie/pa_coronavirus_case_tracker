import React, { useContext } from 'react';
import { DataContext } from "~/context/DataContext";

const DataTable = () => {
  const { data } = useContext(DataContext);
  const countyTotals = data.countyTotals
  console.log(countyTotals)

  return ( 
    <div>
      Data table!
    </div>
   );
}
 
export default DataTable;
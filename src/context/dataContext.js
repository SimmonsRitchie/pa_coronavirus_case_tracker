import React, { createContext, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = props => {
  const [data, setData] = useState(props.data)

  return (
  <DataContext.Provider value={{data}}>
    {props.children}
  </DataContext.Provider>);
};

export default DataContextProvider;

import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import ScaleRadius from "../../utils/ScaleRadius"
import DataDisplayToggles from "../DataDisplayToggles";
import BubbleMapInner from "./BubbleMap";
import DataDisplayContainer from "../DataDisplayContainer";

const MAP_TYPES = [
  {
    type: "cases",
    buttonText: "Cases",
    fillColor: null,
  },
  {
    type: "deaths",
    buttonText: "Deaths",
    fillColor: null,

  }
];

const DataMap = () => {
  const { data } = useContext(DataContext);
  const [mapType, setMapType] = useState('cases')
  const {countyMap, countyCentroids} = data
  const arrCases = countyCentroids.map(item => item.properties.cases_total)
  const scale = new ScaleRadius(arrCases)

  return (
    <DataDisplayContainer>
      <DataDisplayToggles buttons={MAP_TYPES} selected={mapType} handleButtonClick={setMapType}/>
      <BubbleMapInner countyMap={countyMap} countyCentroids={countyCentroids} mapType={mapType} scale={scale}/>
    </DataDisplayContainer>
    )
}


export default DataMap;

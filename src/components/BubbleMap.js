import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import ScaleRadius from "../utils/ScaleRadius"
import DataDisplayToggles from "./DataDisplayToggles";
import BubbleMapInner from "./BubbleMapInner";

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

const BubbleMap = () => {
  const { data } = useContext(DataContext);
  const [mapType, setMapType] = useState('cases')
  const {countyMap, countyCentroids} = data
  const arrCases = countyCentroids.map(item => item.properties.cases_total)
  const scale = new ScaleRadius(arrCases)

  return (
    <div className="bubble-map__container">
      <DataDisplayToggles buttons={MAP_TYPES} selected={mapType} handleButtonClick={setMapType}/>
      <BubbleMapInner countyMap={countyMap} countyCentroids={countyCentroids} mapType={mapType} scale={scale}/>
    </div>
    )
}


export default BubbleMap;

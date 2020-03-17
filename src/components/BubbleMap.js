import React, { useContext, useState } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import ReactTooltip from "react-tooltip"
import { DataContext } from "../context/DataContext";
import ScaleRadius from "../utils/ScaleRadius"
import Tooltip from "./Tooltip"

const BubbleMap = () => {
  const [tooltipContent, setTooltipContent] = useState('')
  const PA_CENTER = [-77.641, 40.989];
  const { data } = useContext(DataContext);
  const {countyMap, countyCentroids} = data
  const arrCases = countyCentroids.map(item => item.properties.cases_total)
  const scale = new ScaleRadius(arrCases)

  return (
    <div className="map__container">
      <ComposableMap
      data-tip={""}
      projection={"geoMercator"}
        projectionConfig={{
          scale: 7500,
        }}
        width={773}
        height={449}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <ZoomableGroup 
        center={PA_CENTER} 
        zoom={1}
        disablePanning={true}
        >
          <Geographies geography={countyMap}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                  />
                );
              })
            }
          </Geographies>
          {countyCentroids.map((centroid, idx) => {
            const casesTotal = centroid.properties.cases_total
            const deathsTotal = centroid.properties.deaths_total
            return (
              <Marker key={idx} coordinates={centroid.coordinates}>
                <circle 
                r={scale.radius(casesTotal)} 
                className="bubble-map__bubble" 
                onMouseEnter={() => {
                  const { 
                    NAME,
                    cases_total,
                    deaths_total,
                  } = centroid.properties;
                  setTooltipContent({
                    county: NAME, 
                    casesTotal: cases_total,
                    deathsTotal: deaths_total
                  });
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                
                
                />
              </Marker>
          )})}
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip type="dark">
      {tooltipContent && <Tooltip content={tooltipContent} />}
      </ReactTooltip>
    </div>)
};

export default BubbleMap;

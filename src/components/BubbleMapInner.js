
import React, { useContext, useState } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import ReactTooltip from "react-tooltip"
import Tooltip from "./Tooltip"


const BubbleMapInner = ({countyMap, countyCentroids, mapType, scale}) => {
  const PA_CENTER = [-77.641, 40.989];
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipPlace, setTooltipPlace] = useState('')

  const handleTooltipPlace = (e) => {
    const mousePosX = e.clientX
    const viewportCenterX = window.innerWidth / 2
    const place = mousePosX < viewportCenterX ? 'right' : 'left'
    setTooltipPlace(place)
  }

  let propKey
  if (mapType === 'cases') {
    propKey = "cases_total"
  } else {
    propKey = "deaths_total"
  }

  return ( 
  <div className="bubble-map-inner__map-container">
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
          const radiusData = centroid.properties[propKey]
          return (
            <Marker key={idx} coordinates={centroid.coordinates}>
              <circle 
              data-tip
              data-for='mapTootltip'
              data-place={tooltipPlace}
              key={idx}
              r={scale.radius(radiusData)} 
              className="bubble-map__bubble" 
              onMouseEnter={(e) => {
                handleTooltipPlace(e)
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
    <ReactTooltip id="mapTootltip" type="dark" >
    <Tooltip content={tooltipContent}/>
    </ReactTooltip>
  </div>

  );
}

 
export default BubbleMapInner;
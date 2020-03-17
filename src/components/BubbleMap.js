import React, { useContext } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { DataContext } from "../context/DataContext";
import ScaleRadius from "../utils/ScaleRadius"

const BubbleMap = () => {
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
                    fill="green"
                    style={{
                      default: {
                        stroke: "white",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      hover: {
                        opacity: "0.5",
                        stroke: "white",
                        strokeWidth: 2,
                        outline: "pink"
                      },
                      pressed: {
                      opacity: "0.5",
                      stroke: "white",
                      strokeWidth: 0.75,
                      outline: "none"
                      }
                    }
                    }
                  />
                );
              })
            }
          </Geographies>
          {countyCentroids.map((centroid, idx) => {
            const casesTotal = centroid.properties.cases_total
            const deathsTotal = centroid.properties.deaths_total
            console.log("cases",casesTotal)
            console.log("radius",scale.radius(casesTotal))
            return (
              <Marker key={idx} coordinates={centroid.coordinates}>
                <circle r={scale.radius(casesTotal)} fill="#F00" stroke="#fff" strokeWidth={2} onMouseEnter={() => {console.log('Hi!')}}/>
              </Marker>
          )})}
        </ZoomableGroup>
      </ComposableMap>
    </div>)
};

export default BubbleMap;

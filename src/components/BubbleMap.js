import React, { useContext } from "react";
import { geoPath, geoCentroid} from "d3-geo"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { DataContext } from "../context/DataContext";

const BubbleMap = () => {
  const PA_CENTER = [-77.641, 40.989];
  const { data } = useContext(DataContext);
  const {countyMap, countyCentroids} = data

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
                // console.log(geo)
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
            return (
              <Marker key={idx} coordinates={centroid}>
                <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
              </Marker>
          )})}
        </ZoomableGroup>
      </ComposableMap>
    </div>)
};

export default BubbleMap;

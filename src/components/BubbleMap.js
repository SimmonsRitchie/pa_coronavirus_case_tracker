import React, { useContext } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import { DataContext } from "../context/DataContext";

const BubbleMap = () => {
  const PA_CENTER = [-77.641, 40.989];
  const { data } = useContext(DataContext);
  const countyMap = data.countyMap;
  console.log(countyMap);

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
                console.log(geo)
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
        </ZoomableGroup>
      </ComposableMap>
    </div>)
};

export default BubbleMap;

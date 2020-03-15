import { feature } from "topojson-client";
import {geoCentroid} from "d3-geo"


export const convertTopo2Geo = (topojson, objectsName ) => {
  /* Returns geojson featires from topojson object. Often needed for working with D3.
  * @params:
  * topojson (object): topojson file to transform
  * objectsName (str): Name of object property where feature is located. eg. "gz_2010_us_040_00_500k"
  */
  return feature(topojson, {
    type: "GeometryCollection",
    geometries: topojson.objects[objectsName]["geometries"]
  });
}

export const getCentroids = (geoJson) => {
// Returns an array of centroids from geojson object
  console.log(geoJson)
  const arrCentroids = geoJson.features.map(feature => {
    console.log(feature)
    const centroid = geoCentroid(feature)
    console.log(centroid)
    return centroid
  })
  console.log(arrCentroids)
  return arrCentroids

}

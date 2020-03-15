import { feature } from "topojson-client";
import {geoCentroid} from "d3-geo"
import {join} from "../utils/join"

class ProcessTopo {
  constructor(topoJson, objectsName) {
    /* Creates geojson feature object from topojson object. Often needed for working with D3.
    * @params:
    * topoJson (obj): Topojson object
    * objectsName (str): Name of object property where feature is located. eg. "gz_2010_us_040_00_500k"
    */
    this.topoJson = topoJson
    this.geoJson = this._convertTopo2Geo(topoJson, objectsName)
  }

  // PRIVATE METHODS
  _convertTopo2Geo(topoJson, objectsName) {

    return feature(topoJson, {
      type: "GeometryCollection",
      geometries: topoJson.objects[objectsName]["geometries"]
    });
  }

  // PUBLIC METHODS
  getGeoJson() {
    return this.geoJson
  }

  getTopoJson() {
    return this.topoJson
  }

  joinData({data, leftOn=null, rightOn=null, appendKey=null}) {
    console.log(data)
    this.geoJson.features.map(feature => {
    })
  }

  getCentroids() {
    // Returns an array of centroids from geojson object
      const arrCentroids = this.geoJson.features.map(feature => {
        const centroid = geoCentroid(feature)
        return {coordinates: centroid, properties: feature.properties}
      })
      return arrCentroids
    }
}

export default ProcessTopo
import { feature } from "topojson-client";
import {geoCentroid} from "d3-geo"

class ProcessTopo {
  constructor(topoJson) {
    this.topoJson = topoJson
  }

  convertTopo2Geo(objectsName) {
    /* Returns geojson featires from topojson object. Often needed for working with D3.
    * @params:
    * objectsName (str): Name of object property where feature is located. eg. "gz_2010_us_040_00_500k"
    */
    this.geoJson = (this.topojson, {
      type: "GeometryCollection",
      geometries: this.topojson.objects[objectsName]["geometries"]
    });
    return this

  }

  getCentroids() {
    // Returns an array of centroids from geojson object
      console.log(this.geoJson)
      this.arrCentroids = this.geoJson.features.map(feature => {
        console.log(feature)
        const centroid = geoCentroid(feature)
        console.log(centroid)
        return centroid
      })
      console.log(arrCentroids)
      return this.arrCentroids
    }
}

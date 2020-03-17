import { feature } from "topojson-client";
import {geoCentroid} from "d3-geo"

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

  joinData({data, leftOn, rightOn, joinPrefix="added_"}) {
    // prefix key names in lookup table
    data = data.map(obj => {
      return Object.keys(obj).reduce(
        (acc, key) => ({
          ...acc,
          ...{ [key !== leftOn ? joinPrefix + key : key]: obj[key] }
        }),
        {}
      );
    })
    // Create lookup table
    const rowById = data.reduce((accumulator, d) => {
      const new_obj = {...d}
      delete new_obj[leftOn] // remove common key from new obj
      accumulator[d[leftOn]] = new_obj;
      return accumulator;
    }, {});


    // connect look up table
    this.geoJson.features.forEach(d => {
      Object.assign(d.properties, rowById[d.properties[rightOn]]);
    })
    return this
  }

  getCentroids() {
    // Returns an array of centroids from geojson object
      const arrCentroids = this.geoJson.features.map(feature => {
        const centroid = geoCentroid(feature)
        return {coordinates: centroid, properties: feature.properties}
      })
      // TODO: Sort centroids from large to small case counts

      return arrCentroids
    }
}

export default ProcessTopo
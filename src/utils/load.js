import { csv } from "d3-fetch";
import ProcessTopo from "./processTopo"
import CASES_CSV from "~/data/cases.csv"
import DEATHS_CSV from "~/data/deaths.csv"

export const loadData = () => {
  /* Fetch and parse files.*/
  return Promise.all([
    csv(CASES_CSV),
    csv(DEATHS_CSV),
    import('~/data/pa_county.json') // topojson file
  ]).then(([
    paCases, 
    paDeaths, 
    countyMap
  ]) => {
    console.log(paCases)
    const data = {}
    const geoJsonCountyMap = new ProcessTopo(countyMap, "PA-County2")
    geoJsonCountyMap.joinData({
      data: paCases,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "cases_"
    })
    geoJsonCountyMap.joinData({
      data: paDeaths,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "deaths_"
    })
    data["paCases"] = paCases 
    data["paDeaths"] = paDeaths
    data["countyMap"] = geoJsonCountyMap.getTopoJson()
    data["countyCentroids"] = geoJsonCountyMap.getCentroids()
    return data
  })
};

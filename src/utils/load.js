import { csv } from "d3-fetch";
import ProcessTopo from "./ProcessTopo"
import ProcessData from "./ProcessData"
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
    // process cases
    const processCases = new ProcessData(paCases)
    const cleanPaCases = processCases.rearrange().getData()
    
    // process deaths
    const processDeaths = new ProcessData(paDeaths)
    const cleanPaDeaths = processDeaths.rearrange().getData()

    // process map data
    const geoJsonCountyMap = new ProcessTopo(countyMap, "PA-County2")
    const countyCentroids = geoJsonCountyMap
      .joinData({
      data: cleanPaCases,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "cases_"
    }).joinData({
      data: cleanPaDeaths,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "deaths_"
    }).getCentroids()

    // Add to data object
    const data = {}
    console.log(paCases)
    data["paCases"] = cleanPaCases 
    data["paDeaths"] = cleanPaDeaths
    data["countyMap"] = countyMap
    data["countyCentroids"] = countyCentroids
    return data
  })
};

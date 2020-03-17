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
    geoJsonCountyMap.joinData({
      data: cleanPaCases,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "cases_"
    })
    geoJsonCountyMap.joinData({
      data: cleanPaDeaths,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "deaths_"
    })

    // Add to data object
    const data = {}
    data["paCases"] = cleanPaCases 
    data["paDeaths"] = cleanPaDeaths
    data["countyMap"] = countyMap
    data["countyCentroids"] = geoJsonCountyMap.getCentroids()
    return data
  })
};

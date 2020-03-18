import { csv } from "d3-fetch";
import ProcessTopo from "./ProcessTopo"
import ProcessData from "./ProcessData"
import CASES from "~/data/cases.csv"
import DEATHS from "~/data/deaths.csv"
import {createMergedCountyData} from "./parse"

export const loadData = () => {
  /* Fetch and parse files.*/
  let casesPath, deathsPath
  if (process.env.NODE_ENV === "development") {
    console.log("dev mode: using dummy data");
    casesPath = CASES
    deathsPath = DEATHS
  } else {
    const domain = process.env.FETCH_DOMAIN;
    casesPath = domain + "cases.csv"
    deathsPath = domain + "deaths.csv"
  }
  return Promise.all([
    csv(casesPath),
    csv(deathsPath),
    import('~/data/pa_county.json') // topojson file
  ]).then(([
    paCases, 
    paDeaths, 
    countyMap
  ]) => {
    // process cases
    const nestedDataLabel = "countyData"
    const processCases = new ProcessData(paCases)
    const cleanPaCases = processCases.rearrange().nest(nestedDataLabel).addSummary(nestedDataLabel).getData()
    
    // process deaths
    const processDeaths = new ProcessData(paDeaths)
    const cleanPaDeaths = processDeaths.rearrange().nest(nestedDataLabel).addSummary(nestedDataLabel).getData()

    // process map data
    const geoJsonCountyMap = new ProcessTopo(countyMap, "PA-County2")
    const countyCentroids = geoJsonCountyMap
      .joinData({
      data: cleanPaCases.countyData,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "cases_"
    }).joinData({
      data: cleanPaDeaths.countyData,
      leftOn:"county",
      rightOn:"NAME",
      joinPrefix: "deaths_"
    }).getCentroids()

    // Create merged data
    const countyTotals = createMergedCountyData(cleanPaCases[nestedDataLabel], cleanPaDeaths[nestedDataLabel])
    // Add to data object
    const data = {}
    data["paCases"] = cleanPaCases 
    data["paDeaths"] = cleanPaDeaths
    data["countyMap"] = countyMap
    data["countyCentroids"] = countyCentroids
    data["countyTotals"] = countyTotals
    return data
  })
};

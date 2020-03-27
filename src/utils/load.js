import { csv } from "d3-fetch";
import ProcessTopo from "./ProcessTopo"
import ProcessData from "./ProcessData"
import CASES from "~/data/cases.csv"
import DEATHS from "~/data/deaths.csv"
import TESTS from "~/data/tests.csv"
import {createMergedCountyData} from "./parse"

export const loadData = () => {
  /* Fetch and parse files.*/
  let casesPath, deathsPath, testsPath
  if (process.env.NODE_ENV === "development") {
    console.log("dev mode: using dummy data");
    casesPath = CASES
    deathsPath = DEATHS
    testsPath = TESTS
  } else {
    const domain = process.env.FETCH_DOMAIN;
    casesPath = domain + "cases.csv"
    deathsPath = domain + "deaths.csv"
    testsPath = domain + "tests.csv"
  }
  return Promise.all([
    csv(casesPath),
    csv(deathsPath),
    csv(testsPath),
    import('~/data/pa_county.json') // topojson file
  ]).then(([
    paCases, 
    paDeaths,
    paTests, 
    countyMap
  ]) => {
    // process tests
    const testDataLabel = "testData"
    const processTests = new ProcessData(paTests)
    const cleanPaTests = processTests
      .rearrange("category")
      .nest(testDataLabel)
      .addTestsMeta({dataLabel: testDataLabel, primaryKey: "category"})
      .getData()

    // process cases
    const countyDataLabel = "countyData"
    const processCases = new ProcessData(paCases)
    const cleanPaCases = processCases
      .rearrange("county")
      .nest(countyDataLabel)
      .addCountyMeta({dataLabel: countyDataLabel, primaryKey: "county"})
      .getData()
    
    // process deaths
    const processDeaths = new ProcessData(paDeaths)
    const cleanPaDeaths = processDeaths
      .rearrange("county")
      .nest(countyDataLabel)
      .addCountyMeta({dataLabel: countyDataLabel, primaryKey: "county"})
      .getData()

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
    const countyTotals = createMergedCountyData(cleanPaCases[countyDataLabel], cleanPaDeaths[countyDataLabel])
    // Add to data object

    console.log(cleanPaCases)
    const data = {}
    data["paCases"] = cleanPaCases 
    data["paDeaths"] = cleanPaDeaths
    data["paTests"] = cleanPaTests
    data["countyMap"] = countyMap
    data["countyCentroids"] = countyCentroids
    data["countyTotals"] = countyTotals
    return data
  })
};

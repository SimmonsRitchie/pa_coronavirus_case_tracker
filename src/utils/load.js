import { csv } from "d3-fetch";
import ProcessTopo from "./ProcessTopo";
import ProcessData from "./ProcessData";
import CASES from "~/data/pa-cases.csv";
import DEATHS from "~/data/pa-deaths.csv";
import TESTS from "~/data/pa-tests.csv";
import { createMergedCountyData } from "./parse";
import convertInqTestingData from './convertInqData'

export const loadData = () => {
  /* Fetch and parse files.*/
  let casesPath, deathsPath, testsPath;
  if (process.env.NODE_ENV === "development") {
    console.log("dev mode: using dummy data");
    casesPath = CASES;
    deathsPath = DEATHS;
    testsPath = TESTS;
  } else {
    const domain = process.env.FETCH_DOMAIN;
    casesPath = domain + "pa-cases.csv";
    deathsPath = domain + "pa-deaths.csv";
    testsPath = domain + "pa-tests.csv";
  }
  return Promise.all([
    csv(casesPath),
    csv(deathsPath),
    csv(testsPath),
    import("~/data/pa_county.json") // topojson file
  ]).then(([paCases, paDeaths, paTests, countyMap]) => {

    // process cases
    const countyDataLabel = "countyData";
    const processCases = new ProcessData(paCases);
    const cleanPaCases = processCases
      .transposeInqData()
      .rearrange("county")
      .nest(countyDataLabel)
      .addCountyMeta({ dataLabel: countyDataLabel, primaryKey: "county" })
      .getData();

    // process deaths
    const processDeaths = new ProcessData(paDeaths);
    const cleanPaDeaths = processDeaths
      .transposeInqData()
      .rearrange("county")
      .nest(countyDataLabel)
      .addCountyMeta({ dataLabel: countyDataLabel, primaryKey: "county" })
      .getData();


    // process tests
    const testDataLabel = "testData";
    const convertedInqData = convertInqTestingData(paTests, paCases)
    const processTests = new ProcessData(convertedInqData);
    const cleanPaTests = processTests
      .rearrange("category")
      .nest(testDataLabel)
      .addTestsMeta({ dataLabel: testDataLabel, primaryKey: "category" })
      .getData();

    // process map data
    const geoJsonCountyMap = new ProcessTopo(countyMap, "PA-County2");
    const countyCentroids = geoJsonCountyMap
      .joinData({
        data: cleanPaCases.countyData,
        leftOn: "county",
        rightOn: "NAME",
        joinPrefix: "cases_"
      })
      .joinData({
        data: cleanPaDeaths.countyData,
        leftOn: "county",
        rightOn: "NAME",
        joinPrefix: "deaths_"
      })
      .getCentroids();

    // Create merged data
    const countyTotals = createMergedCountyData(
      cleanPaCases[countyDataLabel],
      cleanPaDeaths[countyDataLabel]
    );
    // Add to data object

    const data = {};
    data["paCases"] = cleanPaCases;
    data["paDeaths"] = cleanPaDeaths;
    data["paTests"] = cleanPaTests;
    data["countyMap"] = countyMap;
    data["countyCentroids"] = countyCentroids;
    data["countyTotals"] = countyTotals;
    return data;
  });
};

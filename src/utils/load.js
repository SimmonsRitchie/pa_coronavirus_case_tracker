import { csv } from "d3-fetch";
import ProcessTopo from "./process"
const googleSheetUrl = (googleSheetId, gid=0) => {
  return `https://docs.google.com/spreadsheets/d/e/${googleSheetId}/pub?gid=${gid}&single=true&output=csv`
}

export const loadData = () => {
  
  // Google sheet document ID
  const documentId = "2PACX-1vTSjpwdfT574IFWdhyn8ZUCAOyDr2kHMfzBJLC8qMeCrsE0fl4NfN9LFk9E_GunrKYWM5baIpTbF_nv"
  // GID is an ID for each individual sheet of the document
  const casesGid = "0"
  const deathsGid = "1683428846"

  /* Fetch and parse files.*/
  return Promise.all([
    csv(googleSheetUrl(documentId, casesGid)),
    csv(googleSheetUrl(documentId, deathsGid)),
    import('~/data/pa_county.json') // topojson file

  ]).then(([
    paCases, 
    paDeaths, 
    countyMap
  ]) => {
    const data = {}
    const topoCountyMaps = new ProcessTopo(countyMap, "PA-County2")
    data["paCases"] = paCases 
    data["paDeaths"] = paDeaths
    data["countyMap"] = countyMap
    data["countyCentroids"] = topoCountyMaps.getCentroids()
    return data
  })
};

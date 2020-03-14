import { csv } from "d3-fetch";
import SURVEY from "~/data/dummy-data.csv";

const googleSheetUrl = (googleSheetId, gid=0) => {
  return `https://docs.google.com/spreadsheets/d/e/${googleSheetId}/pub?gid=${gid}&single=true&output=csv`
}

const cases = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSjpwdfT574IFWdhyn8ZUCAOyDr2kHMfzBJLC8qMeCrsE0fl4NfN9LFk9E_GunrKYWM5baIpTbF_nv/pub?gid=0&single=true&output=csv"
const deaths = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSjpwdfT574IFWdhyn8ZUCAOyDr2kHMfzBJLC8qMeCrsE0fl4NfN9LFk9E_GunrKYWM5baIpTbF_nv/pub?gid=1683428846&single=true&output=csv"

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
  ]).then(([paCases, paDeaths]) => {
    const data = {}
    data["paCases"] = paCases
    data["paDeaths"] = paDeaths
    return data
  })
};

import { csv } from "d3-fetch";
import SURVEY from "~/data/dummy-data.csv";

export const loadData = () => {

  const googleSheetsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSjpwdfT574IFWdhyn8ZUCAOyDr2kHMfzBJLC8qMeCrsE0fl4NfN9LFk9E_GunrKYWM5baIpTbF_nv/pub?gid=0&single=true&output=csv"
  /* Fetch and parse files.*/
  return Promise.all([
    csv(googleSheetsUrl),
  ]).then(([paTally]) => {
    const data = {}
    data["paTally"] = paTally
    return data
  })
};

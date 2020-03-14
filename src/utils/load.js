import { csv } from "d3-fetch";
import SURVEY from "~/data/dummy-data.csv";

export const loadData = () => {
  /* Fetch and parse files.*/
  return Promise.all([
    csv(SURVEY),
  ])
};

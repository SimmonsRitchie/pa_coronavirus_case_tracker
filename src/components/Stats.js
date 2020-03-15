import React, { useContext } from "react";
import {getTotalFromSheet} from "../utils/parse"
import { DataContext } from "../context/DataContext";


const Stats = () => {
  const { data } = useContext(DataContext);
  const cases = getTotalFromSheet(data.paCases)
  const deaths = getTotalFromSheet(data.paDeaths)

  return (
    <div>
      <div>Cases</div>
      <div>{cases ? cases : "..."}</div>
      <div>Deaths</div>
      <div>{deaths ? deaths : "..."}</div>
    </div>
  );
};

export default Stats;

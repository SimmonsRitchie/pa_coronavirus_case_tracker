import React, { useContext } from "react";
import {getTotalFromSheet} from "../utils/parse"
import { DataContext } from "../context/DataContext";


const Stats = () => {
  const { data } = useContext(DataContext);
  const cases = data.paCases.meta.total
  const deaths = data.paDeaths.meta.total

  return (
    <div className="stats__container">
      <div className="stats__sub-container">
        <div className="stats__title">Cases</div>
        <div className="stats__number">{cases !== undefined ? cases : "..."}</div>
      </div>
      <div className="stats__number-container">
        <div className="stats__title">Deaths</div>
        <div  className="stats__number">{deaths !== undefined ? deaths : "..."}</div>
      </div>
    </div>
  );
};

export default Stats;

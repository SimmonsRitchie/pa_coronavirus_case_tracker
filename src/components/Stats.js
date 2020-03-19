import React, { useContext } from "react";
import { getTotalFromSheet } from "../utils/parse";
import { DataContext } from "../context/DataContext";

const Stats = () => {
  const { data } = useContext(DataContext);
  const cases = data.paCases.meta.total;
  const deaths = data.paDeaths.meta.total;

  return (
    <div className="stats__container">
      <div className="stats__row">
        <div className="stats__col">
          <span className="stats__title">Reported cases</span>
        </div>
        <div className="stats__col">
          <span className="stats__title">Deaths</span>
        </div>
      </div>
      <div className="stats__row">
        <div className="stats__col">
          <span className="stats__number">
            {cases !== undefined ? cases : "..."}
          </span>
        </div>
        <div className="stats__col">
          <span className="stats__number">
            {deaths !== undefined ? deaths : "..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;

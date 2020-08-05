import React, { useContext } from "react";
import { getTotalFromSheet } from "../utils/parse";
import { DataContext } from "../context/DataContext";
import { format } from "d3-format"

const Stats = () => {
  const { data } = useContext(DataContext);
  const cases = data.paCases.meta.total;
  const deaths = data.paDeaths.meta.total;
  const formatComma = format(',')

  return (
    <div className="stats__container">
      <div className="stats__row">
        <div className="stats__col">
          <span className="stats__title">CASES</span>
        </div>
        <div className="stats__col">
          <span className="stats__title">DEATHS</span>
        </div>
      </div>
      <div className="stats__row">
        <div className="stats__col">
          <span className="stats__number">
            {cases !== undefined ? formatComma(cases) : "..."}
          </span>
        </div>
        <div className="stats__col">
          <span className="stats__number">
            {deaths !== undefined ? formatComma(deaths) : "..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;

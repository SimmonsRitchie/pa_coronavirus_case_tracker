import React from "react";

const Tooltip = ({content}) => (
  <div className="tooltip__container">
    <div className="tooltip__label">{content.county}</div>
    <div className="tooltip__item">Total cases: {content.casesTotal}</div>
    <div className="tooltip__item">Total deaths: {content.deathsTotal}</div>
  </div>
);

export default Tooltip;
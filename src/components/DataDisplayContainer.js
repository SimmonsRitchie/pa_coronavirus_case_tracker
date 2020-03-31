import React from "react";

const DataDisplayContainer = props => {
  /* Simple container component for data display components */
  return (
    <div className="data-display-container__container">{props.children}</div>
  );
};

export default DataDisplayContainer;

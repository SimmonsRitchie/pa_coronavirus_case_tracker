import React from "react";

const DataDisplaySubContainer = props => {
  /* Simple container component for data display components */
  return (
    <div className="data-display-sub-container__container">{props.children}</div>
  );
};

export default DataDisplaySubContainer;

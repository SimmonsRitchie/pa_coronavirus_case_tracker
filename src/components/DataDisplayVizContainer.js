import React from "react";

const DataDisplayVizContainer = props => {
  /* Special container for wrapping React-Vis graphics to avoid CSS issues */
  return (
    <div className="data-display-viz-container__container">{props.children}</div>
  );
};

export default DataDisplayVizContainer;
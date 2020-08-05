import React from "react";
import PropTypes from "prop-types";
import ChartHeader from "./ChartHeader";

const ChartWrapper = ({ children, title, description }) => (
  <div className="chart-wrapper__container">
    {(title || description) && <ChartHeader title={title} description={description} />}
    <div className="chart-wrapper__responsive-outer">
      <div className="chart-wrapper__responsive-inner">{children}</div>
    </div>
  </div>
);
export default ChartWrapper;

ChartWrapper.defaultProps = {
  title: "",
  description: "",
};

ChartWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

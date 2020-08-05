import React from 'react';

const ChartHeader = ({ title, description }) => (
  <div className="chart-header__container">
    <div className="chart-header__title">{title}</div>
    {description && (
      <div className="chart-header__description">{description}</div>
    )}
  </div>
);

export default ChartHeader;

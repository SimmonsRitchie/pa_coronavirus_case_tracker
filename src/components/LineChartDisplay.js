import React from 'react';

const LineChartDisplay = ({title, desc}) => {
  return ( 
    <div className="line-chart-display__container">
      <div className="line-chart-display__desc">{desc}</div>
    </div>

   );
}
 
export default LineChartDisplay;

//<div className="line-chart-display__title">{title}</div>

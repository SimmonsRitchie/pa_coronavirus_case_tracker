import React from 'react';

export const Dot = () => {
  // Renders a little dot
  return ( <span className="formatters__separator"/> );
}

export const B = (props) => {
  // Wraps text in custom bold formatter
  return ( <span className="formatters__bold">{props.children}</span> );
}
 
export const LegText = (props) => {
  // Wraps blurb text in color style that matches legend
  return (<span className={`tests-chart__legend-text-${props.series}`}>{props.children}</span>)
}



import React from 'react';

export const Dot = () => {
  // Renders a little dot
  return ( <span className="formatters__separator"/> );
}

export const B = (props) => {
  // Wraps text in custom bold formatter
  return ( <span className="formatters__bold">{props.children}</span> );
}
 


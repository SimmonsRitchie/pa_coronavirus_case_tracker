import React from 'react';

export const Dot = () => {
  return ( <span className="formatters__separator"/> );
}

export const B = (props) => {
  return ( <span className="formatters__bold">{props.children}</span> );
}
 
export default Dot;
import React from 'react';

const DataDisplayContainer = (props) => {
  /* Simple container component */
  return ( 
    <div className="data-display-container__container">
    {props.children}
    </div>
   );
}
 
export default DataDisplayContainer;
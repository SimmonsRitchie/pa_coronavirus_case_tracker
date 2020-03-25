import React from 'react';

const DataDisplayToggles = ({buttons, selected, handleButtonClick}) => {

  return ( 
    <div className="chart-buttons__container">
      <div className="buttons are-normal has-addons is-centered">
        {buttons.map(item => {
          const selectedClass = item.chartType === selected ? 'is-dark' : 'is-light'
          return <button 
          key={item.chartType} 
          id={item.chartType} 
          className={`button ${selectedClass}`} 
          onClick={() => handleButtonClick(item.chartType)}>
            {item.buttonText}
          </button>
        })}
      </div>
    </div> );
}
 
export default DataDisplayToggles;
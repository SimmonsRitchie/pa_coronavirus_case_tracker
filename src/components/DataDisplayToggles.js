import React from 'react';

const DataDisplayToggles = ({buttons, selected, handleButtonClick}) => {

  return ( 
    <div className="chart-buttons__container">
      <div className="buttons are-normal has-addons is-centered">
        {buttons.map(item => {
          const selectedClass = item.type === selected ? 'is-dark' : 'is-light'
          return <button 
          key={item.type} 
          id={item.type} 
          className={`button ${selectedClass}`} 
          onClick={() => handleButtonClick(item.type)}>
            {item.buttonText}
          </button>
        })}
      </div>
    </div> );
}
 
export default DataDisplayToggles;
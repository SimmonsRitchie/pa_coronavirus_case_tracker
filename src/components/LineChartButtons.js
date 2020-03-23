import React from 'react';

const LineChartButtons = ({buttons, selected, handleButtonClick}) => {

  return ( 
    <div className="line-chart-buttons__container">
      <div className="buttons are-normal has-addons is-centered">
        {buttons.map(item => {
          const selectedClass = item.id === selected ? 'is-dark' : 'is-light'
          return <button 
          key={item.id} 
          id={item.id} 
          className={`button ${selectedClass}`} 
          onClick={() => handleButtonClick(item.id)}>
            {item.buttonText}
          </button>
        })}
      </div>
    </div> );
}
 
export default LineChartButtons;
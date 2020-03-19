import React from 'react';

const DataDisplayButtons = ({buttons, selected, handleClick}) => {

  return ( 
    <div className="data-display-buttons__container">
      <div className="data-display-buttons__container-mobile show-for-mobile">
        {buttons.map((item, idx) => {
          const selectedClass = item.id === selected ? 'is-primary' : ""
          return (
            <div key={idx} className="data-display-button__button-mobile">
              <button 
                className={`button is-normal is-fullwidth is-centered ${selectedClass}`}
                key={item.id} 
                onClick={handleClick}
                id={item.id}>
                {item.text}
                </button>
            </div>
          )
        })}
      </div>
      <div className="buttons are-normal has-addons is-centered show-for-desktop">
        {buttons.map(item => {
          const selectedClass = item.id === selected ? 'is-primary' : ""
          return (
            <button 
              className={`button ${selectedClass}`}
              key={item.id} 
              onClick={handleClick}
              id={item.id}>
              {item.text}
              </button>
          )
        })}
      </div>
    </div>
  );
}

export default DataDisplayButtons;
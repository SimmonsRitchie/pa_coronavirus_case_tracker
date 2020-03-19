import React from 'react';

const DataDisplayButtons = ({buttons, selected, handleClick}) => {

  return ( 
    <div className="data-display-buttons__container">
      <div className="buttons are-small has-addons is-centered">
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
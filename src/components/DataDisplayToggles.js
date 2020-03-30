import React from 'react';

const DataDisplayToggles = ({buttons, selected, handleButtonClick}) => {

  if (buttons.length > 1) {
    return ( 
      <div className="data-display-toggles__container">
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
  } else {
    return (
      <div className="data-display-toggles__container">
        <button className="button is-dark data-display-toggles__disabled">{buttons[0].buttonText}</button>
      </div>

    )
  }

}
 
export default DataDisplayToggles;
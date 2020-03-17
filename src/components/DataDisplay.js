import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import DataDisplayButtons from "./DataDisplayButtons"

const DataDisplay = () => {
  const [display, setDisplay] = useState('map')

  const DISPLAY_TYPE = {
    map: <BubbleMap />,
    chart: <div>Chart</div>,
    data: <div>Data</div>,
  };

  const DISPLAY_BUTTONS = [
    {
      "id": "map",
      "text": "Map"
    },
    {
      "id": "chart",
      "text": "Chart"
    },
    {
      "id": "data",
      "text": "Data"
    },
  ]


  const changeDisplay = (e) => {
    setDisplay(e.target.id)
  }

  return (
    <div className="data-display__container">
      <DataDisplayButtons 
        buttons={DISPLAY_BUTTONS}
        selected={display}
        handleClick={changeDisplay}/>
      <div>
        {DISPLAY_TYPE[display]}
      </div>
    </div>
  );
};


export default DataDisplay;

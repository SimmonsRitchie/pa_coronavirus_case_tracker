import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import DataDisplayButtons from "./DataDisplayButtons"
import LineChart from "./LineChart"
import { SizeMe } from "react-sizeme";

const DataDisplay = () => {
  const [display, setDisplay] = useState('chart')

  const getDisplay = size => ({
    map: <BubbleMap size={size}/>,
    chart: <LineChart size={size}/>,
    data: <div>{size.height}</div>,
  });

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
        <SizeMe
          className="data-display__data-container"
          monitorHeight
          monitorWidth
          refreshRate={128}
          refreshMode={"debounce"}
          render={({ size }) => {
            return (getDisplay(size)[display])
          }
        }
        />
    </div>
  );
};


export default DataDisplay;

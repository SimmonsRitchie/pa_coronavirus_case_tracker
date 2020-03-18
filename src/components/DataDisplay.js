import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import DataDisplayButtons from "./DataDisplayButtons"
import LineChart from "./LineChart"
import { SizeMe } from "react-sizeme";
import DataTable from "./DataTable";

const DataDisplay = () => {
  const [display, setDisplay] = useState('data')

  const getDisplay = size => ({
    map: <BubbleMap size={size}/>,
    chart: <LineChart size={size}/>,
    data: <DataTable size={size}/>,
  });

  const DISPLAY_BUTTONS = [
    {
      "id": "map",
      "text": "Cases by county"
    },
    {
      "id": "chart",
      "text": "Cases by day"
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
        <div className="data-display__data-container">
          <SizeMe
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
    </div>
  );
};


export default DataDisplay;

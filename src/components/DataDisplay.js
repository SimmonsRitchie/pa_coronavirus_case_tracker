import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import DataDisplayButtons from "./DataDisplayButtons"
import LineChart from "./Chart"
import { SizeMe } from "react-sizeme";
import DataTable from "./DataTable";


const DISPLAY_BUTTONS = [
  {
    "id": "map",
    "text": "County map"
  },
  {
    "id": "chart",
    "text": "Cases per day"
  },
  {
    "id": "data",
    "text": "Data"
  },
]


const DataDisplay = () => {
  // Data container height is set to HEIGHT_RATIO * width of container
  const HEIGHT_RATIO = 0.75
  const MARGIN = 0.05
  const [display, setDisplay] = useState('map')
  const getDisplay = (size) => {
    return ({
    map: <BubbleMap size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
    chart: <LineChart size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
    data: <DataTable size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
  })};

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
            monitorWidth
            refreshRate={128}
            refreshMode={"debounce"}
            render={({ size }) => {
              return (
                <div className="data-display__data-container" style={{height: size.width * HEIGHT_RATIO}}>
                {getDisplay(size)[display]}
                </div>
                )
            }
          }
          />
    </div>
  );
};


export default DataDisplay;

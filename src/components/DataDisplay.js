import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import DataDisplayButtons from "./DataDisplayButtons"
import LineChart from "./LineChart"
import { SizeMe } from "react-sizeme";
import DataTable from "./DataTable";

const DataDisplay = () => {
  // Data container height is set to HEIGHT_RATIO * width of container
  const HEIGHT_RATIO = 0.7
  const MARGIN = 0.05
  const [display, setDisplay] = useState('chart')
  const getDisplay = (size) => {
    return ({
    map: <BubbleMap size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
    chart: <LineChart size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
    data: <DataTable size={size} heightRatio={HEIGHT_RATIO} margin={MARGIN}/>,
  })};
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

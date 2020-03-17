import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import 'react-tabs/style/react-tabs.css';

const DataDisplay = () => {
  const [display, setDisplay] = useState('map')

  const DISPLAY_TYPE = {
    map: <BubbleMap />,
    chart: <div>Chart</div>,
    data: <div>Map</div>,
  };

  const changeDisplay = (e) => {
    setDisplay(e.target.id)
  }

  return (
    <div className="data-display__container">
      <DataDisplayButtons changeDisplay={changeDisplay}/>
      {DISPLAY_TYPE[display]}
    </div>
  );
};

const DataDisplayButtons = ({changeDisplay}) => {
  return ( 
    <div className="data-display-buttons__container">
      <button id={"map"} onClick={changeDisplay}>Cases per county</button>
      <button id={"chart"} onClick={changeDisplay}>Cases per day</button>
    </div>
  );
}

export default DataDisplay;

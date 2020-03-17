import React, {useState} from "react";
import BubbleMap from "./BubbleMap"
import 'react-tabs/style/react-tabs.css';

const DataDisplay = () => {
  const [display, setDisplay] = useState('map')

  const DISPLAY_TYPE = {
    map: <BubbleMap />,
    chart: <div>Chart</div>,
    data: <div>Data</div>,
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
      <div className="buttons are-small has-addons is-centered">
        <button className="button" id={"map"} onClick={changeDisplay}>Map</button>
        <button className="button" id={"chart"} onClick={changeDisplay}>Chart</button>
        <button className="button" id={"data"} onClick={changeDisplay}>Data</button>
      </div>
    </div>
  );
}

export default DataDisplay;

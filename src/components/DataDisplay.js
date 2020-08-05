import React, {useState} from "react";
import BubbleMap from "./DataMap"
import DataDisplayButtons from "./DataDisplayButtons"
import Cases from "./DataCases"
import { SizeMe } from "react-sizeme";
import Table from "./DataTable";
import TestData from "./DataTests"

const DISPLAY_BUTTONS = [
  {
    "id": "map",
    "text": "STATE MAP"
  },
  {
    "id": "cases",
    "text": "CASES"
  },
  {
    "id": "tests",
    "text": "TESTS"
  },
  {
    "id": "data",
    "text": "COUNTY STATS"
  },
]


const DataDisplay = () => {
  // Data container height is set to HEIGHT_RATIO * width of container
  const viewportWidth = window.innerWidth
  let HEIGHT_RATIO
  if (viewportWidth < 550) {
    HEIGHT_RATIO = 0.9
  } else {
    HEIGHT_RATIO = 0.7
  }
  const [display, setDisplay] = useState('map')
  const getDisplay = (size) => {
    return ({
    map: <BubbleMap />,
    cases: <Cases />,
    tests: <TestData />,
    data: <Table />,
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
                <div className="data-display__data-container" >
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

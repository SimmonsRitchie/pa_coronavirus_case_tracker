import React, {useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReactTooltip from 'react-tooltip'
import Tooltip from "./Tooltip"
import BubbleMap from "./BubbleMap"
import 'react-tabs/style/react-tabs.css';

const DataDisplay = () => {
  const [tooltipContent, setTooltipContent] = useState('')

  return (
      <Tabs className="data-display__container">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Cases per day</Tab>
          <Tab>Data</Tab>
        </TabList>
        <TabPanel>
          <BubbleMap setTooltipContent={setTooltipContent}/>
          <ReactTooltip type="dark">
          {tooltipContent && <Tooltip content={tooltipContent} />
            }
            </ReactTooltip>
        </TabPanel>
        <TabPanel>
          <div>Cases per day</div>
        </TabPanel>
        <TabPanel>
          <div>Raw data</div>
        </TabPanel>
      </Tabs>
  );
};

export default DataDisplay;

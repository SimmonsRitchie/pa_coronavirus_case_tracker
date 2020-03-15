import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import BubbleMap from "./BubbleMap"
import 'react-tabs/style/react-tabs.css';

const DataDisplay = () => {
  return (
      <Tabs className="data-display__container">
        <TabList>
          <Tab>Map</Tab>
          <Tab>Cases per day</Tab>
          <Tab>Data</Tab>
        </TabList>
        <TabPanel>
          <BubbleMap/>
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

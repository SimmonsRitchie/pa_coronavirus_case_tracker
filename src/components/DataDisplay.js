import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';

const DataDisplay = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Map</Tab>
          <Tab>Cases per day</Tab>
          <Tab>Data</Tab>
        </TabList>
        <TabPanel>
          <div>Map</div>
        </TabPanel>
        <TabPanel>
          <div>Cases per day</div>
        </TabPanel>
        <TabPanel>
          <div>Raw data</div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DataDisplay;

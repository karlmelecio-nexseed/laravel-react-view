import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import Tab1Content from './Tab1Content';
import Tab2Content from './Tab2Content';
import Tab3Content from './Tab3Content';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%',
  },
  tabsContainer: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    width: '80%',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  point: string;
  imageUrl: string;
}

const AccordionContent = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [imageUrl, setImageUrl] = useState('');


  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={classes.tabContent}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );

  const tabRefs = useRef([]);

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, activeTab + 1);
  }, [activeTab]);

  const handleTabRef = (tabRef) => {
    if (tabRef && !tabRefs.current.includes(tabRef)) {
      tabRefs.current.push(tabRef);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabsContainer}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          orientation="vertical"
          aria-label="Product tabs"
          className={classes.tabs}
        >
          <Tab ref={handleTabRef} label="Tab 1" id="tab-0" aria-controls="tabpanel-0" />
          <Tab ref={handleTabRef} label="Tab 2" id="tab-1" aria-controls="tabpanel-1" />
          <Tab ref={handleTabRef} label="Tab 3" id="tab-2" aria-controls="tabpanel-2" />
          <Tab ref={handleTabRef} label="Tab 4" id="tab-3" aria-controls="tabpanel-3" />
          <Tab ref={handleTabRef} label="Tab 5" id="tab-4" aria-controls="tabpanel-4" />
        </Tabs>
      </div>
      <div className={classes.tabContent}>
        <TabPanel value={activeTab} index={0}>
          <Tab1Content imageUrl={imageUrl} />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
        <Tab2Content imageUrl={imageUrl} />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
        <Tab3Content imageUrl={imageUrl} />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <Typography align="center">Content for Tab 4</Typography>
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <Typography align="center">Content for Tab 5</Typography>
        </TabPanel>
      </div>
    </div>
  );
};

export default AccordionContent;

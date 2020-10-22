import React, { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

const TabsComponent = ({ items, variant = 'fullWidth' }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Paper>
      <Tabs
        variant={variant}
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_event, index) => setActiveTab(index)}
      >
        {items
          .filter(item => item.name)
          .map((item, index) => (
            <Tab label={item.name} key={index} />
          ))}
      </Tabs>
      <div style={{ padding: 20 }}>{items[activeTab].component}</div>
    </Paper>
  );
};

export default TabsComponent;

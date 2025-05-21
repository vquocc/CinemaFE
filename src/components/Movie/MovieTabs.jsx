import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const MovieTabs = ({ onTabChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary">
        <Tab label="Đang chiếu" />
        <Tab label="Sắp chiếu" />
        <Tab label="Phim IMAX" />
        <Tab label="Toàn quốc" />
      </Tabs>
    </Box>
  );
};

export default MovieTabs;
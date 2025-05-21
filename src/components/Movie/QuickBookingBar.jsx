import React from 'react';
import { Select, Button, Typography } from 'antd';
import { Box } from '@mui/material';

const { Option } = Select;

const QuickBookingBar = () => {
  return (
    <Box
      className="quick-booking-bar"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '12px 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginTop: '-4px',
        flexWrap: 'wrap',
        rowGap: '12px',
      }}
    >
      {[1, 2, 3, 4].map((step, idx) => (
        <Box
          key={idx}
          className="booking-step"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Box
            className="step-number"
            sx={{
              backgroundColor: '#ff6b00',
              color: '#fff',
              fontWeight: 'bold',
              width: 20,
              height: 20,
              fontSize: 12,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {step}
          </Box>
          <Select
            placeholder={
              ['Chọn Phim', 'Chọn Rạp', 'Chọn Ngày', 'Chọn Suất'][idx]
            }
            style={{ minWidth: 140 }}
          >
            <Option value="example">{['Gravity', 'Galaxy Cần Thơ', '16.05.2025', '18:30'][idx]}</Option>
          </Select>
        </Box>
      ))}

      <Button
        type="primary"
        className="booking-button"
        style={{
          backgroundColor: '#f37021',
          borderColor: '#f37021',
          fontWeight: 'bold',
          padding: '0 24px',
          height: 40,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#d95e1c';
          e.currentTarget.style.borderColor = '#d95e1c';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#f37021';
          e.currentTarget.style.borderColor = '#f37021';
        }}
      >
        Mua vé nhanh
      </Button>
    </Box>
  );
};

export default QuickBookingBar;

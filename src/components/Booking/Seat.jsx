import React from 'react';
import { Box, Tooltip } from '@mui/material';

const getSeatColor = (type, selected) => {
  if (selected && type === 'VIP') return '#ffc107';
  if (selected) return '#ff9800';
  if (type === 'VIP') return '#ffd54f';
  return '#fff';
};

const Seat = ({ label, type = 'Thường', price, isSelected, onClick }) => {
  const bgColor = getSeatColor(type, isSelected);

  return (
    <Tooltip title={`${label} - ${type} - ${price.toLocaleString('vi-VN')}đ`} arrow>
      <Box
        onClick={onClick}
        sx={{
          width: 28,
          height: 28,
          bgcolor: bgColor,
          border: '1px solid #555',
          borderRadius: 1,
          cursor: 'pointer',
          fontSize: '0.65rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: '0.2s',
          '&:hover': {
            boxShadow: '0 0 4px rgba(0,0,0,0.4)',
          }
        }}
      >
        {label}
      </Box>
    </Tooltip>
  );
};

export default Seat;

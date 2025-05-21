import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const PaymentSection = ({ selectedSeatIds, selectedCombos, grandTotal, onConfirm }) => {
  return (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" fontWeight="bold" color="#1e88e5" mb={2}>
        Thanh toán
      </Typography>
      <Typography variant="body1" mb={1}>
        Xác nhận thông tin đặt vé:
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Ghế đã chọn: {selectedSeatIds.length > 0 ? selectedSeatIds.join(', ') : 'Không có ghế nào'}
      </Typography>
      {selectedCombos.length > 0 && (
        <>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Combo đã chọn:
          </Typography>
          {selectedCombos.map((combo, index) => (
            <Typography key={index} variant="body2" color="text.secondary" mb={1}>
              - {combo.quantity}x {combos.find(c => c.id === combo.id)?.title || combo.id} ({combo.price.toLocaleString('vi-VN')} đ)
            </Typography>
          ))}
        </>
      )}
      <Typography variant="body1" fontWeight="bold" mt={2}>
        Tổng tiền: {grandTotal.toLocaleString('vi-VN')} đ
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: 4, backgroundColor: '#ff9800', color: '#fff', fontWeight: 'bold' }}
        onClick={onConfirm}
      >
        Xác nhận thanh toán
      </Button>
    </Box>
  );
};

// Danh sách combo để map tên (giả định)
const combos = [
  { id: 'capybara', title: 'Capybara Set' },
  { id: 'combo2big', title: 'Combo 2 Big' },
  { id: 'combo2bigextra', title: 'Combo 2 Big Extra' },
];

export default PaymentSection;
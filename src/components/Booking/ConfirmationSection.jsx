import React from 'react';
import { Box, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

const ConfirmationSection = ({ selectedSeatIds, selectedCombos, grandTotal, showTimeData, movieDetails }) => {
	const movie = movieDetails?.data?.data[0];
	const transactionId = `TX-${Date.now()}`;
	const qrValue = `Payment for ${transactionId} - Total: ${grandTotal.toLocaleString('vi-VN')} VND`;

	return (
		<Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 2 }}>
			<Typography variant="h6" fontWeight="bold" color="#1e88e5" mb={2}>
				Xác nhận giao dịch
			</Typography>
			<Typography variant="body1" fontWeight="bold" mb={1}>
				Thông tin giao dịch
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={1}>
				Mã giao dịch: {transactionId}
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={1}>
				Phim: {movie?.name || 'Tên phim'}
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={1}>
				Rạp: {showTimeData?.cinema?.name} - {showTimeData?.room?.name}
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={2}>
				Suất chiếu: {showTimeData ? `${showTimeData.startDate} ${showTimeData.startTime}` : ''}
			</Typography>

			<Typography variant="body1" fontWeight="bold" mb={1}>
				Chi tiết đặt vé
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
			<Typography variant="body1" fontWeight="bold" mt={2} mb={1}>
				Tổng tiền: {grandTotal.toLocaleString('vi-VN')} đ
			</Typography>

			<Typography variant="body1" fontWeight="bold" mb={1}>
				Thanh toán bằng mã QR
			</Typography>
			<Typography variant="body2" color="text.secondary" mb={2}>
				Quét mã QR dưới đây để thanh toán:
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
				<QRCodeSVG value={qrValue} size={150} />
				{/* <img
          src="https://via.placeholder.com/150?text=QR+Code"
          alt="QR Code"
          style={{ width: 150, height: 150 }}
        /> */}
			</Box>
			<Typography variant="body2" color="text.secondary" textAlign="center">
				Vui lòng kiểm tra thông tin trước khi thanh toán.
			</Typography>
		</Box>
	);
};

const combos = [
	{ id: 'capybara', title: 'Capybara Set' },
	{ id: 'combo2big', title: 'Combo 2 Big' },
	{ id: 'combo2bigextra', title: 'Combo 2 Big Extra' },
];

export default ConfirmationSection;
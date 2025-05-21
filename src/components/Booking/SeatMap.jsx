import React, { useMemo, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Seat from './Seat'; 

const SeatMap = ({ seatMapData, setSelectedSeatIds, setTotalAmount }) => {
	const { seats = [], maxRow = 0, maxColumn = 0 } = seatMapData || {};

	
	const seatMap = useMemo(() => {
		const map = new Map();
		seats.forEach((seat) => {
			map.set(`${seat.row}-${seat.column}`, seat);
		});
		return map;
	}, [seats]);

	
	const [selectedSeats, setSelectedSeats] = useState([]);

	
	const toggleSeat = (seat) => {
		if (!seat) return;

		setSelectedSeats((prev) => {
			const exists = prev.find((s) => s.id === seat.id);
			if (exists) {
				return prev.filter((s) => s.id !== seat.id);
			} else {
				return [...prev, seat];
			}
		});
	};

	useEffect(() => {
		setSelectedSeatIds(selectedSeats.map((s) => s.indexLabel));
		const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
		setTotalAmount(total);
	}, [selectedSeats, setSelectedSeatIds, setTotalAmount]);

	return (
		<Box sx={{ flex: 1, minWidth: 300 }}>
			<Typography variant="body2" mb={2}>Sơ đồ ghế</Typography>

			{/* Màn hình giả lập */}
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
				<Box sx={{ width: '80%', height: 20, bgcolor: '#ff9800', borderRadius: 1 }} />
			</Box>

			{/* Lưới ghế */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
				{Array.from({ length: maxRow }).map((_, rowIdx) => {
					const rowChar = String.fromCharCode('A'.charCodeAt(0) + rowIdx);
					return (
						<Box key={rowIdx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Typography sx={{ width: 20 }}>{rowChar}</Typography>
							{Array.from({ length: maxColumn }).map((_, colIdx) => {
								const seat = seatMap.get(`${rowIdx}-${colIdx}`);
								if (!seat) {
									return <Box key={colIdx} sx={{ width: 32, height: 32 }} />; // Ghế trống
								}

								const isSelected = selectedSeats.some((s) => s.id === seat.id);
								return (
									<Seat
										key={colIdx}
										label={seat.indexLabel}
										type={seat.type}
										price={seat.price}
										isSelected={isSelected}
										onClick={() => toggleSeat(seat)}
									/>
								);
							})}
						</Box>
					);
				})}
			</Box>
			{/* Legend */}
			<Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
				{[
					{ label: 'Ghế thường', color: '#fff' },
					{ label: 'Ghế thường đang chọn', color: '#ff9800' },
					{ label: 'Ghế VIP', color: '#ffd54f' },
					{ label: 'Ghế VIP đang chọn', color: '#ffc107' },
					{ label: 'Ghế trống (không tồn tại)', color: 'transparent', border: '1px dashed #ccc' },
				].map(({ label, color, border }) => (
					<Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Box
							sx={{
								width: 20,
								height: 20,
								bgcolor: color,
								border: border || '1px solid #555',
								borderRadius: 1,
							}}
						/>
						<Typography variant="caption">{label}</Typography>
					</Box>
				))}
			</Box>

		</Box>
	);
};

export default SeatMap;

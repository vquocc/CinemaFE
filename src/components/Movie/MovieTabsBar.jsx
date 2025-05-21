import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie'; 

const MovieTabsBar = ({ onTabChange }) => {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		if (onTabChange) onTabChange(newValue);
	};

	return (
		<Box
			sx={{
				bgcolor: 'transparent',
				py: 2,
				px: 0,
				borderBottom: 'none',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				mt: 4,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
				<Typography
					variant="h6"
					sx={{
						color: '#1e88e5',
						fontWeight: 'bold',
						mr: 1,
						display: 'flex',
						alignItems: 'center',
						fontSize: 20,
					}}
				>
					<MovieIcon sx={{ fontSize: 28, mr: 1 }} />
					PHIM
				</Typography>
				<Box sx={{ width: '1px', height: '24px', bgcolor: '#1e88e5', mx: 2 }} />
			</Box>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor="primary"
				indicatorColor="primary"
				sx={{ minHeight: 'auto' }}
			>
				<Tab label="Đang chiếu" sx={{ textTransform: 'none', fontSize: '16px', minHeight: 'auto', py: 1 }} />
				<Tab label="Sắp chiếu" sx={{ textTransform: 'none', fontSize: '16px', minHeight: 'auto', py: 1 }} />
				<Tab label="Phim IMAX" sx={{ textTransform: 'none', fontSize: '16px', minHeight: 'auto', py: 1 }} />
				<Tab label="Toàn quốc" sx={{ textTransform: 'none', fontSize: '16px', minHeight: 'auto', py: 1 }} />
			</Tabs>
		</Box>
	);
};

export default MovieTabsBar;
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from '~/layouts/AdminLayout/Sidebar';
import Navbar from '~/layouts/AdminLayout/Navbar';

const HorizontalLayout = () => {
	return (
		<Box sx={{ display: 'flex', minHeight: '100vh' }}>
			<Sidebar />
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Navbar />
				<Box sx={{ p: 3, flexGrow: 1 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default HorizontalLayout;

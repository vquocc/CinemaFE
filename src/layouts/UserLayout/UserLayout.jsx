import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/layouts/UserLayout/HeaderBar';
import Footer from '~/layouts/UserLayout/Footer';
import { Box, Container } from '@mui/material';

const UserLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            pt: 12,
            pb: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserLayout;

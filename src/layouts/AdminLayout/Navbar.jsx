import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          🎬 MovieBooking
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

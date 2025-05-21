import React from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const HeaderBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#000', boxShadow: 3 }}>
      <Toolbar sx={{ px: 3, position: 'relative', minHeight: 64, display: 'flex' }}>
        {/* Logo */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <img
              src="/image/images.png"
              alt="Galaxy Cinema"
              style={{ height: 60, marginRight: 10 }}
            />
          </Box>
        </Box>

        {/* Menu */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Button onClick={handleMenuOpen} sx={{ textTransform: 'none' }}>
            Phim
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} component={Link} to="/movies/now-showing">
              Đang Chiếu
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/movies/coming-soon">
              Sắp Chiếu
            </MenuItem>
          </Menu>

          <Button component={Link} to="/products" sx={{ textTransform: 'none' }}>
            Sản Phẩm
          </Button>
          <Button component={Link} to="/cinema" sx={{ textTransform: 'none' }}>
            Góc Điện Ảnh
          </Button>
          <Button component={Link} to="/events" sx={{ textTransform: 'none' }}>
            Sự Kiện
          </Button>
          <Button component={Link} to="/prices" sx={{ textTransform: 'none' }}>
            Rạp / Giá Vé
          </Button>
        </Box>

        {/* Action */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<StarIcon />}
            sx={{
              bgcolor: '#ff6500',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#e05b00' },
            }}
            component={Link}
            to="/booking"
          >
            Mua Vé
          </Button>

          <Button component={Link} to="/login" sx={{ textTransform: 'none' }}>
            Đăng Nhập
          </Button>
          <Button
            startIcon={<EmojiEventsIcon />}
            component={Link}
            to="/gstar"
            sx={{ color: '#007bff', textTransform: 'none', fontWeight: 600 }}
          >
            Tham Gia JAV a Star
          </Button>
        </Box>
      </Toolbar>

    </AppBar>
  );
};

export default HeaderBar;

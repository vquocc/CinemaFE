import React from 'react';
import { Box, Typography, Grid, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2b2b2b',
        color: '#ccc',
        px: { xs: 4, md: 10 },
        pt: 6,
        pb: 3,
        mt: 'auto',
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={20}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>
            GIỚI THIỆU
          </Typography>
          {['Về Chúng Tôi', 'Thoả Thuận Sử Dụng', 'Quy Chế Hoạt Động', 'Chính Sách Bảo Mật'].map((text, idx) => (
            <MuiLink
              key={idx}
              href="#"
              underline="hover"
              color="inherit"
              display="block"
              sx={{ mb: 3 }} 
            >
              {text}
            </MuiLink>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>
            GÓC ĐIỆN ẢNH
          </Typography>
          {['Thể Loại Phim', 'Bình Luận Phim', 'Blog Điện Ảnh', 'Phim Hay Tháng', 'Phim IMAX'].map((text, idx) => (
            <MuiLink
              key={idx}
              href="#"
              underline="hover"
              color="inherit"
              display="block"
              sx={{ mb: 3 }}
            >
              {text}
            </MuiLink>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3, color: '#fff' }}>
            HỖ TRỢ
          </Typography>
          {['Góp Ý', 'Sale & Services', 'Rạp / Giá Vé', 'Tuyển Dụng', 'FAQ'].map((text, idx) => (
            <MuiLink
              key={idx}
              href="#"
              underline="hover"
              color="inherit"
              display="block"
              sx={{ mb: 3 }}
            >
              {text}
            </MuiLink>
          ))}
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Box mb={2}>
            <img src="/image/images.png" alt="Galaxy Cinema" style={{ height: 70, borderRadius: 15 }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, gap: 2 }}>
            {['facebook', 'youtube', 'instagram'].map((icon, idx) => (
              <MuiLink key={idx} href="#" color="inherit">
                <img src={`/image/${icon}.png`} alt={icon} width={24} />
              </MuiLink>
            ))}
          </Box>
          <Box mt={2} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <img src="/image/javhd.webp" alt="Bộ Công Thương" width={50} />
          </Box>
          <Box mt={2} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <img src="/image/bct.png" alt="Bộ Công Thương" width={120} />
          </Box>
        </Grid>
      </Grid>

      <Box mt={4} sx={{ borderTop: '1px solid #666', pt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="inherit" sx={{ lineHeight: 1.8 }}>
          CÔNG TY CỔ PHẦN PHIM JVQUOC (JAV HD)
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ lineHeight: 1.8 }}>
          Điện Bàn, Quảng Nam - Đà Nẵng, Việt Nam
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ lineHeight: 1.8 }}>
          ☎ 028.39.333.303 - 📞 19002224 (9:00 - 22:00) - ✉ jvquocstudioJAVHD@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

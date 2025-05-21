import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useAllMovies } from '~/api/allMovieApi';

const InfoSidebar = ({ selectedSeatIds, totalAmount, movieId }) => {
  const { dataMovie: movieDetails, loadingMovie, errMovie } = useAllMovies({ id: movieId });

  if (loadingMovie) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  if (errMovie) return <Typography color="error">Lỗi khi tải thông tin phim.</Typography>;

  const movie = movieDetails?.data?.data[0];

  return (
    <Paper sx={{ p: 2, width: 300, borderRadius: 2, boxShadow: 2 }}>
      <Box mb={2}>
        <img
          src={movie?.poster || 'https://via.placeholder.com/300x400'}
          alt={movie?.title || 'Poster'}
          style={{ width: '100%', borderRadius: 4 }}
        />
      </Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {movie?.title || 'Tên phim'}
      </Typography>
      <Typography variant="body2" color="#ff9800" fontWeight="bold" mb={1}>
        2D Phụ đề - T16
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Galaxy Đà Nẵng - RẠP 4
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Suất: 12:15 - Thứ Ba, 20/05/2025
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" mb={1}>
          Tổng cộng: {selectedSeatIds.length} ghế
        </Typography>
        <Typography variant="body2" mb={1}>
          Thành tiền: {totalAmount.toLocaleString('vi-VN')} đ
        </Typography>
        {selectedSeatIds.length > 0 && (
          <>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Ghế đã chọn: {selectedSeatIds.join(', ')}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 4, mb: 1, fontWeight: 'bold', color: '#fff', backgroundColor: '#ff9800' }}
            >
              Tiến hành thanh toán
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default InfoSidebar;

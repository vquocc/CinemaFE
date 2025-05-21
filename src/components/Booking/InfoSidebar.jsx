import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useAllMovies } from '~/api/allMovieApi';
import { formatShowTime } from '~/utils/DateUtils';

const InfoSidebar = ({ selectedSeatIds, totalAmount, movieId, showTimeData }) => {
  const { data: movieDetails, isLoading, error } = useAllMovies({ id: movieId });

  useEffect(() => {
    console.log("Movie Details booking", movieDetails?.data?.data[0])
    console.log("ShowTime Data :", showTimeData)
  }, [movieDetails, showTimeData])

  if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Typography color="error">Lỗi khi tải thông tin phim.</Typography>;


  const movie = movieDetails?.data?.data[0];

  return (
    <Paper sx={{ p: 2, width: 300, borderRadius: 2, boxShadow: 2 }}>
      <Box mb={2}>
        <img
          src={movie?.imgPortrait || 'https://via.placeholder.com/300x400'}
          alt={movie?.name || 'Poster'}
          style={{ width: '100%', borderRadius: 4 }}
        />
      </Box>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        {movie?.name || 'Tên phim'}
      </Typography>
      <Typography variant="body2" color="#ff9800" fontWeight="bold" mb={1}>
        2D Phụ đề - {movie?.ageCode || '?'}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={1}>
        {showTimeData?.cinema?.name} - {showTimeData?.room?.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {showTimeData? formatShowTime(showTimeData.startDate,showTimeData.startTime):''}
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

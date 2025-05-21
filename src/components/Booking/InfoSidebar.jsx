import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useAllMovies } from '~/api/allMovieApi';
import { formatShowTime } from '~/utils/DateUtils';

const InfoSidebar = ({ selectedSeatIds, totalAmount, movieId, showTimeData, onContinue, selectedCombos, selectedTab }) => {
  const { data: movieDetails, isLoading, error } = useAllMovies({ id: movieId });

  useEffect(() => {
    console.log("Movie Details booking", movieDetails?.data?.data[0]);
    console.log("ShowTime Data :", showTimeData);
  }, [movieDetails, showTimeData]);

  if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  if (error) return <Typography color="error">Lỗi khi tải thông tin phim.</Typography>;

  const movie = movieDetails?.data?.data[0];

  const shouldShowButton = selectedSeatIds.length > 0 && (selectedTab === 1 || selectedTab === 2);

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
        {showTimeData ? formatShowTime(showTimeData.startDate, showTimeData.startTime) : ''}
      </Typography>
      <Box mt={2}>
        <Typography variant="body2" mb={1}>
          Tổng cộng: {selectedSeatIds.length} ghế
        </Typography>
        {selectedSeatIds.length > 0 && (
          <Typography variant="body2" color="text.secondary" mb={1}>
            Ghế đã chọn: {selectedSeatIds.join(', ')}
          </Typography>
        )}
        {selectedCombos && selectedCombos.length > 0 && (
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
        <Typography variant="body2" mb={1}>
          Thành tiền: {totalAmount.toLocaleString('vi-VN')} đ
        </Typography>
        {shouldShowButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={onContinue}
            sx={{ borderRadius: 4, mb: 1, fontWeight: 'bold', color: '#fff', backgroundColor: '#ff9800' }}
          >
           Tiếp Tục
          </Button>
        )}
      </Box>
    </Paper>
  );
};

const combos = [
  { id: 'capybara', title: 'Capybara Set' },
  { id: 'combo2big', title: 'Combo 2 Big' },
  { id: 'combo2bigextra', title: 'Combo 2 Big Extra' },
];

export default InfoSidebar;
import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import { useParams } from 'react-router-dom';
import { useMovieShowtime } from '~/api/allShowTime';
import { useSeatMapById } from '~/api/allSeatMapApi';
import SeatMap from '~/components/Booking/SeatMap';
import InfoSidebar from '~/components/Booking/InfoSidebar';

const BookingMovie = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [maxTabAllowed, setMaxTabAllowed] = useState(1);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const { slug } = useParams();
  const { data: movieShowtimeData, loading: loadingShowtime, errSt: showtimeError } = useMovieShowtime({ id: slug });

  const [seatMapId, setSeatMapId] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const {
    data: seatMapResponse,
    isLoading: loadingSeatMap,
    isError: isErrorSeatMap,
    error: errSeatMap
  } = useSeatMapById({
    id: seatMapId,
    queryConfig: {
      enabled: Boolean(seatMapId)
    }
  });

  useEffect(() => {
    if (movieShowtimeData) {
      setSeatMapId(movieShowtimeData?.data?.data?.room?.seatMapId);
      setMovieId(movieShowtimeData?.data?.data?.movieId);
      console.log(seatMapResponse?.data?.data)
    }
  }, [movieShowtimeData]);

  useEffect(() => {
    console.log('DATASEATMAP RAW:', seatMapResponse);
  }, [seatMapResponse]);

  const handleTabChange = (_, newValue) => {
    if (newValue <= maxTabAllowed) setSelectedTab(newValue);
  };

  if (loadingShowtime || loadingSeatMap) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  }

  if (showtimeError || errSeatMap) {
    return <Box sx={{ textAlign: 'center', color: 'red' }}>Lỗi: {showtimeError || errSeatMap}</Box>;
  }

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', p: 3, pt: 1 }}>
      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="#1e88e5">
          <ChairIcon sx={{ mr: 1 }} />
          Chọn ghế/Rạp/Suất
        </Typography>
        <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Chọn rạp/Suất" value={0} />
          <Tab label="Chọn ghế" value={1} />
          <Tab label="Chọn thức ăn" value={2} />
          <Tab label="Thanh toán" value={3} />
          <Tab label="Xác nhận" value={4} />
        </Tabs>
      </Box>

      {/* Main layout */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <SeatMap
          seatMapData={seatMapResponse?.data?.data}
          setSelectedSeatIds={setSelectedSeatIds}
          setTotalAmount={setTotalAmount}
        />
        <InfoSidebar selectedSeatIds={selectedSeatIds} totalAmount={totalAmount} movieId={movieId} showTimeData = {movieShowtimeData?.data?.data} />
      </Box>
    </Box>
  );
};

export default BookingMovie;

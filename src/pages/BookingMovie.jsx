import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress } from '@mui/material';
import ChairIcon from '@mui/icons-material/Chair';
import { useParams } from 'react-router-dom';
import { useMovieShowtime } from '~/api/allShowTime';
import { useSeatMapById } from '~/api/allSeatMapApi';
import { useAllMovies } from '~/api/allMovieApi'; 
import SeatMap from '~/components/Booking/SeatMap';
import InfoSidebar from '~/components/Booking/InfoSidebar';
import FoodComboSection from '~/components/Booking/FoodComboSection';
import PaymentSection from '~/components/Booking/PaymentSection';
import ConfirmationSection from '~/components/Booking/ConfirmationSection';

const tabList = [
  { label: 'Chọn rạp/Suất', value: 0 },
  { label: 'Chọn ghế', value: 1 },
  { label: 'Chọn thức ăn', value: 2 },
  { label: 'Thanh toán', value: 3 },
  { label: 'Xác nhận', value: 4 },
];

const BookingMovie = () => {
  const [selectedTab, setSelectedTab] = useState(1); 
  const [maxTabAllowed, setMaxTabAllowed] = useState(1); 
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [comboTotal, setComboTotal] = useState(0); 
  const [selectedCombos, setSelectedCombos] = useState([]); 

  const { slug } = useParams();
  const {
    data: movieShowtimeData,
    loading: loadingShowtime,
    errSt: showtimeError,
  } = useMovieShowtime({ id: slug });

  const [seatMapId, setSeatMapId] = useState(null);
  const [movieId, setMovieId] = useState(null);

  const {
    data: seatMapResponse,
    isLoading: loadingSeatMap,
    isError: isErrorSeatMap,
    error: errSeatMap,
  } = useSeatMapById({
    id: seatMapId,
    queryConfig: {
      enabled: Boolean(seatMapId),
    },
  });

  const {
    data: movieDetails,
    isLoading: loadingMovieDetails,
    error: movieError,
  } = useAllMovies({ id: movieId });

  useEffect(() => {
    if (movieShowtimeData) {
      setSeatMapId(movieShowtimeData?.data?.data?.room?.seatMapId);
      setMovieId(movieShowtimeData?.data?.data?.movieId);
    }
  }, [movieShowtimeData]);

  const handleTabChange = (_, newValue) => {
    if (newValue <= maxTabAllowed) {
      setSelectedTab(newValue);
    }
  };

  const handleComboTotalUpdate = (total) => {
    setComboTotal(total);
  };

  const handleComboUpdate = (combos) => {
    setSelectedCombos(combos);
  };

  const handleContinue = () => {
    if (selectedSeatIds.length > 0 && selectedTab === 1) {
      setMaxTabAllowed(2); 
      setSelectedTab(2);  
    } else if (selectedTab === 2) {
      setMaxTabAllowed(3); 
      setSelectedTab(3);  
    }
  };

  const handleConfirmPayment = () => {
    setMaxTabAllowed(4);
    setSelectedTab(4);  
  };

  const grandTotal = totalAmount + comboTotal; 

  if (loadingShowtime || loadingSeatMap || loadingMovieDetails) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  }

  if (showtimeError || errSeatMap || movieError) {
    return (
      <Box sx={{ textAlign: 'center', color: 'red' }}>
        Lỗi: {showtimeError || errSeatMap || movieError}
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', p: 3, pt: 1 }}>
      {/* Tabs Header */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="#1e88e5">
          <ChairIcon sx={{ mr: 1 }} />
          Chọn ghế/Rạp/Suất
        </Typography>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="primary"
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            {tabList.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                disabled={tab.value > maxTabAllowed}
                sx={{
                  opacity: tab.value <= maxTabAllowed ? 1 : 0.4,
                  fontWeight: selectedTab === tab.value ? 'bold' : 'normal',
                  minWidth: 120,
                  zIndex: 1,
                }}
              />
            ))}
          </Tabs>

          {/* Custom underline*/}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 2,
              bgcolor: 'primary.main',
              width: `${((selectedTab + 1) / tabList.length) * 90}%`,
              transition: 'width 0.3s',
            }}
          />
        </Box>
      </Box>

      {/* Main layout */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 2, minWidth: 0 }}>
          {selectedTab === 1 && (
            <SeatMap
              seatMapData={seatMapResponse?.data?.data}
              setSelectedSeatIds={setSelectedSeatIds}
              setTotalAmount={setTotalAmount}
            />
          )}
          {selectedTab === 2 && (
            <FoodComboSection
              onUpdateTotal={handleComboTotalUpdate}
              onUpdateCombos={handleComboUpdate}
            />
          )}
          {selectedTab === 3 && (
            <PaymentSection
              selectedSeatIds={selectedSeatIds}
              selectedCombos={selectedCombos}
              grandTotal={grandTotal}
              onConfirm={handleConfirmPayment}
            />
          )}
          {selectedTab === 4 && (
            <ConfirmationSection
              selectedSeatIds={selectedSeatIds}
              selectedCombos={selectedCombos}
              grandTotal={grandTotal}
              showTimeData={movieShowtimeData?.data?.data}
              movieDetails={movieDetails}
            />
          )}
        </Box>

        {/* InfoSidebar*/}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <InfoSidebar
            selectedSeatIds={selectedSeatIds}
            totalAmount={grandTotal}
            movieId={movieId}
            showTimeData={movieShowtimeData?.data?.data}
            onContinue={handleContinue}
            selectedCombos={selectedCombos}
            selectedTab={selectedTab}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingMovie;
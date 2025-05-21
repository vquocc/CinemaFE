import React, { useState, useMemo } from 'react';
import {
  Box, Tabs, Tab, Typography, Button, Select, MenuItem,
  FormControl, InputLabel
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getNext7Days } from '~/utils/DateUtils';
import { useAllMovieShowtime } from '~/api/showTimeByMovieApi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ScheduleSection = ({ movieId }) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(getNext7Days()[0].value);
  const [selectedTheater, setSelectedTheater] = useState('Toàn quốc');
  const [selectedCinema, setSelectedCinema] = useState('Tất cả rạp');

  const { data, isLoading, error } = useAllMovieShowtime({ id: movieId });


  const formattedSchedules = useMemo(() => {
    if (!data?.data?.data) return {};
    const result = {};

    data.data.data.forEach((showtime) => {
      const cinemaName = showtime.cinema?.name || 'Không rõ rạp';
      const date = dayjs(showtime.startDate).format('DD/MM');
      const time = showtime.startTime?.slice(0, 5) || '';

      if (!result[cinemaName]) result[cinemaName] = {};
      if (!result[cinemaName][date]) result[cinemaName][date] = [];

      result[cinemaName][date].push({
        time,
        id: showtime.id
      });
    });

    console.log('Formatted Schedules:', selectedDate); // 👀 Log để kiểm tra
    return result;
  }, [data]);

  const uniqueCinemas = useMemo(() => {
    const names = Object.keys(formattedSchedules);
    return ['Tất cả rạp', ...names];
  }, [formattedSchedules]);

  const filteredSchedules = useMemo(() => {
    return selectedCinema === 'Tất cả rạp'
      ? formattedSchedules
      : { [selectedCinema]: formattedSchedules[selectedCinema] || {} };
  }, [formattedSchedules, selectedCinema]);

  const handleDateChange = (event, newValue) => {
    setSelectedDate(newValue);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  return (
    <Box sx={{ mt: 4, p: 2, bgcolor: '#fff', border: 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
          <CalendarTodayIcon sx={{ mr: 1 }} /> Lịch Chiếu
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tabs
            value={selectedDate}
            onChange={handleDateChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              maxWidth: 500,
              '& .MuiTab-root': {
                minWidth: 100,
              },
            }}
          >
            {getNext7Days().map((day) => (
              <Tab key={day.value} label={day.label} value={day.value} />
            ))}
          </Tabs>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="theater-select-label">Khu vực</InputLabel>
            <Select
              labelId="theater-select-label"
              value={selectedTheater}
              onChange={handleTheaterChange}
              label="Khu vực"
              size="small"
            >
              <MenuItem value="Toàn quốc">Toàn quốc</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="cinema-select-label">Rạp</InputLabel>
            <Select
              labelId="cinema-select-label"
              value={selectedCinema}
              onChange={handleCinemaChange}
              label="Rạp"
              size="small"
            >
              {uniqueCinemas.map((cinema) => (
                <MenuItem key={cinema} value={cinema}>
                  {cinema}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ borderTop: '1px solid #1e88e5', pt: 2 }}>
        {Object.entries(filteredSchedules).map(([cinemaName, dates]) => {
          const showtimes = dates[selectedDate] || [];
          return showtimes.length > 0 ? (
            <Box key={cinemaName} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {cinemaName}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  2D Phụ đề
                </Typography>
                {showtimes.map((time, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2, minWidth: '60px' }}
                    onClick={() => navigate(`/booking/${time.id}`)}
                  >
                    {time.time}
                  </Button>
                ))}
              </Box>
            </Box>
          ) : null;
        })}

        {Object.entries(filteredSchedules).every(
          ([, dates]) => !(dates[selectedDate]?.length)
        ) && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Không có suất chiếu nào trong ngày này.
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export default ScheduleSection;

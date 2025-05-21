import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { getNext7Days } from "~/utils/DateUtils";

const ScheduleSection = () => {
  const [selectedDate, setSelectedDate] = useState('20/05');
  const [selectedTheater, setSelectedTheater] = useState('Toàn quốc');
  const [selectedCinema, setSelectedCinema] = useState('Tất cả rạp');

  const handleDateChange = (event, newValue) => {
    setSelectedDate(newValue);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const cinemas = ['Tất cả rạp', 'Galaxy Nguyễn Du', 'Galaxy Tân Bình'];
  const schedules = {
    'Galaxy Nguyễn Du': {
      '20/05': ['10:30', '11:45', '16:15', '20:15', '22:45'],
      '21/05': ['10:00', '12:00', '14:00', '16:00', '18:00'],
    },
    'Galaxy Tân Bình': {
      '20/05': ['09:30', '12:00', '13:30', '14:30', '16:00', '17:00', '19:30', '22:00'],
      '21/05': ['10:30', '13:00', '15:00', '17:30', '20:00'],
    },
  };

 
  const filteredSchedules = selectedCinema === 'Tất cả rạp'
    ? schedules
    : { [selectedCinema]: schedules[selectedCinema] };

  return (
    <Box sx={{ mt: 4, p: 2, bgcolor: '#fff', border: 'none' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e88e5' }}>
          <CalendarTodayIcon sx={{ mr: 1 }} /> Lịch Chiếu
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tabs value={selectedDate} onChange={handleDateChange} textColor="primary" indicatorColor="primary">
            <Tab label="Thứ Ba" value="20/05" />
            <Tab label="Thứ Tư" value="21/05" />
            <Tab label="Thứ Năm" value="22/05" />
            <Tab label="Thứ Sáu" value="23/05" />
            <Tab label="Thứ Bảy" value="24/05" />
          </Tabs>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="theater-select-label">Khu vực</InputLabel>
            <Select
              labelId="theater-select-label"
              value={selectedTheater}
              onChange={handleTheaterChange}
              label="Khu vực"
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' } }}
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
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' } }}
            >
              {cinemas.map((cinema) => (
                <MenuItem key={cinema} value={cinema}>
                  {cinema}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ borderTop: '1px solid #1e88e5', pt: 2 }}>
        {Object.entries(filteredSchedules).map(([theater, dates]) => (
          <Box key={theater} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {theater}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                2D Phụ đề
              </Typography>
              {dates[selectedDate].map((time, index) => (
                <Button key={index} variant="outlined" size="small" sx={{ borderRadius: 2, minWidth: '60px' }}>
                  {time}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScheduleSection;
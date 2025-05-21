import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleSection from '~/components/Movie/ScheduleSection';
import { useParams } from 'react-router-dom';
import { useAllMovies } from '~/api/allMovieApi';

export const PreBookingMoviePage = () => {
  const { slug } = useParams();

  const { data, isLoading, error } = useAllMovies({
    pageNo: 1,
    pageSize: 100,
    queryConfig: { staleTime: 1000 * 60 * 20 }
  });

  const movies = data?.data?.data || [];

  const selectedMovie = movies.find((movie) => {
    const movieSlug = movie.link?.split('/datve/')[1];
    return movieSlug === slug;
  });

  if (isLoading) return <Box>Loading...</Box>;
  if (error || !selectedMovie) return <Box>Không tìm thấy phim.</Box>;

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', color: '#000', pt: 0, mt: 0 }}>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          height: 500,
          bgcolor: '#000',
          overflow: 'hidden',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: '1200px', height: '100%' }}>
          <Box
            component="img"
            src={selectedMovie.imgLandscape || selectedMovie.imgPortrait}
            alt="Banner"
            sx={{
              height: '100%',
              width: 'auto',
              maxWidth: '1200px',
              objectFit: 'contain',
              opacity: 0.6,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, #000 0%, transparent 10%, transparent 90%, #000 100%)',
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlayCircleOutlineIcon sx={{ fontSize: 80, color: '#fff' }} />
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, px: 2 }}>
        <Box sx={{ p: 3, display: 'flex', gap: 3 }}>
          <Box sx={{ width: 250, flexShrink: 0 }}>
            <img
              src={selectedMovie.imgPortrait}
              alt={selectedMovie.name}
              style={{
                width: '100%',
                borderRadius: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {selectedMovie.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                icon={<CalendarMonthIcon />}
                label={selectedMovie.startDate || "Đang cập nhật"}
                color="primary"
              />
              <Chip label={selectedMovie.ageCode || "T?"} sx={{ bgcolor: 'orange', color: '#fff' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating
                  value={selectedMovie.rate || 4}
                  readOnly
                  precision={0.2}
                  icon={<StarIcon fontSize="inherit" htmlColor="gold" />}
                  emptyIcon={<StarIcon fontSize="inherit" htmlColor="#ccc" />}
                />
                <Typography variant="body2">
                  {selectedMovie.rating} (vote)
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Quốc gia:</strong> {selectedMovie.country || 'Không rõ'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Thể loại:</strong> {selectedMovie.genre || 'Không rõ'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Đạo diễn:</strong> {selectedMovie.directors || 'Đang cập nhật'}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Diễn viên:</strong> {selectedMovie.actors || 'Đang cập nhật'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 4, px: 2 }}>
          <ScheduleSection movieId={selectedMovie.id} />
        </Box>
      </Box>
    </Box>
  );
};

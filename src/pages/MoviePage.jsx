import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieList from '~/components/Movie/MovieList';
import MovieTabsBar from '~/components/Movie/MovieTabsBar';
import { Box } from '@mui/material';
import BannerSlider from '~/components/Movie/BannerSlider';
import QuickBookingBar from '~/components/Movie/QuickBookingBar';
import { useAllMovies } from '~/api/allMovieApi';

const bannerImages = [
  'https://i.ytimg.com/vi/VbMUiZm2dms/maxresdefault.jpg',
  'https://cdn.galaxycine.vn/media/2025/5/9/doraemon-the-movie-nobitas-art-world-tales-3_1746800280056.jpg',
  'https://cdn.galaxycine.vn/media/2025/4/23/thunderbolts-2048_1745395976662.jpg',
];

export const MoviePage = () => {
  const [tabValue, setTabValue] = useState(0);

  const { data, isLoading, error } = useAllMovies({
    pageNo: 1, 
    pageSize: 5, 
    queryConfig: { staleTime: 1000 * 60 * 20 }
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data?.data?.data) {
      const allMovies = data.data.data;

      if (tabValue === 0) {
        setMovies(allMovies.filter((movie) => movie.id.includes('9')));
      } else if (tabValue === 1) {
        setMovies(allMovies.filter((movie) => movie.id.includes('9')));
      } else {
        setMovies(allMovies);
      }
    }
  }, [data, tabValue]);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading movies</div>;
  }

  return (
    <Box
      className="movie-page-container"
      sx={{
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        padding: '24px',
      }}
    >
      <BannerSlider images={bannerImages} />

      <QuickBookingBar />
      <Box sx={{ my: 4 }}>
        <MovieTabsBar onTabChange={handleTabChange} />
      </Box>

      <Box sx={{ mt: 2, mb: 6 }}>
        <MovieList movies={movies} />
      </Box>
    </Box>
  );
};

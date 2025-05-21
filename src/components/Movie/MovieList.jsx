import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from '~/components/Movie/MovieCard';

const MovieList = ({ movies }) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ width: '100%', mt: 2 }}
    >
      {movies.map((movie) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3} 
          key={movie.id}
          sx={{ display: 'flex' }} 
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;

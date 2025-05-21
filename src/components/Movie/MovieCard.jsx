import React from 'react';
import { Card, CardMedia, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBookTicket = () => {
    const url = new URL(movie?.link);
    const slug = url.pathname.split('/').pop(); 
    navigate(`/datve/${slug}`);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        width: '270px',
        height: 450,
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        cursor: 'pointer',
        '&:hover .overlay': {
          opacity: 1,
        },
        '&:hover .media': {
          filter: 'blur(4px) brightness(0.7)',
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Độ tuổi */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          bgcolor: 'orange',
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 2,
        }}
      >
        {movie.ageCode}
      </Box>

      <CardMedia
        component="img"
        image={movie.imgPortrait}
        alt={movie.title}
        className="media"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'all 0.4s ease',
        }}
      />

      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ width: '120px', fontWeight: 'bold' }}
          onClick={handleBookTicket}
        >
          Mua vé
        </Button>
        <Button
          variant="outlined"
          color="info"
          sx={{ width: '120px', fontWeight: 'bold' }}
        >
          Trailer
        </Button>
      </Box>
    </Card>
  );
};

export default MovieCard;

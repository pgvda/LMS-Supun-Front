import { Box, Typography } from '@mui/material';
import React from 'react';
import dev from '../assets/dev.jpg';

const DevIndicate = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'rgba(240, 240, 240, 0.95)',
        textAlign: 'center',
      }}
    >
      {/* Background image container */}
      <Box
        sx={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          mb: 3,
        }}
      >
        <img
          src={dev}
          alt="Development"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          mb: 2,
        }}
      >
        Under Development
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: '#666',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}
      >
        We're currently working on this page to bring you an amazing experience. 
        Stay tuned for updates!
      </Typography>
    </Box>
  );
};

export default DevIndicate;

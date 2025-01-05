import { Box, Stack, IconButton } from '@mui/material';
import React from 'react';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'; // Import social media icons
import COLORS from '../../utils/Colors';
import logo from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <Box sx={{
        width: '100%',
        bgcolor: COLORS.black,
        color: COLORS.white,
        py: 3, // Padding Y-axis
      }}>
      <Stack direction={{ xs: 'column', md: 'row' }} 
             justifyContent={{ xs: 'center', md: 'space-between' }} 
             alignItems="center"
             spacing={2}>
        {/* Logo */}
        <Box component="img" src={logo} alt="Logo" sx={{ height: 50 }} />

        {/* Social Media Icons */}
        <Stack direction="row" spacing={1}>
          <IconButton href="https://facebook.com" target="_blank" sx={{ color: COLORS.white }}>
            <Facebook />
          </IconButton>
          <IconButton href="https://twitter.com" target="_blank" sx={{ color: COLORS.white }}>
            <Twitter />
          </IconButton>
          <IconButton href="https://instagram.com" target="_blank" sx={{ color: COLORS.white }}>
            <Instagram />
          </IconButton>
          <IconButton href="https://linkedin.com" target="_blank" sx={{ color: COLORS.white }}>
            <LinkedIn />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;

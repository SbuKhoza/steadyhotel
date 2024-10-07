import React from 'react';
import { Typography } from '@mui/material'; // Import Typography from MUI
import '@fontsource/righteous'; // Import the Righteous font

function Headtext() {
  return (
    <div>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Righteous, sans-serif',
          fontSize: '2rem',
          color: 'black', 
          textAlign: 'center', 
          marginTop: '20px',
        }}
      >
        Our Best Rooms
      </Typography>
    </div>
  );
}

export default Headtext;